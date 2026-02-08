import { useState, useCallback, useEffect, useRef } from 'react';
import type { 
  LifeCityGameState, PlayerStats, GameTime, LocationId, 
  GameAction, RandomEvent, LifeCityBadgeId 
} from '@/types/lifeCityGame';
import { 
  INITIAL_PLAYER_STATS, INITIAL_GAME_TIME, GAME_DURATION_DAYS 
} from '@/types/lifeCityGame';
import { 
  LOCATION_ACTIONS, RANDOM_EVENTS, LIFE_CITY_BADGES, getTimeOfDay 
} from '@/data/lifeCityData';

const INITIAL_STATE: LifeCityGameState = {
  isActive: false,
  isPaused: false,
  stats: { ...INITIAL_PLAYER_STATS },
  time: { ...INITIAL_GAME_TIME },
  currentLocation: 'home',
  playerPosition: { x: 1, y: 1 },
  actions: [],
  skillsUnlocked: [],
  gameResult: 'playing',
  badgesEarned: [],
};

export function useLifeCityGame() {
  const [state, setState] = useState<LifeCityGameState>(INITIAL_STATE);
  const [currentEvent, setCurrentEvent] = useState<RandomEvent | null>(null);
  const timerRef = useRef<number | null>(null);

  // Start game
  const startGame = useCallback(() => {
    setState({
      ...INITIAL_STATE,
      isActive: true,
      stats: { ...INITIAL_PLAYER_STATS },
      time: { ...INITIAL_GAME_TIME },
    });
    setCurrentEvent(null);
  }, []);

  // Pause/Resume
  const togglePause = useCallback(() => {
    setState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  // Advance time
  const advanceTime = useCallback((minutes: number) => {
    setState(prev => {
      let newMinute = prev.time.minute + minutes;
      let newHour = prev.time.hour;
      let newDay = prev.time.day;

      while (newMinute >= 60) {
        newMinute -= 60;
        newHour += 1;
      }

      while (newHour >= 24) {
        newHour -= 24;
        newDay += 1;
      }

      // Check win condition
      if (newDay > GAME_DURATION_DAYS) {
        const badgesEarned = calculateBadges(prev.actions, prev.stats);
        return { 
          ...prev, 
          gameResult: 'win', 
          isActive: false,
          badgesEarned,
        };
      }

      // Passive stat changes per hour
      const hoursPassed = Math.floor(minutes / 60);
      const hungerDrain = hoursPassed * 5;
      const energyDrain = hoursPassed * 3;

      const newStats = {
        ...prev.stats,
        hunger: Math.max(0, prev.stats.hunger - hungerDrain),
        energy: Math.max(0, prev.stats.energy - energyDrain),
      };

      // Check fail conditions
      if (newStats.money <= 0 && newStats.bankBalance <= 0) {
        return { ...prev, gameResult: 'fail-money', isActive: false };
      }
      if (newStats.stress >= 100) {
        return { ...prev, gameResult: 'fail-stress', isActive: false };
      }

      // Hunger affects stress
      if (newStats.hunger <= 20) {
        newStats.stress = Math.min(100, newStats.stress + 5);
      }

      return {
        ...prev,
        time: { day: newDay, hour: newHour, minute: newMinute },
        stats: newStats,
      };
    });
  }, []);

  // Real-time clock (1 real second = 1 game minute)
  useEffect(() => {
    if (state.isActive && !state.isPaused && state.gameResult === 'playing') {
      timerRef.current = window.setInterval(() => {
        advanceTime(1);
        
        // Random event chance (5% per minute)
        if (Math.random() < 0.05 && !currentEvent) {
          const event = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
          setCurrentEvent(event);
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.isActive, state.isPaused, state.gameResult, advanceTime, currentEvent]);

  // Move to location
  const moveToLocation = useCallback((locationId: LocationId, position: { x: number; y: number }) => {
    setState(prev => ({
      ...prev,
      currentLocation: locationId,
      playerPosition: position,
    }));
    // Moving takes 30 minutes
    advanceTime(30);
  }, [advanceTime]);

  // Perform action at location
  const performAction = useCallback((actionId: string) => {
    const locationActions = LOCATION_ACTIONS[state.currentLocation];
    const action = locationActions?.find(a => a.id === actionId);
    
    if (!action) return false;

    // Check if player can afford it
    if (action.cost > state.stats.money) {
      return false;
    }

    setState(prev => {
      const newStats = { ...prev.stats };
      
      // Apply effects
      Object.entries(action.effects).forEach(([key, value]) => {
        if (key === 'money') {
          newStats.money = Math.max(0, newStats.money + (value as number));
        } else if (key === 'bankBalance') {
          newStats.bankBalance = Math.max(0, newStats.bankBalance + (value as number));
        } else if (key in newStats) {
          const statKey = key as keyof PlayerStats;
          newStats[statKey] = Math.max(0, Math.min(100, newStats[statKey] + (value as number)));
        }
      });

      // Deduct cost if not already in effects
      if (action.cost > 0 && !action.effects.money) {
        newStats.money = Math.max(0, newStats.money - action.cost);
      }

      // Special handling for withdraw
      if (actionId === 'withdraw-all') {
        newStats.money += prev.stats.bankBalance;
        newStats.bankBalance = 0;
      }

      // Log action
      const gameAction: GameAction = {
        timestamp: { ...prev.time },
        location: prev.currentLocation,
        action: actionId,
        effects: action.effects,
        concept: action.hiddenEffect,
      };

      // Track skills
      const skillsUnlocked = [...prev.skillsUnlocked];
      if (actionId === 'certification' && !skillsUnlocked.includes('certification')) {
        skillsUnlocked.push('certification');
      }

      return {
        ...prev,
        stats: newStats,
        actions: [...prev.actions, gameAction],
        skillsUnlocked,
      };
    });

    // Actions take time
    if (actionId === 'sleep') {
      // Sleep till morning: advance to 8 AM next day
      const hoursToMorning = state.time.hour >= 8 
        ? (24 - state.time.hour + 8) 
        : (8 - state.time.hour);
      advanceTime(hoursToMorning * 60);
    } else if (actionId === 'rest') {
      advanceTime(120); // 2 hours
    } else if (actionId === 'attend-class' || actionId === 'short-course') {
      advanceTime(120); // 2 hours
    } else if (actionId === 'certification') {
      advanceTime(180); // 3 hours
    } else if (actionId === 'movie') {
      advanceTime(150); // 2.5 hours
    } else {
      advanceTime(30); // Default 30 minutes
    }

    return true;
  }, [state.currentLocation, state.stats.money, state.time.hour, advanceTime]);

  // Handle random event response
  const handleEventResponse = useCallback((optionId: string) => {
    if (!currentEvent) return;

    const option = currentEvent.options.find(o => o.id === optionId);
    if (!option) return;

    setState(prev => {
      const newStats = { ...prev.stats };
      
      Object.entries(option.effects).forEach(([key, value]) => {
        if (key === 'money') {
          newStats.money = Math.max(0, newStats.money + (value as number));
        } else if (key in newStats) {
          const statKey = key as keyof PlayerStats;
          newStats[statKey] = Math.max(0, Math.min(100, newStats[statKey] + (value as number)));
        }
      });

      const gameAction: GameAction = {
        timestamp: { ...prev.time },
        location: prev.currentLocation,
        action: optionId,
        effects: option.effects,
        concept: currentEvent.type === 'scam' ? 'scam-awareness' : undefined,
      };

      return {
        ...prev,
        stats: newStats,
        actions: [...prev.actions, gameAction],
      };
    });

    setCurrentEvent(null);
  }, [currentEvent]);

  // Calculate badges at end
  const calculateBadges = (actions: GameAction[], stats: PlayerStats): LifeCityBadgeId[] => {
    return LIFE_CITY_BADGES
      .filter(badge => badge.condition(actions, stats))
      .map(badge => badge.id);
  };

  // Reset game
  const resetGame = useCallback(() => {
    setState(INITIAL_STATE);
    setCurrentEvent(null);
  }, []);

  return {
    state,
    currentEvent,
    startGame,
    togglePause,
    moveToLocation,
    performAction,
    handleEventResponse,
    resetGame,
    getTimeOfDay: () => getTimeOfDay(state.time.hour),
  };
}
