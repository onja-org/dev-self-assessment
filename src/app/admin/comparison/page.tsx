'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AssessmentTemplate, UserAssessment } from '@/types';
import { getScoreLevel, getScoreLevelColor } from '@/lib/scoreCalculator';
import Link from 'next/link';

export default function TeamComparison() {
  const { userProfile, signOut } = useAuth();
  const router = useRouter();
  const [templates, setTemplates] = useState<AssessmentTemplate[]>([]);
  const [userAssessments, setUserAssessments] = useState<UserAssessment[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userProfile && userProfile.role !== 'admin') {
      router.push('/assessments');
    }
  }, [userProfile, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all assessment templates
        const templatesQuery = query(
          collection(db, 'assessmentTemplates'),
          orderBy('createdAt', 'desc')
        );
        const templatesSnapshot = await getDocs(templatesQuery);
        const fetchedTemplates = templatesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AssessmentTemplate[];

        // Fetch all user assessments
        const assessmentsQuery = query(
          collection(db, 'userAssessments'),
          orderBy('createdAt', 'desc')
        );
        const assessmentsSnapshot = await getDocs(assessmentsQuery);
        const fetchedAssessments = assessmentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as UserAssessment[];

        setTemplates(fetchedTemplates);
        setUserAssessments(fetchedAssessments);
        
        // Auto-select first template if available
        if (fetchedTemplates.length > 0 && !selectedTemplateId) {
          setSelectedTemplateId(fetchedTemplates[0].id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userProfile?.role === 'admin') {
      fetchData();
    }
  }, [userProfile]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (userProfile?.role !== 'admin') {
    return null;
  }

  // Filter assessments by selected template - only one per user
  const filteredAssessments = selectedTemplateId
    ? userAssessments.filter(ua => ua.assessmentTemplateId === selectedTemplateId)
    : [];

  // Get unique users (one assessment per user for selected template)
  const uniqueUserAssessments = new Map<string, UserAssessment>();
  filteredAssessments.forEach(assessment => {
    const existing = uniqueUserAssessments.get(assessment.userId);
    if (!existing || assessment.createdAt.toDate() > existing.createdAt.toDate()) {
      uniqueUserAssessments.set(assessment.userId, assessment);
    }
  });
  const assessments = Array.from(uniqueUserAssessments.values());

  // Get selected template
  const selectedTemplate = templates.find(t => t.id === selectedTemplateId);
  
  // Get all categories from selected template's questions
  const allCategories = selectedTemplate
    ? Array.from(new Set(selectedTemplate.questions.map(q => q.category)))
    : [];

  // Calculate team averages by category
  const categoryAverages: { [key: string]: number } = {};
  allCategories.forEach(cat => {
    const scores = assessments
      .map(a => a.categoryScores[cat])
      .filter(s => s !== undefined);
    categoryAverages[cat] = scores.length > 0
      ? scores.reduce((sum, s) => sum + s, 0) / scores.length
      : 0;
  });

  // Calculate skill level distribution
  const levelDistribution: { [key: string]: number } = {
    'Beginner': 0,
    'Intermediate': 0,
    'Advanced': 0,
  };
  assessments.forEach(a => {
    const level = getScoreLevel(a.overallScore);
    if (levelDistribution[level] !== undefined) {
      levelDistribution[level]++;
    }
  });

  // Team average score
  const teamAvgScore = assessments.length > 0
    ? assessments.reduce((sum, a) => sum + a.overallScore, 0) / assessments.length
    : 0;

  // Identify skill gaps (categories with lowest average scores)
  const skillGaps = Object.entries(categoryAverages)
    .sort(([, a], [, b]) => a - b)
    .slice(0, 3);

  // Identify team strengths (categories with highest average scores)
  const teamStrengths = Object.entries(categoryAverages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3);

  // Category heatmap data
  const getColorForScore = (score: number): string => {
    if (score >= 8) return 'bg-green-500';
    if (score >= 6) return 'bg-yellow-500';
    if (score >= 4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const toggleRow = (userId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedRows(newExpanded);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-bold text-gray-900">
                  Admin Panel
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Admin: {userProfile?.name}</span>
                <Link
                  href="/assessments"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Assessments
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
            {/* Navigation Tabs */}
            <div className="border-t border-gray-200">
              <nav className="flex -mb-px">
                <Link
                  href="/admin"
                  className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  📊 Overview
                </Link>
                <Link
                  href="/admin/assessments"
                  className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  📋 Assessments
                </Link>
                <Link
                  href="/admin/questions"
                  className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  📝 Questions
                </Link>
                <Link
                  href="/admin/categories"
                  className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  🗂️ Categories
                </Link>
                <Link
                  href="/admin/comparison"
                  className="px-4 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-600"
                >
                  📈 Comparison
                </Link>
              </nav>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {/* Assessment Template Selector */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Select Assessment</h2>
              <select
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose an assessment...</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>
                    {template.name} (v{template.version}) - {template.isActive ? 'Active' : 'Inactive'}
                  </option>
                ))}
              </select>
              {selectedTemplate && (
                <p className="mt-2 text-sm text-gray-600">
                  {selectedTemplate.description || 'No description'}
                </p>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading team data...</span>
              </div>
            ) : !selectedTemplateId ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <p className="text-yellow-800">Please select an assessment to view team comparison.</p>
              </div>
            ) : assessments.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <p className="text-gray-600">No user assessments found for this template yet.</p>
              </div>
            ) : (
              <>            {/* Team Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-blue-600">
                  {assessments.length}
                </div>
                <div className="text-gray-600">Team Members Assessed</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-green-600">
                  {teamAvgScore.toFixed(1)}
                </div>
                <div className="text-gray-600">Team Average Score</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className={`text-3xl font-bold ${getScoreLevelColor(teamAvgScore)}`}>
                  {getScoreLevel(teamAvgScore)}
                </div>
                <div className="text-gray-600">Team Skill Level</div>
              </div>
            </div>

            {/* Skill Level Distribution */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Skill Level Distribution</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(levelDistribution).map(([level, count]) => {
                  const percentage = assessments.length > 0
                    ? ((count / assessments.length) * 100).toFixed(0)
                    : '0';
                  return (
                    <div key={level} className="border rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{level}</span>
                        <span className="text-2xl font-bold text-blue-600">{count}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">{percentage}% of team</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Team Strengths & Gaps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Team Strengths */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4 text-green-700">
                  🌟 Team Strengths
                </h2>
                <div className="space-y-3">
                  {teamStrengths.map(([category, avgScore], idx) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-400">#{idx + 1}</span>
                        <span className="font-medium">{category}</span>
                      </div>
                      <span className="text-xl font-bold text-green-600">
                        {avgScore.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Gaps */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4 text-orange-700">
                  📊 Areas for Improvement
                </h2>
                <div className="space-y-3">
                  {skillGaps.map(([category, avgScore], idx) => (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-400">#{idx + 1}</span>
                        <span className="font-medium">{category}</span>
                      </div>
                      <span className="text-xl font-bold text-orange-600">
                        {avgScore.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Average Scores by Category */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Average Scores by Category</h2>
              <div className="space-y-4">
                {allCategories.map(category => {
                  const avgScore = categoryAverages[category] || 0;
                  const percentage = (avgScore / 10) * 100;
                  return (
                    <div key={category}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{category}</span>
                        <span className="font-bold text-blue-600">{avgScore.toFixed(1)}/10</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${
                            avgScore >= 8 ? 'bg-green-500' :
                            avgScore >= 6 ? 'bg-yellow-500' :
                            avgScore >= 4 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Team Heatmap */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4">Team Skills Heatmap</h2>
              <p className="text-sm text-gray-600 mb-4">Click on a row to see detailed breakdown</p>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">
                        Developer
                      </th>
                      <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-center">
                        Overall Score
                      </th>
                      <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-center">
                        Status
                      </th>
                      <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-center">
                        Completed
                      </th>
                      <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-center">
                        
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessments.map(assessment => {
                      const isExpanded = expandedRows.has(assessment.userId);
                      return (
                        <>
                          <tr 
                            key={assessment.id} 
                            onClick={() => toggleRow(assessment.userId)}
                            className="hover:bg-gray-50 cursor-pointer transition"
                          >
                            <td className="border border-gray-300 px-4 py-3 font-medium">
                              {assessment.userName}
                              <div className="text-xs text-gray-500">{assessment.userEmail}</div>
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-center">
                              <span className="text-2xl font-bold text-blue-600">
                                {assessment.overallScore.toFixed(1)}
                              </span>
                              <span className="text-gray-500">/10</span>
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-center">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                assessment.status === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {assessment.status === 'completed' ? '✅ Completed' : '🔄 In Progress'}
                              </span>
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-center text-sm text-gray-600">
                              {assessment.completedAt 
                                ? assessment.completedAt.toDate().toLocaleDateString()
                                : 'N/A'
                              }
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-center">
                              <svg 
                                className={`w-5 h-5 inline-block transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </td>
                          </tr>
                          {isExpanded && (
                            <tr key={`${assessment.id}-details`}>
                              <td colSpan={5} className="border border-gray-300 bg-gray-50 p-4">
                                <div className="space-y-3">
                                  <h4 className="font-semibold text-gray-900 mb-3">Category Scores</h4>
                                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                                    {allCategories.map(cat => {
                                      const score = assessment.categoryScores[cat];
                                      return (
                                        <div key={cat} className="bg-white rounded-lg p-3 border border-gray-200">
                                          <div className="text-xs font-medium text-gray-600 mb-1">
                                            {cat}
                                          </div>
                                          <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-blue-600">
                                              {score !== undefined ? score.toFixed(1) : 'N/A'}
                                            </span>
                                            {score !== undefined && (
                                              <div className={`w-3 h-3 rounded-full ${getColorForScore(score)}`} />
                                            )}
                                          </div>
                                          {score !== undefined && (
                                            <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                                              <div
                                                className={`h-1.5 rounded-full ${
                                                  score >= 8 ? 'bg-green-500' :
                                                  score >= 6 ? 'bg-yellow-500' :
                                                  score >= 4 ? 'bg-orange-500' : 'bg-red-500'
                                                }`}
                                                style={{ width: `${(score / 10) * 100}%` }}
                                              />
                                            </div>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500"></div>
                  <span>8.0 - 10.0 (Advanced)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500"></div>
                  <span>6.0 - 7.9 (Intermediate)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500"></div>
                  <span>4.0 - 5.9 (Beginner+)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500"></div>
                  <span>0.0 - 3.9 (Beginner)</span>
                </div>
              </div>
            </div>
            </>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
