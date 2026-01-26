import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <GameLayout>
      <div className="game-card text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gradient mb-2">
          Financial Learning Game
        </h1>
        <p className="text-muted-foreground text-base md:text-lg mb-8">
          Master money management through play
        </p>
        
        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => navigate('/signup')}
            className="btn-gradient w-full"
          >
            Start New Journey
          </button>
          <button
            onClick={() => navigate('/login')}
            className="btn-outline-primary w-full"
          >
            Login
          </button>
        </div>
      </div>
    </GameLayout>
  );
}
