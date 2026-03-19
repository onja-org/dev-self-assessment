'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { UserAssessment, AssessmentTemplate, ActionPlan } from '@/types';
import { generateActionPlans, getScoreLevel, getScoreLevelColor, getTopRecommendations } from '@/lib/scoreCalculator';
import { getSkillLevel } from '@/lib/constants';
import Link from 'next/link';

function ResultPageContent() {
  const { userProfile } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const assessmentId = searchParams?.get('id');
  const [userAssessment, setUserAssessment] = useState<UserAssessment | null>(null);
  const [template, setTemplate] = useState<AssessmentTemplate | null>(null);
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);
  const [topRecommendations, setTopRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      if (!userProfile || !assessmentId) {
        setLoading(false);
        return;
      }

      try {
        // Fetch the user assessment
        const userAssessmentRef = doc(db, 'userAssessments', assessmentId);
        const userAssessmentSnap = await getDoc(userAssessmentRef);

        if (userAssessmentSnap.exists()) {
          const assessmentData = {
            id: userAssessmentSnap.id,
            ...userAssessmentSnap.data()
          } as UserAssessment;

          // Verify this assessment belongs to the current user
          if (assessmentData.userId !== userProfile.uid) {
            alert('Unauthorized access');
            router.push('/assessments');
            return;
          }

          setUserAssessment(assessmentData);

          // Fetch the assessment template to get questions
          const templateRef = doc(db, 'assessmentTemplates', assessmentData.assessmentTemplateId);
          const templateSnap = await getDoc(templateRef);

          if (templateSnap.exists()) {
            const templateData = {
              id: templateSnap.id,
              ...templateSnap.data()
            } as AssessmentTemplate;
            setTemplate(templateData);

            const plans = generateActionPlans(
              assessmentData.categoryScores,
              assessmentData.responses,
              templateData.questions
            );
            setActionPlans(plans);

            const topRecs = getTopRecommendations(
              assessmentData.categoryScores,
              assessmentData.responses,
              assessmentData.overallScore,
              templateData.questions
            );
            setTopRecommendations(topRecs);
          }
        }
      } catch (error) {
        console.error('Error fetching assessment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [userProfile, assessmentId, router]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading results...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!userAssessment) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No assessment found</h2>
            <Link href="/assessments" className="text-blue-600 hover:text-blue-800">
              Go to Assessments
            </Link>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const scoreLevel = getScoreLevel(userAssessment.overallScore);
  const scoreColor = getScoreLevelColor(userAssessment.overallScore);
  const skillLevelDetails = getSkillLevel(userAssessment.overallScore);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link
              href="/assessments"
              className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Assessments
            </Link>
          </div>

          {searchParams?.get('new') === 'true' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-medium">
                ✅ Assessment completed successfully!
              </p>
            </div>
          )}

          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Assessment Results
              </h1>
              <p className="text-gray-600">
                {userAssessment.assessmentName} (v{userAssessment.assessmentVersion})
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Completed on {userAssessment.completedAt?.toDate().toLocaleDateString() || userAssessment.createdAt.toDate().toLocaleDateString()}
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 text-center mb-8">
              <div className="mb-4">
                <span className="text-6xl font-bold text-gray-900">
                  {userAssessment.overallScore.toFixed(1)}
                </span>
                <span className="text-2xl text-gray-600">/10</span>
              </div>
              <div className={`text-2xl font-semibold ${scoreColor}`}>
                {scoreLevel}
              </div>
              <p className="mt-2 text-gray-700 italic">{skillLevelDetails.description}</p>
            </div>

            {/* Top 3 Personalized Growth Recommendations */}
            {topRecommendations.length > 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="text-3xl mr-2">🎯</span>
                  Top 3 Growth Recommendations
                </h2>
                <p className="text-gray-700 mb-6">
                  Based on your assessment, here are the most impactful areas to focus on. These recommendations are tailored to your current {skillLevelDetails.label} level:
                </p>
                <div className="space-y-6">
                  {topRecommendations.map((rec, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl font-bold text-purple-600">#{idx + 1}</span>
                            <h3 className="text-lg font-bold text-gray-900">{rec.title}</h3>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                              rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                              rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {rec.priority === 'high' ? '🔥 HIGH PRIORITY' : rec.priority === 'medium' ? '⚡ MEDIUM PRIORITY' : '✨ FOCUS AREA'}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                              {rec.category}
                            </span>
                          </div>
                          <div className="prose prose-sm max-w-none text-gray-700 mb-4 whitespace-pre-line leading-relaxed">
                            {rec.description}
                          </div>

                          {rec.actionPlan && (
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 mb-4 border border-green-200">
                              <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                                <span className="mr-2">📋</span>
                                Your Action Plan
                              </h4>
                              <div className="prose prose-sm max-w-none text-green-900 whitespace-pre-line text-sm">
                                {rec.actionPlan}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {rec.resources && rec.resources.length > 0 && (
                        <div className="pt-4 border-t border-gray-200">
                          <p className="text-sm font-semibold text-gray-700 mb-3">📚 Curated Learning Resources:</p>
                          <div className="grid gap-3">
                            {rec.resources.map((resource: any, rIdx: number) => (
                              <a
                                key={rIdx}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-sm transition-all group"
                              >
                                <span className="text-xl mr-3 flex-shrink-0">
                                  {resource.type === 'docs' && '📖'}
                                  {resource.type === 'article' && '📝'}
                                  {resource.type === 'video' && '🎥'}
                                  {resource.type === 'course' && '🎓'}
                                  {resource.type === 'github' && '💻'}
                                  {resource.type === 'book' && '📕'}
                                  {resource.type === 'roadmap' && '🗺️'}
                                </span>
                                <div className="flex-1">
                                  <div className="font-medium text-blue-600 group-hover:text-blue-800 text-sm mb-1">
                                    {resource.title}
                                  </div>
                                  {resource.description && (
                                    <div className="text-xs text-gray-600">
                                      {resource.description}
                                    </div>
                                  )}
                                </div>
                                <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0 ml-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {Object.entries(userAssessment.categoryScores).map(([category, score]) => (
                <div key={category} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900">{category}</h3>
                    <span className="text-lg font-bold text-blue-600">
                      {score.toFixed(1)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${(score / 10) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📅 90-Day Action Plan
            </h2>
            <div className="space-y-4">
              {actionPlans.map((plan) => (
                <div key={plan.category} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setExpandedCategory(
                      expandedCategory === plan.category ? null : plan.category
                    )}
                    className="w-full px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition"
                  >
                    <span className="font-semibold text-gray-900">{plan.category}</span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        expandedCategory === plan.category ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {expandedCategory === plan.category && (
                    <div className="px-4 pb-4 border-t border-gray-200">
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Next 90 Days:</h4>
                        <ul className="space-y-1">
                          {plan.shortTerm.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🗓️ 12-Month Roadmap
            </h2>
            <div className="space-y-6">
              {actionPlans.map((plan) => (
                plan.longTerm.length > 0 && (
                  <div key={plan.category}>
                    <h3 className="font-semibold text-gray-900 mb-3">{plan.category}</h3>
                    <ul className="space-y-2">
                      {plan.longTerm.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-600 mr-2">✓</span>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Link
              href="/history"
              className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition"
            >
              View History
            </Link>
            <Link
              href="/assessments"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Back to Assessments
            </Link>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading results...</p>
          </div>
        </div>
      </ProtectedRoute>
    }>
      <ResultPageContent />
    </Suspense>
  );
}
