'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/assessments');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl">
            Developer
            <span className="text-blue-600"> Self-Assessment</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
            Track your skills, identify growth areas, and accelerate your development career with personalized insights and actionable roadmaps.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/login"
              className="px-10 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Get Started with Google
            </Link>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Comprehensive Assessment
            </h3>
            <p className="text-gray-600">
              Answer 10 carefully crafted questions covering technical skills, problem-solving, collaboration, and more.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Personalized Roadmap
            </h3>
            <p className="text-gray-600">
              Receive custom 90-day action plans and 12-month roadmaps tailored to your current skill level.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-blue-600 text-3xl mb-4">📈</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Track Progress
            </h3>
            <p className="text-gray-600">
              Monitor your growth over time with historical assessments and visualize your improvement.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Sign in with Google</h4>
                <p className="text-gray-600">Quick and secure authentication with your Google account</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Complete the assessment</h4>
                <p className="text-gray-600">Answer questions honestly about your skills and experience</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Get instant insights</h4>
                <p className="text-gray-600">Receive detailed scores, recommendations, and growth plans</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4">
                4
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Track your journey</h4>
                <p className="text-gray-600">Return regularly to measure progress and update your goals</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
