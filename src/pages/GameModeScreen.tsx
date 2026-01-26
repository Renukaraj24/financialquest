import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { Play, BookOpen, Target, BarChart3 } from 'lucide-react';

interface GameModeScreenProps {
  mode: 'blind' | 'learning' | 'aware' | 'results';
}

const MODE_CONFIG = {
  blind: {
    title: 'Blind Mode',
    description: 'Make financial decisions without any prior knowledge or guidance.',
    icon: Play,
    color: 'from-orange-500 to-red-500',
    nextLabel: 'Start Blind Mode',
    progressKey: 'hasPlayedBlind' as const,
  },
  learning: {
    title: 'Learning Mode',
    description: 'Learn essential financial concepts and strategies.',
    icon: BookOpen,
    color: 'from-blue-500 to-cyan-500',
    nextLabel: 'Start Learning',
    progressKey: 'hasCompletedLearning' as const,
  },
  aware: {
    title: 'Aware Mode',
    description: 'Apply what you\'ve learned to make informed financial decisions.',
    icon: Target,
    color: 'from-green-500 to-emerald-500',
    nextLabel: 'Start Aware Mode',
    progressKey: 'hasPlayedAware' as const,
  },
  results: {
    title: 'Your Results',
    description: 'Compare your performance before and after learning!',
    icon: BarChart3,
    color: 'from-purple-500 to-pink-500',
    nextLabel: 'View Results',
    progressKey: null,
  },
};

export default function GameModeScreen({ mode }: GameModeScreenProps) {
  const navigate = useNavigate();
  const { user, updateGameProgress, getNextRoute, logout, isAuthenticated } = useAuthContext();
  
  const config = MODE_CONFIG[mode];
  const Icon = config.icon;

  // Redirect if not authenticated
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
        {/* Icon with gradient background */}
        <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${config.color} flex items-center justify-center shadow-lg`}>
          <Icon className="w-10 h-10 text-white" />
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
          {config.title}
        </h2>
        <p className="text-muted-foreground text-base mb-8 max-w-sm mx-auto">
          {config.description}
        </p>

        {/* User info */}
        {user && (
          <div className="bg-muted rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-muted-foreground mb-1">Playing as</p>
            <p className="font-medium text-foreground">
              {user.personalInfo?.name || user.name || user.email || user.phone}
            </p>
          </div>
        )}

        {mode === 'results' ? (
          <div className="space-y-4">
            <div className="bg-secondary rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Congratulations! 🎉</h3>
              <p className="text-sm text-muted-foreground">
                You've completed all game modes. Your financial awareness has significantly improved!
              </p>
            </div>
            <button onClick={handleLogout} className="btn-outline-primary w-full">
              Logout & Start Over
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <button onClick={handleComplete} className="btn-gradient w-full">
              {config.nextLabel}
            </button>
            <p className="text-xs text-muted-foreground">
              (Demo: Click to simulate completing this mode)
            </p>
          </div>
        )}

        {/* Logout button for non-results screens */}
        {mode !== 'results' && (
          <button onClick={handleLogout} className="btn-text w-full mt-4">
            Logout
          </button>
        )}
      </div>
    </GameLayout>
  );
}
