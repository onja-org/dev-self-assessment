import { Timestamp } from 'firebase/firestore';

export type QuestionType = 'scale' | 'multiple-choice' | 'checkbox' | 'tech-stack';

export type ResourceType = 'article' | 'video' | 'course' | 'docs' | 'github' | 'book' | 'roadmap';

// Standalone Resource (stored in resources collection)
export interface Resource {
  id: string;
  title: string;
  url: string;
  type: ResourceType;
  description?: string;
  categoryId: string; // Associated category
  // Optional metadata for enhanced filtering and recommendations
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  duration?: string; // e.g., "10 min", "2 hours", "4 weeks"
  author?: string;
  createdAt: Timestamp | any;
  updatedAt?: Timestamp | any;
}

// Inline resource object (for backward compatibility)
export interface InlineResource {
  title: string;
  url: string;
  type: ResourceType;
  description?: string;
}

export interface QuestionOption {
  value: string;
  label: string;
  recommendations: string[];
  scoreWeight: number;
  yearOneRecommendations?: string[];
  mentorExplanation: string;
  // Supports both inline resources (backward compatible) and resource IDs
  resources: Array<InlineResource>;
  resourceIds?: string[]; // References to Resource collection
  isCorrect?: boolean;
  isCommonMistake?: boolean;
}

export interface Question {
  id: string;
  title: string;
  category: string;
  type: QuestionType;
  min?: number;
  max?: number;
  options?: QuestionOption[];
  followUpQuestion?: string;
  hint?: string;
  allowOther?: boolean; // Enable "Other" option for multiple-choice and checkbox questions
  assessmentIds?: string[]; // Array of assessment template IDs this question belongs to. Empty/null = available to all
}

export interface Answer {
  value: string | number | string[];
  other?: string; // For legacy tech-stack follow-ups
  otherText?: string; // For "Other" option custom text input
  followUp?: string;
  recommendations: string[];
  scoreWeight: number;
}

// Assessment Template (Created by Admin)
export interface AssessmentTemplate {
  id: string;
  name: string; // e.g., "Developer Assessment 2026"
  description?: string;
  questions: Question[]; // Each template has its own questions
  isActive: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  createdBy: string; // Admin UID
  version: string; // e.g., "2026", "2027-Q1"
}

// User's Assessment Response (Developer's submission)
export interface UserAssessment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  assessmentTemplateId: string; // Reference to AssessmentTemplate
  assessmentName: string; // Cached from template for easier querying
  assessmentVersion: string; // Cached from template
  createdAt: Timestamp;
  completedAt?: Timestamp;
  responses: Record<string, Answer>;
  categoryScores: Record<string, number>;
  overallScore: number;
  status: 'in-progress' | 'completed';
  questionCountAtCompletion?: number; // Track how many questions existed when assessment was completed/saved
}

// Legacy Assessment type (for backward compatibility)
export interface Assessment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  createdAt: Timestamp;
  version: number; // Test version number for this developer
  responses: Record<string, Answer>;
  categoryScores: Record<string, number>;
  overallScore: number;
}

export interface User {
  uid: string;
  name: string;
  email: string;
  role: 'developer' | 'admin';
  createdAt: Timestamp;
}

export interface Admin {
  uid: string;
  name: string;
  email: string;
}

export interface ActionPlan {
  category: string;
  shortTerm: string[]; // 90-day goals
  longTerm: string[]; // 12-month roadmap
}

export interface ScoreLevel {
  id: string;
  key: string; // e.g., 'BEGINNER', 'JUNIOR', 'INTERMEDIATE', 'UPPER_INTERMEDIATE'
  min: number;
  max: number;
  label: string;
  color: string; // Tailwind class e.g., 'text-red-600'
  description: string;
  order: number; // For sorting
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'assessment_updated' | 'new_questions';
  assessmentTemplateId: string;
  assessmentName: string;
  message: string;
  questionsAdded: number; // Number of new questions added since user's completion
  previousQuestionCount: number; // How many questions existed when user completed
  currentQuestionCount: number; // Current total questions in template
  createdAt: Timestamp;
  read: boolean;
  dismissed: boolean;
}
