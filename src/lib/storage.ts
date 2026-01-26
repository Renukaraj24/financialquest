import type { User } from '@/types/user';

const STORAGE_KEY = 'financial_game_users';
const SESSION_KEY = 'current_user';

/**
 * Generate a unique user ID
 */
export function generateUserId(): string {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  return email.includes('@') && email.includes('.');
}

/**
 * Validate phone format
 */
export function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  return /^\+?\d{10,}$/.test(cleaned);
}

/**
 * Check if input is email or phone
 */
export function getInputType(input: string): 'email' | 'phone' | null {
  const cleaned = input.trim();
  if (isValidEmail(cleaned)) return 'email';
  if (isValidPhone(cleaned)) return 'phone';
  return null;
}

/**
 * Normalize identifier for storage
 */
export function normalizeIdentifier(identifier: string): string {
  const type = getInputType(identifier);
  if (type === 'phone') {
    let cleaned = identifier.replace(/[\s\-\(\)]/g, '');
    if (!cleaned.startsWith('+')) {
      cleaned = '+' + cleaned;
    }
    return cleaned.toLowerCase();
  }
  return identifier.trim().toLowerCase();
}

/**
 * Get all users from localStorage
 */
export function getAllUsers(): Record<string, User> {
  try {
    const usersJson = localStorage.getItem(STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : {};
  } catch (error) {
    console.error('Error reading users from localStorage:', error);
    return {};
  }
}

/**
 * Save all users to localStorage
 */
export function saveAllUsers(users: Record<string, User>): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    return true;
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
    return false;
  }
}

/**
 * Get user by identifier
 */
export function getUserByIdentifier(identifier: string): User | null {
  const normalized = normalizeIdentifier(identifier);
  const users = getAllUsers();
  return users[normalized] || null;
}

/**
 * Save a user
 */
export function saveUser(user: User): boolean {
  const users = getAllUsers();
  const normalizedIdentifier = normalizeIdentifier(user.email || user.phone || '');
  users[normalizedIdentifier] = user;
  return saveAllUsers(users);
}

/**
 * Get current logged-in user from session storage
 */
export function getCurrentUser(): User | null {
  try {
    const userJson = sessionStorage.getItem(SESSION_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Error reading current user:', error);
    return null;
  }
}

/**
 * Set current logged-in user
 */
export function setCurrentUser(user: User): boolean {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Error saving current user:', error);
    return false;
  }
}

/**
 * Clear current user session
 */
export function clearCurrentUser(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

/**
 * Update user in both localStorage and sessionStorage
 */
export function updateUser(user: User): boolean {
  if (saveUser(user)) {
    setCurrentUser(user);
    return true;
  }
  return false;
}

/**
 * Calculate budget from income range
 */
export function calculateBudgetFromIncomeRange(incomeRange: string): number {
  const budgetMap: Record<string, number> = {
    'less-than-2000': 1500,
    '2000-5000': 3500,
    '5000-10000': 7500,
    'more-than-10000': 12000,
  };
  return budgetMap[incomeRange] || 5000;
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Format currency for display (Indian Rupees)
 */
export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}
