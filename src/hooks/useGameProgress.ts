import { useState, useCallback, useEffect, useMemo } from 'react';
import type { GameProgress, LevelProgress } from '@/types/gameProgress';
import { INITIAL_GAME_PROGRESS } from '@/types/gameProgress';
import { calculateLiteracyPercentage, getTotalXP } from '@/data/gameData';
import { useAuthContext } from '@/contexts/AuthContext';

const BASE_PROGRESS_KEY = 'financial_game_progress';
const PROGRESS_OWNER_KEY = `${BASE_PROGRESS_KEY}:owner`;

function buildProgressKey(userId: string | null | undefined) {
  return userId ? `${BASE_PROGRESS_KEY}:${userId}` : BASE_PROGRESS_KEY;
}

export function useGameProgress() {
  const { user } = useAuthContext();

  const progressKey = useMemo(() => buildProgressKey(user?.userId), [user?.userId]);

  const [progress, setProgress] = useState<GameProgress>(INITIAL_GAME_PROGRESS);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage (scoped per user)
  useEffect(() => {
    setIsLoading(true);
    setProgress(INITIAL_GAME_PROGRESS);

    // If no user is logged in, keep initial progress.
    if (!user?.userId) {
      setIsLoading(false);
      return;
    }

    try {
      const saved = localStorage.getItem(progressKey);
      if (saved) {
        setProgress(JSON.parse(saved));
        setIsLoading(false);
        return;
      }

      // Legacy migration (single shared key) → assign to first user that claims it.
      const legacy = localStorage.getItem(BASE_PROGRESS_KEY);
      if (legacy) {
        const owner = localStorage.getItem(PROGRESS_OWNER_KEY);
        if (!owner || owner === user.userId) {
          localStorage.setItem(progressKey, legacy);
          localStorage.setItem(PROGRESS_OWNER_KEY, user.userId);
          setProgress(JSON.parse(legacy));
        }
      }
    } catch (error) {
      console.error('Error loading game progress:', error);
    }

    setIsLoading(false);
  }, [progressKey, user?.userId]);

  const persistProgress = useCallback(
    (newProgress: GameProgress) => {
      if (!user?.userId) return;
      try {
        localStorage.setItem(progressKey, JSON.stringify(newProgress));
        localStorage.setItem(PROGRESS_OWNER_KEY, user.userId);
      } catch (error) {
        console.error('Error saving game progress:', error);
      }
    },
    [progressKey, user?.userId]
  );

  // Complete a level
  const completeLevel = useCallback(
    (levelId: number, levelProgress: LevelProgress) => {
      setProgress((prev) => {
        const completedLevels = prev.completedLevels.includes(levelId)
          ? prev.completedLevels
          : [...prev.completedLevels, levelId];

        const allTerms = new Set([...prev.totalTermsUnlocked, ...levelProgress.termsUnlocked]);

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
              completedAt: new Date().toISOString(),
            },
          },
          totalXP: getTotalXP(completedLevels),
          totalTermsUnlocked: Array.from(allTerms),
          badgesEarned,
          literacyPercentage: calculateLiteracyPercentage(completedLevels),
          lastPlayedAt: new Date().toISOString(),
        };

        persistProgress(newProgress);
        return newProgress;
      });
    },
    [persistProgress]
  );

  // Reset progress
  const resetProgress = useCallback(() => {
    setProgress(() => {
      persistProgress(INITIAL_GAME_PROGRESS);
      return INITIAL_GAME_PROGRESS;
    });
  }, [persistProgress]);

  // Check if a level is unlocked
  const isLevelUnlocked = useCallback(
    (levelId: number) => {
      if (levelId === 1) return true;
      return progress.completedLevels.includes(levelId - 1);
    },
    [progress.completedLevels]
  );

  // Check if a level is completed
  const isLevelCompleted = useCallback(
    (levelId: number) => {
      return progress.completedLevels.includes(levelId);
    },
    [progress.completedLevels]
  );

  return {
    progress,
    isLoading,
    completeLevel,
    resetProgress,
    isLevelUnlocked,
    isLevelCompleted,
  };
}

