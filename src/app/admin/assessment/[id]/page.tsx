'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Assessment, ActionPlan } from '@/types';
import { generateActionPlans, getScoreLevel, getScoreLevelColor, getTopRecommendations } from '@/lib/scoreCalculator';
import { QUESTIONS, CATEGORIES } from '@/lib/constants';
import Link from 'next/link';

interface TopRecommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionPlan: string;
  resources: Array<{
    title: string;
    url: string;
    type: 'article' | 'video' | 'course' | 'docs' | 'github' | 'book' | 'roadmap';
    description?: string;
  }>;
  category: string;
}

export default function AdminAssessmentDetailPage() {
  const { userProfile } = useAuth();
  const router = useRouter();
  const params = useParams();
  const assessmentId = params?.id as string;
  
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [actionPlans, setActionPlans] = useState<ActionPlan[]>([]);
  const [recommendations, setRecommendations] = useState<TopRecommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'responses' | 'recommendations'>('responses');

  useEffect(() => {
    if (userProfile && userProfile.role !== 'admin') {
      router.push('/assessments');
    }
  }, [userProfile, router]);

  useEffect(() => {
    const fetchAssessment = async () => {
      if (!assessmentId) return;

      try {
        const docRef = doc(db, 'assessments', assessmentId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = { id: docSnap.id, ...docSnap.data() } as Assessment;
          setAssessment(data);

          const plans = generateActionPlans(data.categoryScores, data.responses);
          setActionPlans(plans);

          const recs = getTopRecommendations(data.categoryScores, data.responses, data.overallScore);
          setRecommendations(recs);
        } else {
          alert('Assessment not found');
          router.push('/admin');
        }
      } catch (error) {
        console.error('Error fetching assessment:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userProfile?.role === 'admin') {
      fetchAssessment();
    }
  }, [assessmentId, userProfile, router]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading assessment...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!assessment || userProfile?.role !== 'admin') {
    return null;
  }

  const scoreLevel = getScoreLevel(assessment.overallScore);
  const scoreColor = getScoreLevelColor(assessment.overallScore);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link
              href="/admin"
              className="text-blue-600 hover:text-blue-800 font-medium mb-4 inline-block"
            >
              ← Back to Admin Dashboard
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Assessment Details
              </h1>
              <div className="text-gray-600">
                <p className="text-lg font-medium">{assessment.userName}</p>
                <p>{assessment.userEmail}</p>
                <p className="text-sm mt-2">
                  Completed on {assessment.createdAt.toDate().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-8 text-center mb-8">
              <div className="mb-4">
                <span className="text-6xl font-bold text-gray-900">
                  {assessment.overallScore.toFixed(1)}
                </span>
                <span className="text-2xl text-gray-600">/10</span>
              </div>
              <div className={`text-2xl font-semibold ${scoreColor}`}>
                {scoreLevel} Level
              </div>
              <p className="mt-2 text-gray-600">Overall Developer Score</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {Object.entries(assessment.categoryScores).map(([category, score]) => (
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
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Assessment Analysis
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('responses')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    viewMode === 'responses'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Detailed Responses
                </button>
                <button
                  onClick={() => setViewMode('recommendations')}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    viewMode === 'recommendations'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Recommendations & Resources
                </button>
              </div>
            </div>

            {viewMode === 'responses' ? (
              <div className="space-y-6">
                {/* Group by category */}
                {Object.values(CATEGORIES).map(category => {
                  const categoryQuestions = QUESTIONS.filter(q => q.category === category);
                  const categoryResponses = categoryQuestions.filter(q => assessment.responses[q.id]);
                  
                  if (categoryResponses.length === 0) return null;

                  return (
                    <div key={category} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-gray-900">{category}</h3>
                        <span className="text-lg font-bold text-blue-600">
                          {assessment.categoryScores[category]?.toFixed(1) || 'N/A'}/10
                        </span>
                      </div>
                      <div className="space-y-4">
                        {categoryResponses.map(question => {
                          const response = assessment.responses[question.id];
                          const scoreWeight = response.scoreWeight;
                          const isLowScore = scoreWeight < 0.5;

                          return (
                            <div
                              key={question.id}
                              className={`border-l-4 pl-4 ${
                                isLowScore ? 'border-red-400 bg-red-50' : 'border-gray-300'
                              }`}
                            >
                              <h4 className="font-semibold text-gray-900 mb-2">{question.title}</h4>
                              <div className="ml-2">
                                <p className="text-gray-700 mb-1">
                                  <strong>Answer:</strong>{' '}
                                  {Array.isArray(response.value)
                                    ? response.value.join(', ')
                                    : response.value.toString()}
                                </p>
                                {response.followUp && (
                                  <p className="text-gray-700 mb-1">
                                    <strong>Follow-up:</strong> {response.followUp}
                                  </p>
                                )}
                                <p className={`text-sm font-medium ${
                                  isLowScore ? 'text-red-600' : 'text-green-600'
                                }`}>
                                  Score: {(scoreWeight * 10).toFixed(1)}/10
                                  {isLowScore && ' ⚠️ Needs Improvement'}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-6">
                {/* Recommendations */}
                <div className="space-y-4">
                  {recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{rec.title}</h3>
                          <span className="inline-block mt-1 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded">
                            {rec.category}
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            rec.priority === 'high'
                              ? 'bg-red-100 text-red-700'
                              : rec.priority === 'medium'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {rec.priority.toUpperCase()} Priority
                        </span>
                      </div>
                      <p className="text-gray-700 mb-4">{rec.description}</p>
                      
                      <div className="bg-blue-50 rounded-lg p-4 mb-4">
                        <h4 className="font-semibold text-gray-900 mb-2">📅 Action Plan:</h4>
                        <p className="text-gray-700 whitespace-pre-line">{rec.actionPlan}</p>
                      </div>

                      {rec.resources.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">📚 Learning Resources:</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {rec.resources.map((resource, resIdx) => (
                              <a
                                key={resIdx}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition group"
                              >
                                <span className="text-2xl">{getResourceIcon(resource.type)}</span>
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-900 group-hover:text-blue-600 truncate">
                                    {resource.title}
                                  </p>
                                  <p className="text-xs text-gray-500 capitalize">{resource.type}</p>
                                  {resource.description && (
                                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                      {resource.description}
                                    </p>
                                  )}
                                </div>
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
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Development Roadmap
            </h2>
            <div className="space-y-4">{actionPlans.map((plan) => (
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
                        <h4 className="font-medium text-gray-900 mb-2">90-Day Plan:</h4>
                        <ul className="space-y-1 mb-4">
                          {plan.shortTerm.map((item, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-blue-600 mr-2">•</span>
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                        {plan.longTerm.length > 0 && (
                          <>
                            <h4 className="font-medium text-gray-900 mb-2">12-Month Roadmap:</h4>
                            <ul className="space-y-1">
                              {plan.longTerm.map((item, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="text-green-600 mr-2">✓</span>
                                  <span className="text-gray-700">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function getResourceIcon(type: string): string {
  const icons: Record<string, string> = {
    article: '📝',
    video: '🎥',
    course: '🎓',
    docs: '📚',
    github: '💻',
    book: '📖',
    roadmap: '🗺️',
  };
  return icons[type] || '🔗';
}
