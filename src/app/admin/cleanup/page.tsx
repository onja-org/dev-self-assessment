'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Resource } from '@/types';
import { QUESTIONS } from '@/lib/constants';

// URLs and domains that indicate paid resources
const PAID_INDICATORS = [
  'udemy.com',
  'coursera.org',
  'linkedin.com/learning',
  'pluralsight.com',
  'educative.io',
  'frontend-masters',
  'egghead.io',
  'levelup',
  'packtpub.com',
  'oreilly.com',
  'amazon.com/learning',
  'amazon.com',
  '/pro', // Pro subscriptions
  '/premium',
  '/subscribe',
];

// Patterns that indicate broken/not found resources
const BROKEN_INDICATORS = [
  'not found',
  'couldn\'t find',
  'could not find',
  'page not found',
  '404',
  'does not exist',
  'no longer available',
  'has been removed',
  'link broken',
  'dead link',
  'unavailable',
  'deprecated',
  'removed',
  'oops',
  'go to home'
];

export default function ResourceCleanupPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResources, setSelectedResources] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'paid' | 'broken' | 'issues' | 'selected'>('all');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'resources'));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Resource[];
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const isPaidResource = (url: string): boolean => {
    const lowerUrl = url.toLowerCase();
    return PAID_INDICATORS.some(indicator => lowerUrl.includes(indicator));
  };

  const isBrokenResource = (resource: Resource): boolean => {
    const searchText = `${resource.title} ${resource.description || ''} ${resource.url}`.toLowerCase();
    return BROKEN_INDICATORS.some(indicator => searchText.includes(indicator.toLowerCase()));
  };

  const toggleResource = (id: string) => {
    const newSelected = new Set(selectedResources);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedResources(newSelected);
  };

  const selectAllPaid = () => {
    const paidIds = resources
      .filter(r => isPaidResource(r.url))
      .map(r => r.id);
    setSelectedResources(new Set(paidIds));
  };

  const selectAllBroken = () => {
    const brokenIds = resources
      .filter(r => isBrokenResource(r))
      .map(r => r.id);
    setSelectedResources(new Set(brokenIds));
  };

  const selectAllIssues = () => {
    const issueIds = resources
      .filter(r => isPaidResource(r.url) || isBrokenResource(r))
      .map(r => r.id);
    setSelectedResources(new Set(issueIds));
  };

  const clearSelection = () => {
    setSelectedResources(new Set());
  };

  const handleDelete = async () => {
    if (selectedResources.size === 0) {
      alert('No resources selected');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedResources.size} resources? This cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    try {
      let successCount = 0;
      for (const id of selectedResources) {
        try {
          await deleteDoc(doc(db, 'resources', id));
          successCount++;
        } catch (error) {
          console.error(`Failed to delete resource ${id}:`, error);
        }
      }

      alert(`Successfully deleted ${successCount} of ${selectedResources.size} resources`);
      setSelectedResources(new Set());
      fetchResources();
    } catch (error) {
      console.error('Error during bulk delete:', error);
      alert('Failed to delete resources');
    } finally {
      setDeleting(false);
    }
  };

  const filteredResources = resources.filter(r => {
    if (filterType === 'paid') return isPaidResource(r.url);
    if (filterType === 'broken') return isBrokenResource(r);
    if (filterType === 'issues') return isPaidResource(r.url) || isBrokenResource(r);
    if (filterType === 'selected') return selectedResources.has(r.id);
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Loading resources...</div>
        </div>
      </div>
    );
  }

  const paidCount = resources.filter(r => isPaidResource(r.url)).length;
  const brokenCount = resources.filter(r => isBrokenResource(r)).length;
  const totalIssues = resources.filter(r => isPaidResource(r.url) || isBrokenResource(r)).length;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resource Cleanup</h1>
        <p className="text-gray-600">Identify and remove paid or broken resources</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">{resources.length}</div>
          <div className="text-sm text-blue-800">Total Resources</div>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-600">{paidCount}</div>
          <div className="text-sm text-red-800">Paid Resources</div>
        </div>
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-orange-600">{brokenCount}</div>
          <div className="text-sm text-orange-800">Broken Links</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">{selectedResources.size}</div>
          <div className="text-sm text-purple-800">Selected</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{resources.length - totalIssues}</div>
          <div className="text-sm text-green-800">Good Resources</div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Filter:</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">All Resources</option>
              <option value="paid">Paid Resources Only</option>
              <option value="broken">Broken Links Only</option>
              <option value="issues">All Issues (Paid + Broken)</option>
              <option value="selected">Selected Only</option>
            </select>
          </div>

          <button
            onClick={selectAllPaid}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
          >
            💰 Select Paid ({paidCount})
          </button>

          <button
            onClick={selectAllBroken}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm"
          >
            🔗 Select Broken ({brokenCount})
          </button>

          <button
            onClick={selectAllIssues}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm"
          >
            ⚠️ Select All Issues ({totalIssues})
          </button>

          <button
            onClick={clearSelection}
            disabled={selectedResources.size === 0}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm disabled:opacity-50"
          >
            Clear Selection
          </button>

          <button
            onClick={handleDelete}
            disabled={selectedResources.size === 0 || deleting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm disabled:opacity-50 ml-auto"
          >
            {deleting ? 'Deleting...' : `Delete Selected (${selectedResources.size})`}
          </button>
        </div>
      </div>

      {/* Warning */}
      {totalIssues > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Issues Detected</h3>
              <div className="mt-1 text-sm text-yellow-700">
                {paidCount > 0 && <p>💰 {paidCount} paid resources detected</p>}
                {brokenCount > 0 && <p>🔗 {brokenCount} broken/not found links detected</p>}
                <p className="mt-1">Consider removing or replacing these resources with free, working alternatives.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Resources List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  <input
                    type="checkbox"
                    checked={filteredResources.length > 0 && filteredResources.every(r => selectedResources.has(r.id))}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedResources(new Set(filteredResources.map(r => r.id)));
                      } else {
                        clearSelection();
                      }
                    }}
                    className="rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResources.map((resource) => {
                const isPaid = isPaidResource(resource.url);
                const isBroken = isBrokenResource(resource);
                return (
                  <tr key={resource.id} className={selectedResources.has(resource.id) ? 'bg-blue-50' : ''}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedResources.has(resource.id)}
                        onChange={() => toggleResource(resource.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {isPaid && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded">
                            💰 Paid
                          </span>
                        )}
                        {isBroken && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded">
                            🔗 Broken
                          </span>
                        )}
                        {!isPaid && !isBroken && (
                          <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-700 rounded">
                            ✅ Good
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{resource.title}</div>
                      {resource.description && (
                        <div className="text-xs text-gray-500 mt-1">{resource.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline truncate block max-w-md"
                      >
                        {resource.url}
                      </a>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{resource.type}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No resources match the current filter
        </div>
      )}
    </main>
  );
}
