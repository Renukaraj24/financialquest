import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <GameLayout>
      <div className="game-card text-center">
        {/* Cute emoji header */}
        <motion.div 
          className="emoji-badge mx-auto mb-6"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          🎮
        </motion.div>

        <motion.h1 
          className="text-3xl md:text-4xl font-extrabold text-gradient mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Financial Learning
        </motion.h1>
        
        <motion.div 
          className="flex items-center justify-center gap-2 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <p className="text-muted-foreground text-base md:text-lg">
            Master money through play!
          </p>
          <Heart className="w-4 h-4 text-primary" />
        </motion.div>
        
        <motion.div 
          className="flex flex-col gap-4 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button
            onClick={() => navigate('/signup')}
            className="btn-gradient w-full"
          >
            Start New Journey 🚀
          </button>
          <button
            onClick={() => navigate('/login')}
            className="btn-outline-primary w-full"
          >
            Welcome Back 👋
          </button>
        </motion.div>

        <motion.p 
          className="text-xs text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Learn. Play. Grow. 🌱
        </motion.p>
      </div>
    </GameLayout>
  );
}
