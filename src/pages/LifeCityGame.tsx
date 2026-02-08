import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, ArrowLeft, MapPin, Clock, Wallet, Target } from 'lucide-react';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGameProgress } from '@/hooks/useGameProgress';
import { useLifeCityGame } from '@/hooks/useLifeCityGame';
import { PlayerStatsBar } from '@/components/life-city/PlayerStatsBar';
import { CityMap } from '@/components/life-city/CityMap';
import { LocationPanel } from '@/components/life-city/LocationPanel';
import { RandomEventModal } from '@/components/life-city/RandomEventModal';
import { GameEndSummary } from '@/components/life-city/GameEndSummary';
import { GAME_DURATION_DAYS } from '@/types/lifeCityGame';
import { useEffect } from 'react';
import { GAME_LEVELS } from '@/data/gameData';

export default function LifeCityGame() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { isLoading: progressLoading, isLevelCompleted } = useGameProgress();
  
  const {
    state,
    currentEvent,
    startGame,
    togglePause,
    moveToLocation,
    performAction,
    handleEventResponse,
    resetGame,
  } = useLifeCityGame();

  // Gate: Must complete Level 5 to access
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    if (!progressLoading && !isLevelCompleted(GAME_LEVELS.length)) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, progressLoading, isLevelCompleted, navigate]);

  if (!isAuthenticated || progressLoading) {
    return null;
  }

  // Show end summary if game ended
  if (state.gameResult !== 'playing' && !state.isActive) {
    return <GameEndSummary state={state} onPlayAgain={startGame} />;
  }

  // Intro screen before game starts
  if (!state.isActive) {
    return (
      <GameLayout>
        <div className="max-w-lg mx-auto space-y-6">
          {/* Header */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div 
              className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-primary to-accent rounded-2xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              <MapPin className="w-12 h-12 text-primary-foreground" />
            </motion.div>

            <h1 className="text-2xl font-black text-gradient uppercase tracking-wider mb-2">
              Life City
            </h1>
            <p className="text-sm text-muted-foreground">Student Edition</p>
          </motion.div>

          {/* Game Description */}
          <motion.div 
            className="game-card scanlines"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="section-header mb-4">The Simulation</h2>
            <p className="text-sm text-foreground leading-relaxed mb-4">
              Welcome to Life City! You'll live as a student for <span className="text-primary font-bold">{GAME_DURATION_DAYS} days</span>. 
              Move around the city, manage your money, eat when hungry, rest when tired, and survive!
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 p-2 bg-card/50 rounded border border-border/30">
                <Wallet className="w-4 h-4 text-yellow-400" />
                <span className="text-xs">Starting: ₹5,000</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-card/50 rounded border border-border/30">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-xs">Duration: {GAME_DURATION_DAYS} days</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-card/50 rounded border border-border/30">
                <Target className="w-4 h-4 text-emerald-400" />
                <span className="text-xs">Goal: Survive!</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-card/50 rounded border border-border/30">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span className="text-xs">6 Locations</span>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded p-3">
              <p className="text-[10px] uppercase tracking-widest text-amber-400 mb-1">Win Condition</p>
              <p className="text-xs text-foreground">Survive all {GAME_DURATION_DAYS} days without running out of money or maxing stress!</p>
            </div>
          </motion.div>

          {/* Locations Preview */}
          <motion.div 
            className="game-card scanlines"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="section-header mb-4">Explore</h2>
            <div className="grid grid-cols-3 gap-2">
              {[
                { emoji: '🏠', name: 'Home' },
                { emoji: '🍔', name: 'Food Street' },
                { emoji: '🏫', name: 'College' },
                { emoji: '🏦', name: 'Bank' },
                { emoji: '📚', name: 'Skills' },
                { emoji: '🎮', name: 'Fun' },
              ].map((loc) => (
                <div key={loc.name} className="text-center p-2 bg-card/50 rounded border border-border/30">
                  <span className="text-xl">{loc.emoji}</span>
                  <p className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1">{loc.name}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={startGame}
              className="btn-gradient w-full flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5" />
              Start Simulation
            </button>
            
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-outline-primary w-full flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>
          </motion.div>
        </div>
      </GameLayout>
    );
  }

  // Main game screen
  return (
    <div className="min-h-screen bg-gradient-game pb-4">
      {/* Stats Bar */}
      <PlayerStatsBar 
        stats={state.stats}
        time={state.time}
        isPaused={state.isPaused}
        onTogglePause={togglePause}
      />

      {/* Pause Overlay */}
      {state.isPaused && (
        <motion.div 
          className="fixed inset-0 z-40 bg-background/90 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-center">
            <p className="text-2xl font-black text-primary uppercase tracking-widest mb-4">Paused</p>
            <button onClick={togglePause} className="btn-gradient">
              Resume Game
            </button>
          </div>
        </motion.div>
      )}

      {/* Game Content */}
      <div className="pt-24 px-4 max-w-lg mx-auto">
        {/* City Map */}
        <CityMap
          currentLocation={state.currentLocation}
          playerPosition={state.playerPosition}
          onMoveToLocation={moveToLocation}
        />

        {/* Location Actions */}
        <LocationPanel
          currentLocation={state.currentLocation}
          stats={state.stats}
          onPerformAction={performAction}
        />
      </div>

      {/* Random Event Modal */}
      <RandomEventModal 
        event={currentEvent}
        onRespond={handleEventResponse}
      />
    </div>
  );
}
