import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trophy, Star, Zap, ChevronRight, Lock, CheckCircle, 
  Target, BookOpen, Award, Play
} from 'lucide-react';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGameProgress } from '@/hooks/useGameProgress';
import { GAME_LEVELS, BADGES } from '@/data/gameData';
import { Progress } from '@/components/ui/progress';

export default function GameDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthContext();
  const { progress, isLevelUnlocked, isLevelCompleted } = useGameProgress();

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const currentLevel = GAME_LEVELS.find(l => l.id === progress.currentLevel) || GAME_LEVELS[0];
  const completedCount = progress.completedLevels.length;
  const totalLevels = GAME_LEVELS.length;

  const handleContinue = () => {
    if (progress.currentLevel <= 5) {
      navigate(`/level/${progress.currentLevel}`);
    } else {
      navigate('/game-complete');
    }
  };

  const handleLevelClick = (levelId: number) => {
    if (isLevelUnlocked(levelId)) {
      navigate(`/level/${levelId}`);
    }
  };

  return (
    <GameLayout>
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-[10px] uppercase tracking-widest text-primary mb-1">Financial Journey</p>
          <h1 className="text-2xl font-black text-gradient uppercase tracking-wider">
            Game Dashboard
          </h1>
          {user?.personalInfo?.name && (
            <p className="text-sm text-muted-foreground mt-1">Welcome back, {user.personalInfo.name}!</p>
          )}
        </motion.div>

        {/* Progress Overview */}
        <motion.div 
          className="game-card scanlines"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-primary">Financial Literacy</p>
              <p className="text-3xl font-black text-gradient">{progress.literacyPercentage}%</p>
            </div>
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
              <Target className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground uppercase tracking-wider">Progress</span>
              <span className="text-primary font-bold">{completedCount}/{totalLevels} Levels</span>
            </div>
            <Progress value={(completedCount / totalLevels) * 100} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-lg bg-card/50 border border-border/30">
              <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
              <p className="text-lg font-black text-foreground">{progress.totalXP}</p>
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Total XP</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-card/50 border border-border/30">
              <Award className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <p className="text-lg font-black text-foreground">{progress.badgesEarned.length}</p>
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Badges</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-card/50 border border-border/30">
              <BookOpen className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <p className="text-lg font-black text-foreground">{progress.totalTermsUnlocked.length}</p>
              <p className="text-[9px] uppercase tracking-widest text-muted-foreground">Terms</p>
            </div>
          </div>
        </motion.div>

        {/* Continue Button */}
        {progress.currentLevel <= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={handleContinue}
              className="btn-gradient w-full flex items-center justify-center gap-3 py-4"
            >
              <Play className="w-5 h-5" />
              <div className="text-left">
                <p className="text-xs opacity-80">Continue to</p>
                <p className="font-bold">Level {currentLevel.id}: {currentLevel.name}</p>
              </div>
              <ChevronRight className="w-5 h-5 ml-auto" />
            </button>
          </motion.div>
        )}

        {/* Level Grid */}
        <motion.div
          className="game-card scanlines"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="section-header mb-4">All Levels</h2>
          <div className="grid grid-cols-2 gap-3">
            {GAME_LEVELS.map((level, index) => {
              const unlocked = isLevelUnlocked(level.id);
              const completed = isLevelCompleted(level.id);
              const LevelIcon = level.badge.icon;

              return (
                <motion.button
                  key={level.id}
                  onClick={() => handleLevelClick(level.id)}
                  disabled={!unlocked}
                  className={`relative p-4 rounded-lg border text-left transition-all ${
                    completed 
                      ? 'bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500/50'
                      : unlocked
                      ? 'bg-primary/5 border-primary/30 hover:border-primary/50 hover:bg-primary/10'
                      : 'bg-muted/20 border-border/30 cursor-not-allowed opacity-60'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  whileHover={unlocked ? { scale: 1.02 } : undefined}
                  whileTap={unlocked ? { scale: 0.98 } : undefined}
                >
                  {/* Status Icon */}
                  <div className="absolute top-2 right-2">
                    {completed ? (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    ) : !unlocked ? (
                      <Lock className="w-4 h-4 text-muted-foreground" />
                    ) : null}
                  </div>

                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                    completed
                      ? 'bg-gradient-to-br from-emerald-400 to-green-500'
                      : unlocked
                      ? 'bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20'
                      : 'bg-muted/30'
                  }`}>
                    <LevelIcon className={`w-5 h-5 ${completed ? 'text-white' : unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Level {level.id}</p>
                  <p className={`text-sm font-bold ${completed ? 'text-emerald-400' : unlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {level.name}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div 
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => navigate('/badges')}
            className="p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
          >
            <Trophy className="w-6 h-6 text-yellow-400 mb-2" />
            <p className="text-sm font-bold text-foreground">Badges</p>
            <p className="text-xs text-muted-foreground">{progress.badgesEarned.length}/{BADGES.length} earned</p>
          </button>
          
          <button
            onClick={() => navigate('/terms-glossary')}
            className="p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
          >
            <BookOpen className="w-6 h-6 text-cyan-400 mb-2" />
            <p className="text-sm font-bold text-foreground">Glossary</p>
            <p className="text-xs text-muted-foreground">{progress.totalTermsUnlocked.length} terms</p>
          </button>
        </motion.div>
      </div>
    </GameLayout>
  );
}
