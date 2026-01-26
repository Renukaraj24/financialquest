import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { calculateBudgetFromIncomeRange, formatCurrency } from '@/lib/storage';
import type { BudgetAllocation } from '@/types/user';

const BUDGET_CATEGORIES = [
  { key: 'food', label: 'Food' },
  { key: 'travel', label: 'Travel' },
  { key: 'mobile', label: 'Mobile / Internet' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'education', label: 'Education' },
  { key: 'other', label: 'Other' },
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

  // Calculate total budget from income range
  const incomeRange = user?.personalInfo?.incomeRange;
  const totalBudget = incomeRange ? calculateBudgetFromIncomeRange(incomeRange) : 5000;
  
  const allocatedAmount = Object.values(allocations).reduce((sum, val) => sum + (val || 0), 0);
  const remaining = totalBudget - allocatedAmount;
  const isValidAllocation = remaining === 0;
  const isOverBudget = remaining < 0;

  // Redirect if not authenticated
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
        setError(`You have allocated ${formatCurrency(Math.abs(remaining))} more than your budget.`);
      } else {
        setError(`Please allocate the remaining ${formatCurrency(remaining)} to continue.`);
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
      setError('Failed to save budget allocation. Please try again.');
    }
  };

  return (
    <GameLayout>
      <div className="game-card">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-2">
          Budget Allocation
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-6">
          This is your monthly budget: <span className="font-semibold text-foreground">{formatCurrency(totalBudget)}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="error-box">{error}</div>}

          {/* Budget Summary */}
          <div className="budget-summary">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-foreground">Remaining:</span>
              <span 
                className="font-bold text-xl transition-colors duration-200"
                style={{ 
                  color: isOverBudget 
                    ? 'hsl(var(--destructive))' 
                    : isValidAllocation 
                      ? 'hsl(var(--success))' 
                      : 'hsl(var(--muted-foreground))' 
                }}
              >
                {formatCurrency(Math.max(0, remaining))}
              </span>
            </div>
          </div>

          {/* Budget Categories */}
          {BUDGET_CATEGORIES.map((category) => (
            <div key={category.key}>
              <label htmlFor={category.key} className="form-label">
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
            </div>
          ))}

          <button 
            type="submit" 
            className="btn-gradient w-full"
            disabled={!isValidAllocation}
          >
            Continue
          </button>
        </form>
      </div>
    </GameLayout>
  );
}
