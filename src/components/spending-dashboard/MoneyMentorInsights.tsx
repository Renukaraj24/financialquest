import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import type { BudgetAllocation } from '@/types/user';

interface MentorInsight {
  observation: string;
  consequence: string;
  concept: string;
  conceptName: string;
}

function generateMentorInsights(budget: BudgetAllocation): MentorInsight[] {
  const { food, travel, mobile, entertainment, education, other, total } = budget;
  const insights: MentorInsight[] = [];

  // Emergency Fund insight
  if (other < total * 0.1) {
    insights.push({
      observation: "You've allocated most of your money across all categories.",
      consequence: "That means even a small surprise — like a phone repair or unexpected fee — could leave you stressed.",
      concept: "This is why many people keep a small amount aside. It's often called an emergency fund.",
      conceptName: "Emergency Fund"
    });
  }

  // Financial Cushion (positive)
  if (other >= total * 0.15) {
    insights.push({
      observation: "You've set aside a good portion for unexpected things.",
      consequence: "This gives you breathing room when life throws surprises your way.",
      concept: "This safety net is what people call a financial cushion — and you're already building one.",
      conceptName: "Financial Cushion"
    });
  }

  // Wants vs Needs
  const wants = entertainment + other;
  const wantsPercent = (wants / total) * 100;
  if (wantsPercent > 30) {
    insights.push({
      observation: "A good chunk of your money is going toward entertainment and extras.",
      consequence: "That's okay sometimes — but if essentials get tight, stress can creep in.",
      concept: "Knowing the difference between wants and needs helps you feel more in control.",
      conceptName: "Wants vs Needs"
    });
  }

  // Budget Leakage
  if (entertainment > total * 0.2) {
    insights.push({
      observation: "Entertainment is taking a bigger slice of your budget.",
      consequence: "Small daily treats can quietly add up to quite a bit over a month.",
      concept: "When small spending sneaks past unnoticed, it's called budget leakage — and it happens to everyone.",
      conceptName: "Budget Leakage"
    });
  }

  // Pay Yourself First
  if (education >= total * 0.12) {
    insights.push({
      observation: "You're investing in education before other spending.",
      consequence: "This shows you value growing your skills and future opportunities.",
      concept: "Prioritizing your growth first is what experts call 'paying yourself first' — smart move.",
      conceptName: "Pay Yourself First"
    });
  }

  // Food balance insight
  if (food > total * 0.4) {
    insights.push({
      observation: "Food is taking up a large part of your budget.",
      consequence: "Cooking more at home could free up money for things you enjoy.",
      concept: "Small changes in daily habits can create surprisingly big savings over time.",
      conceptName: "Mindful Spending"
    });
  }

  // Travel optimization
  if (travel > total * 0.2 && travel > food * 0.5) {
    insights.push({
      observation: "Travel costs are quite significant in your budget.",
      consequence: "Exploring monthly passes or carpooling could give you more flexibility elsewhere.",
      concept: "Fixed expenses like travel are great places to find consistent savings.",
      conceptName: "Fixed Cost Optimization"
    });
  }

  return insights.slice(0, 4); // Return max 4 insights
}

interface MoneyMentorInsightsProps {
  budget: BudgetAllocation;
}

export function MoneyMentorInsights({ budget }: MoneyMentorInsightsProps) {
  const insights = generateMentorInsights(budget);

  if (insights.length === 0) return null;

  return (
    <motion.div
      className="game-card scanlines bg-gradient-to-br from-indigo-500/10 to-purple-600/5 border-indigo-500/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="icon-cute text-indigo-400">
          <Heart className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-widest text-indigo-400">
            Money Mentor Insights
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Personal guidance based on your choices
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {insights.map((insight, i) => (
          <motion.div
            key={insight.conceptName}
            className="relative bg-background/40 rounded-xl p-4 border border-indigo-500/10"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 + i * 0.1 }}
          >
            {/* Subtle concept badge */}
            <div className="absolute top-3 right-3">
              <span className="text-[10px] uppercase tracking-wider text-indigo-400/60 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                {insight.conceptName}
              </span>
            </div>

            <div className="space-y-2 pr-20">
              {/* Observation */}
              <p className="text-sm text-foreground/90 leading-relaxed">
                {insight.observation}
              </p>

              {/* Consequence */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {insight.consequence}
              </p>

              {/* Concept introduction */}
              <p className="text-sm text-indigo-300/90 leading-relaxed italic">
                {insight.concept}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Encouraging footer */}
      <motion.div
        className="mt-5 pt-4 border-t border-indigo-500/10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-xs text-muted-foreground">
          Remember: There's no perfect budget — just the one that works for you. ✨
        </p>
      </motion.div>
    </motion.div>
  );
}
