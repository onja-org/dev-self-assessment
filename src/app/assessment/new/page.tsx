'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, Timestamp, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Answer, Question } from '@/types';
import { calculateScore } from '@/lib/scoreCalculator';

export default function NewAssessmentPage() {
  const { userProfile } = useAuth();
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, Answer>>({});
  const [currentAnswer, setCurrentAnswer] = useState<string | number | string[]>('');
  const [followUpAnswer, setFollowUpAnswer] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [saving, setSaving] = useState(false);

  // Fetch questions from Firestore
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'questions'));
        const firestoreQuestions = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Question[];
        
        // If no questions in Firestore, fallback to constants (for backward compatibility)
        if (firestoreQuestions.length === 0) {
          const { QUESTIONS } = await import('@/lib/constants');
          setQuestions(QUESTIONS);
        } else {
          setQuestions(firestoreQuestions);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        // Fallback to constants if fetch fails
        const { QUESTIONS } = await import('@/lib/constants');
        setQuestions(QUESTIONS);
      } finally {
        setQuestionsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  // Show loading state while questions are being fetched
  if (questionsLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading assessment questions...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const getSelectedOption = () => {
    if (!currentQuestion.options) return null;
    
    if (currentQuestion.type === 'checkbox' && Array.isArray(currentAnswer)) {
      return currentQuestion.options.filter(opt => currentAnswer.includes(opt.value));
    }
    
    return currentQuestion.options.find(opt => opt.value === currentAnswer);
  };

  const handleNext = () => {
    if (!currentAnswer) return;

    const selectedOptions = getSelectedOption();
    let recommendations: string[] = [];
    let scoreWeight = 0;

    if (currentQuestion.type === 'checkbox' && Array.isArray(selectedOptions)) {
      recommendations = selectedOptions.flatMap(opt => opt.recommendations);
      scoreWeight = selectedOptions.reduce((sum, opt) => sum + opt.scoreWeight, 0);
    } else if (selectedOptions && !Array.isArray(selectedOptions)) {
      recommendations = selectedOptions.recommendations;
      scoreWeight = selectedOptions.scoreWeight;
    } else if (currentQuestion.type === 'scale') {
      scoreWeight = (Number(currentAnswer) / (currentQuestion.max || 10));
      if (scoreWeight < 0.4) {
        recommendations = ['Focus on building foundational skills', 'Seek mentorship opportunities'];
      } else if (scoreWeight < 0.7) {
        recommendations = ['Continue practicing and learning', 'Take on more challenging projects'];
      } else {
        recommendations = ['Share knowledge with others', 'Lead technical initiatives'];
      }
    }

    const answer: Answer = {
      value: currentAnswer,
      followUp: followUpAnswer || undefined,
      recommendations,
      scoreWeight,
    };

    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));

    setShowRecommendations(true);
  };

  const handleContinue = () => {
    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentAnswer('');
      setFollowUpAnswer('');
      setShowRecommendations(false);
    }
  };

  const handleSubmit = async () => {
    if (!userProfile) return;

    setSaving(true);
    try {
      const { categoryScores, overallScore } = calculateScore(responses);

      // Get the latest version number for this user
      const q = query(
        collection(db, 'assessments'),
        where('userId', '==', userProfile.uid),
        orderBy('version', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const latestVersion = querySnapshot.empty ? 0 : querySnapshot.docs[0].data().version;
      const newVersion = latestVersion + 1;

      await addDoc(collection(db, 'assessments'), {
        userId: userProfile.uid,
        userName: userProfile.name,
        userEmail: userProfile.email,
        createdAt: Timestamp.now(),
        version: newVersion,
        responses,
        categoryScores,
        overallScore,
      });

      router.push('/assessment/result?new=true');
    } catch (error) {
      console.error('Error saving assessment:', error);
      alert('Failed to save assessment. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const renderQuestionInput = () => {
    switch (currentQuestion.type) {
      case 'scale':
        return (
          <div className="space-y-4">
            <input
              type="range"
              min={currentQuestion.min || 1}
              max={currentQuestion.max || 10}
              value={currentAnswer || currentQuestion.min || 1}
              onChange={(e) => setCurrentAnswer(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>{currentQuestion.min || 1}</span>
              <span className="text-2xl font-bold text-blue-600">{currentAnswer || currentQuestion.min || 1}</span>
              <span>{currentQuestion.max || 10}</span>
            </div>
          </div>
        );

      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => setCurrentAnswer(option.value)}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  currentAnswer === option.value
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    currentAnswer === option.value ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {currentAnswer === option.value && (
                      <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                    )}
                  </div>
                  <span className="font-medium text-gray-900">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  const current = Array.isArray(currentAnswer) ? currentAnswer : [];
                  if (current.includes(option.value)) {
                    setCurrentAnswer(current.filter(v => v !== option.value));
                  } else {
                    setCurrentAnswer([...current, option.value]);
                  }
                }}
                className={`w-full text-left p-4 rounded-lg border-2 transition ${
                  Array.isArray(currentAnswer) && currentAnswer.includes(option.value)
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300 bg-white'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                    Array.isArray(currentAnswer) && currentAnswer.includes(option.value)
                      ? 'border-blue-600 bg-blue-600'
                      : 'border-gray-300'
                  }`}>
                    {Array.isArray(currentAnswer) && currentAnswer.includes(option.value) && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium text-gray-900">{option.label}</span>
                </div>
              </button>
            ))}
          </div>
        );

      case 'tech-stack':
        return (
          <div className="space-y-4">
            <div className="space-y-3">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    const current = Array.isArray(currentAnswer) ? currentAnswer : [];
                    if (current.includes(option.value)) {
                      setCurrentAnswer(current.filter(v => v !== option.value));
                    } else {
                      setCurrentAnswer([...current, option.value]);
                    }
                  }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition ${
                    Array.isArray(currentAnswer) && currentAnswer.includes(option.value)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300 bg-white'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center ${
                      Array.isArray(currentAnswer) && currentAnswer.includes(option.value)
                        ? 'border-blue-600 bg-blue-600'
                        : 'border-gray-300'
                    }`}>
                      {Array.isArray(currentAnswer) && currentAnswer.includes(option.value) && (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className="font-medium text-gray-900">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
            {Array.isArray(currentAnswer) && currentAnswer.length > 0 && currentQuestion.followUpQuestion && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {currentQuestion.followUpQuestion}
                </label>
                <textarea
                  value={followUpAnswer}
                  onChange={(e) => setFollowUpAnswer(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="E.g., React - 3 years, Node.js - 2 years"
                />
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full mb-4">
                {currentQuestion.category}
              </span>
              <h2 className="text-2xl font-bold text-gray-900">
                {currentQuestion.title}
              </h2>
            </div>

            {!showRecommendations ? (
              <>
                {currentQuestion.hint && (
                  <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <p className="text-sm text-blue-800">
                      <span className="font-semibold">💡 Hint: </span>
                      {currentQuestion.hint}
                    </p>
                  </div>
                )}
                {renderQuestionInput()}
                <div className="mt-8 flex justify-end">
                  <button
                    onClick={handleNext}
                    disabled={!currentAnswer}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    Show Guidance
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Mentor Explanation */}
                {(() => {
                  const selectedOptions = getSelectedOption();
                  const mentorExplanation = Array.isArray(selectedOptions) 
                    ? selectedOptions[0]?.mentorExplanation 
                    : selectedOptions?.mentorExplanation;
                  
                  if (mentorExplanation) {
                    return (
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6 mb-6">
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-2xl">
                              👨‍💻
                            </div>
                          </div>
                          <div className="ml-4 flex-1">
                            <h3 className="text-lg font-semibold text-purple-900 mb-2">
                              Your Mentor's Take
                            </h3>
                            <p className="text-purple-800 leading-relaxed">
                              {mentorExplanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}

                {/* Recommendations */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
                    <span className="text-2xl mr-2">🎯</span>
                    Action Items for You
                  </h3>
                  <ul className="space-y-2">
                    {responses[currentQuestion.id]?.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-600 mr-2 mt-1">•</span>
                        <span className="text-green-800">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                {(() => {
                  const selectedOptions = getSelectedOption();
                  let allResources: Array<{ title: string; url: string; type: string; description?: string }> = [];
                  
                  if (Array.isArray(selectedOptions)) {
                    allResources = selectedOptions.flatMap(opt => opt.resources || []);
                  } else if (selectedOptions && selectedOptions.resources) {
                    allResources = selectedOptions.resources;
                  }

                  if (allResources.length > 0) {
                    return (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-semibold text-amber-900 mb-4 flex items-center">
                          <span className="text-2xl mr-2">📚</span>
                          Curated Learning Resources
                        </h3>
                        <div className="grid gap-3">
                          {allResources.map((resource, idx) => (
                            <a
                              key={idx}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-start p-3 bg-white rounded-lg hover:shadow-md transition group"
                            >
                              <div className="flex-shrink-0 mr-3">
                                {resource.type === 'docs' && <span className="text-2xl">📖</span>}
                                {resource.type === 'article' && <span className="text-2xl">📝</span>}
                                {resource.type === 'video' && <span className="text-2xl">🎥</span>}
                                {resource.type === 'course' && <span className="text-2xl">🎓</span>}
                                {resource.type === 'github' && <span className="text-2xl">💻</span>}
                                {resource.type === 'book' && <span className="text-2xl">📕</span>}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-amber-900 group-hover:text-amber-700">
                                  {resource.title}
                                </h4>
                                {resource.description && (
                                  <p className="text-sm text-amber-700 mt-1">
                                    {resource.description}
                                  </p>
                                )}
                                <span className="inline-flex items-center text-xs text-amber-600 mt-1">
                                  <span className="uppercase font-semibold">{resource.type}</span>
                                  <span className="ml-2">→</span>
                                </span>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">
                    {isLastQuestion ? 'Ready to see your results?' : `${questions.length - currentQuestionIndex - 1} questions remaining`}
                  </p>
                  <button
                    onClick={handleContinue}
                    disabled={saving}
                    className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  >
                    {saving ? 'Saving...' : isLastQuestion ? '🎉 View My Results' : 'Next Question →'}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
