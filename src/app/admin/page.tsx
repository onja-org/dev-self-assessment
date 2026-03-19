'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AssessmentTemplate, UserAssessment } from '@/types';
import { getScoreLevel, getScoreLevelColor } from '@/lib/scoreCalculator';
import Link from 'next/link';

export default function AdminDashboard() {
  const { userProfile, signOut } = useAuth();
  const router = useRouter();
  const [templates, setTemplates] = useState<AssessmentTemplate[]>([]);
  const [userAssessments, setUserAssessments] = useState<UserAssessment[]>([]);
  const [filteredAssessments, setFilteredAssessments] = useState<UserAssessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'score'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [templateFilter, setTemplateFilter] = useState<string>('all');

  useEffect(() => {
    if (userProfile && userProfile.role !== 'admin') {
      router.push('/assessments');
    }
  }, [userProfile, router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch assessment templates
        const templatesQuery = query(
          collection(db, 'assessmentTemplates'),
          orderBy('createdAt', 'desc')
        );
        const templatesSnapshot = await getDocs(templatesQuery);
        const fetchedTemplates = templatesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AssessmentTemplate[];

        // Fetch user assessments
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
        setFilteredAssessments(fetchedAssessments);
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

  useEffect(() => {
    let filtered = [...userAssessments];

    // Filter by template
    if (templateFilter !== 'all') {
      filtered = filtered.filter(a => a.assessmentTemplateId === templateFilter);
    }

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

    // Filter by status
    if (statusFilter === 'completed') {
      filtered = filtered.filter(a => a.status === 'completed');
    } else if (statusFilter === 'in-progress') {
      filtered = filtered.filter(a => a.status === 'in-progress');
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

    // Deduplicate: For same developer + same assessment, keep only completed version
    const deduplicatedMap = new Map<string, UserAssessment>();
    filtered.forEach(assessment => {
      const key = `${assessment.userId}_${assessment.assessmentTemplateId}`;
      const existing = deduplicatedMap.get(key);
      
      if (!existing) {
        // No existing entry, add this one
        deduplicatedMap.set(key, assessment);
      } else if (assessment.status === 'completed' && existing.status === 'in-progress') {
        // Replace in-progress with completed
        deduplicatedMap.set(key, assessment);
      } else if (existing.status === 'completed' && assessment.status === 'in-progress') {
        // Keep the completed one (do nothing)
      } else {
        // Both have same status, keep the most recent one
        if (assessment.createdAt.toDate().getTime() > existing.createdAt.toDate().getTime()) {
          deduplicatedMap.set(key, assessment);
        }
      }
    });

    const deduplicated = Array.from(deduplicatedMap.values());

    setFilteredAssessments(deduplicated);
  }, [userAssessments, searchTerm, sortBy, sortOrder, categoryFilter, statusFilter, templateFilter]);

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

    const headers = ['Developer Name', 'Email', 'Date', 'Assessment', 'Overall Score', 'Status', ...categories];
    const rows = filteredAssessments.map(a => [
      a.userName,
      a.userEmail,
      a.createdAt.toDate().toLocaleDateString(),
      a.assessmentName,
      a.overallScore.toFixed(1),
      a.status,
      ...categories.map(cat => (a.categoryScores[cat] || 0).toFixed(1))
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
      report += `[${idx + 1}] ${assessment.userName} (${assessment.userEmail}) - ${assessment.assessmentName}\n`;
      report += `Date: ${assessment.createdAt.toDate().toLocaleString()}\n`;
      report += `Overall Score: ${assessment.overallScore.toFixed(1)}/10\n\n`;

      // Category Scores
      report += 'CATEGORY SCORES:\n';
      Object.entries(assessment.categoryScores).forEach(([cat, score]) => {
        report += `  - ${cat}: ${score.toFixed(1)}/10\n`;
      });
      report += '\n';

      // Response Count
      report += `Total Questions Answered: ${Object.keys(assessment.responses).length}\n`;
      report += `Status: ${assessment.status}\n`;
      if (assessment.completedAt) {
        report += `Completed At: ${assessment.completedAt.toDate().toLocaleString()}\n`;
      }
      report += '\n';

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

  // Get all unique categories from all assessments
  const allCategoriesSet = new Set<string>();
  userAssessments.forEach(a => {
    Object.keys(a.categoryScores).forEach(cat => allCategoriesSet.add(cat));
  });
  const allCategories = Array.from(allCategoriesSet).sort();

  const stats = {
    totalAssessments: userAssessments.length,
    uniqueDevelopers: new Set(userAssessments.map(a => a.userId)).size,
    averageScore: userAssessments.length > 0
      ? (userAssessments.reduce((sum, a) => sum + a.overallScore, 0) / userAssessments.length).toFixed(1)
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
                  className="px-4 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-600"
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
                  href="/admin/score-levels"
                  className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  🎯 Score Levels
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
                    value={templateFilter}
                    onChange={(e) => setTemplateFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Assessments</option>
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
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
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
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
                        Assessment
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Overall Score
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Status
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
                          <td className="px-4 py-4 text-sm">
                            <div className="font-medium text-gray-900">
                              {assessment.assessmentName}
                            </div>
                            <div className="text-xs text-gray-500">
                              v{assessment.assessmentVersion}
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
                            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                              assessment.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {assessment.status === 'completed' ? '✅ Completed' : '🔄 In Progress'}
                            </span>
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
                      setStatusFilter('all');
                      setTemplateFilter('all');
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
