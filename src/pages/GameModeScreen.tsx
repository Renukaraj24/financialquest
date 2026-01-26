import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { Play, BookOpen, Target, BarChart3, LogOut, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameModeScreenProps {
  mode: 'blind' | 'learning' | 'aware' | 'results';
}

const MODE_CONFIG = {
  blind: {
    title: 'Blind Mode',
    description: 'Make decisions without any guidance. Trust your instincts! 🎲',
    icon: Play,
    emoji: '🎯',
    gradient: 'from-orange-400 to-rose-400',
    nextLabel: 'Start Adventure',
    progressKey: 'hasPlayedBlind' as const,
  },
  learning: {
    title: 'Learning Mode',
    description: 'Discover amazing financial tips and strategies! 📚',
    icon: BookOpen,
    emoji: '📖',
    gradient: 'from-cyan-400 to-blue-400',
    nextLabel: 'Start Learning',
    progressKey: 'hasCompletedLearning' as const,
  },
  aware: {
    title: 'Aware Mode',
    description: 'Apply your knowledge like a pro! You got this! 💪',
    icon: Target,
    emoji: '🎯',
    gradient: 'from-emerald-400 to-teal-400',
    nextLabel: 'Show Your Skills',
    progressKey: 'hasPlayedAware' as const,
  },
  results: {
    title: 'Your Results',
    description: 'See how much you\'ve grown! Amazing progress! 🌟',
    icon: BarChart3,
    emoji: '🏆',
    gradient: 'from-violet-400 to-purple-400',
    nextLabel: 'View Results',
    progressKey: null,
  },
};

export default function GameModeScreen({ mode }: GameModeScreenProps) {
  const navigate = useNavigate();
  const { user, updateGameProgress, getNextRoute, logout, isAuthenticated } = useAuthContext();
  
  const config = MODE_CONFIG[mode];
  const Icon = config.icon;

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleComplete = () => {
    if (config.progressKey) {
      updateGameProgress({ [config.progressKey]: true });
    }
    const nextRoute = getNextRoute();
    navigate(`/${nextRoute}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <GameLayout>
      <div className="game-card text-center">
        {/* Animated emoji header */}
        <motion.div 
          className="emoji-badge mx-auto mb-6"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {config.emoji}
        </motion.div>

        {/* Icon with gradient background */}
        <motion.div 
          className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-lg`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold text-gradient mb-3">
          {config.title}
        </h2>
        <p className="text-muted-foreground text-base mb-8 max-w-sm mx-auto">
          {config.description}
        </p>

        {/* User info card */}
        {user && (
          <motion.div 
            className="budget-summary text-left"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Playing as
            </p>
            <p className="font-bold text-foreground">
              {user.personalInfo?.name || user.name || user.email || user.phone} 🎮
            </p>
          </motion.div>
        )}

        {mode === 'results' ? (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="success-box">
              <h3 className="font-bold mb-2">Congratulations! 🎉</h3>
              <p className="text-sm">
                You've completed all game modes! Your financial superpowers are unlocked! 💎
              </p>
            </div>
            <button onClick={handleLogout} className="btn-outline-primary w-full flex items-center justify-center gap-2">
              <LogOut className="w-4 h-4" />
              Start Fresh
            </button>
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button 
              onClick={handleComplete} 
              className="btn-gradient w-full"
              whileTap={{ scale: 0.98 }}
            >
              {config.nextLabel} ✨
            </motion.button>
            <p className="text-xs text-muted-foreground">
              Click to continue your journey 🚀
            </p>
          </motion.div>
        )}

        {/* Logout button for non-results screens */}
        {mode !== 'results' && (
          <button 
            onClick={handleLogout} 
            className="btn-text w-full mt-4 flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Take a break
          </button>
        )}
      </div>
    </GameLayout>
  );
}
