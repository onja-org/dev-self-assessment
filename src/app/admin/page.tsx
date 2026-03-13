'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Assessment } from '@/types';
import { getScoreLevel, getScoreLevelColor, getTopRecommendations } from '@/lib/scoreCalculator';
import { QUESTIONS, CATEGORIES } from '@/lib/constants';
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
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [completionFilter, setCompletionFilter] = useState<string>('all');

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

        // Don't filter - show all assessments (all versions for all developers)
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

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(a => a.categoryScores[categoryFilter] !== undefined);
    }

    // Filter by completion status
    const allCategories = Object.values(CATEGORIES);
    if (completionFilter === 'complete') {
      filtered = filtered.filter(a => 
        allCategories.every(cat => a.categoryScores[cat] !== undefined)
      );
    } else if (completionFilter === 'incomplete') {
      filtered = filtered.filter(a => 
        !allCategories.every(cat => a.categoryScores[cat] !== undefined)
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
  }, [searchTerm, sortBy, sortOrder, assessments, categoryFilter, completionFilter]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const exportToCSV = () => {
    // Get all unique categories
    const allCategories = new Set<string>();
    filteredAssessments.forEach(a => {
      Object.keys(a.categoryScores).forEach(cat => allCategories.add(cat));
    });
    const categories = Array.from(allCategories).sort();

    const headers = ['Developer Name', 'Email', 'Date', 'Version', 'Overall Score', ...categories, 'Categories Completed'];
    const rows = filteredAssessments.map(a => [
      a.userName,
      a.userEmail,
      a.createdAt.toDate().toLocaleDateString(),
      `v${a.version || 1}`,
      a.overallScore.toFixed(1),
      ...categories.map(cat => (a.categoryScores[cat] || 0).toFixed(1)),
      Object.keys(a.categoryScores).length
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `assessments-summary-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportDetailedReport = () => {
    let report = 'DETAILED ASSESSMENT REPORT\n';
    report += `Generated: ${new Date().toLocaleString()}\n`;
    report += `Total Assessments: ${filteredAssessments.length}\n\n`;
    report += '='.repeat(80) + '\n\n';

    filteredAssessments.forEach((assessment, idx) => {
      report += `[${idx + 1}] ${assessment.userName} (${assessment.userEmail}) - Version ${assessment.version || 1}\n`;
      report += `Date: ${assessment.createdAt.toDate().toLocaleString()}\n`;
      report += `Overall Score: ${assessment.overallScore.toFixed(1)}/10\n\n`;

      // Category Scores
      report += 'CATEGORY SCORES:\n';
      Object.entries(assessment.categoryScores).forEach(([cat, score]) => {
        report += `  - ${cat}: ${score.toFixed(1)}/10\n`;
      });
      report += '\n';

      // Questions and Answers
      report += 'RESPONSES:\n';
      Object.entries(assessment.responses).forEach(([qId, answer]) => {
        const question = QUESTIONS.find(q => q.id === qId);
        if (question) {
          report += `  Q: ${question.title}\n`;
          report += `  Category: ${question.category}\n`;
          report += `  Answer: ${JSON.stringify(answer.value)}\n`;
          report += `  Score Weight: ${(answer.scoreWeight * 10).toFixed(1)}/10\n\n`;
        }
      });

      // Recommendations
      const recommendations = getTopRecommendations(
        assessment.categoryScores,
        assessment.responses,
        assessment.overallScore
      );
      report += 'RECOMMENDATIONS:\n';
      recommendations.forEach((rec, recIdx) => {
        report += `  ${recIdx + 1}. ${rec.title} (Priority: ${rec.priority})\n`;
        report += `     ${rec.description.substring(0, 200)}...\n\n`;
      });

      report += '\n' + '='.repeat(80) + '\n\n';
    });

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `detailed-report-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (userProfile?.role !== 'admin') {
    return null;
  }

  const allCategories = Object.values(CATEGORIES);
  const stats = {
    totalAssessments: assessments.length,
    uniqueDevelopers: new Set(assessments.map(a => a.userId)).size,
    averageScore: assessments.length > 0
      ? (assessments.reduce((sum, a) => sum + a.overallScore, 0) / assessments.length).toFixed(1)
      : '0',
    filteredCount: filteredAssessments.length,
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
            {/* Navigation Tabs */}
            <div className="border-t border-gray-200">
              <nav className="flex -mb-px">
                <Link
                  href="/admin"
                  className="px-4 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-600"
                >
                  📊 Overview
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
                  className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  📈 Comparison
                </Link>
              </nav>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading assessments...</span>
              </div>
            ) : (
              <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-orange-600">
                  {stats.filteredCount}
                </div>
                <div className="text-gray-600">Filtered Results</div>
              </div>
            </div>

            {/* Filters and Actions */}
            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    {allCategories.map(cat => (
                      <option key={cat} value={cat}>Has {cat}</option>
                    ))}
                  </select>
                  <select
                    value={completionFilter}
                    onChange={(e) => setCompletionFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="complete">Complete</option>
                    <option value="incomplete">Incomplete</option>
                  </select>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'score')}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="date">Sort by Date</option>
                    <option value="score">Sort by Score</option>
                  </select>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {sortOrder === 'asc' ? '↑ Ascending' : '↓ Descending'}
                  </button>
                  <button
                    onClick={exportToCSV}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    📊 Export Summary CSV
                  </button>
                  <button
                    onClick={exportDetailedReport}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    📄 Export Detailed Report
                  </button>
                </div>
              </div>

              {/* Table */}
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
                        Version
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Overall Score
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Categories
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
                      const completedCategories = Object.keys(assessment.categoryScores).length;
                      const totalCategories = allCategories.length;

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
                            <span className="inline-block px-2 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded">
                              v{assessment.version || 1}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-lg font-bold text-gray-900">
                              {assessment.overallScore.toFixed(1)}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-wrap gap-1">
                              <span className={`text-xs px-2 py-1 rounded ${
                                completedCategories === totalCategories
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {completedCategories}/{totalCategories}
                              </span>
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
                              View Details →
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
                  <p className="text-gray-600">No assessments found matching your filters</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('all');
                      setCompletionFilter('all');
                    }}
                    className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
            </>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
