import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GameLayoutProps {
  children: ReactNode;
}

export function GameLayout({ children }: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-game flex items-start justify-center p-4 md:p-5 overflow-y-auto">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-4 h-4 rounded-full bg-white/30"
          style={{ top: '20%', left: '10%' }}
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-3 h-3 rounded-full bg-white/40"
          style={{ top: '60%', right: '15%' }}
          animate={{ y: [10, -10, 10], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-white/50"
          style={{ top: '40%', left: '80%' }}
          animate={{ y: [-8, 8, -8], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute text-2xl"
          style={{ top: '15%', right: '20%' }}
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          ✨
        </motion.div>
        <motion.div
          className="absolute text-xl"
          style={{ bottom: '25%', left: '12%' }}
          animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          💖
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.22, 1, 0.36, 1],
          scale: { duration: 0.4 }
        }}
        className="w-full max-w-md my-5 relative z-10"
      >
        {children}
      </motion.div>
    </div>
  );
}
