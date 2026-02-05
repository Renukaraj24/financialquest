import { motion } from 'framer-motion';
import { Heart, AlertTriangle, Smile, Meh, Frown } from 'lucide-react';

interface StressMeterProps {
  stress: number; // 0-100
  className?: string;
}

export function StressMeter({ stress, className = '' }: StressMeterProps) {
  const getStressState = () => {
    if (stress <= 25) return { label: 'Calm', color: 'from-emerald-400 to-green-500', icon: Smile, textColor: 'text-emerald-400' };
    if (stress <= 50) return { label: 'Okay', color: 'from-cyan-400 to-blue-500', icon: Meh, textColor: 'text-cyan-400' };
    if (stress <= 75) return { label: 'Tense', color: 'from-amber-400 to-orange-500', icon: Frown, textColor: 'text-amber-400' };
    return { label: 'Stressed', color: 'from-red-400 to-rose-500', icon: AlertTriangle, textColor: 'text-red-400' };
  };

  const state = getStressState();
  const Icon = state.icon;

  return (
    <div className={`${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <motion.div
          animate={stress > 75 ? { 
            scale: [1, 1.1, 1],
          } : {}}
          transition={{ duration: 0.5, repeat: stress > 75 ? Infinity : 0 }}
        >
          <Icon className={`w-4 h-4 ${state.textColor}`} />
        </motion.div>
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Stress Level</p>
        <span className={`text-xs font-bold ${state.textColor}`}>{state.label}</span>
      </div>
      <div className="h-2 bg-card/50 rounded-full overflow-hidden border border-border/50">
        <motion.div
          className={`h-full bg-gradient-to-r ${state.color}`}
          initial={{ width: 0 }}
          animate={{ width: `${stress}%` }}
          transition={{ type: 'spring', damping: 15 }}
        />
      </div>
    </div>
  );
}
