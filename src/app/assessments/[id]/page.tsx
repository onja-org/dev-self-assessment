'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { CATEGORIES, getSkillLevel } from '@/lib/constants';
import { Answer, Assessment, Question, AssessmentTemplate, UserAssessment } from '@/types';
import { calculateScore, getTopRecommendations, generateActionPlans } from '@/lib/scoreCalculator';
import { collection, addDoc, query, where, orderBy, getDocs, Timestamp, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AssessmentTakePage() {
  const { userProfile, signOut } = useAuth();
  const router = useRouter();
  const params = useParams();
  const assessmentId = params?.id as string;
  
  const [template, setTemplate] = useState<AssessmentTemplate | null>(null);
  const [userAssessment, setUserAssessment] = useState<UserAssessment | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'assessment' | 'results'>('assessment');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, Answer>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [categoryResults, setCategoryResults] = useState<Record<string, { recommendations: any[], resources: any[] }>>({});
  const [unsavedCategories, setUnsavedCategories] = useState<Set<string>>(new Set());
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [completedCategory, setCompletedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'saved' | 'preview'>('saved');

  // Fetch assessment template and load questions from it
  useEffect(() => {
    const fetchAssessment = async () => {
      if (!assessmentId) {
        router.push('/assessments');
        return;
      }

      try {
        // Fetch the assessment template
        const templateDoc = await getDoc(doc(db, 'assessmentTemplates', assessmentId));
        
        if (!templateDoc.exists()) {
          alert('Assessment not found');
          router.push('/assessments');
          return;
        }

        const templateData = {
          id: templateDoc.id,
          ...templateDoc.data()
        } as AssessmentTemplate;

        if (!templateData.isActive) {
          alert('This assessment is no longer active');
          router.push('/assessments');
          return;
        }

        setTemplate(templateData);
        
        // Load questions from the template
        const templateQuestions = templateData.questions || [];
        setQuestions(templateQuestions);
        
        // Extract unique categories from questions
        const uniqueCategories = Array.from(new Set(templateQuestions.map(q => q.category)));
        setCategories(uniqueCategories);

        // Fetch or create UserAssessment for this template
        if (userProfile) {
          const userAssessmentQuery = query(
            collection(db, 'userAssessments'),
            where('userId', '==', userProfile.uid),
            where('assessmentTemplateId', '==', assessmentId)
          );
          const userAssessmentSnapshot = await getDocs(userAssessmentQuery);

          if (!userAssessmentSnapshot.empty) {
            // Load existing assessment
            const existingAssessment = {
              id: userAssessmentSnapshot.docs[0].id,
              ...userAssessmentSnapshot.docs[0].data()
            } as UserAssessment;
            setUserAssessment(existingAssessment);
            
            // Load responses only if in-progress (not for completed)
            if (existingAssessment.status === 'in-progress' && existingAssessment.responses) {
              setResponses(existingAssessment.responses);
            } else if (existingAssessment.status === 'completed' && existingAssessment.responses) {
              // For completed assessments, load responses for viewing only
              setResponses(existingAssessment.responses);
            }
          } else {
            // Create new UserAssessment
            const newUserAssessment: Omit<UserAssessment, 'id'> = {
              userId: userProfile.uid,
              userName: userProfile.name,
              userEmail: userProfile.email,
              assessmentTemplateId: assessmentId,
              assessmentName: templateData.name,
              assessmentVersion: templateData.version,
              createdAt: Timestamp.now(),
              responses: {},
              categoryScores: {},
              overallScore: 0,
              status: 'in-progress'
            };
            const docRef = await addDoc(collection(db, 'userAssessments'), newUserAssessment);
            setUserAssessment({ id: docRef.id, ...newUserAssessment } as UserAssessment);
          }
        }
        
      } catch (error) {
        console.error('Error fetching assessment:', error);
        alert('Failed to load assessment');
        router.push('/assessments');
      } finally {
        setQuestionsLoading(false);
        setCategoriesLoading(false);
      }
    };

    fetchAssessment();
  }, [assessmentId, router, userProfile]);

  // Determine if assessment is read-only based on status
  const isReadOnly = userAssessment?.status === 'completed';

  // Get filtered questions based on selected categories
  const filteredQuestions = selectedCategories.length === 0
    ? questions 
    : questions.filter(q => selectedCategories.includes(q.category));

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const progress = filteredQuestions.length > 0 ? ((currentQuestionIndex + 1) / filteredQuestions.length) * 100 : 0;

  // Helper function to check if a category is completed
  const isCategoryCompleted = (category: string) => {
    const categoryQuestions = questions.filter(q => q.category === category);
    // Check current responses
    const currentComplete = categoryQuestions.every(q => responses[q.id] !== undefined);
    return currentComplete;
  };

  // Check if category is saved in Firestore
  const isCategorySaved = (category: string) => {
    if (!userAssessment || userAssessment.status === 'in-progress') return false;
    const categoryQuestions = questions.filter(q => q.category === category);
    return categoryQuestions.every(q => userAssessment.responses[q.id] !== undefined);
  };

  // Check if category is unsaved (completed but not in Firestore)
  const isCategoryUnsaved = (category: string) => {
    return unsavedCategories.has(category) || 
      (isCategoryCompleted(category) && !isCategorySaved(category));
  };

  // Get all completed categories
  const completedCategories = categories.filter(cat => isCategoryCompleted(cat));

  // Get next incomplete category
  const getNextIncompleteCategory = () => {
    return categories.find(cat => !isCategoryCompleted(cat)) || null;
  };

  // Navigation warning for unsaved work
  useEffect(() => {
    // Don't warn if assessment is completed (read-only)
    if (isReadOnly) return;
    
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (unsavedCategories.size > 0) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [unsavedCategories, isReadOnly]);

  const handleSignOut = async () => {
    // Don't warn if assessment is read-only (completed)
    if (!isReadOnly && unsavedCategories.size > 0) {
      const confirmLeave = confirm(
        `⚠️ You have ${unsavedCategories.size} unsaved categor${unsavedCategories.size > 1 ? 'ies' : 'y'}!\n\n` +
        `Your progress will be lost if you sign out now.\n\n` +
        `Click OK to save first, or Cancel to sign out without saving.`
      );
      
      if (confirmLeave) {
        // Give user chance to save
        setActiveTab('assessment');
        const submitButton = document.getElementById('submit-assessment-btn');
        if (submitButton) {
          submitButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
    }
    
    await signOut();
    router.push('/login');
  };

  const handleAnswer = async (value: string | number | string[]) => {
    // Don't allow answers if assessment is completed
    if (userAssessment?.status === 'completed') {
      alert('This assessment is already completed. You cannot modify your answers.');
      return;
    }

    const question = currentQuestion;
    let scoreWeight = 0.5;

    if (question.type === 'scale') {
      scoreWeight = typeof value === 'number' ? value / 10 : 0.5;
    } else if (question.options) {
      if (Array.isArray(value)) {
        const weights = value.map(v => 
          question.options?.find(opt => opt.value === v)?.scoreWeight || 0
        );
        scoreWeight = weights.length > 0 
          ? weights.reduce((a, b) => a + b, 0) / weights.length 
          : 0.5;
      } else {
        const option = question.options.find(opt => opt.value === value);
        scoreWeight = option?.scoreWeight || 0.5;
      }
    }

    const newResponses = {
      ...responses,
      [question.id]: {
        value,
        scoreWeight,
        recommendations: [],
      }
    };
    
    setResponses(newResponses);

    // Save to UserAssessment in Firestore
    if (userAssessment) {
      try {
        const { categoryScores, overallScore } = calculateScore(newResponses, questions);
        
        // Check if all questions are answered
        const allAnswered = questions.every(q => newResponses[q.id] !== undefined);
        
        await updateDoc(doc(db, 'userAssessments', userAssessment.id), {
          responses: newResponses,
          categoryScores,
          overallScore,
          status: allAnswered ? 'completed' : 'in-progress',
          ...(allAnswered && { completedAt: Timestamp.now() })
        });

        // Update local state
        setUserAssessment({
          ...userAssessment,
          responses: newResponses,
          categoryScores,
          overallScore,
          status: allAnswered ? 'completed' : 'in-progress',
          ...(allAnswered && { completedAt: Timestamp.now() })
        });

        if (allAnswered) {
          // Clear localStorage as we've saved everything
          localStorage.removeItem('assessment_responses');
          alert('🎉 Assessment completed! All your answers have been saved.');
        }
      } catch (error) {
        console.error('Error saving to UserAssessment:', error);
      }
    }

    // Save to localStorage for backup
    try {
      localStorage.setItem('assessment_responses', JSON.stringify(newResponses));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
 
    // Move to next question or show completion
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Category completed
      if (currentCategory) {
        // Mark as unsaved
        setUnsavedCategories(prev => new Set([...prev, currentCategory]));
        
        // Generate category-specific recommendations
        generateCategoryRecommendations(currentCategory, newResponses);
        
        // Show completion modal
        setCompletedCategory(currentCategory);
        setShowCompletionModal(true);
      }
    }
  };

  const handleSubmitAssessment = async () => {
    if (!userProfile || !userAssessment) {
      alert('Error: User profile not loaded. Please refresh the page and try again.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { categoryScores, overallScore } = calculateScore(responses, questions);

      // Check if all questions are answered
      const allAnswered = questions.every(q => responses[q.id] !== undefined);

      // Update the UserAssessment with final scores and mark as completed if all answered
      await updateDoc(doc(db, 'userAssessments', userAssessment.id), {
        responses,
        categoryScores,
        overallScore,
        status: allAnswered ? 'completed' : 'in-progress',
        ...(allAnswered && { completedAt: Timestamp.now() })
      });

      // Update local state
      setUserAssessment({
        ...userAssessment,
        responses,
        categoryScores,
        overallScore,
        status: allAnswered ? 'completed' : 'in-progress',
        ...(allAnswered && { completedAt: Timestamp.now() })
      });

      setShowResults(true);
      setActiveTab('results');
      setViewMode('saved');
      
      // Clear unsaved categories and localStorage after successful submission
      setUnsavedCategories(new Set());
      localStorage.removeItem('assessment_responses');

      if (allAnswered) {
        alert('🎉 Assessment completed! Your responses have been saved.');
      }
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate category-specific recommendations
  const generateCategoryRecommendations = (category: string, currentResponses: Record<string, Answer>) => {
    const categoryQuestions = questions.filter(q => q.category === category);
    const categoryResponseIds = categoryQuestions.map(q => q.id);
    const categoryOnlyResponses = Object.fromEntries(
      Object.entries(currentResponses).filter(([qId]) => categoryResponseIds.includes(qId))
    );

    // Calculate category-specific scores
    const { categoryScores } = calculateScore(categoryOnlyResponses, questions);
    const categoryScore = categoryScores[category] || 0;

    // Generate recommendations for this category only
    const recommendations = getTopRecommendations(
      { [category]: categoryScore },
      categoryOnlyResponses,
      categoryScore,
      questions
    );

    // Extract all resources from recommendations
    const resources = recommendations.flatMap(rec => rec.resources || []);
    const uniqueResources = Array.from(new Map(resources.map(r => [r.url, r])).values());

    // Store category results
    setCategoryResults(prev => ({
      ...prev,
      [category]: {
        recommendations,
        resources: uniqueResources
      }
    }));
  };

  const resetAssessment = () => {
    setResponses({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setSelectedCategories([]);
    setAssessmentStarted(false);
    setActiveTab('assessment');
    // Note: We keep latestAssessment and assessmentHistory so previous results remain visible
  };

  const toggleCategory = (category: string) => {
    // Don't allow toggling if assessment is completed (read-only)
    if (isReadOnly) return;
    
    const completed = isCategoryCompleted(category);
    
    if (completed) {
      // If category is completed, switch to it to review answers
      setCurrentCategory(category);
      setSelectedCategories([category]);
      setAssessmentStarted(true);
      setCurrentQuestionIndex(0);
      setShowResults(false);
      
      // Load responses from current state (already loaded)
    } else {
      // Normal toggle for incomplete categories
      setSelectedCategories(prev => 
        prev.includes(category) 
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    }
  };

  const startAssessment = () => {
    // For completed assessments, just view mode
    if (isReadOnly) {
      setAssessmentStarted(true);
      setCurrentQuestionIndex(0);
      return;
    }
    
    if (selectedCategories.length === 0) {
      // If no categories selected, use all questions
      setSelectedCategories([]);
    }
    // Set current category to first selected or null for full assessment
    setCurrentCategory(selectedCategories.length > 0 ? selectedCategories[0] : null);
    setAssessmentStarted(true);
    setCurrentQuestionIndex(0);
    // Don't clear responses - keep them for persistence
    // Don't change showResults - keep previous results visible in Results tab
  };

  const allAnswered = filteredQuestions.every(q => responses[q.id] !== undefined);

  // Show loading state while questions or categories are being fetched (after all hooks)
  if (questionsLoading || categoriesLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading assessment...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-gray-900">
                  Developer Self-Assessment
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hello, {userProfile?.name}</span>
                <Link
                  href="/assessments"
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  ← Back to Assessments
                </Link>
                {userProfile?.role === 'admin' && (
                  <Link
                    href="/admin"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            {/* Tabs */}
            <div className="bg-white rounded-t-lg shadow">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => {
                      setActiveTab('assessment');
                      setAssessmentStarted(false);
                      setSelectedCategories([]);
                      setCurrentCategory(null);
                    }}
                    data-tab="assessment"
                    className={`py-4 px-6 text-sm font-medium border-b-2 transition ${
                      activeTab === 'assessment'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    📝 Take Assessment
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab('results');
                      setViewMode('saved');
                    }}
                    data-tab="results"
                    className={`py-4 px-6 text-sm font-medium border-b-2 transition ${
                      activeTab === 'results'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    📊 Results
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Assessment Tab */}
                {activeTab === 'assessment' && (
                  <div className="space-y-6">
                    {!assessmentStarted ? (
                      /* Category Selection */
                      <div className="space-y-6">
                        {/* Progress Summary */}
                        {(completedCategories.length > 0 || unsavedCategories.size > 0) && (
                          <div className="space-y-3">
                            {/* Unsaved Progress Warning */}
                            {unsavedCategories.size > 0 && (
                              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="bg-yellow-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                                      ⚠️
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-yellow-900">Unsaved Progress</h4>
                                      <p className="text-sm text-yellow-700">
                                        {unsavedCategories.size} categor{unsavedCategories.size > 1 ? 'ies' : 'y'} completed but not saved
                                      </p>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => {
                                      const submitButton = document.getElementById('submit-assessment-btn');
                                      if (submitButton) {
                                        submitButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                      } else {
                                        setAssessmentStarted(true);
                                      }
                                    }}
                                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-medium transition"
                                  >
                                    Save Now
                                  </button>
                                </div>
                              </div>
                            )}
                            
                            {/* Completed Summary */}
                            {completedCategories.length > 0 && (
                              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-400 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl">
                                      {completedCategories.length}
                                    </div>
                                    <div>
                                      <h4 className="font-bold text-green-900">Categories Completed!</h4>
                                      <p className="text-sm text-green-700">
                                        {completedCategories.length} of {categories.length} categories done
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-xs text-green-600 uppercase font-semibold">Progress</p>
                                    <p className="text-2xl font-bold text-green-700">
                                      {Math.round((completedCategories.length / categories.length) * 100)}%
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Select Categories to Assess
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Choose one or more categories, or leave all unselected to take the full assessment ({questions.length} questions).
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {categories.map(category => {
                            const count = questions.filter(q => q.category === category).length;
                            const isSelected = selectedCategories.includes(category);
                            const isUnsaved = isCategoryUnsaved(category);
                            const isSaved = isCategorySaved(category);
                            const isCompleted = isCategoryCompleted(category);
                            
                            return (
                              <button
                                key={category}
                                onClick={() => toggleCategory(category)}
                                className={`p-4 rounded-lg border-2 transition-all text-left relative ${
                                  isSaved
                                    ? 'border-green-500 bg-green-50 shadow-md'
                                    : isUnsaved
                                    ? 'border-yellow-500 bg-yellow-50 shadow-md'
                                    : isSelected
                                    ? 'border-blue-600 bg-blue-50 shadow-md'
                                    : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow'
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className={`font-semibold mb-1 ${
                                      isSaved ? 'text-green-900' : 
                                      isUnsaved ? 'text-yellow-900' : 
                                      isSelected ? 'text-blue-900' : 'text-gray-900'
                                    }`}>
                                      {category}
                                      {isSaved && <span className="ml-2 text-xs text-green-600">🟢 Saved</span>}
                                      {isUnsaved && !isSaved && <span className="ml-2 text-xs text-yellow-600">🟡 Unsaved</span>}
                                    </h4>
                                    <p className={`text-sm ${
                                      isSaved ? 'text-green-600' : 
                                      isUnsaved ? 'text-yellow-600' : 
                                      isSelected ? 'text-blue-600' : 'text-gray-600'
                                    }`}>
                                      {count} question{count !== 1 ? 's' : ''}
                                    </p>
                                  </div>
                                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    isSaved
                                      ? 'border-green-600 bg-green-600'
                                      : isUnsaved
                                      ? 'border-yellow-500 bg-yellow-500'
                                      : isSelected
                                      ? 'border-blue-600 bg-blue-600'
                                      : 'border-gray-300'
                                  }`}>
                                    {(isSelected || isCompleted) && (
                                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                                {isSaved && (
                                  <div className="mt-2 text-xs text-green-700 font-medium">
                                    ✓ Saved to history
                                  </div>
                                )}
                                {isUnsaved && !isSaved && (
                                  <div className="mt-2 text-xs text-yellow-700 font-medium">
                                    ⚠️ Not yet saved
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <div className="ml-3">
                              <p className="text-sm text-blue-900">
                                {selectedCategories.length === 0 ? (
                                  <>
                                    <strong>Full Assessment:</strong> You'll answer all {questions.length} questions covering all skill areas.
                                  </>
                                ) : (
                                  <>
                                    <strong>Selected:</strong> {selectedCategories.length} categor{selectedCategories.length !== 1 ? 'ies' : 'y'} 
                                    ({filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''})
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center pt-4">
                          <button
                            onClick={startAssessment}
                            className={`px-8 py-3 font-semibold rounded-lg transition shadow-lg text-lg ${
                              isReadOnly 
                                ? 'bg-gray-600 text-white hover:bg-gray-700'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {isReadOnly ? '👁️ View Assessment' : '🚀 Get Started'}
                          </button>
                        </div>
                        
                        {isReadOnly && (
                          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                              </svg>
                              <p className="text-sm text-amber-800 font-medium">
                                This assessment is completed. You can view your answers but cannot modify them.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                    {/* Back to Categories Button */}
                    <div className="mb-4">
                      <button
                        onClick={() => {
                          const currentCategoryCompleted = currentCategory && isCategoryCompleted(currentCategory);
                          if (currentCategoryCompleted || confirm('Are you sure you want to go back? Your progress will be saved but you can continue later.')) {
                            setAssessmentStarted(false);
                            setCurrentQuestionIndex(0);
                            setSelectedCategories([]);
                            setCurrentCategory(null);
                          }
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-gray-700 hover:text-blue-700 font-medium"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                        Back to Categories
                        {currentCategory && isCategoryCompleted(currentCategory) && (
                          <span className="ml-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">✓ Saved</span>
                        )}
                      </button>
                    </div>
                    
                    {/* Current Category Badge */}
                    {currentCategory && (
                      <div className={`mb-4 p-3 rounded-lg border-2 flex items-center justify-between ${
                        isCategoryCompleted(currentCategory)
                          ? 'bg-green-50 border-green-500'
                          : 'bg-blue-50 border-blue-500'
                      }`}>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">
                            {isCategoryCompleted(currentCategory) ? '✅' : '📝'}
                          </span>
                          <div>
                            <h4 className={`font-bold ${
                              isCategoryCompleted(currentCategory) ? 'text-green-900' : 'text-blue-900'
                            }`}>
                              {currentCategory}
                            </h4>
                            <p className={`text-xs ${
                              isCategoryCompleted(currentCategory) ? 'text-green-600' : 'text-blue-600'
                            }`}>
                              {isCategoryCompleted(currentCategory) 
                                ? 'All questions answered! ✓' 
                                : `${filteredQuestions.length} questions in this category`}
                            </p>
                          </div>
                        </div>
                        {isCategoryCompleted(currentCategory) && (
                          <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                            COMPLETE
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Progress Bar */}
                    <div>
                      {userAssessment?.status === 'completed' && (
                        <div className="mb-4 p-4 bg-green-50 border-2 border-green-500 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-green-900 text-lg">Assessment Completed</h3>
                              <p className="text-sm text-green-700">
                                This assessment is complete and submitted. You can review your answers but cannot modify them.
                              </p>
                              {userAssessment.completedAt && (
                                <p className="text-xs text-green-600 mt-1">
                                  Completed on {userAssessment.completedAt.toDate().toLocaleDateString()} at {userAssessment.completedAt.toDate().toLocaleTimeString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Question {currentQuestionIndex + 1} of {filteredQuestions.length}</span>
                        <span>{Math.round(progress)}% Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            userAssessment?.status === 'completed' ? 'bg-green-600' : 'bg-blue-600'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Question */}
                    {currentQuestion && (
                      <AssessmentQuestion
                        question={currentQuestion}
                        currentAnswer={responses[currentQuestion.id]?.value}
                        onAnswer={handleAnswer}
                        onPrevious={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                        onNext={() => setCurrentQuestionIndex(Math.min(filteredQuestions.length - 1, currentQuestionIndex + 1))}
                        isFirst={currentQuestionIndex === 0}
                        isLast={currentQuestionIndex === filteredQuestions.length - 1}
                        isCompleted={userAssessment?.status === 'completed'}
                      />
                    )}

                    {/* Submit Button - Only show if not read-only (completed) */}
                    {!isReadOnly && (allAnswered || unsavedCategories.size > 0) && (
                      <div id="submit-assessment-btn" className="flex flex-col items-center pt-6 border-t">
                        <div className="mb-4 flex items-center gap-2 text-green-600">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold">
                            {unsavedCategories.size > 0 
                              ? `${unsavedCategories.size} categor${unsavedCategories.size > 1 ? 'ies' : 'y'} ready to save!`
                              : 'All questions answered!'
                            }
                          </span>
                        </div>
                        <button
                          onClick={handleSubmitAssessment}
                          disabled={isSubmitting}
                          className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg animate-pulse"
                        >
                          {isSubmitting ? 'Saving...' : '💾 Save & View All Results'}
                        </button>
                        {unsavedCategories.size > 0 && (
                          <p className="text-xs text-gray-500 mt-2 text-center">
                            Your progress will be permanently saved to your history
                          </p>
                        )}
                      </div>
                    )}

                    {!isReadOnly && filteredQuestions.length > 0 && !allAnswered && (
                      <div className="text-center text-sm text-gray-500">
                        Answer all questions to submit assessment
                      </div>
                    )}
                      </>
                    )}
                  </div>
                )}

                {/* Results Tab */}
                {activeTab === 'results' && (
                  <ResultsView 
                    assessment={userAssessment} 
                    onReset={resetAssessment} 
                    categoryResults={categoryResults}
                    currentCategory={currentCategory}
                    viewMode={viewMode}
                    unsavedCategories={unsavedCategories}
                    questions={questions}
                    categories={categories}
                  />
                )}
              </div>
            </div>
          </div>
        </main>

        {/* Category Completion Modal */}
        {showCompletionModal && completedCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎉</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {completedCategory} Complete!
                </h3>
                <p className="text-gray-600">
                  Great work! Save your progress to view results.
                </p>
              </div>

              <div className="space-y-3">
                {/* Save Progress Button */}
                <button
                  onClick={async () => {
                    setShowCompletionModal(false);
                    // Trigger save
                    await handleSubmitAssessment();
                  }}
                  className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  💾 Save & View Results
                </button>

                {/* Continue to Next Category */}
                {(() => {
                  const nextCategory = getNextIncompleteCategory();
                  if (nextCategory && nextCategory !== completedCategory) {
                    return (
                      <button
                        onClick={() => {
                          setShowCompletionModal(false);
                          setCurrentCategory(nextCategory);
                          setSelectedCategories([nextCategory]);
                          setCurrentQuestionIndex(0);
                        }}
                        className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Continue to {nextCategory}
                      </button>
                    );
                  }
                  return null;
                })()}

                {/* Back to Category Selection */}
                <button
                  onClick={() => {
                    setShowCompletionModal(false);
                    setAssessmentStarted(false);
                    setCurrentQuestionIndex(0);
                    setSelectedCategories([]);
                    setCurrentCategory(null);
                  }}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Back to Category Selection
                </button>
              </div>

              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800 text-center">
                  💡 Your progress must be saved to view results and continue
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

// Question Component
function AssessmentQuestion({ question, currentAnswer, onAnswer, onPrevious, onNext, isFirst, isLast, isCompleted }: any) {
  const [tempValue, setTempValue] = useState(currentAnswer || (question.type === 'scale' ? 5 : undefined));

  useEffect(() => {
    // Initialize with current answer or default for scale
    setTempValue(currentAnswer || (question.type === 'scale' ? 5 : undefined));
  }, [currentAnswer, question.id, question.type]);

  const handleSubmit = () => {
    if (isCompleted) {
      // Just move to next if completed
      if (!isLast) {
        onNext();
      }
      return;
    }

    // Validate based on question type
    const isValid = tempValue !== undefined && 
                    tempValue !== null && 
                    !(typeof tempValue === 'string' && tempValue === '') &&
                    !(Array.isArray(tempValue) && tempValue.length === 0);
    
    if (isValid) {
      onAnswer(tempValue);
    }
  };

  return (
    <div className={`rounded-lg p-6 ${isCompleted ? 'bg-gray-50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
      {currentAnswer !== undefined && currentAnswer !== null && (
        <div className="mb-4 bg-green-100 border border-green-400 rounded-lg p-3 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-green-800 font-medium">Previously answered ✓</span>
        </div>
      )}
      <div className="mb-4">
        <span className="text-sm font-medium text-blue-600">{question.category}</span>
        <h3 className="text-xl font-bold text-gray-900 mt-2">{question.title}</h3>
        {question.hint && (
          <p className="text-sm text-gray-600 mt-2 italic">💡 {question.hint}</p>
        )}
      </div>

      {/* Scale Type */}
      {question.type === 'scale' && (
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>{question.min}</span>
            <span>{question.max}</span>
          </div>
          <input
            type="range"
            min={question.min}
            max={question.max}
            value={tempValue || 5}
            onChange={(e) => !isCompleted && setTempValue(Number(e.target.value))}
            disabled={isCompleted}
            className={`w-full h-2 bg-gray-200 rounded-lg appearance-none ${isCompleted ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
          />
          <div className="text-center text-2xl font-bold text-blue-600">
            {tempValue || 5}
          </div>
        </div>
      )}

      {/* Multiple Choice */}
      {question.type === 'multiple-choice' && question.options && (
        <div className="space-y-3">
          {question.options.map((option: any) => (
            <button
              key={option.value}
              onClick={() => !isCompleted && setTempValue(option.value)}
              disabled={isCompleted}
              className={`w-full text-left p-4 rounded-lg border-2 transition ${
                tempValue === option.value
                  ? 'border-blue-600 bg-blue-50'
                  : isCompleted
                  ? 'border-gray-200 bg-gray-100 cursor-not-allowed'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mr-3 mt-0.5 ${
                  tempValue === option.value
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-gray-300'
                }`}>
                  {tempValue === option.value && (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
                <span className="text-gray-900">{option.label}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Checkbox Type (Multiple Selection) */}
      {(question.type === 'checkbox' || question.type === 'tech-stack') && question.options && (
        <div className="space-y-3">
          {question.options.map((option: any) => {
            const isChecked = Array.isArray(tempValue) && tempValue.includes(option.value);
            return (
              <button
                key={option.value}
                onClick={() => {
                  if (isCompleted) return;
                  const current = Array.isArray(tempValue) ? tempValue : [];
                  const newValue = isChecked
                    ? current.filter(v => v !== option.value)
                    : [...current, option.value];
                  setTempValue(newValue);
                }}
                disabled={isCompleted}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  isChecked
                    ? 'border-blue-600 bg-blue-50'
                    : isCompleted
                    ? 'border-gray-200 bg-gray-100 cursor-not-allowed'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-5 h-5 rounded border-2 mr-3 mt-0.5 ${
                    isChecked
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {isChecked && (
                      <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <span className="text-gray-900">{option.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between mt-6 pt-4 border-t">
        <button
          onClick={onPrevious}
          disabled={isFirst}
          className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        {isCompleted ? (
          <button
            onClick={() => !isLast && onNext()}
            disabled={isLast}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLast ? 'Review Complete' : 'Next →'}
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={
              tempValue === undefined || 
              tempValue === null || 
              (typeof tempValue === 'string' && tempValue === '') || 
              (Array.isArray(tempValue) && tempValue.length === 0)
            }
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLast ? 'Save Answer' : 'Next →'}
          </button>
        )}
      </div>
    </div>
  );
}

// Results View Component  
function ResultsView({ 
  assessment, 
  onReset, 
  categoryResults, 
  currentCategory,
  viewMode = 'saved',
  unsavedCategories = new Set(),
  questions,
  categories
}: { 
  assessment: UserAssessment | null; 
  onReset: () => void;
  categoryResults?: Record<string, { recommendations: any[], resources: any[] }>;
  currentCategory?: string | null;
  viewMode?: 'saved' | 'preview';
  unsavedCategories?: Set<string>;
  questions: Question[];
  categories: string[];
}) {
  const [topRecommendations, setTopRecommendations] = useState<any[]>([]);
  const [actionPlans, setActionPlans] = useState<any[]>([]);
  const [selectedCategoryView, setSelectedCategoryView] = useState<string | null>(null);

  // Show categories where user has answered at least one question
  const categoriesWithResults = useMemo(() => {
    return assessment
      ? categories.filter((category) => {
          const categoryQuestions = questions.filter((q) => q.category === category);
          return categoryQuestions.some((q) => assessment.responses[q.id] !== undefined);
        })
      : [];
  }, [assessment, questions, categories]);

  useEffect(() => {
    if (assessment) {
      // Determine which category to show
      const categoryToShow = selectedCategoryView || 'all';
      if (categoryToShow && categoryToShow !== 'all') {
        // Generate category-specific recommendations dynamically
        const categoryQuestions = questions.filter(q => q.category === categoryToShow);
        const categoryResponseIds = categoryQuestions.map(q => q.id);
        const categoryOnlyResponses = Object.fromEntries(
          Object.entries(assessment.responses).filter(([qId]) => categoryResponseIds.includes(qId))
        );

        // Calculate category-specific scores
        const { categoryScores: catScores } = calculateScore(categoryOnlyResponses, questions);
        const categoryScore = catScores[categoryToShow] || 0;

        // Generate recommendations for this category only
        const recommendations = getTopRecommendations(
          { [categoryToShow]: categoryScore },
          categoryOnlyResponses,
          categoryScore,
          questions
        );

        setTopRecommendations(recommendations);
        setActionPlans(recommendations);
      } else {
        // Show all categories with results
        const allCategoryRecommendations: any[] = [];
        
        categoriesWithResults.forEach(category => {
          const categoryQuestions = questions.filter(q => q.category === category);
          const categoryResponseIds = categoryQuestions.map(q => q.id);
          const categoryOnlyResponses = Object.fromEntries(
            Object.entries(assessment.responses).filter(([qId]) => categoryResponseIds.includes(qId))
          );

          // Calculate category-specific scores
          const { categoryScores: catScores } = calculateScore(categoryOnlyResponses, questions);
          const categoryScore = catScores[category] || 0;

          // Generate recommendations for this category
          const recommendations = getTopRecommendations(
            { [category]: categoryScore },
            categoryOnlyResponses,
            categoryScore,
            questions
          );

          allCategoryRecommendations.push(...recommendations);
        });
        
        setTopRecommendations(allCategoryRecommendations);
        setActionPlans(allCategoryRecommendations);
      }
    }
  }, [assessment, selectedCategoryView, categoriesWithResults]);

  if (!assessment) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No results yet. Take an assessment to see your results!</p>
        <button
          onClick={onReset}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Start Assessment
        </button>
      </div>
    );
  }

  const skillLevel = getSkillLevel(assessment.overallScore);

  // Default to 'All' tab
  const viewingCategory = selectedCategoryView && selectedCategoryView !== 'all' ? selectedCategoryView : null;

  return (
    <div className="space-y-6">
      {/* Category Selector - Only show categories with results */}
      {categoriesWithResults.length > 0 && (
        <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">View Recommendations by Category:</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategoryView('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                !selectedCategoryView || selectedCategoryView === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📊 All Categories
            </button>
            {categoriesWithResults.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategoryView(category)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  selectedCategoryView === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Click on a category to view its specific recommendations and resources
          </p>
        </div>
      )}

      {/* Category-Specific Banner */}
      {viewingCategory && categoriesWithResults.includes(viewingCategory as any) && (
        <div className="bg-green-100 border-2 border-green-500 rounded-lg p-4 text-center">
          <h3 className="text-lg font-bold text-green-900">
            📋 Showing results for: <span className="text-green-700">{viewingCategory}</span>
          </h3>
          <p className="text-sm text-green-700 mt-1">These recommendations are specific to this category only</p>
        </div>
      )}

      {/* Score Overview */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {viewingCategory && categoriesWithResults.includes(viewingCategory as any)
            ? `${viewingCategory} Score`
            : `Your Overall Score (${categoriesWithResults.length} ${categoriesWithResults.length === 1 ? 'Category' : 'Categories'})`}
        </h2>
        <div className="text-6xl font-bold text-blue-600 my-4">
          {viewingCategory && categoriesWithResults.includes(viewingCategory as any) && assessment.categoryScores[viewingCategory] !== undefined
            ? assessment.categoryScores[viewingCategory].toFixed(1)
            : assessment.overallScore.toFixed(1)
          }<span className="text-3xl text-gray-500">/10</span>
        </div>
        <div className={`inline-block px-4 py-2 rounded-full ${skillLevel.color} bg-opacity-10 font-semibold`}>
          {skillLevel.label}
        </div>
        <p className="mt-2 text-gray-700 italic">{skillLevel.description}</p>
      </div>

      {/* Growth Recommendations & Resources */}
      {topRecommendations.length > 0 ? (
        <div className="bg-white rounded-lg p-6 border-l-4 border-blue-600">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-blue-100 rounded-full p-2">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Personalized Growth Plan</h3>
              <p className="text-gray-600">Based on your assessment, here are the key areas to focus on for maximum impact.</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Areas to Strengthen */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm">Focus Areas</span>
                <span>Strengthen These Skills</span>
              </h4>
              <div className="space-y-3">
                {topRecommendations.map((rec, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </span>
                    <div>
                      <p className="font-medium text-gray-900">{rec.category}</p>
                      <p className="text-sm text-gray-600 mt-1">{rec.description.split('\n\n')[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Plans */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Action Timeline
              </h4>
              <div className="grid gap-4">
                {topRecommendations.map((rec, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-3 h-3 rounded-full ${
                        rec.priority === 'high' ? 'bg-red-500' : 
                        rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                      }`} />
                      <h5 className="font-semibold text-gray-900">{rec.category}</h5>
                    </div>
                    <div className="text-sm text-gray-700 space-y-2 ml-5">
                      {rec.actionPlan.split('\n\n').map((paragraph: string, pIdx: number) => (
                        <p key={pIdx} className="leading-relaxed">{paragraph}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
                Recommended Learning Resources
              </h4>
              <div className="grid md:grid-cols-2 gap-3">
                {(() => {
                  // Consolidate all resources and remove duplicates
                  const allResources = topRecommendations.flatMap(rec => rec.resources || []);
                  const uniqueResources = Array.from(new Map(allResources.map(r => [r.url, r])).values());
                  return uniqueResources.slice(0, 6).map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg hover:border-purple-400 hover:shadow-md transition group"
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                        resource.type === 'course' ? 'bg-purple-100 text-purple-600' :
                        resource.type === 'docs' ? 'bg-blue-100 text-blue-600' :
                        resource.type === 'article' ? 'bg-green-100 text-green-600' :
                        resource.type === 'video' ? 'bg-red-100 text-red-600' :
                        'bg-gray-100 text-gray-600'
                      }`}>
                        {resource.type === 'course' && '🎓'}
                        {resource.type === 'docs' && '📚'}
                        {resource.type === 'article' && '📝'}
                        {resource.type === 'video' && '🎥'}
                        {resource.type === 'book' && '📖'}
                        {resource.type === 'github' && '💻'}
                        {resource.type === 'roadmap' && '🗺️'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-gray-900 group-hover:text-purple-600 transition truncate">
                          {resource.title}
                        </h5>
                        {resource.description && (
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{resource.description}</p>
                        )}
                        <span className="text-xs text-gray-500 mt-1 inline-block capitalize">{resource.type}</span>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ));
                })()}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">Generating recommendations... If this persists, check console for errors.</p>
        </div>
      )}

      {/* Category Scores - Only show on "All Categories" tab */}
      {(!viewingCategory || viewingCategory === 'all') && (
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Category Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(assessment.categoryScores).map(([category, score]) => (
              <div key={category} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-gray-900 text-sm">{category}</h4>
                  <span className="text-lg font-bold text-blue-600">{score.toFixed(1)}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(score / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* New Assessment Button */}
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Take New Assessment
        </button>
      </div>
    </div>
  );
}


