'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Resource, ResourceType } from '@/types';
import { extractQuestionResources } from '@/lib/extractQuestionResources';
import { clearResourceCache } from '@/lib/getQuestionResources';

interface Category {
  id: string;
  name: string;
}

const RESOURCE_TYPES: ResourceType[] = ['article', 'video', 'course', 'docs', 'github', 'book', 'roadmap'];
const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced'] as const;

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    type: 'article' as ResourceType,
    description: '',
    categoryId: '',
    tags: '',
    difficulty: '' as '' | 'beginner' | 'intermediate' | 'advanced',
    duration: '',
    author: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [resourcesSnapshot, categoriesSnapshot] = await Promise.all([
        getDocs(query(collection(db, 'resources'), orderBy('createdAt', 'desc'))),
        getDocs(query(collection(db, 'categories'), orderBy('order', 'asc')))
      ]);

      const resourcesData = resourcesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Resource[];
      
      const categoriesData = categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      })) as Category[];

      setResources(resourcesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingResource(null);
    setFormData({
      title: '',
      url: '',
      type: 'article',
      description: '',
      categoryId: categories.length > 0 ? categories[0].id : '',
      tags: '',
      difficulty: '',
      duration: '',
      author: ''
    });
    setShowModal(true);
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title,
      url: resource.url,
      type: resource.type,
      description: resource.description || '',
      categoryId: resource.categoryId,
      tags: resource.tags?.join(', ') || '',
      difficulty: resource.difficulty || '',
      duration: resource.duration || '',
      author: resource.author || ''
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      alert('Resource title is required');
      return;
    }
    if (!formData.url.trim()) {
      alert('Resource URL is required');
      return;
    }
    if (!formData.categoryId) {
      alert('Please select a category');
      return;
    }

    setIsSubmitting(true);
    try {
      const normalizedUrl = normalizeUrl(formData.url.trim());
      
      // Check for duplicate URL (skip check if editing the same resource)
      const duplicateResource = resources.find(r => {
        const isDifferentResource = !editingResource || r.id !== editingResource.id;
        return isDifferentResource && normalizeUrl(r.url) === normalizedUrl;
      });
      
      if (duplicateResource) {
        alert(`A resource with this URL already exists:\n"${duplicateResource.title}"\n\nPlease use a different URL or edit the existing resource.`);
        setIsSubmitting(false);
        return;
      }

      const resourceData: any = {
        title: formData.title.trim(),
        url: formData.url.trim(),
        type: formData.type,
        categoryId: formData.categoryId,
        description: formData.description.trim() || undefined,
        tags: formData.tags.trim() ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : undefined,
        difficulty: formData.difficulty || undefined,
        duration: formData.duration.trim() || undefined,
        author: formData.author.trim() || undefined,
        updatedAt: Timestamp.now()
      };

      if (editingResource) {
        // Update existing resource
        await updateDoc(doc(db, 'resources', editingResource.id), resourceData);
      } else {
        // Add new resource
        resourceData.createdAt = Timestamp.now();
        await addDoc(collection(db, 'resources'), resourceData);
      }

      setShowModal(false);
      clearResourceCache(); // Clear cache so changes are reflected immediately
      fetchData();
    } catch (error) {
      console.error('Error saving resource:', error);
      alert('Failed to save resource');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (resource: Resource) => {
    if (!confirm(`Are you sure you want to delete "${resource.title}"? This action cannot be undone. This will also remove this resource from all questions that reference it.`)) {
      return;
    }

    try {
      // Delete the resource from the resources collection
      await deleteDoc(doc(db, 'resources', resource.id));
      
      // Remove this resource from all questions that reference it
      await removeResourceFromQuestions(resource.url);
      
      clearResourceCache(); // Clear cache after deletion
      fetchData();
      alert('Resource deleted successfully and removed from all questions.');
    } catch (error) {
      console.error('Error deleting resource:', error);
      alert('Failed to delete resource');
    }
  };

  const removeResourceFromQuestions = async (resourceUrl: string) => {
    try {
      // Get all questions from Firestore
      const questionsSnapshot = await getDocs(collection(db, 'questions'));
      
      let updatedCount = 0;
      
      // Check each question for the resource
      for (const questionDoc of questionsSnapshot.docs) {
        const questionData = questionDoc.data();
        const options = questionData.options || [];
        
        let questionModified = false;
        const updatedOptions = options.map((option: any) => {
          const resources = option.resources || [];
          const filteredResources = resources.filter((r: any) => r.url !== resourceUrl);
          
          // Check if any resources were removed
          if (filteredResources.length !== resources.length) {
            questionModified = true;
            return { ...option, resources: filteredResources };
          }
          return option;
        });
        
        // Update the question if it was modified
        if (questionModified) {
          await updateDoc(doc(db, 'questions', questionDoc.id), {
            options: updatedOptions,
            updatedAt: Timestamp.now()
          });
          updatedCount++;
        }
      }
      
      if (updatedCount > 0) {
        console.log(`Resource removed from ${updatedCount} question(s)`);
      }
    } catch (error) {
      console.error('Error removing resource from questions:', error);
      throw error;
    }
  };

  const normalizeUrl = (url: string): string => {
    // Remove trailing slashes, query params (optional), and fragments
    // Convert to lowercase for comparison
    try {
      const urlObj = new URL(url);
      // Keep protocol, hostname, and pathname, normalize by removing trailing slash
      return `${urlObj.protocol}//${urlObj.hostname}${urlObj.pathname.replace(/\/$/, '')}`.toLowerCase();
    } catch {
      // If URL parsing fails, just normalize the string
      return url.trim().toLowerCase().replace(/\/$/, '');
    }
  };

  const handleSyncQuestionResources = async () => {
    if (!confirm('This will sync all resources from questions to Firestore. Resources with the same URL will not be duplicated. Continue?')) {
      return;
    }

    setIsSyncing(true);
    try {
      // Extract resources from questions
      const questionResources = extractQuestionResources();
      
      // Get ALL existing resources from Firestore (not just from state)
      const existingResourcesSnapshot = await getDocs(collection(db, 'resources'));
      const existingUrls = new Map<string, string>(); // normalized URL -> original URL
      
      existingResourcesSnapshot.docs.forEach(doc => {
        const url = doc.data().url;
        const normalized = normalizeUrl(url);
        existingUrls.set(normalized, url);
      });
      
      // Create a map of category names to IDs
      const categoryMap = new Map(categories.map(c => [c.name.toLowerCase(), c.id]));
      
      let addedCount = 0;
      let skippedCount = 0;
      const skippedDetails: string[] = [];

      for (const qr of questionResources) {
        const normalizedUrl = normalizeUrl(qr.url);
        
        // Skip if URL already exists (check normalized version)
        if (existingUrls.has(normalizedUrl)) {
          skippedCount++;
          skippedDetails.push(`Duplicate: ${qr.title} (${qr.url})`);
          continue;
        }

        // Find matching category ID (case-insensitive)
        const categoryId = categoryMap.get(qr.questionCategory.toLowerCase());
        
        if (!categoryId) {
          console.warn(`No matching category found for "${qr.questionCategory}", skipping resource: ${qr.title}`);
          skippedCount++;
          skippedDetails.push(`No category: ${qr.title} (category: ${qr.questionCategory})`);
          continue;
        }

        // Add resource to Firestore
        const resourceData = {
          title: qr.title,
          url: qr.url,
          type: qr.type || 'article',
          description: qr.description || `From ${qr.questionTitle} - ${qr.optionLabel || 'option'}`,
          categoryId: categoryId,
          tags: [],
          createdAt: Timestamp.now()
        };

        await addDoc(collection(db, 'resources'), resourceData);
        // Add to our tracking map to prevent duplicates within same sync
        existingUrls.set(normalizedUrl, qr.url);
        addedCount++;
      }

      // Show detailed results
      let message = `Sync complete!\n✅ Added: ${addedCount}\n⏭️ Skipped: ${skippedCount}`;
      
      if (skippedDetails.length > 0 && skippedDetails.length <= 10) {
        message += '\n\nSkipped resources:\n' + skippedDetails.slice(0, 10).join('\n');
      } else if (skippedDetails.length > 10) {
        message += `\n\nFirst 10 skipped:\n${skippedDetails.slice(0, 10).join('\n')}\n... and ${skippedDetails.length - 10} more`;
      }
      
      alert(message);
      clearResourceCache(); // Clear cache after sync
      fetchData();
    } catch (error) {
      console.error('Error syncing resources:', error);
      alert('Failed to sync resources. Check console for details.');
    } finally {
      setIsSyncing(false);
    }
  };

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.categoryId === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedResources = filteredResources.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  const getTypeColor = (type: ResourceType) => {
    const colors: Record<ResourceType, string> = {
      article: 'bg-blue-100 !text-blue-700',
      video: 'bg-red-100 !text-red-700',
      course: 'bg-green-100 !text-green-700',
      docs: 'bg-purple-100 !text-purple-700',
      github: 'bg-gray-800 !text-white',
      book: 'bg-amber-100 !text-amber-700',
      roadmap: 'bg-pink-100 !text-pink-700'
    };
    return colors[type] || 'bg-gray-100 !text-gray-700';
  };

  const getDifficultyColor = (difficulty?: string) => {
    const colors = {
      beginner: 'bg-green-50 !text-green-700 border-green-200',
      intermediate: 'bg-yellow-50 !text-yellow-700 border-yellow-200',
      advanced: 'bg-red-50 !text-red-700 border-red-200'
    };
    return difficulty ? colors[difficulty as keyof typeof colors] : '';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Loading resources...</div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Resources</h1>
        <p className="text-gray-600">Manage learning resources for assessment questions</p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search resources by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        {/* <button
          onClick={handleSyncQuestionResources}
          disabled={isSyncing}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isSyncing ? 'Syncing...' : '⬇ Sync from Questions'}
        </button> */}
        <button
          onClick={handleAdd}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          + Add Resource
        </button>
      </div>

      {/* Resources Table */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No resources found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchQuery || selectedCategory !== 'all' 
              ? 'Try adjusting your filters'
              : 'Get started by creating your first resource'
            }
          </p>
          {!searchQuery && selectedCategory === 'all' && (
            <button
              onClick={handleAdd}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Create First Resource
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Difficulty
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tags
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedResources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                        >
                          {resource.title}
                        </a>
                        {resource.description && (
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{resource.description}</p>
                        )}
                        {resource.author && (
                          <p className="text-xs text-gray-400 mt-1">By {resource.author}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getTypeColor(resource.type)}`}>
                        {resource.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{getCategoryName(resource.categoryId)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {resource.difficulty ? (
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded border ${getDifficultyColor(resource.difficulty)}`}>
                          {resource.difficulty}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{resource.duration || '-'}</span>
                    </td>
                    <td className="px-6 py-4">
                      {resource.tags && resource.tags.length > 0 ? (
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {resource.tags.map((tag, idx) => (
                            <span key={idx} className="inline-flex px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(resource)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(resource)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {filteredResources.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, filteredResources.length)}</span> of{' '}
                  <span className="font-medium">{filteredResources.length}</span> resources
                </div>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                  <option value={100}>100 per page</option>
                </select>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <div className="flex items-center gap-2 px-4">
                  <span className="text-sm text-gray-700">
                    Page <span className="font-medium">{currentPage}</span> of{' '}
                    <span className="font-medium">{totalPages}</span>
                  </span>
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingResource ? 'Edit Resource' : 'Add New Resource'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              {/* Required Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Introduction to React Hooks"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/resource"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as ResourceType })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {RESOURCE_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the resource..."
                />
              </div>

              {/* Optional Metadata */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Optional Metadata</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Not specified</option>
                      {DIFFICULTY_LEVELS.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., 10 min, 2 hours, 4 weeks"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., Dan Abramov, MDN Web Docs"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., react, hooks, state management (comma-separated)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate tags with commas</p>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-200">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : editingResource ? 'Update Resource' : 'Add Resource'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
