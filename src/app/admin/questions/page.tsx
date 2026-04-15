'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Question, QuestionOption, QuestionType, InlineResource } from '@/types';
import { QUESTIONS as CONSTANT_QUESTIONS } from '@/lib/constants';
import Link from 'next/link';
import ResourcePicker from '@/components/ResourcePicker';

export default function QuestionManagement() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [firestoreQuestionIds, setFirestoreQuestionIds] = useState<Set<string>>(new Set());
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [migratingQuestions, setMigratingQuestions] = useState(false);

  useEffect(() => {
    fetchQuestions();
    fetchCategories();
  }, []);

  const syncCategoriesFromQuestions = async (allQuestions: Question[]) => {
    try {
      // Get unique categories from all questions (trim and filter empty)
      const questionCategories = Array.from(
        new Set(allQuestions.map(q => q.category?.trim()).filter(Boolean))
      );
      
      // Get existing categories from Firestore
      const categoriesSnapshot = await getDocs(collection(db, 'categories'));
      const existingCategories = new Map(
        categoriesSnapshot.docs.map(doc => [doc.data().name.toLowerCase().trim(), { id: doc.id, ...doc.data() }])
      );
      
      // Add any missing categories
      let currentOrder = existingCategories.size;
      for (const categoryName of questionCategories) {
        const normalizedName = categoryName.toLowerCase().trim();
        if (!existingCategories.has(normalizedName)) {
          await addDoc(collection(db, 'categories'), {
            name: categoryName, // Keep original casing for display
            description: `Auto-synced from questions`,
            order: currentOrder,
            createdAt: new Date()
          });
          // Update the map to prevent duplicates in same sync operation
          existingCategories.set(normalizedName, { id: '', ...{ name: categoryName, order: currentOrder } });
          currentOrder++;
        }
      }
    } catch (error) {
      console.error('Error syncing categories:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const firestoreCategories = querySnapshot.docs
        .map(doc => ({ order: doc.data().order || 0, name: doc.data().name }))
        .sort((a, b) => a.order - b.order)
        .map(c => c.name);
      
      if (firestoreCategories.length > 0) {
        setCategories(firestoreCategories);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const firestoreQuestions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];
      
      // Track which questions exist in Firestore
      const firestoreIds = new Set(firestoreQuestions.map(q => q.id));
      setFirestoreQuestionIds(firestoreIds);
      
      // Include constant questions that aren't overridden in Firestore
      const constantsOnlyQuestions = CONSTANT_QUESTIONS.filter(q => !firestoreIds.has(q.id));
      const allQuestions = [...firestoreQuestions, ...constantsOnlyQuestions];
      setQuestions(allQuestions);
      
      // Sync categories from questions (including constants for category list)
      await syncCategoriesFromQuestions(allQuestions);
      await fetchCategories();
    } catch (error) {
      console.error('Error fetching questions:', error);
      // Fallback to showing constant questions if Firestore fails
      // setQuestions(CONSTANT_QUESTIONS);
      setFirestoreQuestionIds(new Set());
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (question: Question) => {
    // Allow editing if question is in Firestore OR it's a new custom question
    const canEdit = firestoreQuestionIds.has(question.id) || !CONSTANT_QUESTIONS.some(q => q.id === question.id);
    
    if (!canEdit) {
      alert('This is a built-in question and cannot be edited. Use "Migrate Built-in Questions" to make it editable, or create a new question instead.');
      return;
    }
    setEditingQuestion(question);
  };

  const handleDelete = async (questionId: string) => {
    // Allow deleting if question is in Firestore OR it's a new custom question  
    const canDelete = firestoreQuestionIds.has(questionId) || !CONSTANT_QUESTIONS.some(q => q.id === questionId);
    
    if (!canDelete) {
      alert('This is a built-in question and cannot be deleted. Use "Migrate Built-in Questions" to make it editable.');
      return;
    }

    if (!confirm('Are you sure you want to delete this question? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'questions', questionId));
      setQuestions(questions.filter(q => q.id !== questionId));
      // Update the Firestore IDs tracking
      const newFirestoreIds = new Set(firestoreQuestionIds);
      newFirestoreIds.delete(questionId);
      setFirestoreQuestionIds(newFirestoreIds);
      alert('Question deleted successfully!');
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Failed to delete question. Please try again.');
    }
  };

  const handleSave = async (question: Question) => {
    try {
      if (editingQuestion) {
        // Update existing question in Firestore
        const { id, ...updateData } = question;
        await updateDoc(doc(db, 'questions', id), updateData);
        setQuestions(questions.map(q => q.id === id ? question : q));
        // Make sure this question is tracked as being in Firestore
        setFirestoreQuestionIds(prev => new Set([...prev, id]));
        setEditingQuestion(null);
        
        // Sync categories after update
        const updatedQuestions = questions.map(q => q.id === id ? question : q);
        await syncCategoriesFromQuestions(updatedQuestions);
        await fetchCategories();
        
        alert('Question updated successfully!');
      } else {
        // Add new question
        const { id, ...newData } = question;
        const docRef = await addDoc(collection(db, 'questions'), newData);
        const newQuestion = { ...question, id: docRef.id };
        const updatedQuestions = [...questions, newQuestion];
        setQuestions(updatedQuestions);
        
        // Sync categories after adding
        await syncCategoriesFromQuestions(updatedQuestions);
        await fetchCategories();
        // Track this new question as being in Firestore
        setFirestoreQuestionIds(prev => new Set([...prev, docRef.id]));
        setShowAddModal(false);
        alert('Question added successfully!');
      }
    } catch (error) {
      console.error('Error saving question:', error);
      alert('Failed to save question. Please try again.');
    }
  };

  const filteredQuestions = questions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         q.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || q.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const migrateConstantQuestions = async () => {
    setMigratingQuestions(true);
    try {
      // Get existing Firestore questions to avoid duplicates
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const existingIds = new Set(querySnapshot.docs.map(doc => doc.id));
      
      // Add constant questions that don't exist in Firestore
      const questionsToAdd = CONSTANT_QUESTIONS.filter(q => !existingIds.has(q.id));
      
      let successCount = 0;
      for (const question of questionsToAdd) {
        try {
          const { id, ...questionData } = question;
          // Use setDoc with the original ID to maintain ID consistency
          await setDoc(doc(db, 'questions', id), questionData);
          successCount++;
        } catch (error) {
          console.error(`Failed to migrate question ${question.id}:`, error);
        }
      }

      alert(`Successfully migrated ${successCount}/${questionsToAdd.length} questions to Firestore!`);
      
      // Refresh the list and sync categories
      await fetchQuestions();
    } catch (error) {
      alert('Failed to migrate questions. Check console for details. You may need to set up admin access first.');
    } finally {
      setMigratingQuestions(false);
    }
  };

  const handleSyncCategories = async () => {
    try {
      await syncCategoriesFromQuestions(questions);
      await fetchCategories();
      alert('Categories synced successfully!');
    } catch (error) {
      console.error('Error syncing categories:', error);
      alert('Failed to sync categories.');
    }
  };

  return (
    <>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading questions...</span>
              </div>
            ) : (
              <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-blue-600">
                  {questions.length}
                </div>
                <div className="text-gray-600">Total Questions</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-green-600">
                  {categories.length}
                </div>
                <div className="text-gray-600">Categories</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-purple-600">
                  {questions.filter(q => q.type === 'scale').length}
                </div>
                <div className="text-gray-600">Scale Questions</div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-3xl font-bold text-orange-600">
                  {questions.filter(q => q.type === 'multiple-choice').length}
                </div>
                <div className="text-gray-600">Multiple Choice</div>
              </div>
            </div>

            {/* Filters and Actions */}
            <div className="bg-white rounded-lg shadow mb-6 p-6">
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap"
                  >
                    + Add Question
                  </button>
                  {/* <button
                    onClick={handleSyncCategories}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium whitespace-nowrap"
                  >
                    🔄 Sync Categories
                  </button>
                  <button
                    onClick={migrateConstantQuestions}
                    disabled={migratingQuestions}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium whitespace-nowrap disabled:opacity-50"
                  >
                    {migratingQuestions ? 'Migrating...' : '📥 Migrate Built-in Questions'}
                  </button> */}
                </div>
                <p className="text-xs text-gray-600">
                  💡 Categories are auto-synced from questions. Use "Sync Categories" to manually update or manage them in the <Link href="/admin/categories" className="text-blue-600 hover:underline">Categories</Link> tab.
                </p>
              </div>

              {/* Questions Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Question
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Used In
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                        Options
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredQuestions.map((question) => {
                      // A question is editable if it's in Firestore OR it's a custom question not in constants
                      const isInFirestore = firestoreQuestionIds.has(question.id);
                      const isInConstants = CONSTANT_QUESTIONS.some(q => q.id === question.id);
                      const isEditable = isInFirestore || !isInConstants;
                      
                      return (
                        <tr key={question.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div className="flex items-start gap-2">
                              {isEditable ? (
                                <span className="inline-block px-2 py-1 text-xs font-medium text-green-600 bg-green-100 rounded mt-1">
                                  Editable
                                </span>
                              ) : (
                                <span className="inline-block px-2 py-1 text-xs font-medium text-orange-600 bg-orange-100 rounded mt-1">
                                  Read-only
                                </span>
                              )}
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 max-w-md truncate">
                                  {question.title}
                                </div>
                                {question.hint && (
                                  <div className="text-sm text-gray-500 mt-1">
                                    💡 {question.hint.substring(0, 60)}...
                                  </div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded">
                              {question.category}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 capitalize">
                            {question.type}
                          </td>
                          <td className="px-4 py-4">
                            {question.assessmentIds && question.assessmentIds.length > 0 ? (
                              <span className="inline-block px-2 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded">
                                {question.assessmentIds.length} assessment{question.assessmentIds.length > 1 ? 's' : ''}
                              </span>
                            ) : (
                              <span className="inline-block px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded">
                                Global / Available
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600">
                            {question.options ? `${question.options.length} options` : '-'}
                          </td>
                          <td className="px-4 py-4 text-right space-x-2">
                            <button
                              onClick={() => handleEdit(question)}
                              className={`font-medium ${
                                isEditable
                                  ? 'text-blue-600 hover:text-blue-800'
                                  : 'text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              {isEditable ? 'Edit' : 'View Only'}
                            </button>
                            <button
                              onClick={() => handleDelete(question.id)}
                              className={`font-medium ${
                                isEditable
                                  ? 'text-red-600 hover:text-red-800'
                                  : 'text-gray-400 cursor-not-allowed'
                              }`}
                            >
                              {isEditable ? 'Delete' : 'Protected'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredQuestions.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No questions found</p>
                </div>
              )}
            </div>
            </>
            )}
          </div>

        {/* Edit/Add Modal */}
        {(editingQuestion || showAddModal) && (
          <QuestionModal
            question={editingQuestion}
            categories={categories}
            onSave={handleSave}
            onClose={() => {
              setEditingQuestion(null);
              setShowAddModal(false);
            }}
          />
        )}
      </main>
    </>
  );
}

interface QuestionModalProps {
  question: Question | null;
  categories: string[];
  onSave: (question: Question) => void;
  onClose: () => void;
}

function QuestionModal({ question, categories, onSave, onClose }: QuestionModalProps) {
  const [formData, setFormData] = useState<Question>({
    id: '',
    title: '',
    category: '',
    type: 'multiple-choice' as QuestionType,
    options: [],
    hint: '',
    followUpQuestion: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update form data when question changes
  useEffect(() => {
    if (question) {
      setFormData({
        ...question,
        options: question.options || [],
        hint: question.hint || '',
        followUpQuestion: question.followUpQuestion || '',
      });
    } else {
      // Reset form for new question
      setFormData({
        id: '',
        title: '',
        category: '',
        type: 'multiple-choice' as QuestionType,
        options: [],
        hint: '',
        followUpQuestion: '',
      });
    }
  }, [question]);

  const handleAddOption = () => {
    setFormData({
      ...formData,
      options: [
        ...(formData.options || []),
        {
          value: '',
          label: '',
          recommendations: [],
          scoreWeight: 0.5,
          mentorExplanation: '',
          resources: [],
        },
      ],
    });
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = [...(formData.options || [])];
    newOptions.splice(index, 1);
    setFormData({ ...formData, options: newOptions });
  };

  const handleOptionChange = (index: number, field: keyof QuestionOption, value: any) => {
    const newOptions = [...(formData.options || [])];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.type) {
      alert('Please fill in all required fields');
      return;
    }
    setIsSubmitting(true);
    try {
      await onSave(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {question ? 'Edit Question' : 'Add New Question'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Title *
              </label>
              <textarea
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[2.5rem]"
                rows={2}
                required
                placeholder="Enter the question text..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                  required
                >
                  <option value="">Select a category...</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  💡 Manage categories in the <Link href="/admin/categories" className="text-blue-600 hover:underline">Categories</Link> section
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as QuestionType })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="scale">Scale (1-10)</option>
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="checkbox">Checkbox</option>
                  <option value="tech-stack">Tech Stack</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hint (Optional)
              </label>
              <textarea
                value={formData.hint || ''}
                onChange={(e) => setFormData({ ...formData, hint: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                rows={3}
                placeholder="Add a helpful hint for this question..."
              />
            </div>

            {(formData.type === 'tech-stack' || formData.type === 'checkbox') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Follow-up Question (Optional)
                </label>
                <input
                  type="text"
                  value={formData.followUpQuestion || ''}
                  onChange={(e) => setFormData({ ...formData, followUpQuestion: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., How many years of experience with each?"
                />
              </div>
            )}
          </div>

          {/* Options (for non-scale questions) */}
          {formData.type !== 'scale' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Options</h3>
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                >
                  + Add Option
                </button>
              </div>

              <div className="space-y-4">
                {formData.options?.map((option, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-medium text-gray-900">Option {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Value
                        </label>
                        <input
                          type="text"
                          value={option.value}
                          onChange={(e) => handleOptionChange(index, 'value', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="yes, no, react, etc."
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Label
                        </label>
                        <input
                          type="text"
                          value={option.label}
                          onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          placeholder="Display text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Score Weight (0-1)
                        </label>
                        <input
                          type="number"
                          step="any"
                          min="0"
                          max="1"
                          value={option.scoreWeight}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value);
                            // Clamp value between 0 and 1
                            const clampedValue = Math.min(Math.max(value, 0), 1);
                            handleOptionChange(index, 'scoreWeight', clampedValue);
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>

                      <div className="md:col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Mentor Explanation
                        </label>
                        <textarea
                          value={option.mentorExplanation}
                          onChange={(e) => handleOptionChange(index, 'mentorExplanation', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-y"
                          rows={3}
                          placeholder="Explain why this option is correct/incorrect..."
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Recommendations (one per line)
                        </label>
                        <textarea
                          value={(option.recommendations || []).join('\n')}
                          onChange={(e) => handleOptionChange(index, 'recommendations', e.target.value.split('\n').filter(r => r.trim()))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-y"
                          rows={3}
                          placeholder="Enter recommendations, one per line..."
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Resources
                        </label>
                        <ResourcePicker
                          categoryId={formData.category}
                          selectedResources={option.resources || []}
                          onResourcesChange={(resources) => handleOptionChange(index, 'resources', resources)}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {(!formData.options || formData.options.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    No options yet. Click "Add Option" to create one.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Scale range (for scale questions) */}
          {formData.type === 'scale' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Value
                </label>
                <input
                  type="number"
                  value={formData.min || 1}
                  onChange={(e) => setFormData({ ...formData, min: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Value
                </label>
                <input
                  type="number"
                  value={formData.max || 10}
                  onChange={(e) => setFormData({ ...formData, max: parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              {isSubmitting ? 'Saving...' : (question ? 'Update Question' : 'Add Question')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
