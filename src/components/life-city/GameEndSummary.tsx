import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Wallet, Brain, Utensils, Zap, RotateCcw, Home, Star } from 'lucide-react';
import type { LifeCityGameState } from '@/types/lifeCityGame';
import { LIFE_CITY_BADGES, FINANCIAL_CONCEPTS_TESTED } from '@/data/lifeCityData';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface GameEndSummaryProps {
  state: LifeCityGameState;
  onPlayAgain: () => void;
}

export function GameEndSummary({ state, onPlayAgain }: GameEndSummaryProps) {
  const navigate = useNavigate();
  const isWin = state.gameResult === 'win';

  useEffect(() => {
    if (isWin) {
      // Victory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00d4ff', '#00ffcc', '#ffd700']
      });
    }
  }, [isWin]);

  const failReason = state.gameResult === 'fail-money' 
    ? 'You ran out of money!' 
    : state.gameResult === 'fail-stress' 
    ? 'Stress overwhelmed you!' 
    : '';

  const earnedBadges = LIFE_CITY_BADGES.filter(b => state.badgesEarned.includes(b.id));

  return (
    <div className="min-h-screen bg-gradient-game py-8 px-4">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Result Header */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className={`w-24 h-24 mx-auto mb-4 flex items-center justify-center rounded-2xl ${
              isWin 
                ? 'bg-gradient-to-br from-yellow-400 to-amber-500' 
                : 'bg-gradient-to-br from-rose-500 to-red-600'
            }`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.4 }}
          >
            {isWin ? (
              <Trophy className="w-12 h-12 text-white" />
            ) : (
              <span className="text-5xl">😔</span>
            )}
          </motion.div>

          <h1 className={`text-2xl font-black uppercase tracking-wider mb-2 ${
            isWin ? 'text-gradient' : 'text-destructive'
          }`}>
            {isWin ? 'Simulation Complete!' : 'Game Over'}
          </h1>
          {!isWin && <p className="text-muted-foreground">{failReason}</p>}
        </motion.div>

        {/* Final Stats */}
        <motion.div 
          className="game-card scanlines"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="section-header mb-4">Final Stats</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <StatCard 
              icon={<Wallet className="w-5 h-5" />}
              label="Money Left"
              value={`₹${state.stats.money + state.stats.bankBalance}`}
              color="text-yellow-400"
            />
            <StatCard 
              icon={<Brain className="w-5 h-5" />}
              label="Stress Level"
              value={`${state.stats.stress}%`}
              color={state.stats.stress > 70 ? 'text-destructive' : 'text-emerald-400'}
            />
            <StatCard 
              icon={<Utensils className="w-5 h-5" />}
              label="Hunger"
              value={`${state.stats.hunger}%`}
              color={state.stats.hunger < 30 ? 'text-destructive' : 'text-emerald-400'}
            />
            <StatCard 
              icon={<Zap className="w-5 h-5" />}
              label="Energy"
              value={`${state.stats.energy}%`}
              color={state.stats.energy < 20 ? 'text-destructive' : 'text-cyan-400'}
            />
          </div>

          {/* Behavior Summary */}
          <div className="mt-4 p-3 bg-card/50 rounded border border-border/30">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Spending Behavior</p>
            <p className="text-sm text-foreground">
              {state.stats.bankBalance > 0 
                ? `You saved ₹${state.stats.bankBalance} in the bank. Smart!` 
                : 'You didn\'t save any money in the bank.'}
              {state.skillsUnlocked.length > 0 && ' You invested in skills!'}
            </p>
          </div>
        </motion.div>

        {/* Badges Earned */}
        {earnedBadges.length > 0 && (
          <motion.div 
            className="game-card scanlines"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="section-header mb-4">Badges Earned</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {earnedBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  className="flex flex-col items-center p-3 bg-primary/10 border border-primary/30 rounded-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
                >
                  <span className="text-2xl mb-1">{badge.emoji}</span>
                  <span className="text-[9px] uppercase tracking-widest text-primary">{badge.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Financial Concepts Reveal */}
        <motion.div 
          className="game-card scanlines"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-primary" />
            <h2 className="section-header mb-0">What You Actually Learned</h2>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Without realizing it, you were practicing these financial concepts:
          </p>

          <div className="space-y-2">
            {FINANCIAL_CONCEPTS_TESTED.slice(0, 5).map((concept, index) => (
              <motion.div
                key={concept.concept}
                className="p-2 bg-card/50 rounded border-l-2 border-primary"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <p className="text-sm font-medium text-primary">{concept.concept}</p>
                <p className="text-[10px] text-muted-foreground">{concept.description}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-center mt-4 text-xs text-muted-foreground italic">
            "You just played life — and understood money without studying it."
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <button
            onClick={onPlayAgain}
            className="btn-gradient w-full flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </button>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-outline-primary w-full flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Back to Dashboard
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  color: string;
}) {
  return (
    <div className="p-3 bg-card/50 rounded border border-border/30 text-center">
      <div className={`${color} mx-auto mb-1`}>{icon}</div>
      <p className={`text-lg font-bold ${color}`}>{value}</p>
      <p className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</p>
    </div>
  );
}
