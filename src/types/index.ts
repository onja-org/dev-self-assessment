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

export interface Assessment {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  createdAt: Timestamp;
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
