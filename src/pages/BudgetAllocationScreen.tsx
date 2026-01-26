import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { calculateBudgetFromIncomeRange, formatCurrency } from '@/lib/storage';
import type { BudgetAllocation } from '@/types/user';
import { motion } from 'framer-motion';
import { Wallet, PiggyBank, ArrowRight } from 'lucide-react';

const BUDGET_CATEGORIES = [
  { key: 'food', label: 'Food', emoji: '🍕' },
  { key: 'travel', label: 'Travel', emoji: '✈️' },
  { key: 'mobile', label: 'Mobile / Internet', emoji: '📱' },
  { key: 'entertainment', label: 'Entertainment', emoji: '🎮' },
  { key: 'education', label: 'Education', emoji: '📚' },
  { key: 'other', label: 'Other', emoji: '✨' },
] as const;

export default function BudgetAllocationScreen() {
  const navigate = useNavigate();
  const { user, updateBudgetAllocation, getNextRoute, isAuthenticated } = useAuthContext();
  
  const [allocations, setAllocations] = useState<Record<string, number>>({
    food: 0,
    travel: 0,
    mobile: 0,
    entertainment: 0,
    education: 0,
    other: 0,
  });
  const [error, setError] = useState('');

  const incomeRange = user?.personalInfo?.incomeRange;
  const totalBudget = incomeRange ? calculateBudgetFromIncomeRange(incomeRange) : 5000;
  
  const allocatedAmount = Object.values(allocations).reduce((sum, val) => sum + (val || 0), 0);
  const remaining = totalBudget - allocatedAmount;
  const isValidAllocation = remaining === 0;
  const isOverBudget = remaining < 0;

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const handleAllocationChange = (key: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setAllocations(prev => ({ ...prev, [key]: Math.max(0, numValue) }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidAllocation) {
      if (isOverBudget) {
        setError(`Oops! You're ${formatCurrency(Math.abs(remaining))} over budget! 💸`);
      } else {
        setError(`Allocate the remaining ${formatCurrency(remaining)} to continue! 💰`);
      }
      return;
    }

    const budget: BudgetAllocation = {
      food: allocations.food,
      travel: allocations.travel,
      mobile: allocations.mobile,
      entertainment: allocations.entertainment,
      education: allocations.education,
      other: allocations.other,
      total: totalBudget,
    };

    if (updateBudgetAllocation(budget)) {
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
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          💰
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold text-center text-gradient mb-2">
          Budget Time!
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-6 flex items-center justify-center gap-2">
          <PiggyBank className="w-4 h-4" />
          Your budget: <span className="font-bold text-primary">{formatCurrency(totalBudget)}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div 
              className="error-box"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {/* Budget Summary */}
          <motion.div 
            className="budget-summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Remaining:
              </span>
              <motion.span 
                className="font-extrabold text-xl"
                animate={{ scale: isOverBudget ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  color: isOverBudget 
                    ? 'hsl(var(--destructive))' 
                    : isValidAllocation 
                      ? 'hsl(var(--success))' 
                      : 'hsl(var(--primary))' 
                }}
              >
                {formatCurrency(Math.max(0, remaining))}
                {isValidAllocation && ' ✨'}
                {isOverBudget && ' 😅'}
              </motion.span>
            </div>
          </motion.div>

          {/* Budget Categories */}
          {BUDGET_CATEGORIES.map((category, index) => (
            <motion.div 
              key={category.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <label htmlFor={category.key} className="form-label">
                {category.emoji} {category.label}
              </label>
              <input
                type="number"
                id={category.key}
                min="0"
                step="100"
                value={allocations[category.key] || ''}
                onChange={(e) => handleAllocationChange(category.key, e.target.value)}
                placeholder="0"
                className="form-input"
              />
            </motion.div>
          ))}

          <motion.button 
            type="submit" 
            className="btn-gradient w-full flex items-center justify-center gap-2"
            disabled={!isValidAllocation}
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
