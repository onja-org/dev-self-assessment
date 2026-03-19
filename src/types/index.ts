import { Timestamp } from 'firebase/firestore';

export type QuestionType = 'scale' | 'multiple-choice' | 'checkbox' | 'tech-stack';

export interface QuestionOption {
  value: string;
  label: string;
  recommendations: string[];
  scoreWeight: number;
  yearOneRecommendations?: string[];
  mentorExplanation: string;
  resources: Array<{
    title: string;
    url: string;
    type: 'article' | 'video' | 'course' | 'docs' | 'github' | 'book' | 'roadmap';
    description?: string;
  }>;
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
}

export interface Answer {
  value: string | number | string[];
  other?: string;
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
