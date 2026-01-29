import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { GameLevel } from '@/components/game/GameLevel';
import { getLevelById, GAME_LEVELS } from '@/data/gameData';
import { useGameProgress } from '@/hooks/useGameProgress';
import { useAuthContext } from '@/contexts/AuthContext';

export default function LevelPage() {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { isLevelUnlocked } = useGameProgress();
  
  const levelNumber = parseInt(levelId || '1', 10);
  const levelData = getLevelById(levelNumber);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    if (!levelData) {
      navigate('/dashboard');
      return;
    }

    if (!isLevelUnlocked(levelNumber)) {
      navigate('/dashboard');
      return;
    }
  }, [isAuthenticated, levelData, levelNumber, isLevelUnlocked, navigate]);

  if (!levelData || !isAuthenticated) {
    return null;
  }

  // Determine next route
  const nextLevelId = levelNumber + 1;
  const nextRoute = nextLevelId <= GAME_LEVELS.length 
    ? `/level/${nextLevelId}` 
    : '/game-complete';

  return <GameLevel levelData={levelData} nextRoute={nextRoute} />;
}
