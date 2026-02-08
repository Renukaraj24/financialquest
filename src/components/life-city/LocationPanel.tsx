import { motion, AnimatePresence } from 'framer-motion';
import type { LocationId, PlayerStats } from '@/types/lifeCityGame';
import { LOCATIONS, LOCATION_ACTIONS } from '@/data/lifeCityData';

interface LocationPanelProps {
  currentLocation: LocationId;
  stats: PlayerStats;
  onPerformAction: (actionId: string) => boolean;
}

export function LocationPanel({ currentLocation, stats, onPerformAction }: LocationPanelProps) {
  const location = LOCATIONS.find(l => l.id === currentLocation);
  const actions = LOCATION_ACTIONS[currentLocation] || [];

  if (!location) return null;

  return (
    <motion.div
      className="game-card scanlines mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Location Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{location.emoji}</span>
        <div>
          <h2 className="text-lg font-bold text-primary uppercase tracking-wider">
            {location.name}
          </h2>
          <p className="text-xs text-muted-foreground">{location.description}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <AnimatePresence mode="wait">
          {actions.map((action, index) => {
            const canAfford = action.cost <= stats.money;
            const meetsRequirements = !action.requirements || 
              Object.entries(action.requirements).every(([key, value]) => {
                const statValue = stats[key as keyof PlayerStats];
                return statValue !== undefined && statValue >= (value as number);
              });
            const canDo = canAfford && meetsRequirements;

            return (
              <motion.button
                key={action.id}
                className={`
                  w-full text-left p-3 rounded border transition-all duration-200
                  ${canDo 
                    ? 'bg-card/50 border-border/50 hover:border-primary/50 hover:bg-primary/5' 
                    : 'bg-muted/20 border-border/20 opacity-50 cursor-not-allowed'
                  }
                `}
                onClick={() => canDo && onPerformAction(action.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                disabled={!canDo}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground text-sm">{action.name}</p>
                    <p className="text-[10px] text-muted-foreground">{action.description}</p>
                  </div>
                  {action.cost > 0 && (
                    <span className={`text-sm font-bold ${canAfford ? 'text-yellow-400' : 'text-destructive'}`}>
                      ₹{action.cost}
                    </span>
                  )}
                </div>
                
                {/* Effect preview */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {Object.entries(action.effects).map(([key, value]) => {
                    if (key === 'bankBalance' || key === 'money') return null;
                    const isPositive = (value as number) > 0;
                    const label = key.charAt(0).toUpperCase() + key.slice(1);
                    return (
                      <span 
                        key={key}
                        className={`text-[9px] px-2 py-0.5 rounded-full ${
                          isPositive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                        }`}
                      >
                        {label} {isPositive ? '+' : ''}{value}
                      </span>
                    );
                  })}
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
