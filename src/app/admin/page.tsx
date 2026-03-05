'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, getDocs, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Assessment } from '@/types';
import { getScoreLevel, getScoreLevelColor } from '@/lib/scoreCalculator';
import Link from 'next/link';

export default function AdminDashboard() {
  const { userProfile, signOut } = useAuth();
  const router = useRouter();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [filteredAssessments, setFilteredAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (userProfile && userProfile.role !== 'admin') {
      router.push('/dashboard');
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

        setAssessments(data);
        setFilteredAssessments(data);
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

  useEffect(() => {
    let filtered = [...assessments];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        a =>
          a.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          a.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = a.createdAt.toDate().getTime();
        const dateB = b.createdAt.toDate().getTime();
        return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
      } else {
        return sortOrder === 'desc'
          ? b.overallScore - a.overallScore
          : a.overallScore - b.overallScore;
      }
    });

    setFilteredAssessments(filtered);
  }, [searchTerm, sortBy, sortOrder, assessments]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const exportToCSV = () => {
    const headers = ['Developer Name', 'Email', 'Date', 'Overall Score', 'Technical Skills', 'Problem Solving', 'Collaboration', 'Communication', 'Learning'];
    const rows = filteredAssessments.map(a => [
      a.userName,
      a.userEmail,
      a.createdAt.toDate().toLocaleDateString(),
      a.overallScore.toFixed(1),
      ...Object.values(a.categoryScores).map(s => s.toFixed(1))
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `assessments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (userProfile?.role !== 'admin') {
    return null;
  }

  const stats = {
    totalAssessments: assessments.length,
    uniqueDevelopers: new Set(assessments.map(a => a.userId)).size,
    averageScore: assessments.length > 0
      ? (assessments.reduce((sum, a) => sum + a.overallScore, 0) / assessments.length).toFixed(1)
      : '0',
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  Admin Dashboard
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Admin: {userProfile?.name}</span>
                <Link
                  href="/dashboard"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-blue-600">
                  {stats.totalAssessments}
                </div>
                <div className="text-gray-600">Total Assessments</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-green-600">
                  {stats.uniqueDevelopers}
                </div>
                <div className="text-gray-600">Developers</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-purple-600">
                  {stats.averageScore}
                </div>
                <div className="text-gray-600">Average Score</div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'score')}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="date">Date</option>
                    <option value="score">Score</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Export CSV
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Developer
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Overall Score
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Level
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAssessments.map((assessment) => {
                      const scoreLevel = getScoreLevel(assessment.overallScore);
                      const scoreColor = getScoreLevelColor(assessment.overallScore);

                      return (
                        <tr key={assessment.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div className="font-medium text-gray-900">
                              {assessment.userName}
                            </div>
                            <div className="text-sm text-gray-600">
                              {assessment.userEmail}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {assessment.createdAt.toDate().toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-lg font-bold text-gray-900">
                              {assessment.overallScore.toFixed(1)}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className={`font-semibold ${scoreColor}`}>
                              {scoreLevel}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <Link
                              href={`/admin/assessment/${assessment.id}`}
                              className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                              View Details
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredAssessments.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No assessments found</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
