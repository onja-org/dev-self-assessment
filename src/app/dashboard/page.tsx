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

  // Get filtered questions based on selected categories
  const filteredQuestions = selectedCategories.length === 0
    ? QUESTIONS 
    : QUESTIONS.filter(q => selectedCategories.includes(q.category));

  const currentQuestion = filteredQuestions[currentQuestionIndex];
  const progress = filteredQuestions.length > 0 ? ((currentQuestionIndex + 1) / filteredQuestions.length) * 100 : 0;

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
      } catch (error) {
        console.error('Error fetching assessments:', error);
      }
    };

    fetchAssessments();
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
        questionId: question.id,
        value,
        scoreWeight,
        recommendations: [],
      }
    };

    setResponses(newResponses);

    // Move to next question or finish
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmitAssessment = async () => {
    if (!userProfile) return;

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
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAssessment = () => {
    setResponses({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setSelectedCategories([]);
    setAssessmentStarted(false);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const startAssessment = () => {
    if (selectedCategories.length === 0) {
      // If no categories selected, use all questions
      setSelectedCategories([]);
    }
    setAssessmentStarted(true);
    setCurrentQuestionIndex(0);
    setResponses({});
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
                            
                            return (
                              <button
                                key={category}
                                onClick={() => toggleCategory(category)}
                                className={`p-4 rounded-lg border-2 transition-all text-left ${
                                  isSelected
                                    ? 'border-blue-600 bg-blue-50 shadow-md'
                                    : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow'
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className={`font-semibold mb-1 ${
                                      isSelected ? 'text-blue-900' : 'text-gray-900'
                                    }`}>
                                      {category}
                                    </h4>
                                    <p className={`text-sm ${
                                      isSelected ? 'text-blue-600' : 'text-gray-600'
                                    }`}>
                                      {count} question{count !== 1 ? 's' : ''}
                                    </p>
                                  </div>
                                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                    isSelected
                                      ? 'border-blue-600 bg-blue-600'
                                      : 'border-gray-300'
                                  }`}>
                                    {isSelected && (
                                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                  </div>
                                </div>
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
                    {/* Progress Bar */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <button
                          onClick={() => {
                            if (confirm('Are you sure you want to go back? Your progress will be lost.')) {
                              resetAssessment();
                            }
                          }}
                          className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
                        >
                          ← Back to Category Selection
                        </button>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          {selectedCategories.length > 0 && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                              {selectedCategories.length} categor{selectedCategories.length !== 1 ? 'ies' : 'y'}
                            </span>
                          )}
                        </div>
                      </div>
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
                      <div className="flex justify-center pt-6 border-t">
                        <button
                          onClick={handleSubmitAssessment}
                          disabled={isSubmitting}
                          className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
                  <ResultsView assessment={latestAssessment} onReset={resetAssessment} />
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
  const [tempValue, setTempValue] = useState(currentAnswer);

  useEffect(() => {
    setTempValue(currentAnswer);
  }, [currentAnswer, question.id]);

  const handleSubmit = () => {
    if (tempValue !== undefined && tempValue !== null && tempValue !== '') {
      onAnswer(tempValue);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
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
          disabled={tempValue === undefined || tempValue === null || tempValue === '' || (Array.isArray(tempValue) && tempValue.length === 0)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLast ? 'Save Answer' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

// Results View Component  
function ResultsView({ assessment, onReset }: { assessment: Assessment | null; onReset: () => void }) {
  const [topRecommendations, setTopRecommendations] = useState<any[]>([]);
  const [actionPlans, setActionPlans] = useState<any[]>([]);

  useEffect(() => {
    if (assessment) {
      const plans = generateActionPlans(assessment.categoryScores, assessment.responses);
      setActionPlans(plans);

      const topRecs = getTopRecommendations(assessment.categoryScores, assessment.responses, assessment.overallScore);
      setTopRecommendations(topRecs);
    }
  }, [assessment]);

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

  return (
    <div className="space-y-6">
      {/* Score Overview */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Overall Score</h2>
        <div className="text-6xl font-bold text-blue-600 my-4">
          {assessment.overallScore.toFixed(1)}<span className="text-3xl text-gray-500">/10</span>
        </div>
        <div className={`inline-block px-4 py-2 rounded-full ${skillLevel.color} bg-opacity-10 font-semibold`}>
          {skillLevel.label}
        </div>
        <p className="mt-2 text-gray-700 italic">{skillLevel.description}</p>
      </div>

      {/* Top 3 Recommendations */}
      {topRecommendations.length > 0 && (
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">🎯 Top 3 Growth Recommendations</h3>
          <div className="space-y-4">
            {topRecommendations.map((rec, idx) => (
              <details key={idx} className="border border-gray-200 rounded-lg">
                <summary className="cursor-pointer p-4 hover:bg-gray-50 font-semibold">
                  #{idx + 1} {rec.title}
                </summary>
                <div className="p-4 border-t bg-gray-50 space-y-3">
                  <p className="text-gray-700 text-sm whitespace-pre-line">{rec.description}</p>
                  {rec.actionPlan && (
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <p className="text-xs font-semibold text-green-900 mb-1">📋 Action Plan</p>
                      <p className="text-xs text-green-900 whitespace-pre-line">{rec.actionPlan}</p>
                    </div>
                  )}
                  {rec.resources && rec.resources.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-700 mb-2">📚 Resources:</p>
                      <div className="space-y-1">
                        {rec.resources.map((resource: any, rIdx: number) => (
                          <a
                            key={rIdx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-xs text-blue-600 hover:underline"
                          >
                            • {resource.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </details>
            ))}
          </div>
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
