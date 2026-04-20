'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Resource, ResourceType, InlineResource } from '@/types';

interface ResourcePickerProps {
  categoryId: string; // This is actually the category name, not the ID
  selectedResources: InlineResource[];
  onResourcesChange: (resources: InlineResource[]) => void;
}

const RESOURCE_TYPES: ResourceType[] = ['article', 'video', 'course', 'docs', 'github', 'book', 'roadmap'];
const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced'] as const;

export default function ResourcePicker({ categoryId, selectedResources, onResourcesChange }: ResourcePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number>(-1);
  const [availableResources, setAvailableResources] = useState<Resource[]>([]);
  const [selectedResourceIds, setSelectedResourceIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actualCategoryId, setActualCategoryId] = useState<string>('');
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    type: 'article' as ResourceType,
    description: '',
    tags: '',
    difficulty: '' as '' | 'beginner' | 'intermediate' | 'advanced',
    duration: '',
    author: ''
  });

  useEffect(() => {
    if (categoryId) {
      mapCategoryNameToId();
    }
  }, [categoryId]);

  useEffect(() => {
    if (showPicker) {
      fetchResources();
    }
  }, [showPicker, actualCategoryId]);

  const mapCategoryNameToId = async () => {
    if (!categoryId) return;
    
    try {
      // Fetch all categories to map name to ID
      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      const category = categoriesSnapshot.docs.find(doc => doc.data().name === categoryId);
      
      if (category) {
        setActualCategoryId(category.id);
      } else {
        console.warn(`Category "${categoryId}" not found in Firestore`);
        setActualCategoryId('');
      }
    } catch (error) {
      console.error('Error mapping category name to ID:', error);
      setActualCategoryId('');
    }
  };

  const fetchResources = async () => {
    setLoading(true);
    try {
      let q;
      if (actualCategoryId) {
        // Fetch resources for specific category
        q = query(
          collection(db, 'resources'),
          where('categoryId', '==', actualCategoryId),
          orderBy('createdAt', 'desc')
        );
      } else {
        // Fetch all resources if no category selected
        q = query(
          collection(db, 'resources'),
          orderBy('createdAt', 'desc')
        );
      }
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Resource[];
      setAvailableResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFromLibrary = (resource: Resource) => {
    const inlineResource: InlineResource = {
      title: resource.title,
      url: resource.url,
      type: resource.type,
      description: resource.description
    };
    
    // Check if already added
    const alreadyExists = selectedResources.some(r => r.url === resource.url);
    if (alreadyExists) {
      alert('This resource is already added');
      return;
    }
    
    onResourcesChange([...selectedResources, inlineResource]);
  };

  const handleToggleResource = (resourceId: string) => {
    const newSelected = new Set(selectedResourceIds);
    if (newSelected.has(resourceId)) {
      newSelected.delete(resourceId);
    } else {
      newSelected.add(resourceId);
    }
    setSelectedResourceIds(newSelected);
  };

  const handleAddSelectedResources = () => {
    const resourcesToAdd = availableResources
      .filter(r => selectedResourceIds.has(r.id))
      .map(r => ({
        title: r.title,
        url: r.url,
        type: r.type,
        description: r.description
      }));
    
    onResourcesChange([...selectedResources, ...resourcesToAdd]);
    setSelectedResourceIds(new Set());
    setShowPicker(false);
  };

  const normalizeUrl = (url: string): string => {
    try {
      const urlObj = new URL(url);
      return `${urlObj.protocol}//${urlObj.hostname}${urlObj.pathname.replace(/\/$/, '')}`.toLowerCase();
    } catch {
      return url.trim().toLowerCase().replace(/\/$/, '');
    }
  };

  const handleAddNew = async () => {
    if (!formData.title.trim() || !formData.url.trim()) {
      alert('Title and URL are required');
      return;
    }

    setIsSubmitting(true);
    try {
      const normalizedUrl = normalizeUrl(formData.url.trim());
      
      // Check for duplicates in existing resources
      const existingResourcesSnapshot = await getDocs(collection(db, 'resources'));
      const isDuplicate = existingResourcesSnapshot.docs.some(doc => {
        const existingUrl = doc.data().url;
        return normalizeUrl(existingUrl) === normalizedUrl;
      });
      
      if (isDuplicate) {
        alert('A resource with this URL already exists in the library. Please use "Pick from Library" to select it.');
        setIsSubmitting(false);
        return;
      }
      
      // Check if already in selected resources
      const alreadySelected = selectedResources.some(r => normalizeUrl(r.url) === normalizedUrl);
      if (alreadySelected) {
        alert('This resource is already added to this question.');
        setIsSubmitting(false);
        return;
      }
      
      // Add to resources collection - only include fields with values
      const resourceData: any = {
        title: formData.title.trim(),
        url: formData.url.trim(),
        type: formData.type,
        categoryId: actualCategoryId,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };
      
      // Only add optional fields if they have values
      if (formData.description.trim()) {
        resourceData.description = formData.description.trim();
      }
      if (formData.tags.trim()) {
        resourceData.tags = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
      }
      if (formData.difficulty) {
        resourceData.difficulty = formData.difficulty;
      }
      if (formData.duration.trim()) {
        resourceData.duration = formData.duration.trim();
      }
      if (formData.author.trim()) {
        resourceData.author = formData.author.trim();
      }
      
      await addDoc(collection(db, 'resources'), resourceData);

      // Add to selected resources
      const inlineResource: InlineResource = {
        title: formData.title.trim(),
        url: formData.url.trim(),
        type: formData.type,
        description: formData.description.trim()
      };
      
      onResourcesChange([...selectedResources, inlineResource]);

      // Reset and close
      setFormData({
        title: '',
        url: '',
        type: 'article',
        description: '',
        tags: '',
        difficulty: '',
        duration: '',
        author: ''
      });
      setShowAddModal(false);
      
      // Refresh available resources
      fetchResources();
    } catch (error) {
      console.error('Error adding resource:', error);
      alert('Failed to add resource');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveResource = (index: number) => {
    const newResources = selectedResources.filter((_, i) => i !== index);
    onResourcesChange(newResources);
  };

  const handleEdit = (index: number) => {
    const resource = selectedResources[index];
    setEditingIndex(index);
    setFormData({
      title: resource.title,
      url: resource.url,
      type: resource.type,
      description: resource.description || '',
      tags: '',
      difficulty: '',
      duration: '',
      author: ''
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!formData.title.trim() || !formData.url.trim()) {
      alert('Title and URL are required');
      return;
    }

    const updatedResource: InlineResource = {
      title: formData.title.trim(),
      url: formData.url.trim(),
      type: formData.type,
      description: formData.description.trim()
    };

    const newResources = [...selectedResources];
    newResources[editingIndex] = updatedResource;
    onResourcesChange(newResources);

    setShowEditModal(false);
    setEditingIndex(-1);
    setFormData({
      title: '',
      url: '',
      type: 'article',
      description: '',
      tags: '',
      difficulty: '',
      duration: '',
      author: ''
    });
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
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const filteredResources = availableResources.filter(resource => {
    // Filter out already selected resources
    const isAlreadySelected = selectedResources.some(r => r.url === resource.url);
    if (isAlreadySelected) return false;
    
    // Filter by search query
    return searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-3">
      {/* Selected Resources */}
      <div className="space-y-2">
        {selectedResources.map((resource, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-0.5 text-xs font-medium rounded ${getTypeColor(resource.type)}`}>
                  {resource.type}
                </span>
                <h4 className="text-sm font-medium text-gray-900 truncate">{resource.title}</h4>
              </div>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 hover:underline truncate block"
              >
                {resource.url}
              </a>
              {resource.description && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{resource.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleEdit(index)}
                className="text-blue-600 hover:text-blue-700 text-sm"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleRemoveResource(index)}
                className="text-red-600 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Resource Buttons */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setShowPicker(true)}
          className="px-4 py-2 text-sm bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          📚 Pick from Library
        </button>
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          disabled={!actualCategoryId}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Add New Resource
        </button>
      </div>

      {!actualCategoryId && categoryId && (
        <p className="text-sm text-amber-600">⏳ Loading category...</p>
      )}
      {!categoryId && (
        <p className="text-sm text-amber-600">Please select a category to add new resources</p>
      )}

      {/* Resource Library Picker Modal */}
      {showPicker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Select from Resource Library</h3>
              <button
                onClick={() => setShowPicker(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-6 py-3 border-b border-gray-200">
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {loading ? (
                <div className="text-center py-8 text-gray-600">Loading resources...</div>
              ) : filteredResources.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-2">No resources found in this category</p>
                  <button
                    onClick={() => {
                      setShowPicker(false);
                      setShowAddModal(true);
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    Add a new resource
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredResources.map((resource) => (
                    <div
                      key={resource.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedResourceIds.has(resource.id)}
                          onChange={() => handleToggleResource(resource.id)}
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`px-2 py-0.5 text-xs font-medium rounded ${getTypeColor(resource.type)}`}>
                              {resource.type}
                            </span>
                            <h4 className="text-sm font-medium text-gray-900">{resource.title}</h4>
                          </div>
                          {resource.description && (
                            <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                          )}
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline truncate block"
                          >
                            {resource.url}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {selectedResourceIds.size > 0 && `${selectedResourceIds.size} selected`}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setShowPicker(false);
                    setSelectedResourceIds(new Set());
                  }}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {selectedResourceIds.size > 0 && (
                  <button
                    onClick={handleAddSelectedResources}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Selected ({selectedResourceIds.size})
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New Resource</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Resource title"
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
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description..."
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

              <p className="text-sm text-gray-500">
                This resource will be saved to the library and added to this question.
              </p>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleAddNew}
                disabled={isSubmitting}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Adding...' : 'Add Resource'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Resource Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Edit Resource</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingIndex(-1);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Resource title"
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
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description..."
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
https://support.google.com/accounts?hl=en-GB&p=account_iph
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

            <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingIndex(-1);
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
