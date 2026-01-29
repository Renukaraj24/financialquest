import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { formatCurrency } from '@/lib/storage';
import { motion } from 'framer-motion';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  Zap, 
  Target,
  ArrowRight,
  Lightbulb,
  BarChart3,
  Info
} from 'lucide-react';
import type { BudgetAllocation } from '@/types/user';
import { MoneyMentorInsights } from '@/components/spending-dashboard/MoneyMentorInsights';

// Spending analysis utilities
function analyzeSpending(budget: BudgetAllocation) {
  const { food, travel, mobile, entertainment, education, other, total } = budget;
  
  // Categorize: Needs vs Wants
  const needs = food + travel + mobile + education;
  const wants = entertainment + other;
  
  const needsPercent = (needs / total) * 100;
  const wantsPercent = (wants / total) * 100;
  
  // Calculate effectiveness score
  const needsCoverage = Math.min(needsPercent / 70 * 100, 100); // Ideal: 70% needs
  const wantsControl = Math.max(0, 100 - (wantsPercent - 20) * 2); // Ideal: max 20% wants
  const safetyBuffer = other >= total * 0.1 ? 100 : (other / (total * 0.1)) * 100; // 10% buffer ideal
  
  const effectivenessScore = Math.round((needsCoverage * 0.4 + wantsControl * 0.4 + safetyBuffer * 0.2));
  
  // Determine rank
  let rank: 'smart' | 'average' | 'risky';
  if (effectivenessScore >= 75) rank = 'smart';
  else if (effectivenessScore >= 50) rank = 'average';
  else rank = 'risky';
  
  return {
    needs,
    wants,
    needsPercent,
    wantsPercent,
    needsCoverage,
    wantsControl,
    safetyBuffer,
    effectivenessScore,
    rank,
  };
}

function generateSuggestions(budget: BudgetAllocation, analysis: ReturnType<typeof analyzeSpending>) {
  const suggestions: { icon: typeof Lightbulb; text: string; priority: 'high' | 'medium' | 'low' }[] = [];
  const { food, travel, mobile, entertainment, education, other, total } = budget;
  
  // Entertainment too high
  if (entertainment > total * 0.15) {
    suggestions.push({
      icon: Target,
      text: `Reduce entertainment by ${formatCurrency(entertainment - total * 0.1)} for better balance`,
      priority: 'high'
    });
  }
  
  // No emergency buffer
  if (other < total * 0.1) {
    suggestions.push({
      icon: Shield,
      text: `Create a ${formatCurrency(total * 0.1 - other)} safety buffer for emergencies`,
      priority: 'high'
    });
  }
  
  // Food spending optimization
  if (food > total * 0.35) {
    suggestions.push({
      icon: TrendingUp,
      text: `Track food expenses - consider meal planning to save ${formatCurrency(food * 0.15)}`,
      priority: 'medium'
    });
  }
  
  // Travel costs
  if (travel > total * 0.15) {
    suggestions.push({
      icon: Zap,
      text: `Explore transport passes to cut travel costs by ${formatCurrency(travel * 0.2)}`,
      priority: 'medium'
    });
  }
  
  // Education investment
  if (education < total * 0.1) {
    suggestions.push({
      icon: Lightbulb,
      text: `Consider allocating ${formatCurrency(total * 0.1)} for skill development`,
      priority: 'low'
    });
  }
  
  // Mobile/Internet
  if (mobile > total * 0.1) {
    suggestions.push({
      icon: Target,
      text: `Review mobile plans - potential savings of ${formatCurrency(mobile * 0.2)}`,
      priority: 'low'
    });
  }
  
  // General balance
  if (analysis.wantsPercent > 30) {
    suggestions.push({
      icon: AlertTriangle,
      text: `Wants exceed 30% - redirect some to needs or savings`,
      priority: 'high'
    });
  }
  
  return suggestions.slice(0, 5);
}

function generateSuggestedBudget(total: number): BudgetAllocation {
  return {
    food: Math.round(total * 0.30),
    travel: Math.round(total * 0.15),
    mobile: Math.round(total * 0.08),
    entertainment: Math.round(total * 0.12),
    education: Math.round(total * 0.15),
    other: Math.round(total * 0.20), // Safety buffer
    total,
  };
}

