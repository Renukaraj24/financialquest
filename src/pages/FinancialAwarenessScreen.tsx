import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowRight } from 'lucide-react';

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
      setError('Please select an option 💭');
      return;
    }

    const isFinanciallyLiterate = answer === 'yes';
    
    if (updateFinancialAwareness(isFinanciallyLiterate)) {
      const nextRoute = getNextRoute();
      navigate(`/${nextRoute}`);
    } else {
      setError('Oops! Something went wrong. Try again! 🔄');
    }
  };

  return (
    <GameLayout>
      <div className="game-card">
        <motion.div 
          className="emoji-badge mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          🧠
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold text-center text-gradient mb-2">
          Quick Question!
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-8 flex items-center justify-center gap-2">
          <Lightbulb className="w-4 h-4" />
          Tell us about yourself
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div 
              className="error-box"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <div>
            <label className="block mb-4 font-semibold text-base text-foreground leading-relaxed text-center">
              Do you consider yourself financially savvy? 💰
            </label>
            <div className="space-y-3">
              <motion.label 
                className="option-label"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="radio"
                  name="financial-knowledge"
                  value="yes"
                  checked={answer === 'yes'}
                  onChange={() => setAnswer('yes')}
                  required
                />
                <span>Yes, I know my stuff! 🌟</span>
              </motion.label>
              <motion.label 
                className="option-label"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  type="radio"
                  name="financial-knowledge"
                  value="no"
                  checked={answer === 'no'}
                  onChange={() => setAnswer('no')}
                />
                <span>Still learning! 📚</span>
              </motion.label>
            </div>
          </div>

          <motion.button 
            type="submit" 
            className="btn-gradient w-full flex items-center justify-center gap-2"
            whileTap={{ scale: 0.98 }}
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </GameLayout>
  );
}
