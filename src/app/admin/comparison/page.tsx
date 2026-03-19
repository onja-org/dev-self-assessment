'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Assessment } from '@/types';
import { getScoreLevel, getScoreLevelColor } from '@/lib/scoreCalculator';
import { CATEGORIES } from '@/lib/constants';
import Link from 'next/link';

export default function TeamComparison() {
  const { userProfile, signOut } = useAuth();
  const router = useRouter();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userProfile && userProfile.role !== 'admin') {
      router.push('/assessments');
    }
  }, [userProfile, router]);

  useEffect(() => {
    const fetchAllAssessments = async () => {
      try {
        const q = query(
          collection(db, 'assessments'),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Assessment[];

        // Get only the latest assessment per user
        const latestAssessments = new Map<string, Assessment>();
        data.forEach(a => {
          if (!latestAssessments.has(a.userId) || 
              a.createdAt.toDate() > latestAssessments.get(a.userId)!.createdAt.toDate()) {
            latestAssessments.set(a.userId, a);
          }
        });

        setAssessments(Array.from(latestAssessments.values()));
      } catch (error) {
        console.error('Error fetching assessments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userProfile?.role === 'admin') {
      fetchAllAssessments();
    }
  }, [userProfile]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (userProfile?.role !== 'admin') {
    return null;
  }

  const allCategories = Object.values(CATEGORIES);

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
          <div className="px-4 py-6 sm:px-0">            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading team data...</span>
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
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-left">
                        Developer
                      </th>
                      {allCategories.map(cat => (
                        <th
                          key={cat}
                          className="border border-gray-300 px-2 py-2 bg-gray-100 text-center text-xs"
                        >
                          {cat}
                        </th>
                      ))}
                      <th className="border border-gray-300 px-4 py-2 bg-gray-100 text-center">
                        Overall
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {assessments.map(assessment => (
                      <tr key={assessment.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-2 font-medium">
                          {assessment.userName}
                        </td>
                        {allCategories.map(cat => {
                          const score = assessment.categoryScores[cat];
                          return (
                            <td
                              key={cat}
                              className={`border border-gray-300 px-2 py-2 text-center ${
                                score !== undefined ? getColorForScore(score) : 'bg-gray-100'
                              }`}
                            >
                              <span className={score !== undefined ? 'text-white font-bold' : 'text-gray-400'}>
                                {score !== undefined ? score.toFixed(1) : '-'}
                              </span>
                            </td>
                          );
                        })}
                        <td className="border border-gray-300 px-4 py-2 text-center font-bold text-lg">
                          {assessment.overallScore.toFixed(1)}
                        </td>
                      </tr>
                    ))}
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
