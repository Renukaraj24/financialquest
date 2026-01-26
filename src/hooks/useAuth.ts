import { useState, useCallback, useEffect } from 'react';
import type { User, GameRoute, PersonalInfo, BudgetAllocation } from '@/types/user';
import {
  generateUserId,
  getInputType,
  normalizeIdentifier,
  getUserByIdentifier,
  saveUser,
  getCurrentUser,
  setCurrentUser,
  clearCurrentUser,
  updateUser,
} from '@/lib/storage';

interface AuthResult {
  success: boolean;
  error?: string;
  user?: User;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsLoading(false);
  }, []);

  /**
   * Register a new user
   */
  const register = useCallback((name: string, emailOrPhone: string, password: string): AuthResult => {
    const inputType = getInputType(emailOrPhone);
    if (!inputType) {
      return { success: false, error: 'Please enter a valid email address or phone number' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long' };
    }

    const existingUser = getUserByIdentifier(emailOrPhone);
    if (existingUser) {
      return { success: false, error: 'An account with this email/phone already exists. Please login instead.' };
    }

    const newUser: User = {
      userId: generateUserId(),
      name: name.trim() || null,
      email: inputType === 'email' ? normalizeIdentifier(emailOrPhone) : null,
      phone: inputType === 'phone' ? normalizeIdentifier(emailOrPhone) : null,
      password,
      createdAt: new Date().toISOString(),
      hasPlayedBlind: false,
      hasCompletedLearning: false,
      hasPlayedAware: false,
    };

    if (saveUser(newUser)) {
      setCurrentUser(newUser);
      setUser(newUser);
      return { success: true, user: newUser };
    }

    return { success: false, error: 'Failed to create account. Please try again.' };
  }, []);

  /**
   * Login user
   */
  const login = useCallback((emailOrPhone: string, password: string): AuthResult => {
    const inputType = getInputType(emailOrPhone);
    if (!inputType) {
      return { success: false, error: 'Please enter a valid email address or phone number' };
    }

    const existingUser = getUserByIdentifier(emailOrPhone);
    if (!existingUser) {
      return { success: false, error: 'No account found with this email/phone. Please sign up first.' };
    }

    if (existingUser.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    setCurrentUser(existingUser);
    setUser(existingUser);
    return { success: true, user: existingUser };
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(() => {
    clearCurrentUser();
    setUser(null);
  }, []);

  /**
   * Update user personal info
   */
  const updatePersonalInfo = useCallback((personalInfo: PersonalInfo): boolean => {
    if (!user) return false;
    
    const updatedUser: User = { ...user, personalInfo };
    if (updateUser(updatedUser)) {
      setUser(updatedUser);
      return true;
    }
    return false;
  }, [user]);

  /**
   * Update financial awareness
   */
  const updateFinancialAwareness = useCallback((isFinanciallyLiterate: boolean): boolean => {
    if (!user) return false;
    
    const updatedUser: User = { ...user, isFinanciallyLiterate };
    if (updateUser(updatedUser)) {
      setUser(updatedUser);
      return true;
    }
    return false;
  }, [user]);

  /**
   * Update budget allocation
   */
  const updateBudgetAllocation = useCallback((budget: BudgetAllocation): boolean => {
    if (!user) return false;
    
    const updatedUser: User = { ...user, selfReportedBudget: budget };
    if (updateUser(updatedUser)) {
      setUser(updatedUser);
      return true;
    }
    return false;
  }, [user]);

  /**
   * Update game progress
   */
  const updateGameProgress = useCallback((progress: Partial<Pick<User, 'hasPlayedBlind' | 'hasCompletedLearning' | 'hasPlayedAware'>>): boolean => {
    if (!user) return false;
    
    const updatedUser: User = { ...user, ...progress };
    if (updateUser(updatedUser)) {
      setUser(updatedUser);
      return true;
    }
    return false;
  }, [user]);

  /**
   * Determine next route based on user progress
   */
  const getNextRoute = useCallback((): GameRoute => {
    if (!user) return 'personal-info';

    if (!user.personalInfo) return 'personal-info';
    if (user.isFinanciallyLiterate === undefined) return 'financial-awareness';
    if (user.isFinanciallyLiterate === false && !user.selfReportedBudget) return 'budget-allocation';
    if (!user.hasPlayedBlind) return 'blind-mode';
    if (!user.hasCompletedLearning) return 'learning-mode';
    if (!user.hasPlayedAware) return 'aware-mode';
    return 'results';
  }, [user]);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    register,
    login,
    logout,
    updatePersonalInfo,
    updateFinancialAwareness,
    updateBudgetAllocation,
    updateGameProgress,
    getNextRoute,
  };
}
