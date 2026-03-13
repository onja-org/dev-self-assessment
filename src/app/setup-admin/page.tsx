'use client';

import { useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';

export default function SetupAdminPage() {
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const setupAdmin = async () => {
    setLoading(true);
    setStatus('Setting up admin access...');

    try {
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        setStatus('❌ Error: No user logged in. Please sign in first.');
        setLoading(false);
        return;
      }

      const userId = currentUser.uid;
      const userEmail = currentUser.email || '';

      // Step 1: Check current user document
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        setStatus(`❌ Error: User profile not found. Please sign in through the register page first.`);
        setLoading(false);
        return;
      }

      const userData = userDoc.data();
      setStatus(`✓ Found user: ${userData.name} (${userEmail})\n`);

      // Step 2: Update user role to admin
      await setDoc(userDocRef, { role: 'admin' }, { merge: true });
      setStatus(prev => prev + '✓ Updated user role to admin\n');

      // Step 3: Create admin document
      const adminDocRef = doc(db, 'admins', userId);
      await setDoc(adminDocRef, {
        uid: userId,
        name: userData.name,
        email: userEmail,
        createdAt: new Date(),
      });
      setStatus(prev => prev + '✓ Created admin document in Firestore\n');

      // Step 4: Verify admin access
      const adminDoc = await getDoc(adminDocRef);
      if (adminDoc.exists()) {
        setStatus(prev => prev + '\n✅ SUCCESS! Admin access configured.\n\n');
        setStatus(prev => prev + '⚠️ IMPORTANT: Please refresh the page or sign out and sign back in for changes to take effect.');
      } else {
        setStatus(prev => prev + '\n❌ Error: Admin document creation failed. Please try again.');
      }

    } catch (error: any) {
      console.error('Error setting up admin:', error);
      setStatus(`❌ Error: ${error.message}\n\nIf you see a permissions error, you may need to update your Firestore security rules.`);
    } finally {
      setLoading(false);
    }
  };

  const reloadPage = () => {
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          🔧 Admin Access Setup
        </h1>
        <p className="text-gray-800 mb-6">
          This page will configure admin access for your current account by:
        </p>
        <ul className="list-disc list-inside text-gray-800 mb-6 space-y-2">
          <li>Updating your user role to 'admin'</li>
          <li>Creating an admin document in Firestore (required by security rules)</li>
          <li>Verifying admin access is properly configured</li>
        </ul>

        {!status && (
          <button
            onClick={setupAdmin}
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Setting up...' : 'Setup Admin Access'}
          </button>
        )}

        {status && (
          <div className="mt-6">
            <div className="bg-gray-100 rounded-lg p-4 mb-4">
              <pre className="whitespace-pre-wrap text-sm font-mono text-gray-900 font-medium">
                {status}
              </pre>
            </div>
            {status.includes('SUCCESS') && (
              <button
                onClick={reloadPage}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Go to Dashboard
              </button>
            )}
            {!status.includes('SUCCESS') && (
              <button
                onClick={() => {
                  setStatus('');
                  setLoading(false);
                }}
                className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition"
              >
                Try Again
              </button>
            )}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">
            Troubleshooting:
          </h3>
          <ul className="text-sm text-gray-800 space-y-1">
            <li>• Make sure you're signed in</li>
            <li>• Check browser console for detailed errors</li>
            <li>• Verify Firestore security rules allow admin document creation</li>
            <li>• After setup, refresh the page or sign out/in</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
