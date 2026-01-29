import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, Star, Zap, Award, BookOpen, Target, 
  Sparkles, ChevronRight, Home, RotateCcw
} from 'lucide-react';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGameProgress } from '@/hooks/useGameProgress';
import { GAME_LEVELS, BADGES } from '@/data/gameData';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

export default function GameComplete() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthContext();
  const { progress, resetProgress } = useGameProgress();

  useEffect(() => {
    // Celebration confetti
    if (progress.completedLevels.length === GAME_LEVELS.length) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#00d4ff', '#00ffcc', '#ff00ff']
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#00d4ff', '#00ffcc', '#ff00ff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [progress.completedLevels.length]);

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const isComplete = progress.completedLevels.length === GAME_LEVELS.length;

  const handlePlayAgain = () => {
    resetProgress();
    navigate('/level/1');
  };

  return (
    <GameLayout>
      <div className="max-w-lg mx-auto space-y-6">
        {/* Celebration Header */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="w-28 h-28 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
          >
            <Trophy className="w-14 h-14 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="text-3xl font-black text-gradient uppercase tracking-wider mb-2">
              {isComplete ? 'Journey Complete!' : 'Great Progress!'}
            </h1>
            <p className="text-lg text-primary font-bold">🏆 Money-Ready Adult</p>
          </motion.div>
        </motion.div>

        {/* Mentor Message */}
        <motion.div 
          className="game-card scanlines"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-violet-400 mb-2">Final Message from Money Mentor</p>
              <p className="text-foreground leading-relaxed">
                {user?.personalInfo?.name ? `${user.personalInfo.name}, ` : ''}
                {isComplete 
                  ? "You've completed all 10 levels! You now understand income, expenses, saving, investing, risks, scams, and wealth building. You're not an expert yet — but you know how to handle money wisely. That's a superpower!"
                  : "Great job on your progress so far! Keep going to complete all levels and unlock your full financial potential."
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Final Stats */}
        <motion.div 
          className="game-card scanlines"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="section-header mb-4">Your Achievement Summary</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-primary/10 to-cyan-500/5 border border-primary/20">
              <Target className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-3xl font-black text-gradient">{progress.literacyPercentage}%</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Financial Literacy</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-yellow-400/10 to-amber-500/5 border border-yellow-400/20">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-3xl font-black text-yellow-400">{progress.totalXP}</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Total XP</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/30">
              <Award className="w-6 h-6 text-purple-400" />
              <div>
                <p className="text-lg font-black text-foreground">{progress.badgesEarned.length}/{BADGES.length}</p>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Badges Earned</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/30">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              <div>
                <p className="text-lg font-black text-foreground">{progress.totalTermsUnlocked.length}</p>
                <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Terms Learned</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* All Badges Earned */}
        <motion.div 
          className="game-card scanlines"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="section-header mb-4">Badges Collection</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {BADGES.map((badge, index) => {
              const isEarned = progress.badgesEarned.includes(badge.id);
              return (
                <motion.div
                  key={badge.id}
                  className={`p-3 rounded-lg text-center ${
                    isEarned 
                      ? 'bg-primary/10 border border-primary/30' 
                      : 'bg-muted/20 border border-border/30 opacity-40'
                  }`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: isEarned ? 1 : 0.4, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                >
                  <span className="text-2xl">{badge.emoji}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-gradient w-full flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </button>
          
          <button
            onClick={() => navigate('/badges')}
            className="btn-outline-primary w-full flex items-center justify-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            View All Badges
          </button>

          {isComplete && (
            <button
              onClick={handlePlayAgain}
              className="w-full py-3 px-6 text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Play Again
            </button>
          )}
        </motion.div>
      </div>
    </GameLayout>
  );
}
