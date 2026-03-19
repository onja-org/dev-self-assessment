'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AssessmentTemplate, UserAssessment } from '@/types';
import Link from 'next/link';

export default function AssessmentsPage() {
  return (
    <ProtectedRoute requiredRole="developer">
      <AssessmentsContent />
    </ProtectedRoute>
  );
}

function AssessmentsContent() {
  const { userProfile, signOut } = useAuth();
  const router = useRouter();
  const [templates, setTemplates] = useState<AssessmentTemplate[]>([]);
  const [userAssessments, setUserAssessments] = useState<UserAssessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!userProfile) return;

      try {
        setLoading(true);
        setError(null);

        // Fetch all active assessment templates
        const templatesQuery = query(
          collection(db, 'assessmentTemplates'),
          where('isActive', '==', true),
          orderBy('createdAt', 'desc')
        );
        const templatesSnapshot = await getDocs(templatesQuery);
        const fetchedTemplates = templatesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as AssessmentTemplate[];

        // Fetch user's completed assessments
        const userAssessmentsQuery = query(
          collection(db, 'userAssessments'),
          where('userId', '==', userProfile.uid),
          orderBy('createdAt', 'desc')
        );
        const userAssessmentsSnapshot = await getDocs(userAssessmentsQuery);
        const fetchedUserAssessments = userAssessmentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as UserAssessment[];

        setTemplates(fetchedTemplates);
        setUserAssessments(fetchedUserAssessments);
      } catch (err: any) {
        console.error('Error fetching assessments:', err);
        setError(err.message || 'Failed to load assessments');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userProfile]);

  const getAssessmentStatus = (templateId: string): 'completed' | 'in-progress' | 'not-taken' => {
    const userAssessment = userAssessments.find(
      ua => ua.assessmentTemplateId === templateId
    );
    
    if (!userAssessment) return 'not-taken';
    return userAssessment.status === 'completed' ? 'completed' : 'in-progress';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅';
      case 'in-progress':
        return '🔄';
      case 'not-taken':
        return '⏳';
      default:
        return '';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in-progress':
        return 'In Progress';
      case 'not-taken':
        return 'Not Taken';
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'in-progress':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'not-taken':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return '';
    }
  };

  const handleAssessmentClick = (template: AssessmentTemplate) => {
    const status = getAssessmentStatus(template.id);
    
    if (status === 'completed') {
      // Navigate to results page
      const userAssessment = userAssessments.find(
        ua => ua.assessmentTemplateId === template.id && ua.status === 'completed'
      );
      if (userAssessment) {
        router.push(`/assessment/result?id=${userAssessment.id}`);
      }
    } else {
      // Navigate to the assessment page (for both in-progress and not-taken)
      router.push(`/assessments/${template.id}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading assessments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-red-600 text-center">
            <p className="text-lg font-semibold mb-2">Error</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Developer Self-Assessment</h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, <span className="font-semibold">{userProfile?.name}</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              {userProfile?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Admin Panel
                </Link>
              )}
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Assessments</h2>
          <p className="text-gray-600">
            Select an assessment to start or view your results
          </p>
        </div>

        {templates.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Assessments Available
            </h3>
            <p className="text-gray-600 mb-6">
              There are no active assessments at the moment. Please check back later.
            </p>
            {userProfile?.role === 'admin' && (
              <Link
                href="/admin/assessments"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Assessment
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map(template => {
              const status = getAssessmentStatus(template.id);
              const userAssessment = userAssessments.find(
                ua => ua.assessmentTemplateId === template.id
              );
              
              return (
                <div
                  key={template.id}
                  onClick={() => handleAssessmentClick(template)}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-blue-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {template.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Version: {template.version}
                        </p>
                      </div>
                      <div className="text-3xl ml-2">
                        {getStatusIcon(status)}
                      </div>
                    </div>

                    {template.description && (
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {template.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
                          {getStatusText(status)}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Questions</p>
                        <p className="text-lg font-semibold text-gray-900">
                          {template.questions?.length || 0}
                        </p>
                      </div>
                    </div>

                    {status === 'completed' && userAssessment?.completedAt && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-500">Completed on</p>
                        <p className="text-sm font-medium text-gray-700">
                          {userAssessment.completedAt.toDate().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-blue-600">
                      {status === 'completed' ? 'View Results →' : status === 'in-progress' ? 'Continue →' : 'Start Assessment →'}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* History Section */}
        {userAssessments.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Assessment History</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Assessment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Version
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userAssessments.map(assessment => (
                    <tr key={assessment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {assessment.assessmentName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {assessment.assessmentVersion}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assessment.status)}`}>
                          {getStatusText(assessment.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {assessment.status === 'completed' 
                            ? `${Math.round(assessment.overallScore)}%` 
                            : '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {assessment.createdAt.toDate().toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {assessment.status === 'completed' ? (
                          <Link
                            href={`/assessment/result?id=${assessment.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View Results
                          </Link>
                        ) : (
                          <Link
                            href={`/assessments/${assessment.assessmentTemplateId}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Continue
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
