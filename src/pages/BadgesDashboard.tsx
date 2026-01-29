import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Lock, Trophy, Sparkles, Star } from 'lucide-react';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGameProgress } from '@/hooks/useGameProgress';
import { BADGES, GAME_LEVELS } from '@/data/gameData';

export default function BadgesDashboard() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { progress } = useGameProgress();

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const earnedCount = progress.badgesEarned.length;
  const totalBadges = BADGES.length;

  return (
    <GameLayout>
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-lg bg-card/50 border border-border/50 flex items-center justify-center hover:border-primary/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-primary">Achievement Showcase</p>
            <h1 className="text-2xl font-black text-gradient uppercase tracking-wider">
              Your Badges
            </h1>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="game-card scanlines"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Badges Collected</p>
              <p className="text-3xl font-black text-gradient">{earnedCount}/{totalBadges}</p>
            </div>
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400/20 to-amber-500/10 border border-yellow-400/30 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
          
          {earnedCount === totalBadges ? (
            <motion.div 
              className="mt-4 p-3 rounded-lg bg-gradient-to-r from-yellow-400/10 to-amber-500/10 border border-yellow-400/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <p className="text-sm font-bold text-yellow-400">Congratulations! You've collected all badges!</p>
              </div>
            </motion.div>
          ) : (
            <p className="text-sm text-muted-foreground mt-2">
              Complete more levels to unlock badges!
            </p>
          )}
        </motion.div>

        {/* Badges Grid */}
        <motion.div
          className="game-card scanlines"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="section-header mb-6">All Badges</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {BADGES.map((badge, index) => {
              const isEarned = progress.badgesEarned.includes(badge.id);
              const level = GAME_LEVELS.find(l => l.id === badge.levelRequired);
              const BadgeIcon = badge.icon;

              return (
                <motion.div
                  key={badge.id}
                  className={`relative p-4 rounded-xl text-center transition-all ${
                    isEarned 
                      ? 'bg-gradient-to-br from-primary/10 to-cyan-500/5 border border-primary/30'
                      : 'bg-muted/20 border border-border/30'
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  {/* Badge Icon */}
                  <motion.div 
                    className={`w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center ${
                      isEarned
                        ? 'bg-gradient-to-br from-primary to-cyan-400'
                        : 'bg-muted/30'
                    }`}
                    animate={isEarned ? {
                      boxShadow: ['0 0 10px hsl(var(--primary) / 0.3)', '0 0 20px hsl(var(--primary) / 0.5)', '0 0 10px hsl(var(--primary) / 0.3)']
                    } : undefined}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {isEarned ? (
                      <BadgeIcon className="w-8 h-8 text-white" />
                    ) : (
                      <Lock className="w-6 h-6 text-muted-foreground" />
                    )}
                  </motion.div>

                  {/* Badge Info */}
                  <div className="space-y-1">
                    <p className="text-lg">{badge.emoji}</p>
                    <p className={`text-sm font-bold ${isEarned ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {badge.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      Level {badge.levelRequired}
                    </p>
                    {level && (
                      <p className="text-xs text-muted-foreground/70">
                        {level.name}
                      </p>
                    )}
                  </div>

                  {/* Earned Indicator */}
                  {isEarned && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', delay: 0.3 + index * 0.05 }}
                    >
                      <Star className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Mentor Message */}
        <motion.div 
          className="p-4 rounded-lg bg-card/50 border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-1">Money Mentor</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {earnedCount === 0 
                  ? "Start your journey to earn your first badge! Each level completed brings a new achievement."
                  : earnedCount < totalBadges / 2
                  ? "Great start! Keep going — every badge represents real financial knowledge you've gained."
                  : earnedCount < totalBadges
                  ? "Amazing progress! You're becoming financially savvy. The final badges await!"
                  : "You've mastered all levels! You're now equipped with essential financial knowledge for life."
                }
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </GameLayout>
  );
}
