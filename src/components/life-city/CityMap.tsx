import { motion } from 'framer-motion';
import type { LocationId } from '@/types/lifeCityGame';
import { LOCATIONS } from '@/data/lifeCityData';

interface CityMapProps {
  currentLocation: LocationId;
  playerPosition: { x: number; y: number };
  onMoveToLocation: (locationId: LocationId, position: { x: number; y: number }) => void;
}

export function CityMap({ currentLocation, playerPosition, onMoveToLocation }: CityMapProps) {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      {/* Grid Background */}
      <div className="absolute inset-0 grid-lines opacity-30 rounded-lg" />
      
      {/* City Grid */}
      <div 
        className="relative w-full h-full p-4"
        style={{
          backgroundImage: `
            radial-gradient(circle at 30% 40%, hsla(var(--primary), 0.1) 0%, transparent 40%),
            radial-gradient(circle at 70% 60%, hsla(var(--accent), 0.08) 0%, transparent 40%)
          `
        }}
      >
        {/* Roads/Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
          <defs>
            <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsla(var(--primary), 0.2)" />
              <stop offset="50%" stopColor="hsla(var(--primary), 0.4)" />
              <stop offset="100%" stopColor="hsla(var(--primary), 0.2)" />
            </linearGradient>
          </defs>
          {/* Horizontal roads */}
          <rect x="10%" y="28%" width="80%" height="4%" rx="2" fill="url(#roadGradient)" />
          <rect x="10%" y="58%" width="80%" height="4%" rx="2" fill="url(#roadGradient)" />
          {/* Vertical roads */}
          <rect x="23%" y="15%" width="4%" height="70%" rx="2" fill="url(#roadGradient)" />
          <rect x="48%" y="15%" width="4%" height="70%" rx="2" fill="url(#roadGradient)" />
          <rect x="73%" y="15%" width="4%" height="70%" rx="2" fill="url(#roadGradient)" />
        </svg>

        {/* Location Buildings */}
        {LOCATIONS.map((location) => {
          const isActive = currentLocation === location.id;
          const gridX = (location.x / 4) * 80 + 10; // percentage position
          const gridY = (location.y / 2) * 60 + 15;
          
          return (
            <motion.button
              key={location.id}
              className={`
                absolute transform -translate-x-1/2 -translate-y-1/2
                flex flex-col items-center gap-1 p-2 rounded-lg
                transition-all duration-300
                ${isActive 
                  ? 'bg-primary/20 border-2 border-primary shadow-lg shadow-primary/30 scale-110 z-20' 
                  : 'bg-card/80 border border-border/50 hover:border-primary/50 hover:bg-primary/10 z-10'
                }
              `}
              style={{ 
                left: `${gridX}%`, 
                top: `${gridY}%`,
              }}
              onClick={() => !isActive && onMoveToLocation(location.id, { x: location.x, y: location.y })}
              whileHover={{ scale: isActive ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-2xl">{location.emoji}</span>
              <span className={`text-[9px] uppercase tracking-wider font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                {location.name}
              </span>
            </motion.button>
          );
        })}

        {/* Player Avatar */}
        <motion.div
          className="absolute z-30 pointer-events-none"
          initial={false}
          animate={{
            left: `${(playerPosition.x / 4) * 80 + 10}%`,
            top: `${(playerPosition.y / 2) * 60 + 15}%`,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative">
            <motion.div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-lg shadow-lg"
              animate={{ 
                boxShadow: [
                  '0 0 10px hsla(var(--primary), 0.5)',
                  '0 0 20px hsla(var(--primary), 0.7)',
                  '0 0 10px hsla(var(--primary), 0.5)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🧑‍🎓
            </motion.div>
            {/* Ping effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-2 left-2 right-2 flex justify-center">
        <div className="bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full border border-border/50">
          <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
            Tap a location to move
          </span>
        </div>
      </div>
    </div>
  );
}