function getRelevantTerms(budget: BudgetAllocation, analysis: ReturnType<typeof analyzeSpending>) {
  const terms: { term: string; explanation: string }[] = [];
  
  if (budget.other < budget.total * 0.1) {
    terms.push({
      term: 'Emergency Fund',
      explanation: 'A financial safety net for unexpected expenses - you could build this gradually.'
    });
  }
  
  if (analysis.wantsPercent > 25) {
    terms.push({
      term: 'Wants vs Needs',
      explanation: 'Needs are essentials; wants are extras. Your wants are currently higher than typical.'
    });
  }
  
  if (budget.entertainment > budget.total * 0.2) {
    terms.push({
      term: 'Budget Leakage',
      explanation: 'Small spending that adds up over time - entertainment is your potential leak area.'
    });
  }
  
  if (budget.other >= budget.total * 0.1) {
    terms.push({
      term: 'Financial Cushion',
      explanation: 'You have a buffer for surprises - this protects your other spending categories.'
    });
  }
  
  if (budget.education >= budget.total * 0.1) {
    terms.push({
      term: 'Pay Yourself First',
      explanation: 'Investing in education before spending elsewhere - a smart priority choice.'
    });
  }
  
  return terms.slice(0, 3);
}

const RANK_CONFIG = {
  smart: {
    label: 'Smart Spender',
    icon: Shield,
    color: 'text-emerald-400',
    bg: 'from-emerald-500/20 to-emerald-600/10',
    border: 'border-emerald-500/30',
  },
  average: {
    label: 'Average Manager',
    icon: TrendingUp,
    color: 'text-cyan-400',
    bg: 'from-cyan-500/20 to-blue-600/10',
    border: 'border-cyan-500/30',
  },
  risky: {
    label: 'Risky Spender',
    icon: AlertTriangle,
    color: 'text-amber-400',
    bg: 'from-amber-500/20 to-orange-600/10',
    border: 'border-amber-500/30',
  },
};

const CATEGORY_LABELS: Record<string, string> = {
  food: 'Food',
  travel: 'Travel',
  mobile: 'Mobile',
  entertainment: 'Entertainment',
  education: 'Education',
  other: 'Buffer/Other',
};

