import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { calculateBudgetFromIncomeRange, formatCurrency } from '@/lib/storage';
import type { BudgetAllocation } from '@/types/user';
import { motion } from 'framer-motion';
import { PieChart, ArrowRight, AlertTriangle, Wallet } from 'lucide-react';

const BUDGET_CATEGORIES = [
  { key: 'food', label: 'Food', color: 'text-cyan-400' },
  { key: 'travel', label: 'Travel', color: 'text-blue-400' },
  { key: 'mobile', label: 'Mobile / Internet', color: 'text-purple-400' },
  { key: 'entertainment', label: 'Entertainment', color: 'text-pink-400' },
  { key: 'education', label: 'Education', color: 'text-emerald-400' },
  { key: 'other', label: 'Other', color: 'text-yellow-400' },
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
        setError(`Over budget by ${formatCurrency(Math.abs(remaining))}`);
      } else {
        setError(`Allocate remaining ${formatCurrency(remaining)}`);
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
      setError('System error - retry');
    }
  };

  return (
    <GameLayout>
      <div className="game-card scanlines">
        <motion.div 
          className="icon-cute mx-auto mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <PieChart className="w-6 h-6 text-primary-foreground" />
        </motion.div>

        <h2 className="text-xl font-black text-center text-gradient mb-1 uppercase tracking-wider">
          Resource Allocation
        </h2>
        <p className="text-center text-muted-foreground text-xs uppercase tracking-widest mb-4">
          Total Credits: <span className="text-primary font-bold">{formatCurrency(totalBudget)}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          {/* Budget Summary */}
          <motion.div 
            className="budget-summary"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-xs uppercase tracking-widest text-foreground flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Remaining:
              </span>
              <motion.span 
                className="font-bold text-lg"
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
              </motion.span>
            </div>
            {/* Progress bar */}
            <div className="progress-bar mt-3">
              <motion.div 
                className="progress-bar-fill"
                style={{ 
                  background: isOverBudget 
                    ? 'hsl(var(--destructive))' 
                    : isValidAllocation 
                      ? 'hsl(var(--success))' 
                      : 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))'
                }}
                animate={{ width: `${Math.min((allocatedAmount / totalBudget) * 100, 100)}%` }}
              />
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
              <label htmlFor={category.key} className={`form-label ${category.color}`}>
                {category.label}
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
            {isValidAllocation ? 'Confirm Allocation' : 'Balance Required'}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>
      </div>
    </GameLayout>
  );
}
