import { useState, useCallback, useEffect } from 'react';
import type { GameProgress, LevelProgress, INITIAL_GAME_PROGRESS } from '@/types/gameProgress';
import { calculateLiteracyPercentage, getTotalXP, getUnlockedTerms } from '@/data/gameData';

const PROGRESS_KEY = 'financial_game_progress';

export function useGameProgress() {
  const [progress, setProgress] = useState<GameProgress>({
    currentLevel: 1,
    completedLevels: [],
    levelProgress: {},
    totalXP: 0,
    totalTermsUnlocked: [],
    badgesEarned: [],
    literacyPercentage: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setProgress(parsed);
      }
    } catch (error) {
      console.error('Error loading game progress:', error);
    }
    setIsLoading(false);
  }, []);

  // Save progress to localStorage
  const saveProgress = useCallback((newProgress: GameProgress) => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('Error saving game progress:', error);
    }
  }, []);

  // Complete a level
  const completeLevel = useCallback((levelId: number, levelProgress: LevelProgress) => {
    setProgress(prev => {
      const completedLevels = prev.completedLevels.includes(levelId)
        ? prev.completedLevels
        : [...prev.completedLevels, levelId];

      const allTerms = new Set([
        ...prev.totalTermsUnlocked,
        ...levelProgress.termsUnlocked
      ]);

      const badgesEarned = prev.badgesEarned.includes(levelId)
        ? prev.badgesEarned
        : [...prev.badgesEarned, levelId];

      const newProgress: GameProgress = {
        ...prev,
        currentLevel: Math.max(prev.currentLevel, levelId + 1),
        completedLevels,
        levelProgress: {
          ...prev.levelProgress,
          [levelId]: {
            ...levelProgress,
            completedAt: new Date().toISOString()
          }
        },
        totalXP: getTotalXP(completedLevels),
        totalTermsUnlocked: Array.from(allTerms),
        badgesEarned,
        literacyPercentage: calculateLiteracyPercentage(completedLevels),
        lastPlayedAt: new Date().toISOString()
      };

      saveProgress(newProgress);
      return newProgress;
    });
  }, [saveProgress]);

  // Reset progress
  const resetProgress = useCallback(() => {
    const initial: GameProgress = {
      currentLevel: 1,
      completedLevels: [],
      levelProgress: {},
      totalXP: 0,
      totalTermsUnlocked: [],
      badgesEarned: [],
      literacyPercentage: 0
    };
    saveProgress(initial);
  }, [saveProgress]);

  // Check if a level is unlocked
  const isLevelUnlocked = useCallback((levelId: number) => {
    if (levelId === 1) return true;
    return progress.completedLevels.includes(levelId - 1);
  }, [progress.completedLevels]);

  // Check if a level is completed
  const isLevelCompleted = useCallback((levelId: number) => {
    return progress.completedLevels.includes(levelId);
  }, [progress.completedLevels]);

  return {
    progress,
    isLoading,
    completeLevel,
    resetProgress,
    isLevelUnlocked,
    isLevelCompleted
  };
}
