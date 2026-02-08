// Life City Game Types

export interface PlayerStats {
  money: number;
  bankBalance: number;
  hunger: number; // 0-100
  stress: number; // 0-100
  energy: number; // 0-100
}

export interface GameTime {
  day: number;
  hour: number; // 0-23
  minute: number;
}

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export type LocationId = 'home' | 'food-street' | 'college' | 'bank' | 'skill-center' | 'entertainment';

export interface Location {
  id: LocationId;
  name: string;
  emoji: string;
  description: string;
  x: number; // grid position
  y: number;
}

export interface LocationAction {
  id: string;
  name: string;
  description: string;
  cost: number;
  effects: Partial<PlayerStats>;
  requirements?: Partial<PlayerStats>;
  hiddenEffect?: string;
}

export interface RandomEvent {
  id: string;
  title: string;
  description: string;
  emoji: string;
  type: 'expense' | 'income' | 'scam' | 'opportunity';
  options: {
    id: string;
    text: string;
    effects: Partial<PlayerStats>;
    outcome: string;
  }[];
}

export interface GameAction {
  timestamp: GameTime;
  location: LocationId;
  action: string;
  effects: Partial<PlayerStats>;
  concept?: string; // Hidden financial concept being tested
}

export type LifeCityBadgeId = 'survivor' | 'asset-builder' | 'impulse-breaker' | 'calm-pressure' | 'saver' | 'balanced';

export interface LifeCityBadge {
  id: LifeCityBadgeId;
  name: string;
  emoji: string;
  description: string;
  condition: (actions: GameAction[], stats: PlayerStats) => boolean;
}

export interface LifeCityGameState {
  isActive: boolean;
  isPaused: boolean;
  stats: PlayerStats;
  time: GameTime;
  currentLocation: LocationId;
  playerPosition: { x: number; y: number };
  actions: GameAction[];
  skillsUnlocked: string[];
  gameResult: 'playing' | 'win' | 'fail-money' | 'fail-stress';
  badgesEarned: LifeCityBadgeId[];
}

export const INITIAL_PLAYER_STATS: PlayerStats = {
  money: 5000,
  bankBalance: 0,
  hunger: 70,
  stress: 20,
  energy: 100,
};

export const INITIAL_GAME_TIME: GameTime = {
  day: 1,
  hour: 8,
  minute: 0,
};

export const GAME_DURATION_DAYS = 7; // Survive 7 in-game days
