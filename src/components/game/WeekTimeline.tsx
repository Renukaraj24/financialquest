import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';

interface WeekTimelineProps {
  currentWeek: number;
  totalWeeks: number;
}

export function WeekTimeline({ currentWeek, totalWeeks }: WeekTimelineProps) {
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between mb-6">
      {weeks.map((week, index) => (
        <div key={week} className="flex items-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
              week < currentWeek
                ? 'bg-gradient-to-br from-primary to-cyan-400 border-primary'
                : week === currentWeek
                ? 'bg-primary/20 border-primary'
                : 'bg-card/30 border-border/50'
            }`}
          >
            {week < currentWeek ? (
              <Check className="w-5 h-5 text-white" />
            ) : (
              <span className={`text-sm font-bold ${week === currentWeek ? 'text-primary' : 'text-muted-foreground'}`}>
                {week}
              </span>
            )}
            {week === currentWeek && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
          {index < weeks.length - 1 && (
            <div className={`w-8 h-0.5 mx-1 ${week < currentWeek ? 'bg-primary' : 'bg-border/50'}`} />
          )}
        </div>
      ))}
    </div>
  );
}
