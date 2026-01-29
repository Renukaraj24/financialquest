export interface LevelProgress {
  levelId: number;
  completed: boolean;
  score: number;
  choicesMade: {
    scenarioId: string;
    choiceId: string;
    effect: 'positive' | 'neutral' | 'negative';
  }[];
  termsUnlocked: string[];
  moneyLeft: number;
  xpEarned: number;
  completedAt?: string;
}

export interface GameProgress {
  currentLevel: number;
  completedLevels: number[];
  levelProgress: Record<number, LevelProgress>;
  totalXP: number;
  totalTermsUnlocked: string[];
  badgesEarned: number[];
  literacyPercentage: number;
  lastPlayedAt?: string;
}

export const INITIAL_GAME_PROGRESS: GameProgress = {
  currentLevel: 1,
  completedLevels: [],
  levelProgress: {},
  totalXP: 0,
  totalTermsUnlocked: [],
  badgesEarned: [],
  literacyPercentage: 0
};