export default function SpendingWorthDashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();
  
  const budget = user?.selfReportedBudget;
  
  const analysis = useMemo(() => {
    if (!budget) return null;
    return analyzeSpending(budget);
  }, [budget]);
  
  const suggestions = useMemo(() => {
    if (!budget || !analysis) return [];
    return generateSuggestions(budget, analysis);
  }, [budget, analysis]);
  
  const suggestedBudget = useMemo(() => {
    if (!budget) return null;
    return generateSuggestedBudget(budget.total);
  }, [budget]);
  
  const relevantTerms = useMemo(() => {
    if (!budget || !analysis) return [];
    return getRelevantTerms(budget, analysis);
  }, [budget, analysis]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !budget || !analysis) return null;

  const rankConfig = RANK_CONFIG[analysis.rank];
  const RankIcon = rankConfig.icon;

  const handleProceed = () => {
    navigate('/dashboard');
  };

  return (
    <GameLayout>
      <div className="w-full max-w-4xl mx-auto space-y-6 p-4">
        {/* Header */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-black text-gradient uppercase tracking-wider mb-2">
            Spending Analysis
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest">
            System Diagnostic Complete
          </p>
        </motion.div>

        {/* Top Row: Rank + Score */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Overall Rank Card */}
          <motion.div 
            className={`game-card scanlines bg-gradient-to-br ${rankConfig.bg} ${rankConfig.border}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-4">
              <div className={`icon-cute ${rankConfig.color}`}>
                <RankIcon className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  Spending Profile
                </p>
                <h2 className={`text-xl font-black ${rankConfig.color}`}>
                  {rankConfig.label}
                </h2>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-background/30 rounded-lg p-2">
                <span className="text-muted-foreground">Needs:</span>
                <span className="ml-2 text-foreground font-bold">{Math.round(analysis.needsPercent)}%</span>
              </div>
              <div className="bg-background/30 rounded-lg p-2">
                <span className="text-muted-foreground">Wants:</span>
                <span className="ml-2 text-foreground font-bold">{Math.round(analysis.wantsPercent)}%</span>
              </div>
            </div>
          </motion.div>

          {/* Effectiveness Score Card */}
          <motion.div 
            className="game-card scanlines"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  Effectiveness Score
                </p>
                <h2 className="text-4xl font-black text-gradient">
                  {analysis.effectivenessScore}%
                </h2>
              </div>
              <BarChart3 className="w-10 h-10 text-primary opacity-50" />
            </div>
            
            {/* Score Breakdown */}
            <div className="space-y-2">
              {[
                { label: 'Needs Coverage', value: analysis.needsCoverage, color: 'bg-emerald-500' },
                { label: 'Wants Control', value: analysis.wantsControl, color: 'bg-cyan-500' },
                { label: 'Safety Buffer', value: analysis.safetyBuffer, color: 'bg-purple-500' },
              ].map((item, i) => (
                <div key={item.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-bold">{Math.round(item.value)}%</span>
                  </div>
                  <div className="progress-bar h-2">
                    <motion.div 
                      className={`h-full ${item.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(item.value, 100)}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Comparison View */}
        <motion.div 
          className="game-card scanlines"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Allocation Comparison
          </h3>
          <div className="space-y-3">
            {Object.keys(CATEGORY_LABELS).map((key, i) => {
              const userValue = budget[key as keyof BudgetAllocation] as number;
              const suggestedValue = suggestedBudget![key as keyof BudgetAllocation] as number;
              const userPercent = (userValue / budget.total) * 100;
              const suggestedPercent = (suggestedValue / budget.total) * 100;
              const diff = userValue - suggestedValue;
              
              return (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="space-y-1"
                >
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground font-medium">{CATEGORY_LABELS[key]}</span>
                    <span className={`font-bold ${diff > 0 ? 'text-amber-400' : diff < 0 ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                      {diff > 0 ? '+' : ''}{formatCurrency(diff)}
                    </span>
                  </div>
                  <div className="relative h-4 bg-background/50 rounded overflow-hidden">
                    {/* User bar */}
                    <motion.div 
                      className="absolute top-0 left-0 h-2 bg-primary/80 rounded-t"
                      initial={{ width: 0 }}
                      animate={{ width: `${userPercent}%` }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.4 }}
                    />
                    {/* Suggested bar */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-2 bg-emerald-500/60 rounded-b"
                      initial={{ width: 0 }}
                      animate={{ width: `${suggestedPercent}%` }}
                      transition={{ delay: 0.6 + i * 0.05, duration: 0.4 }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground">
                    <span>You: {formatCurrency(userValue)}</span>
                    <span>Suggested: {formatCurrency(suggestedValue)}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-2 bg-primary/80 rounded" />
              <span className="text-muted-foreground">Your Allocation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-2 bg-emerald-500/60 rounded" />
              <span className="text-muted-foreground">Suggested</span>
            </div>
          </div>
        </motion.div>

        {/* Suggestions */}
        <motion.div 
          className="game-card scanlines"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Optimization Suggestions
          </h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, i) => {
              const Icon = suggestion.icon;
              const priorityColors = {
                high: 'border-amber-500/30 bg-amber-500/5',
                medium: 'border-cyan-500/30 bg-cyan-500/5',
                low: 'border-purple-500/30 bg-purple-500/5',
              };
              return (
                <motion.div 
                  key={i}
                  className={`flex items-start gap-3 p-3 rounded-lg border ${priorityColors[suggestion.priority]}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                >
                  <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                    suggestion.priority === 'high' ? 'text-amber-400' :
                    suggestion.priority === 'medium' ? 'text-cyan-400' : 'text-purple-400'
                  }`} />
                  <p className="text-sm text-foreground/90">{suggestion.text}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Money Mentor Insights */}
        <MoneyMentorInsights budget={budget} />

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <button 
            onClick={handleProceed}
            className="btn-gradient w-full flex items-center justify-center gap-3 text-lg py-4"
          >
            <Zap className="w-5 h-5" />
            Proceed to Mission
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </GameLayout>
  );
}
