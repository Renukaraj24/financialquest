export interface PersonalInfo {
  name: string;
  dob: string;
  age: number;
  gender: 'male' | 'female' | 'prefer-not-to-say';
  educationStatus: 'school-student' | 'college-student' | 'postgraduate' | 'other';
  incomeSources: string[];
  incomeRange: 'less-than-2000' | '2000-5000' | '5000-10000' | 'more-than-10000';
}

export interface BudgetAllocation {
  food: number;
  travel: number;
  mobile: number;
  entertainment: number;
  education: number;
  other: number;
  total: number;
}

export interface User {
  userId: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  password: string;
  createdAt: string;
  
  // Game progress flags
  hasPlayedBlind: boolean;
  hasCompletedLearning: boolean;
  hasPlayedAware: boolean;
  
  // Personal information (collected after signup)
  personalInfo?: PersonalInfo;
  
  // Financial awareness
  isFinanciallyLiterate?: boolean;
  
  // Budget allocation (if not financially literate)
  selfReportedBudget?: BudgetAllocation;
}

export type GameRoute = 
  | 'personal-info'
  | 'financial-awareness'
  | 'budget-allocation'
  | 'blind-mode'
  | 'learning-mode'
  | 'aware-mode'
  | 'results';
