import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface GameLayoutProps {
  children: ReactNode;
}

export function GameLayout({ children }: GameLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-game flex items-start justify-center p-4 md:p-5 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-md my-5"
      >
        {children}
      </motion.div>
    </div>
  );
}
