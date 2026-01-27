import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { motion } from 'framer-motion';
import { Cpu, Zap, Database } from 'lucide-react';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <GameLayout>
      <div className="game-card text-center scanlines">
        {/* Animated tech icon */}
        <motion.div 
          className="icon-cute mx-auto mb-6"
          animate={{ 
            boxShadow: [
              '0 0 20px hsla(195, 100%, 50%, 0.5)',
              '0 0 40px hsla(195, 100%, 50%, 0.7)',
              '0 0 20px hsla(195, 100%, 50%, 0.5)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Cpu className="w-8 h-8 text-primary-foreground" />
        </motion.div>

        {/* Title with glitch effect */}
        <motion.h1 
          className="text-2xl md:text-3xl font-black text-gradient mb-2 uppercase tracking-wider"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Financial Quest
        </motion.h1>
        
        <motion.p 
          className="text-muted-foreground text-xs uppercase tracking-widest mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Master Your Money • Level Up Your Life
        </motion.p>

        {/* Feature indicators */}
        <motion.div 
          className="flex justify-center gap-6 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 flex items-center justify-center border border-primary/30 bg-primary/5">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Learn</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 flex items-center justify-center border border-accent/30 bg-accent/5">
              <Database className="w-5 h-5 text-accent" />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Track</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="w-10 h-10 flex items-center justify-center border border-primary/30 bg-primary/5">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Grow</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button 
            onClick={() => navigate('/signup')} 
            className="btn-gradient w-full"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Initialize System
          </motion.button>
          
          <motion.button 
            onClick={() => navigate('/login')} 
            className="btn-outline-primary w-full"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Access Terminal
          </motion.button>
        </motion.div>

        {/* Status bar */}
        <motion.div 
          className="mt-6 pt-4 border-t border-border/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
            <motion.span 
              className="w-2 h-2 rounded-full bg-success"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            System Online • Ready to Deploy
          </div>
        </motion.div>
      </div>
    </GameLayout>
  );
}
