import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GameLayoutProps {
  children: ReactNode;
}

export function GameLayout({ children }: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-game flex items-start justify-center p-4 md:p-5 overflow-y-auto">
      {/* Floating tech particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-32 h-32">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
            <path
              d="M0 0 L40 0 L40 2 L2 2 L2 40 L0 40 Z"
              fill="hsl(var(--primary))"
            />
            <path
              d="M0 0 L20 0 L20 1 L1 1 L1 20 L0 20 Z"
              fill="hsl(var(--accent))"
            />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 rotate-90">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
            <path
              d="M0 0 L40 0 L40 2 L2 2 L2 40 L0 40 Z"
              fill="hsl(var(--primary))"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-32 h-32 -rotate-90">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
            <path
              d="M0 0 L40 0 L40 2 L2 2 L2 40 L0 40 Z"
              fill="hsl(var(--primary))"
            />
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 w-32 h-32 rotate-180">
          <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
            <path
              d="M0 0 L40 0 L40 2 L2 2 L2 40 L0 40 Z"
              fill="hsl(var(--primary))"
            />
          </svg>
        </div>

        {/* Animated data streams */}
        <motion.div
          className="absolute h-px bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{ top: '20%', left: 0, right: 0 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            scaleX: [0.3, 1, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute h-px bg-gradient-to-r from-transparent via-accent to-transparent"
          style={{ top: '70%', left: 0, right: 0 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            scaleX: [0.2, 0.8, 0.2],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Floating hexagons */}
        <motion.div
          className="absolute w-8 h-8"
          style={{ top: '15%', left: '10%' }}
          animate={{ 
            y: [-5, 5, -5],
            rotate: [0, 180, 360],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
        <motion.div
          className="absolute w-6 h-6"
          style={{ top: '60%', right: '12%' }}
          animate={{ 
            y: [5, -5, 5],
            rotate: [360, 180, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <polygon
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="2"
            />
          </svg>
        </motion.div>

        {/* Data points */}
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{ top: '30%', left: '85%' }}
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3],
            boxShadow: [
              '0 0 5px hsl(var(--primary))',
              '0 0 15px hsl(var(--primary))',
              '0 0 5px hsl(var(--primary))'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 rounded-full bg-accent"
          style={{ top: '75%', left: '8%' }}
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.22, 1, 0.36, 1],
        }}
        className="w-full max-w-md my-5 relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
