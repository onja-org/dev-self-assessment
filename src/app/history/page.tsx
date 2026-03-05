'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Assessment } from '@/types';
import { getScoreLevel, getScoreLevelColor } from '@/lib/scoreCalculator';
import Link from 'next/link';

export default function HistoryPage() {
  const { userProfile } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssessments = async () => {
      if (!userProfile) return;

      try {
        const q = query(
          collection(db, 'assessments'),
          where('userId', '==', userProfile.uid),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Assessment[];

        setAssessments(data);
      } catch (error) {
        console.error('Error fetching assessments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssessments();
  }, [userProfile]);

  const getTrend = (currentScore: number, previousScore?: number) => {
    if (!previousScore) return null;
    const diff = currentScore - previousScore;
    if (Math.abs(diff) < 0.1) return { icon: '→', color: 'text-gray-500', text: 'No change' };
    if (diff > 0) return { icon: '↑', color: 'text-green-600', text: `+${diff.toFixed(1)}` };
    return { icon: '↓', color: 'text-red-600', text: diff.toFixed(1) };
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading history...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">
                Assessment History
              </h1>
              <Link
                href="/dashboard"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Dashboard
              </Link>
            </div>
            <p className="mt-2 text-gray-600">
              Track your progress over time
            </p>
          </div>

          {assessments.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                No assessments yet
              </h2>
              <p className="text-gray-600 mb-6">
                Start your first assessment to begin tracking your growth
              </p>
              <Link
                href="/assessment/new"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Start Assessment
              </Link>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Progress Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-blue-600">
                      {assessments.length}
                    </div>
                    <div className="text-sm text-gray-600">Total Assessments</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-green-600">
                      {assessments[0].overallScore.toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Latest Score</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-3xl font-bold text-purple-600">
                      {Math.max(...assessments.map(a => a.overallScore)).toFixed(1)}
                    </div>
                    <div className="text-sm text-gray-600">Best Score</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {assessments.map((assessment, index) => {
                  const previousAssessment = assessments[index + 1];
                  const trend = getTrend(assessment.overallScore, previousAssessment?.overallScore);
                  const scoreLevel = getScoreLevel(assessment.overallScore);
                  const scoreColor = getScoreLevelColor(assessment.overallScore);

                  return (
                    <div
                      key={assessment.id}
                      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-gray-900">
                              Assessment {assessments.length - index}
                            </h3>
                            {index === 0 && (
                              <span className="px-2 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full">
                                Latest
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {assessment.createdAt.toDate().toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-gray-900">
                            {assessment.overallScore.toFixed(1)}
                          </div>
                          <div className={`text-sm font-semibold ${scoreColor}`}>
                            {scoreLevel}
                          </div>
                          {trend && (
                            <div className={`text-sm font-medium ${trend.color} mt-1`}>
                              {trend.icon} {trend.text}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                        {Object.entries(assessment.categoryScores).map(([category, score]) => (
                          <div key={category} className="bg-gray-50 rounded p-3">
                            <div className="text-xs text-gray-600 mb-1">{category}</div>
                            <div className="flex items-center justify-between">
                              <div className="flex-1 bg-gray-200 rounded-full h-1.5 mr-2">
                                <div
                                  className="bg-blue-600 h-1.5 rounded-full"
                                  style={{ width: `${(score / 10) * 100}%` }}
                                />
                              </div>
                              <span className="text-sm font-bold text-gray-900">
                                {score.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end">
                        <button
                          className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                          onClick={() => {
                            // Store selected assessment in localStorage and navigate
                            localStorage.setItem('selectedAssessment', assessment.id);
                            window.location.href = '/assessment/result';
                          }}
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/assessment/new"
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Take New Assessment
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
