import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { Play, BookOpen, Target, BarChart3, LogOut, Cpu, Zap, Shield, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

interface GameModeScreenProps {
  mode: 'blind' | 'learning' | 'aware' | 'results';
}

const MODE_CONFIG = {
  blind: {
    title: 'Blind Protocol',
    description: 'Make decisions without guidance. Trust your neural pathways.',
    icon: Zap,
    gradient: 'from-orange-500 to-red-500',
    nextLabel: 'Initialize Mission',
    progressKey: 'hasPlayedBlind' as const,
  },
  learning: {
    title: 'Training Mode',
    description: 'Download financial strategies and upgrade your knowledge base.',
    icon: BookOpen,
    gradient: 'from-cyan-400 to-blue-500',
    nextLabel: 'Begin Training',
    progressKey: 'hasCompletedLearning' as const,
  },
  aware: {
    title: 'Combat Ready',
    description: 'Deploy your enhanced skills in the field. Execute with precision.',
    icon: Target,
    gradient: 'from-emerald-400 to-teal-500',
    nextLabel: 'Deploy Skills',
    progressKey: 'hasPlayedAware' as const,
  },
  results: {
    title: 'Mission Complete',
    description: 'Analyze your performance metrics and achievements.',
    icon: BarChart3,
    gradient: 'from-violet-400 to-purple-500',
    nextLabel: 'View Analytics',
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
      <div className="game-card text-center scanlines">
        {/* Status indicator */}
        <motion.div 
          className="flex items-center justify-center gap-2 mb-4 text-[10px] uppercase tracking-widest text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.span 
            className="w-2 h-2 rounded-full bg-primary"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Mode Active
        </motion.div>

        {/* Icon with glow */}
        <motion.div 
          className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br ${config.gradient}`}
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.4 }}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>

        <motion.h2 
          className="text-xl md:text-2xl font-black text-gradient mb-2 uppercase tracking-wider"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {config.title}
        </motion.h2>
        <motion.p 
          className="text-muted-foreground text-xs uppercase tracking-wider mb-6 max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {config.description}
        </motion.p>

        {/* User info card */}
        {user && (
          <motion.div 
            className="budget-summary text-left"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-3 h-3 text-primary" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">
                Operator ID
              </span>
            </div>
            <p className="font-bold text-sm text-foreground">
              {user.personalInfo?.name || user.name || user.email || user.phone}
            </p>
          </motion.div>
        )}

        {mode === 'results' ? (
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="success-box flex items-center justify-center gap-2">
              <Trophy className="w-4 h-4" />
              <span>All Protocols Complete • Skills Maximized</span>
            </div>
            <button onClick={handleLogout} className="btn-outline-primary w-full flex items-center justify-center gap-2">
              <LogOut className="w-4 h-4" />
              Terminate Session
            </button>
          </motion.div>
        ) : (
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button 
              onClick={handleComplete} 
              className="btn-gradient w-full flex items-center justify-center gap-2"
              whileTap={{ scale: 0.98 }}
            >
              <Play className="w-4 h-4" />
              {config.nextLabel}
            </motion.button>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
              Press to continue sequence
            </p>
          </motion.div>
        )}

        {/* Logout button for non-results screens */}
        {mode !== 'results' && (
          <button 
            onClick={handleLogout} 
            className="btn-text w-full mt-4 flex items-center justify-center gap-2"
          >
            <LogOut className="w-3 h-3" />
            Disconnect
          </button>
        )}
      </div>
    </GameLayout>
  );
}
