'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, updateDoc, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';

interface User {
  uid: string;
  name: string;
  email: string;
  role: 'developer' | 'admin';
  createdAt: any;
}

export default function UsersPage() {
  const { userProfile, signOut } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [adminIds, setAdminIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile && userProfile.role !== 'admin') {
      router.push('/assessments');
    }
  }, [userProfile, router]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch all users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const fetchedUsers = usersSnapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      })) as User[];

      // Fetch all admin IDs
      const adminsSnapshot = await getDocs(collection(db, 'admins'));
      const adminIdsSet = new Set(adminsSnapshot.docs.map(doc => doc.id));

      setUsers(fetchedUsers);
      setAdminIds(adminIdsSet);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminRole = async (user: User) => {
    if (user.uid === userProfile?.uid) {
      alert('You cannot change your own admin status');
      return;
    }

    const isCurrentlyAdmin = adminIds.has(user.uid);
    const action = isCurrentlyAdmin ? 'remove admin access from' : 'grant admin access to';
    
    if (!confirm(`Are you sure you want to ${action} ${user.name}?`)) {
      return;
    }

    setUpdatingUser(user.uid);
    try {
      if (isCurrentlyAdmin) {
        // Remove admin
        await deleteDoc(doc(db, 'admins', user.uid));
        await updateDoc(doc(db, 'users', user.uid), {
          role: 'developer'
        });
        
        const newAdminIds = new Set(adminIds);
        newAdminIds.delete(user.uid);
        setAdminIds(newAdminIds);
        
        // Update local users list
        setUsers(users.map(u => 
          u.uid === user.uid ? { ...u, role: 'developer' } : u
        ));
      } else {
        // Add admin
        await setDoc(doc(db, 'admins', user.uid), {
          uid: user.uid,
          name: user.name,
          email: user.email
        });
        await updateDoc(doc(db, 'users', user.uid), {
          role: 'admin'
        });
        
        const newAdminIds = new Set(adminIds);
        newAdminIds.add(user.uid);
        setAdminIds(newAdminIds);
        
        // Update local users list
        setUsers(users.map(u => 
          u.uid === user.uid ? { ...u, role: 'admin' } : u
        ));
      }
      
      alert(`Successfully ${isCurrentlyAdmin ? 'removed admin access from' : 'granted admin access to'} ${user.name}.\n\n⚠️ Note: ${user.name} will need to log out and log back in for the changes to take effect.`);
    } catch (error) {
      console.error('Error updating user role:', error);
      alert('Failed to update user role. Please try again.');
    } finally {
      setUpdatingUser(null);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
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
                  <Link
                  href="/admin/users"
                  className="px-4 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-600"
                >
                  👥 Users
                </Link>
              </nav>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading users...</span>
              </div>
            ) : (
              <>
                {/* Header Section */}
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                  <p className="mt-2 text-gray-600">
                    Manage user roles and permissions
                  </p>
                </div>

                {/* Info Banner */}
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 text-xl">ℹ️</span>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-blue-900 mb-1">Important Note</h3>
                      <p className="text-sm text-blue-800">
                        When you grant or remove admin access, the affected user must <strong>log out and log back in</strong> for the changes to take effect. Their session will continue using their old permissions until they re-authenticate.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                        <span className="text-2xl">👥</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">{users.length}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
                        <span className="text-2xl">👑</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Admins</p>
                        <p className="text-2xl font-bold text-gray-900">{adminIds.size}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                        <span className="text-2xl">💻</span>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Developers</p>
                        <p className="text-2xl font-bold text-gray-900">{users.length - adminIds.size}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Users List */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  {users.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="mb-4">
                        <span className="text-6xl">👤</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Users Yet</h3>
                      <p className="text-gray-500">Users will appear here once they register</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              User
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Role
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Joined
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {users.map((user) => {
                            const isAdmin = adminIds.has(user.uid);
                            const isCurrentUser = user.uid === userProfile?.uid;
                            const isUpdating = updatingUser === user.uid;
                            
                            return (
                              <tr key={user.uid} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                      <span className="text-lg font-semibold text-blue-600">
                                        {user.name.charAt(0).toUpperCase()}
                                      </span>
                                    </div>
                                    <div className="ml-4">
                                      <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                        {user.name}
                                        {isCurrentUser && (
                                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">You</span>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    isAdmin
                                      ? 'bg-purple-100 text-purple-800'
                                      : 'bg-green-100 text-green-800'
                                  }`}>
                                    {isAdmin ? '👑 Admin' : '💻 Developer'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {user.createdAt?.toDate?.()?.toLocaleDateString() || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <button
                                    onClick={() => toggleAdminRole(user)}
                                    disabled={isCurrentUser || isUpdating}
                                    className={`px-4 py-2 rounded-lg font-medium transition ${
                                      isCurrentUser
                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        : isAdmin
                                        ? 'bg-red-600 text-white hover:bg-red-700'
                                        : 'bg-purple-600 text-white hover:bg-purple-700'
                                    } disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ml-auto`}
                                  >
                                    {isUpdating && (
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    )}
                                    {isCurrentUser
                                      ? 'Cannot modify self'
                                      : isUpdating
                                      ? 'Updating...'
                                      : isAdmin
                                      ? 'Remove Admin'
                                      : 'Make Admin'
                                    }
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
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
