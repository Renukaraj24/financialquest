import { motion, AnimatePresence } from 'framer-motion';
import type { RandomEvent } from '@/types/lifeCityGame';

interface RandomEventModalProps {
  event: RandomEvent | null;
  onRespond: (optionId: string) => void;
}

export function RandomEventModal({ event, onRespond }: RandomEventModalProps) {
  if (!event) return null;

  const typeColors = {
    expense: 'from-rose-500 to-red-600',
    income: 'from-emerald-500 to-green-600',
    scam: 'from-purple-500 to-violet-600',
    opportunity: 'from-amber-500 to-yellow-600',
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-sm bg-card border border-primary/30 rounded-lg overflow-hidden shadow-2xl"
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
        >
          {/* Header */}
          <div className={`p-4 bg-gradient-to-r ${typeColors[event.type]}`}>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{event.emoji}</span>
              <div>
                <h3 className="font-bold text-white text-lg">{event.title}</h3>
                <span className="text-[10px] uppercase tracking-widest text-white/70">
                  {event.type === 'expense' ? '⚠️ Unexpected' : 
                   event.type === 'income' ? '✨ Bonus' :
                   event.type === 'scam' ? '🚨 Alert' : '💡 Opportunity'}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-sm text-foreground mb-4">{event.description}</p>

            {/* Options */}
            <div className="space-y-2">
              {event.options.map((option, index) => (
                <motion.button
                  key={option.id}
                  className="w-full p-3 text-left bg-card/50 border border-border/50 rounded hover:border-primary/50 hover:bg-primary/5 transition-all"
                  onClick={() => onRespond(option.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <p className="font-medium text-sm">{option.text}</p>
                  
                  {/* Effect preview */}
                  <div className="flex flex-wrap gap-2 mt-1">
                    {Object.entries(option.effects).map(([key, value]) => {
                      const isPositive = (value as number) > 0;
                      return (
                        <span 
                          key={key}
                          className={`text-[9px] px-2 py-0.5 rounded-full ${
                            (key === 'money' && isPositive) || (key !== 'money' && key !== 'stress' && isPositive)
                              ? 'bg-emerald-500/20 text-emerald-400' 
                              : 'bg-rose-500/20 text-rose-400'
                          }`}
                        >
                          {key === 'money' ? (isPositive ? '+' : '') + `₹${value}` : 
                           `${key} ${isPositive ? '+' : ''}${value}`}
                        </span>
                      );
                    })}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
