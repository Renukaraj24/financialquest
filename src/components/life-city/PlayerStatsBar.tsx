import { motion } from 'framer-motion';
import { Wallet, Utensils, Brain, Zap, Clock, Pause, Play } from 'lucide-react';
import type { PlayerStats, GameTime } from '@/types/lifeCityGame';
import { formatGameTime, getTimeOfDay } from '@/data/lifeCityData';

interface PlayerStatsBarProps {
  stats: PlayerStats;
  time: GameTime;
  isPaused: boolean;
  onTogglePause: () => void;
}

export function PlayerStatsBar({ stats, time, isPaused, onTogglePause }: PlayerStatsBarProps) {
  const timeOfDay = getTimeOfDay(time.hour);
  const timeEmoji = timeOfDay === 'morning' ? '🌅' : 
                    timeOfDay === 'afternoon' ? '☀️' : 
                    timeOfDay === 'evening' ? '🌆' : '🌙';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-primary/30">
      <div className="max-w-4xl mx-auto px-4 py-2">
        {/* Time & Day Row */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{timeEmoji}</span>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">
              Day {time.day}
            </span>
            <span className="text-sm font-bold text-primary">
              {formatGameTime(time.hour, time.minute)}
            </span>
          </div>
          
          <button
            onClick={onTogglePause}
            className="flex items-center gap-1 px-3 py-1 rounded border border-primary/50 hover:bg-primary/10 transition-colors"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
            <span className="text-xs uppercase tracking-wider">
              {isPaused ? 'Resume' : 'Pause'}
            </span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-2">
          {/* Money */}
          <StatItem
            icon={<Wallet className="w-4 h-4" />}
            label="Money"
            value={`₹${stats.money + stats.bankBalance}`}
            subValue={stats.bankBalance > 0 ? `(₹${stats.bankBalance} saved)` : undefined}
            color="text-yellow-400"
          />

          {/* Hunger */}
          <StatItem
            icon={<Utensils className="w-4 h-4" />}
            label="Hunger"
            value={stats.hunger}
            isProgress
            color={stats.hunger < 30 ? 'bg-destructive' : 'bg-emerald-400'}
            dangerZone={stats.hunger < 30}
          />

          {/* Stress */}
          <StatItem
            icon={<Brain className="w-4 h-4" />}
            label="Stress"
            value={stats.stress}
            isProgress
            color={stats.stress > 70 ? 'bg-destructive' : 'bg-amber-400'}
            inverted
            dangerZone={stats.stress > 70}
          />

          {/* Energy */}
          <StatItem
            icon={<Zap className="w-4 h-4" />}
            label="Energy"
            value={stats.energy}
            isProgress
            color={stats.energy < 20 ? 'bg-destructive' : 'bg-cyan-400'}
            dangerZone={stats.energy < 20}
          />
        </div>
      </div>
    </div>
  );
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
  color: string;
  isProgress?: boolean;
  inverted?: boolean;
  dangerZone?: boolean;
}

function StatItem({ icon, label, value, subValue, color, isProgress, inverted, dangerZone }: StatItemProps) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1 mb-1">
        <span className={dangerZone ? 'text-destructive animate-pulse' : 'text-muted-foreground'}>
          {icon}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</span>
      </div>
      
      {isProgress ? (
        <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
          <motion.div
            className={`h-full ${color}`}
            initial={{ width: 0 }}
            animate={{ width: `${value as number}%` }}
            transition={{ type: 'spring', damping: 15 }}
          />
        </div>
      ) : (
        <div className="flex flex-col">
          <span className={`text-sm font-bold ${color}`}>{value}</span>
          {subValue && (
            <span className="text-[9px] text-muted-foreground">{subValue}</span>
          )}
        </div>
      )}
    </div>
  );
}
