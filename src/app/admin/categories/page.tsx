'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface Category {
  id: string;
  name: string;
  description?: string;
  order: number;
  createdAt: any;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    order: 0
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const q = query(collection(db, 'categories'), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      order: categories.length
    });
    setShowAddModal(true);
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      order: category.order
    });
    setShowAddModal(true);
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('Category name is required');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingCategory) {
        // Update existing category
        await updateDoc(doc(db, 'categories', editingCategory.id), {
          name: formData.name.trim(),
          description: formData.description.trim(),
          order: formData.order
        });
      } else {
        // Add new category
        await addDoc(collection(db, 'categories'), {
          name: formData.name.trim(),
          description: formData.description.trim(),
          order: formData.order,
          createdAt: new Date()
        });
      }

      setShowAddModal(false);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (category: Category) => {
    if (!confirm(`Are you sure you want to delete "${category.name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'categories', category.id));
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    }
  };

  const handleSyncFromQuestions = async () => {
    try {
      // Get all questions
      const questionsSnapshot = await getDocs(collection(db, 'questions'));
      const questionCategories = Array.from(
        new Set(questionsSnapshot.docs.map(doc => doc.data().category).filter(Boolean))
      );

      // Get existing categories
      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      const existingCategories = new Map(
        categoriesSnapshot.docs.map(doc => [doc.data().name, { id: doc.id, ...doc.data() }])
      );

      let addedCount = 0;
      // Add any missing categories
      for (const categoryName of questionCategories) {
        if (!existingCategories.has(categoryName)) {
          await addDoc(collection(db, 'categories'), {
            name: categoryName,
            description: 'Auto-synced from questions',
            order: existingCategories.size + addedCount,
            createdAt: new Date()
          });
          addedCount++;
        }
      }

      if (addedCount > 0) {
        alert(`Synced ${addedCount} new categories from questions!`);
      } else {
        alert('All question categories are already in the categories list.');
      }
      fetchCategories();
    } catch (error) {
      console.error('Error syncing categories:', error);
      alert('Failed to sync categories from questions');
    }
  };

  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading categories...</span>
              </div>
            ) : (
              <>
                {/* Header Section */}
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">Question Categories</h1>
                    <p className="mt-2 text-gray-600">
                      Manage categories that organize assessment questions
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {/* <button
                  onClick={handleSyncFromQuestions}
                  className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                >
                  <span>🔄</span>
                  <span>Sync from Questions</span>
                </button> */}
                    <button
                      onClick={handleAdd}
                      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg text-lg flex items-center gap-2"
                    >
                      ➕ Add Category
                    </button>
                  </div>
                </div>

                {/* Categories List */}
                <div className="bg-white rounded-lg shadow">
                  {categories.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="mb-4">
                        <span className="text-6xl">📁</span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">No Categories Yet</h3>
                      <p className="text-gray-500 mb-6">Create your first category to organize assessment questions</p>
                      <button
                        onClick={handleAdd}
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg font-semibold text-lg"
                      >
                        ➕ Create Your First Category
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {categories.map((category) => (
                        <div
                          key={category.id}
                          className="p-6 hover:bg-gray-50 transition"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                              </div>
                              {category.description && (
                                <p className="mt-2 text-gray-600">{category.description}</p>
                              )}
                            </div>
                            <div className="flex gap-2 ml-4">
                              <button
                                onClick={() => handleEdit(category)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={() => handleDelete(category)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Add/Edit Modal */}
            {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Technical Skills"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of what this category covers"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lower numbers appear first. Categories are sorted by this value.
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  )}
                  {isSubmitting ? 'Saving...' : (editingCategory ? 'Save Changes' : 'Create Category')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
