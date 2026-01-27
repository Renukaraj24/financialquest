import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight, AlertTriangle } from 'lucide-react';

export default function FinancialAwarenessScreen() {
  const navigate = useNavigate();
  const { updateFinancialAwareness, getNextRoute, isAuthenticated } = useAuthContext();
  
  const [answer, setAnswer] = useState<'yes' | 'no' | ''>('');
  const [error, setError] = useState('');

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!answer) {
      setError('Selection required');
      return;
    }

    const isFinanciallyLiterate = answer === 'yes';
    
    if (updateFinancialAwareness(isFinanciallyLiterate)) {
      const nextRoute = getNextRoute();
      navigate(`/${nextRoute}`);
    } else {
      setError('System error - retry');
    }
  };

  return (
    <GameLayout>
      <div className="game-card scanlines">
        <motion.div 
          className="icon-cute mx-auto mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, -5, 5, 0] }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <Cpu className="w-6 h-6 text-primary-foreground" />
        </motion.div>

        <h2 className="text-xl font-black text-center text-gradient mb-1 uppercase tracking-wider">
          System Scan
        </h2>
        <p className="text-center text-muted-foreground text-xs uppercase tracking-widest mb-6">
          Analyzing skill level
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div 
              className="error-box flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertTriangle className="w-3 h-3" />
              {error}
            </motion.div>
          )}

          <div>
            <label className="block mb-4 font-semibold text-sm text-foreground leading-relaxed text-center uppercase tracking-wider">
              Financial Knowledge Assessment
            </label>
            <div className="space-y-3">
              <label className="option-label">
                <input
                  type="radio"
                  name="financial-knowledge"
                  value="yes"
                  checked={answer === 'yes'}
                  onChange={() => setAnswer('yes')}
                  required
                />
                <span>Advanced Level - Ready for Combat</span>
              </label>
              <label className="option-label">
                <input
                  type="radio"
                  name="financial-knowledge"
                  value="no"
                  checked={answer === 'no'}
                  onChange={() => setAnswer('no')}
                />
                <span>Training Mode - Learning Protocol</span>
              </label>
            </div>
          </div>

          <motion.button 
            type="submit" 
            className="btn-gradient w-full flex items-center justify-center gap-2"
            whileTap={{ scale: 0.98 }}
          >
            Proceed
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>
      </div>
    </GameLayout>
  );
}
