import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Sparkles } from 'lucide-react';

interface GrowthAnimationProps {
  amount: number;
  isVisible: boolean;
  onComplete?: () => void;
}

export function GrowthAnimation({ amount, isVisible, onComplete }: GrowthAnimationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onComplete}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            <motion.div
              className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl"
              animate={{
                boxShadow: [
                  '0 0 20px rgba(139, 92, 246, 0.3)',
                  '0 0 60px rgba(139, 92, 246, 0.6)',
                  '0 0 20px rgba(139, 92, 246, 0.3)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <TrendingUp className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-violet-400" />
                <p className="text-sm uppercase tracking-widest text-violet-400">Growth Tick!</p>
                <Sparkles className="w-5 h-5 text-violet-400" />
              </div>
              <motion.p
                className="text-4xl font-black text-gradient"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: 'spring' }}
              >
                +₹{amount.toLocaleString('en-IN')}
              </motion.p>
              <p className="text-muted-foreground text-sm mt-2">Your investment grew!</p>
              <p className="text-xs text-muted-foreground mt-4">Tap to continue</p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
