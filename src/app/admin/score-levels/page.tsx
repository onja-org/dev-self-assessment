'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ScoreLevel } from '@/types';

export default function ScoreLevelsPage() {
  const [scoreLevels, setScoreLevels] = useState<ScoreLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingLevel, setEditingLevel] = useState<ScoreLevel | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    key: '',
    label: '',
    min: 0,
    max: 0,
    color: 'text-blue-600',
    description: '',
    order: 0
  });

  useEffect(() => {
    fetchScoreLevels();
  }, []);

  const fetchScoreLevels = async () => {
    try {
      const q = query(collection(db, 'scoreLevels'), orderBy('order', 'asc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ScoreLevel[];
      setScoreLevels(data);
    } catch (error) {
      console.error('Error fetching score levels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingLevel(null);
    setFormData({
      key: '',
      label: '',
      min: 0,
      max: 0,
      color: 'text-blue-600',
      description: '',
      order: scoreLevels.length
    });
    setShowModal(true);
  };

  const handleEdit = (level: ScoreLevel) => {
    setEditingLevel(level);
    setFormData({
      key: level.key,
      label: level.label,
      min: level.min,
      max: level.max,
      color: level.color,
      description: level.description,
      order: level.order
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.label.trim() || !formData.key.trim()) {
      alert('Label and Key are required');
      return;
    }

    if (formData.min < 0 || formData.max > 10 || formData.min >= formData.max) {
      alert('Invalid score range. Min must be less than Max, and scores should be between 0-10');
      return;
    }

    setIsSubmitting(true);
    try {
      const levelData = {
        key: formData.key.toUpperCase().replace(/\s+/g, '_'),
        label: formData.label.trim(),
        min: formData.min,
        max: formData.max,
        color: formData.color,
        description: formData.description.trim(),
        order: formData.order,
        updatedAt: Timestamp.now()
      };

      if (editingLevel) {
        await updateDoc(doc(db, 'scoreLevels', editingLevel.id), levelData);
      } else {
        await addDoc(collection(db, 'scoreLevels'), {
          ...levelData,
          createdAt: Timestamp.now()
        });
      }
      
      setShowModal(false);
      fetchScoreLevels();
    } catch (error) {
      console.error('Error saving score level:', error);
      alert('Failed to save score level');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (level: ScoreLevel) => {
    if (!confirm(`Are you sure you want to delete "${level.label}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'scoreLevels', level.id));
      fetchScoreLevels();
    } catch (error) {
      console.error('Error deleting score level:', error);
      alert('Failed to delete score level');
    }
  };

  const handleSeedDefaults = async () => {
    const defaultLevels = [
      {
        key: 'BEGINNER',
        label: 'Beginner',
        min: 0,
        max: 3.9,
        color: 'text-red-600',
        description: 'Starting to learn and build foundational skills',
        order: 0
      },
      {
        key: 'JUNIOR',
        label: 'Junior',
        min: 4,
        max: 5.9,
        color: 'text-orange-600',
        description: 'Building foundations and learning core concepts',
        order: 1
      },
      {
        key: 'INTERMEDIATE',
        label: 'Intermediate',
        min: 6,
        max: 7.9,
        color: 'text-yellow-600',
        description: 'Solid fundamentals with growing independence',
        order: 2
      },
      {
        key: 'UPPER_INTERMEDIATE',
        label: 'Upper Intermediate',
        min: 8,
        max: 10,
        color: 'text-green-600',
        description: 'Strong skills with deep technical knowledge',
        order: 3
      }
    ];

    if (!confirm(`This will add ${defaultLevels.length} default score levels. Continue?`)) {
      return;
    }

    try {
      for (const level of defaultLevels) {
        await addDoc(collection(db, 'scoreLevels'), {
          ...level,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now()
        });
      }
      alert('Default score levels added successfully!');
      fetchScoreLevels();
    } catch (error) {
      console.error('Error seeding score levels:', error);
      alert('Failed to seed score levels');
    }
  };

  const colorOptions = [
    { value: 'text-red-600', label: 'Red' },
    { value: 'text-orange-600', label: 'Orange' },
    { value: 'text-yellow-600', label: 'Yellow' },
    { value: 'text-green-600', label: 'Green' },
    { value: 'text-blue-600', label: 'Blue' },
    { value: 'text-indigo-600', label: 'Indigo' },
    { value: 'text-purple-600', label: 'Purple' },
  ];

  return (
    <>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading score levels...</span>
              </div>
            ) : (
              <>
              {/* Header Section */}
              <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Score Levels</h1>
                  <p className="mt-2 text-gray-600">
                    Define and manage skill level ranges based on assessment scores
                  </p>
                </div>
                <div className="flex gap-3">
                  {scoreLevels.length === 0 && (
                    <button
                      onClick={handleSeedDefaults}
                      className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
                    >
                      <span>🌱</span>
                      <span>Seed Defaults</span>
                    </button>
                  )}
                  <button
                    onClick={handleAdd}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg text-lg flex items-center gap-2"
                  >
                    ➕ Add Score Level
                  </button>
                </div>
              </div>

              {/* Score Levels Table */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score Range</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {scoreLevels.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                          No score levels defined. Click "Seed Defaults" to add default levels or "Add Score Level" to create custom ones.
                        </td>
                      </tr>
                    ) : (
                      scoreLevels.map((level) => (
                        <tr key={level.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {level.order}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex flex-col">
                              <span className={`text-sm font-semibold ${level.color}`}>
                                {level.label}
                              </span>
                              <span className="text-xs text-gray-500">
                                {level.key}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {level.min} - {level.max}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {level.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleEdit(level)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(level)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Info Box */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-semibold text-blue-900 mb-2">📝 Score Levels Guide</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Score ranges should cover 0-10 without gaps</li>
                  <li>• Lower order numbers appear first in displays</li>
                  <li>• The color will be used to visually distinguish levels in assessments</li>
                  <li>• Key should be uppercase with underscores (e.g., UPPER_INTERMEDIATE)</li>
                </ul>
              </div>
            </>
          )}
          </div>
        </main>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingLevel ? 'Edit Score Level' : 'Add Score Level'}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    placeholder="e.g., Beginner, Junior, Intermediate"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.key}
                    onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                    placeholder="e.g., BEGINNER, JUNIOR, UPPER_INTERMEDIATE"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-mono"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Unique identifier (will be converted to uppercase with underscores)
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Score <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.min}
                      onChange={(e) => setFormData({ ...formData, min: parseFloat(e.target.value) || 0 })}
                      min="0"
                      max="10"
                      step="0.1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Score <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.max}
                      onChange={(e) => setFormData({ ...formData, max: parseFloat(e.target.value) || 0 })}
                      min="0"
                      max="10"
                      step="0.1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <select
                    value={formData.color}
                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  >
                    {colorOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Preview: <span className={formData.color + ' font-semibold'}>{formData.label || 'Sample Text'}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    placeholder="Brief description of this skill level"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Display order (lower numbers appear first)
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
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
                  {isSubmitting ? 'Saving...' : (editingLevel ? 'Save Changes' : 'Create Level')}
                </button>
              </div>
            </div>
          </div>
        )}
      </>
  );
}
