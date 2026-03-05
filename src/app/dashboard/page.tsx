'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { QUESTIONS, CATEGORIES, getSkillLevel } from '@/lib/constants';
import { Answer, Assessment } from '@/types';
import { calculateScore, getTopRecommendations, generateActionPlans } from '@/lib/scoreCalculator';
import { collection, addDoc, query, where, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function DashboardPage() {
  const { userProfile, signOut } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'assessment' | 'results' | 'history'>('assessment');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, Answer>>({});
  const [latestAssessment, setLatestAssessment] = useState<Assessment | null>(null);
  const [assessmentHistory, setAssessmentHistory] = useState<Assessment[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [categoryResults, setCategoryResults] = useState<Record<string, { recommendations: any[], resources: any[] }>>({});

  // Get filtered questions based on selected categories
  const filteredQuestions = selectedCategories.length === 0
    ? QUESTIONS 
    : QUESTIONS.filter(q => selectedCategories.includes(q.category));

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const progress = filteredQuestions.length > 0 ? ((currentQuestionIndex + 1) / filteredQuestions.length) * 100 : 0;

  // Helper function to check if a category is completed
  const isCategoryCompleted = (category: string) => {
    const categoryQuestions = QUESTIONS.filter(q => q.category === category);
    // Check current responses OR latest assessment responses
    const currentComplete = categoryQuestions.every(q => responses[q.id] !== undefined);
    const latestComplete = latestAssessment 
      ? categoryQuestions.every(q => latestAssessment.responses[q.id] !== undefined)
      : false;
    return currentComplete || latestComplete;
  };

  // Get all completed categories
  const completedCategories = Object.values(CATEGORIES).filter(cat => isCategoryCompleted(cat));

  // Get next incomplete category
  const getNextIncompleteCategory = () => {
    const allCategories = Object.values(CATEGORIES);
    return allCategories.find(cat => !isCategoryCompleted(cat)) || null;
  };

  // Fetch latest assessment and history
  useEffect(() => {
    const fetchAssessments = async () => {
      if (!userProfile) return;

      try {
        const q = query(
          collection(db, 'assessments'),
          where('userId', '==', userProfile.uid),
          orderBy('createdAt', 'desc')
        );

        const querySnapshot = await getDocs(q);
        const assessments = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Assessment[];

        setAssessmentHistory(assessments);
        if (assessments.length > 0) {
          setLatestAssessment(assessments[0]);
        }
      } catch (error: any) {
        console.error('Error fetching assessments:', error);
        // Silently handle index building errors - assessments will load once index is ready
        if (error?.code === 'failed-precondition' || error?.message?.includes('index')) {
          console.log('Firestore index is still building. Assessment history will load once ready.');
        }
      }
    };

    fetchAssessments();
    
    // Load saved responses from localStorage
    try {
      const saved = localStorage.getItem('assessment_responses');
      if (saved) {
        const savedResponses = JSON.parse(saved);
        setResponses(savedResponses);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, [userProfile]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const handleAnswer = (value: string | number | string[]) => {
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

    // Save to localStorage for persistence
    try {
      localStorage.setItem('assessment_responses', JSON.stringify(newResponses));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
 
    // Move to next question or show completion
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Category completed - check if we should move to next category
      
      // Generate category-specific recommendations
      if (currentCategory) {
        generateCategoryRecommendations(currentCategory, newResponses);
      }
      
      // Show completion message and offer next steps
      setTimeout(() => {
        const nextCategory = getNextIncompleteCategory();
        if (nextCategory && nextCategory !== currentCategory) {
          // Offer to move to next category
          const moveToNext = confirm(
            `🎉 ${currentCategory || 'Category'} completed!\n\n` +
            `Would you like to continue with "${nextCategory}"?\n\n` +
            `• Click OK to continue\n` +
            `• Click Cancel to return to category selection`
          );
          
          if (moveToNext) {
            setCurrentCategory(nextCategory);
            setSelectedCategories([nextCategory]);
            setCurrentQuestionIndex(0);
          } else {
            // Go back to category selection
            setAssessmentStarted(false);
            setCurrentQuestionIndex(0);
          }
        } else {
          // All categories complete
          alert(
            `🎉 Congratulations! You've completed all categories!\n\n` +
            `Click "Back to Category Selection" to see your progress,\n` +
            `or submit your assessment to save and view detailed results.`
          );
          const submitButton = document.getElementById('submit-assessment-btn');
          if (submitButton) {
            submitButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }, 500);
    }
  };

  const handleSubmitAssessment = async () => {
    if (!userProfile) {
      alert('Error: User profile not loaded. Please refresh the page and try again.');
      return;
    }

    setIsSubmitting(true);
    try {
      const { categoryScores, overallScore } = calculateScore(responses);

      const assessment: Omit<Assessment, 'id'> = {
        userId: userProfile.uid,
        userName: userProfile.name,
        userEmail: userProfile.email,
        responses,
        categoryScores,
        overallScore,
        createdAt: Timestamp.now(),
      };

      const docRef = await addDoc(collection(db, 'assessments'), assessment);
      
      const newAssessment = { id: docRef.id, ...assessment } as Assessment;
      setLatestAssessment(newAssessment);
      setShowResults(true);
      setActiveTab('results');
      
      // Refresh history
      setAssessmentHistory([newAssessment, ...assessmentHistory]);
      
      // Clear localStorage after successful submission
      localStorage.removeItem('assessment_responses');
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate category-specific recommendations
  const generateCategoryRecommendations = (category: string, currentResponses: Record<string, Answer>) => {
    const categoryQuestions = QUESTIONS.filter(q => q.category === category);
    const categoryResponseIds = categoryQuestions.map(q => q.id);
    const categoryOnlyResponses = Object.fromEntries(
      Object.entries(currentResponses).filter(([qId]) => categoryResponseIds.includes(qId))
    );

    // Calculate category-specific scores
    const { categoryScores } = calculateScore(categoryOnlyResponses);
    const categoryScore = categoryScores[category] || 0;

    // Generate recommendations for this category only
    const recommendations = getTopRecommendations(
      { [category]: categoryScore },
      categoryOnlyResponses,
      categoryScore
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
    const completed = isCategoryCompleted(category);
    
    if (completed) {
      // If category is completed, switch to it to review answers
      setCurrentCategory(category);
      setSelectedCategories([category]);
      setAssessmentStarted(true);
      setCurrentQuestionIndex(0);
      setShowResults(false);
      
      // Load responses from latest assessment or current responses
      if (latestAssessment && latestAssessment.responses) {
        // Merge latest assessment responses with current responses
        setResponses(prev => ({
          ...prev,
          ...latestAssessment.responses
        }));
      }
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

  const categories = Object.values(CATEGORIES);
  const allAnswered = filteredQuestions.every(q => responses[q.id] !== undefined);

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
                    onClick={() => setActiveTab('assessment')}
                    className={`py-4 px-6 text-sm font-medium border-b-2 transition ${
                      activeTab === 'assessment'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    📝 Take Assessment
                  </button>
                  <button
                    onClick={() => setActiveTab('results')}
                    className={`py-4 px-6 text-sm font-medium border-b-2 transition ${
                      activeTab === 'results'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    📊 Results
                  </button>
                  <button
                    onClick={() => setActiveTab('history')}
                    className={`py-4 px-6 text-sm font-medium border-b-2 transition ${
                      activeTab === 'history'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    📈 History
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
                        
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            Select Categories to Assess
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Choose one or more categories, or leave all unselected to take the full assessment ({QUESTIONS.length} questions).
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {categories.map(category => {
                            const count = QUESTIONS.filter(q => q.category === category).length;
                            const isSelected = selectedCategories.includes(category);
                            const isCompleted = isCategoryCompleted(category);
                            
                            return (
                              <button
                                key={category}
                                onClick={() => toggleCategory(category)}
                                className={`p-4 rounded-lg border-2 transition-all text-left relative ${
                                  isCompleted
                                    ? 'border-green-500 bg-green-50 shadow-md'
                                    : isSelected
                                    ? 'border-blue-600 bg-blue-50 shadow-md'
                                    : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow'
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className={`font-semibold mb-1 ${
                                      isCompleted ? 'text-green-900' : isSelected ? 'text-blue-900' : 'text-gray-900'
                                    }`}>
                                      {category}
                                      {isCompleted && <span className="ml-2 text-xs text-green-600">✓ Completed</span>}
                                    </h4>
                                    <p className={`text-sm ${
                                      isCompleted ? 'text-green-600' : isSelected ? 'text-blue-600' : 'text-gray-600'
                                    }`}>
                                      {count} question{count !== 1 ? 's' : ''}
                                    </p>
                                  </div>
                                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    isCompleted
                                      ? 'border-green-600 bg-green-600'
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
                                {isCompleted && (
                                  <div className="mt-2 text-xs text-green-700 font-medium">
                                    Click to review answers
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
                                    <strong>Full Assessment:</strong> You'll answer all {QUESTIONS.length} questions covering all skill areas.
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
                            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-lg text-lg"
                          >
                            🚀 Get Started
                          </button>
                        </div>
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
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Question {currentQuestionIndex + 1} of {filteredQuestions.length}</span>
                        <span>{Math.round(progress)}% Complete</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
                      />
                    )}

                    {/* Submit Button */}
                    {allAnswered && (
                      <div id="submit-assessment-btn" className="flex flex-col items-center pt-6 border-t">
                        <div className="mb-4 flex items-center gap-2 text-green-600">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold">All questions answered!</span>
                        </div>
                        <button
                          onClick={handleSubmitAssessment}
                          disabled={isSubmitting}
                          className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg animate-pulse"
                        >
                          {isSubmitting ? 'Submitting...' : '✅ Submit Assessment & View Results'}
                        </button>
                      </div>
                    )}

                    {filteredQuestions.length > 0 && !allAnswered && (
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
                    assessment={latestAssessment} 
                    onReset={resetAssessment} 
                    categoryResults={categoryResults}
                    currentCategory={currentCategory}
                  />
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                  <HistoryView assessments={assessmentHistory} onViewResult={(assessment) => {
                    setLatestAssessment(assessment);
                    setActiveTab('results');
                  }} />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

// Question Component
function AssessmentQuestion({ question, currentAnswer, onAnswer, onPrevious, onNext, isFirst, isLast }: any) {
  const [tempValue, setTempValue] = useState(currentAnswer || (question.type === 'scale' ? 5 : undefined));

  useEffect(() => {
    // Initialize with current answer or default for scale
    setTempValue(currentAnswer || (question.type === 'scale' ? 5 : undefined));
  }, [currentAnswer, question.id, question.type]);

  const handleSubmit = () => {
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
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
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
            onChange={(e) => setTempValue(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
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
              onClick={() => setTempValue(option.value)}
              className={`w-full text-left p-4 rounded-lg border-2 transition ${
                tempValue === option.value
                  ? 'border-blue-600 bg-blue-50'
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

      {/* Tech Stack (Checkbox) */}
      {question.type === 'tech-stack' && question.options && (
        <div className="space-y-3">
          {question.options.map((option: any) => {
            const isChecked = Array.isArray(tempValue) && tempValue.includes(option.value);
            return (
              <button
                key={option.value}
                onClick={() => {
                  const current = Array.isArray(tempValue) ? tempValue : [];
                  const newValue = isChecked
                    ? current.filter(v => v !== option.value)
                    : [...current, option.value];
                  setTempValue(newValue);
                }}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  isChecked
                    ? 'border-blue-600 bg-blue-50'
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
      </div>
    </div>
  );
}

// Results View Component  
function ResultsView({ 
  assessment, 
  onReset, 
  categoryResults, 
  currentCategory 
}: { 
  assessment: Assessment | null; 
  onReset: () => void;
  categoryResults?: Record<string, { recommendations: any[], resources: any[] }>;
  currentCategory?: string | null;
}) {
  const [topRecommendations, setTopRecommendations] = useState<any[]>([]);
  const [actionPlans, setActionPlans] = useState<any[]>([]);
  const [selectedCategoryView, setSelectedCategoryView] = useState<string | null>(null);

  // Get list of categories that have results
  const categoriesWithResults = categoryResults ? Object.keys(categoryResults) : [];

  useEffect(() => {
    if (assessment) {
      // Determine which category to show
      const categoryToShow = selectedCategoryView || currentCategory;
      
      // If viewing a specific category, show only that category's results
      if (categoryToShow && categoryResults && categoryResults[categoryToShow]) {
        setTopRecommendations(categoryResults[categoryToShow].recommendations);
        setActionPlans(categoryResults[categoryToShow].recommendations);
      } else {
        // Show all results
        const plans = generateActionPlans(assessment.categoryScores, assessment.responses);
        setActionPlans(plans);

        const topRecs = getTopRecommendations(assessment.categoryScores, assessment.responses, assessment.overallScore);
        setTopRecommendations(topRecs);
      }
    }
  }, [assessment, currentCategory, categoryResults, selectedCategoryView]);

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

  const viewingCategory = selectedCategoryView || currentCategory;

  return (
    <div className="space-y-6">
      {/* Category Selector - Show if multiple categories have results */}
      {categoriesWithResults.length > 0 && (
        <div className="bg-white rounded-lg p-4 border-2 border-blue-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">View Recommendations by Category:</h4>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategoryView(null)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                !selectedCategoryView && !currentCategory
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
                  (selectedCategoryView || currentCategory) === category
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
      {viewingCategory && (
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
          {viewingCategory ? `${viewingCategory} Score` : 'Your Overall Score'}
        </h2>
        <div className="text-6xl font-bold text-blue-600 my-4">
          {viewingCategory && assessment.categoryScores[viewingCategory] 
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

      {/* Category Scores */}
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

// History View Component
function HistoryView({ assessments, onViewResult }: { assessments: Assessment[]; onViewResult: (assessment: Assessment) => void }) {
  if (assessments.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No assessment history yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Assessment History</h3>
      <div className="space-y-3">
        {assessments.map((assessment, idx) => {
          const date = assessment.createdAt?.toDate?.() || new Date();
          const skillLevel = getSkillLevel(assessment.overallScore);
          
          return (
            <div key={assessment.id || idx} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-blue-600">{assessment.overallScore.toFixed(1)}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${skillLevel.color} bg-opacity-10`}>
                      {skillLevel.label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {date.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                <button
                  onClick={() => onViewResult(assessment)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
