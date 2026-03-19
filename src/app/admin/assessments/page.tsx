'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, getDocs, addDoc, updateDoc, doc, query, orderBy, Timestamp, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { AssessmentTemplate, Question, QuestionType, QuestionOption } from '@/types';
import Link from 'next/link';

export default function AdminAssessmentsPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AdminAssessmentsContent />
    </ProtectedRoute>
  );
}

function AdminAssessmentsContent() {
  const { userProfile, signOut } = useAuth();
  const router = useRouter();
  const [templates, setTemplates] = useState<AssessmentTemplate[]>([]);
  const [globalQuestions, setGlobalQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<AssessmentTemplate | null>(null);
  const [showManageQuestionsModal, setShowManageQuestionsModal] = useState(false);
  const [managingTemplate, setManagingTemplate] = useState<AssessmentTemplate | null>(null);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    version: '',
    description: '',
    questions: [] as Question[],
    isActive: true
  });
  
  // Question form state
  const [questionFormData, setQuestionFormData] = useState<Question>({
    id: '',
    title: '',
    category: '',
    type: 'scale' as QuestionType,
    min: 1,
    max: 10,
    options: [],
    hint: ''
  });
  
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch all assessment templates
      const templatesQuery = query(
        collection(db, 'assessmentTemplates'),
        orderBy('createdAt', 'desc')
      );
      const templatesSnapshot = await getDocs(templatesQuery);
      const fetchedTemplates = templatesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AssessmentTemplate[];

      // Fetch all global questions as templates
      const questionsSnapshot = await getDocs(collection(db, 'questions'));
      const fetchedQuestions = questionsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];

      setTemplates(fetchedTemplates);
      setGlobalQuestions(fetchedQuestions);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTemplate = () => {
    setEditingTemplate(null);
    // Start with all global questions by default
    setFormData({
      name: '',
      version: '',
      description: '',
      questions: [...globalQuestions],
      isActive: true
    });
    setShowCreateModal(true);
  };

  const handleEditTemplate = (template: AssessmentTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      version: template.version,
      description: template.description || '',
      questions: template.questions || [],
      isActive: template.isActive
    });
    setShowCreateModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userProfile) return;
    if (formData.questions.length === 0) {
      alert('Please add at least one question');
      return;
    }

    setSubmitting(true);
    try {
      const templateData = {
        name: formData.name,
        version: formData.version,
        description: formData.description,
        questions: formData.questions,
        isActive: formData.isActive,
        updatedAt: Timestamp.now()
      };

      if (editingTemplate) {
        await updateDoc(doc(db, 'assessmentTemplates', editingTemplate.id), templateData);
        alert('Assessment template updated successfully!');
      } else {
        await addDoc(collection(db, 'assessmentTemplates'), {
          ...templateData,
          createdBy: userProfile.uid,
          createdAt: Timestamp.now()
        });
        alert('Assessment template created successfully!');
      }

      setShowCreateModal(false);
      fetchData();
    } catch (error) {
      console.error('Error saving template:', error);
      alert('Failed to save template');
    } finally {
      setSubmitting(false);
    }
  };

  const handleManageQuestions = (template: AssessmentTemplate) => {
    setManagingTemplate(template);
    setShowManageQuestionsModal(true);
  };

  const handleAddQuestion = () => {
    setEditingQuestion(null);
    setQuestionFormData({
      id: `q${Date.now()}`,
      title: '',
      category: '',
      type: 'scale',
      min: 1,
      max: 10,
      options: [],
      hint: ''
    });
    setShowAddQuestionModal(true);
  };

  const handleEditQuestion = (question: Question) => {
    setEditingQuestion(question);
    setQuestionFormData(question);
    setShowAddQuestionModal(true);
  };

  const handleSaveQuestion = async () => {
    if (!managingTemplate) return;
    
    const updatedQuestions = editingQuestion
      ? managingTemplate.questions.map(q => q.id === editingQuestion.id ? questionFormData : q)
      : [...managingTemplate.questions, questionFormData];

    try {
      await updateDoc(doc(db, 'assessmentTemplates', managingTemplate.id), {
        questions: updatedQuestions,
        updatedAt: Timestamp.now()
      });

      setManagingTemplate({...managingTemplate, questions: updatedQuestions});
      setShowAddQuestionModal(false);
      fetchData();
      alert(editingQuestion ? 'Question updated!' : 'Question added!');
    } catch (error) {
      console.error('Error saving question:', error);
      alert('Failed to save question');
    }
  };

  const handleDeleteQuestion = async (questionId: string) => {
    if (!managingTemplate) return;
    if (!confirm('Are you sure you want to delete this question from this assessment?')) return;

    const updatedQuestions = managingTemplate.questions.filter(q => q.id !== questionId);

    try {
      await updateDoc(doc(db, 'assessmentTemplates', managingTemplate.id), {
        questions: updatedQuestions,
        updatedAt: Timestamp.now()
      });

      setManagingTemplate({...managingTemplate, questions: updatedQuestions});
      fetchData();
      alert('Question removed from assessment!');
    } catch (error) {
      console.error('Error deleting question:', error);
      alert('Failed to delete question');
    }
  };

  const toggleTemplateStatus = async (template: AssessmentTemplate) => {
    try {
      await updateDoc(doc(db, 'assessmentTemplates', template.id), {
        isActive: !template.isActive,
        updatedAt: Timestamp.now()
      });
      fetchData();
    } catch (error) {
      console.error('Error updating template status:', error);
      alert('Failed to update template status');
    }
  };

  const handleDeleteTemplate = async (template: AssessmentTemplate) => {
    if (!confirm(`Are you sure you want to delete "${template.name}"?\n\nThis action cannot be undone and will remove the template permanently.`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, 'assessmentTemplates', template.id));
      alert('Assessment template deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Error deleting template:', error);
      alert('Failed to delete template');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
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
          <div className="border-t border-gray-200">
            <nav className="flex -mb-px">
              <Link
                href="/admin"
                className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                📊 Overview
              </Link>
              <button
                className="px-4 py-3 text-sm font-medium border-b-2 border-blue-600 text-blue-600"
              >
                📋 Assessments
              </button>
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
                href="/admin/comparison"
                className="px-4 py-3 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                📈 Comparison
              </Link>
            </nav>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Manage Assessment Templates</h2>
          <p className="text-sm text-gray-600 mt-1">Create and manage versioned assessments with their own questions</p>
        </div>

        <div className="mb-6">
          <button
            onClick={handleCreateTemplate}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : '+ Create New Assessment Template'}
          </button>
        </div>

        {/* Templates List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {templates.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-lg font-semibold mb-2">No Assessment Templates</p>
              <p>Create your first assessment template to get started.</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Version
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Questions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {templates.map(template => (
                  <tr key={template.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{template.name}</div>
                      {template.description && (
                        <div className="text-sm text-gray-500">{template.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{template.version}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{template.questions?.length || 0}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleTemplateStatus(template)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          template.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {template.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {template.createdAt.toDate().toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleManageQuestions(template)}
                        className="text-purple-600 hover:text-purple-900"
                      >
                        Manage Questions
                      </button>
                      <button
                        onClick={() => handleEditTemplate(template)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Create/Edit Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingTemplate ? 'Edit Assessment Template' : 'Create New Assessment Template'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assessment Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Developer Assessment 2026"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Version *
                </label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2026, 2027-Q1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Brief description..."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                  Active (visible to developers)
                </label>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  ℹ️ This template includes all {formData.questions.length} questions from the global question bank by default.
                  After creating, use "Manage Questions" to customize, add, edit, or remove questions specific to this assessment.
                </p>
              </div>

              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={submitting}
                >
                  {submitting ? 'Saving...' : editingTemplate ? 'Update Template' : 'Create Template'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Questions Modal */}
      {showManageQuestionsModal && managingTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Manage Questions: {managingTemplate.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Add, edit, or remove questions specific to this assessment
              </p>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-4">
                <button
                  onClick={handleAddQuestion}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  + Add New Question
                </button>
              </div>

              {!managingTemplate?.questions || managingTemplate?.questions?.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-6xl mb-4">📝</div>
                  <p className="text-lg font-semibold mb-2">No Questions Yet</p>
                  <p>Add your first question to this assessment.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {managingTemplate.questions.map((question, index) => (
                    <div key={question.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                              Q{index + 1}
                            </span>
                            <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded">
                              {question.category}
                            </span>
                            <span className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                              {question.type}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-2">{question.title}</h3>
                          {question.hint && (
                            <p className="text-sm text-gray-600 mb-2">💡 {question.hint}</p>
                          )}
                          
                          {question.type === 'scale' && (
                            <p className="text-sm text-gray-600">
                              Scale: {question.min} to {question.max}
                            </p>
                          )}
                          
                          {(question.type === 'multiple-choice' || question.type === 'checkbox' || question.type === 'tech-stack') && question.options && (
                            <div className="mt-2">
                              <p className="text-xs font-medium text-gray-700 mb-1">Options:</p>
                              <ul className="list-disc list-inside text-sm text-gray-600">
                                {question.options.map((opt, i) => (
                                  <li key={i}>{opt.label}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEditQuestion(question)}
                            className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="px-3 py-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Total Questions: {managingTemplate?.questions?.length || 0}
                </p>
                <button
                  onClick={() => {
                    setShowManageQuestionsModal(false);
                    setManagingTemplate(null);
                  }}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Question Modal */}
      {showAddQuestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingQuestion ? 'Edit Question' : 'Add New Question'}
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Question Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Title *
                </label>
                <input
                  type="text"
                  value={questionFormData.title}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., How comfortable are you with React?"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <input
                  type="text"
                  value={questionFormData.category}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Frontend, Backend, DevOps"
                  required
                />
              </div>

              {/* Question Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Type *
                </label>
                <select
                  value={questionFormData.type}
                  onChange={(e) => {
                    const newType = e.target.value as QuestionType;
                    setQuestionFormData({
                      ...questionFormData,
                      type: newType,
                      min: newType === 'scale' ? 1 : undefined,
                      max: newType === 'scale' ? 10 : undefined,
                      options: newType !== 'scale' ? (questionFormData.options || []) : undefined
                    });
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="scale">Scale (1-10)</option>
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="checkbox">Checkbox (Multiple Select)</option>
                  <option value="tech-stack">Tech Stack</option>
                </select>
              </div>

              {/* Scale Options */}
              {questionFormData.type === 'scale' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Min Value
                    </label>
                    <input
                      type="number"
                      value={questionFormData.min || 1}
                      onChange={(e) => setQuestionFormData({ ...questionFormData, min: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Value
                    </label>
                    <input
                      type="number"
                      value={questionFormData.max || 10}
                      onChange={(e) => setQuestionFormData({ ...questionFormData, max: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Options for Multiple Choice, Checkbox, Tech Stack */}
              {(questionFormData.type === 'multiple-choice' || questionFormData.type === 'checkbox' || questionFormData.type === 'tech-stack') && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Options *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const newOption: QuestionOption = {
                          value: `option${(questionFormData.options?.length || 0) + 1}`,
                          label: '',
                          recommendations: [],
                          scoreWeight: 0,
                          mentorExplanation: '',
                          resources: []
                        };
                        setQuestionFormData({
                          ...questionFormData,
                          options: [...(questionFormData.options || []), newOption]
                        });
                      }}
                      className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      + Add Option
                    </button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {(questionFormData.options || []).map((option, index) => (
                      <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <div className="flex-1 space-y-3">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Option Label *
                              </label>
                              <input
                                type="text"
                                value={option.label}
                                onChange={(e) => {
                                  const newOptions = [...(questionFormData.options || [])];
                                  newOptions[index] = { ...option, label: e.target.value };
                                  setQuestionFormData({ ...questionFormData, options: newOptions });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                                placeholder="e.g., Beginner, Intermediate, Expert"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Score Weight (0-10)
                              </label>
                              <input
                                type="number"
                                value={option.scoreWeight}
                                onChange={(e) => {
                                  const newOptions = [...(questionFormData.options || [])];
                                  newOptions[index] = { ...option, scoreWeight: parseFloat(e.target.value) };
                                  setQuestionFormData({ ...questionFormData, options: newOptions });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                                min="0"
                                max="10"
                                step="0.1"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Mentor Explanation
                              </label>
                              <textarea
                                value={option.mentorExplanation}
                                onChange={(e) => {
                                  const newOptions = [...(questionFormData.options || [])];
                                  newOptions[index] = { ...option, mentorExplanation: e.target.value };
                                  setQuestionFormData({ ...questionFormData, options: newOptions });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                                rows={2}
                                placeholder="Explanation for this choice..."
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Recommendations (comma-separated)
                              </label>
                              <textarea
                                value={option.recommendations.join(', ')}
                                onChange={(e) => {
                                  const newOptions = [...(questionFormData.options || [])];
                                  newOptions[index] = {
                                    ...option,
                                    recommendations: e.target.value.split(',').map(r => r.trim()).filter(r => r)
                                  };
                                  setQuestionFormData({ ...questionFormData, options: newOptions });
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                                rows={2}
                                placeholder="Action item 1, Action item 2, ..."
                              />
                            </div>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => {
                              const newOptions = (questionFormData.options || []).filter((_, i) => i !== index);
                              setQuestionFormData({ ...questionFormData, options: newOptions });
                            }}
                            className="px-2 py-1 text-red-600 hover:bg-red-50 rounded text-sm"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {(questionFormData.options?.length || 0) === 0 && (
                    <p className="text-sm text-gray-500 italic text-center py-4">
                      No options added yet. Click "+ Add Option" to create options.
                    </p>
                  )}
                </div>
              )}

              {/* Hint */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hint (Optional)
                </label>
                <textarea
                  value={questionFormData.hint || ''}
                  onChange={(e) => setQuestionFormData({ ...questionFormData, hint: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Helpful hint for answering this question..."
                />
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddQuestionModal(false);
                    setEditingQuestion(null);
                  }}
                  className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveQuestion}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingQuestion ? 'Update Question' : 'Add Question'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
