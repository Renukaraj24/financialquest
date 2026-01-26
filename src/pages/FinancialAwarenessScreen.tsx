import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';

export default function FinancialAwarenessScreen() {
  const navigate = useNavigate();
  const { updateFinancialAwareness, getNextRoute, isAuthenticated } = useAuthContext();
  
  const [answer, setAnswer] = useState<'yes' | 'no' | ''>('');
  const [error, setError] = useState('');

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!answer) {
      setError('Please select an option');
      return;
    }

    const isFinanciallyLiterate = answer === 'yes';
    
    if (updateFinancialAwareness(isFinanciallyLiterate)) {
      const nextRoute = getNextRoute();
      navigate(`/${nextRoute}`);
    } else {
      setError('Failed to save information. Please try again.');
    }
  };

  return (
    <GameLayout>
      <div className="game-card">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-2">
          Financial Awareness
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-6">
          Tell us about your financial knowledge
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="error-box">{error}</div>}

          <div>
            <label className="block mb-4 font-medium text-base text-foreground leading-relaxed">
              Do you consider yourself financially knowledgeable?
            </label>
            <div className="space-y-2">
              <label className="option-label">
                <input
                  type="radio"
                  name="financial-knowledge"
                  value="yes"
                  checked={answer === 'yes'}
                  onChange={() => setAnswer('yes')}
                  required
                />
                <span>Yes</span>
              </label>
              <label className="option-label">
                <input
                  type="radio"
                  name="financial-knowledge"
                  value="no"
                  checked={answer === 'no'}
                  onChange={() => setAnswer('no')}
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <button type="submit" className="btn-gradient w-full">
            Continue
          </button>
        </form>
      </div>
    </GameLayout>
  );
}
