import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, Sparkles, ChevronRight, Trophy, Star, Zap,
  BookOpen, Target, Shield
} from 'lucide-react';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGameProgress } from '@/hooks/useGameProgress';
import type { LevelData, Scenario, Choice } from '@/data/gameData';
import type { LevelProgress } from '@/types/gameProgress';

interface GameLevelProps {
  levelData: LevelData;
  nextRoute: string;
}

export function GameLevel({ levelData, nextRoute }: GameLevelProps) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { completeLevel, isLevelCompleted } = useGameProgress();
  
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [money, setMoney] = useState(levelData.startingMoney);
  const [phase, setPhase] = useState<'intro' | 'scenario' | 'outcome' | 'complete'>('intro');
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [unlockedTerms, setUnlockedTerms] = useState<string[]>([]);
  const [choices, setChoices] = useState<{ scenarioId: string; choiceId: string; effect: 'positive' | 'neutral' | 'negative' }[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  const currentScenario = levelData.scenarios[currentScenarioIndex];
  const positiveChoices = choices.filter(c => c.effect === 'positive').length;
  const score = Math.round((positiveChoices / levelData.scenarios.length) * 100);
  const xpEarned = positiveChoices * 100 + (levelData.xpReward / 2);

  const handleStartGame = () => {
    setPhase('scenario');
  };

  const handleChoice = (choice: Choice) => {
    setSelectedChoice(choice);
    setMoney(prev => prev - choice.cost);
    setChoices(prev => [...prev, { scenarioId: currentScenario.id, choiceId: choice.id, effect: choice.effect }]);
    if (!unlockedTerms.includes(choice.term)) {
      setUnlockedTerms(prev => [...prev, choice.term]);
    }
    setPhase('outcome');
  };

  const handleContinue = () => {
    if (currentScenarioIndex < levelData.scenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setSelectedChoice(null);
      setPhase('scenario');
    } else {
      // Complete the level
      const levelProgress: LevelProgress = {
        levelId: levelData.id,
        completed: true,
        score,
        choicesMade: choices,
        termsUnlocked: unlockedTerms,
        moneyLeft: money,
        xpEarned: Math.round(xpEarned)
      };
      completeLevel(levelData.id, levelProgress);
      setPhase('complete');
    }
  };

  const handleProceed = () => {
    navigate(nextRoute);
  };

  const getBadgeColor = () => {
    if (score >= 80) return 'from-yellow-400 to-amber-500';
    if (score >= 60) return 'from-cyan-400 to-blue-500';
    return 'from-violet-400 to-purple-500';
  };

  const LevelIcon = levelData.badge.icon;

  return (
    <GameLayout>
      <div className="game-card scanlines max-w-lg mx-auto">
        {/* Money Display */}
        <motion.div 
          className="relative mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Your Wallet</p>
                <motion.p 
                  className="text-xl font-black text-gradient"
                  key={money}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  ₹{money.toLocaleString('en-IN')}
                </motion.p>
              </div>
            </div>
            {phase !== 'intro' && phase !== 'complete' && (
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Scenario</p>
                <p className="text-sm font-bold text-primary">{currentScenarioIndex + 1}/{levelData.scenarios.length}</p>
              </div>
            )}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* INTRO PHASE */}
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.div 
                className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-primary to-cyan-400 rounded-2xl"
                animate={{ 
                  boxShadow: ['0 0 20px hsl(var(--primary) / 0.3)', '0 0 40px hsl(var(--primary) / 0.5)', '0 0 20px hsl(var(--primary) / 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <LevelIcon className="w-10 h-10 text-white" />
              </motion.div>

              <p className="text-[10px] uppercase tracking-widest text-primary mb-1">Level {levelData.id}</p>
              <h1 className="text-2xl font-black text-gradient uppercase tracking-wider mb-2">
                {levelData.name}
              </h1>
              <p className="text-sm text-muted-foreground mb-4">{levelData.theme}</p>
              <p className="text-sm text-foreground/80 mb-6">{levelData.description}</p>

              {/* Money Note UI */}
              <motion.div 
                className="relative mx-auto w-64 h-28 mb-6"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 rounded-lg shadow-xl">
                  <div className="absolute inset-1 border-2 border-white/20 rounded-lg flex flex-col items-center justify-center">
                    <p className="text-white/60 text-xs uppercase tracking-widest">Starting Budget</p>
                    <p className="text-3xl font-black text-white">₹{levelData.startingMoney.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </motion.div>

              <div className="space-y-2 text-left mb-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Target className="w-4 h-4 text-primary" />
                  <span>{levelData.scenarios.length} scenarios to navigate</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>{levelData.terms.length} financial terms to unlock</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>No wrong answers — only learning moments</span>
                </div>
              </div>

              <motion.button
                onClick={handleStartGame}
                className="btn-gradient w-full flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-4 h-4" />
                Begin Level {levelData.id}
              </motion.button>
            </motion.div>
          )}

          {/* SCENARIO PHASE */}
          {phase === 'scenario' && currentScenario && (
            <motion.div
              key={`scenario-${currentScenario.id}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                  <currentScenario.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-primary">Scenario {currentScenarioIndex + 1}</p>
                  <h2 className="text-lg font-bold text-foreground">{currentScenario.title}</h2>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                {currentScenario.story}
              </p>

              <div className="space-y-3">
                {currentScenario.choices.map((choice, index) => (
                  <motion.button
                    key={choice.id}
                    onClick={() => handleChoice(choice)}
                    className="w-full text-left p-4 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                        {choice.text}
                      </span>
                      {choice.cost > 0 && (
                        <span className="text-xs text-orange-400 font-medium">-₹{choice.cost}</span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* OUTCOME PHASE */}
          {phase === 'outcome' && selectedChoice && (
            <motion.div
              key="outcome"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <motion.div 
                className={`p-4 rounded-lg mb-4 ${
                  selectedChoice.effect === 'positive' 
                    ? 'bg-emerald-500/10 border border-emerald-500/20' 
                    : selectedChoice.effect === 'negative'
                    ? 'bg-orange-500/10 border border-orange-500/20'
                    : 'bg-primary/10 border border-primary/20'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-sm text-foreground">{selectedChoice.outcome}</p>
              </motion.div>

              <motion.div 
                className="p-4 rounded-lg bg-card/50 border border-border/50 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-1">Money Mentor</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{selectedChoice.mentorMessage}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-cyan-500/5 border border-primary/20"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, delay: 0.5 }}>
                    <BookOpen className="w-4 h-4 text-primary" />
                  </motion.div>
                  <p className="text-xs uppercase tracking-widest text-primary font-bold">Term Unlocked</p>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{selectedChoice.term}</h3>
                <p className="text-sm text-muted-foreground">{selectedChoice.termExplanation}</p>
              </motion.div>

              <motion.button
                onClick={handleContinue}
                className="btn-gradient w-full mt-6 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {/* COMPLETE PHASE */}
          {phase === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.div 
                className={`w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br ${getBadgeColor()} rounded-2xl`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
              >
                <LevelIcon className="w-12 h-12 text-white" />
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-black text-gradient uppercase tracking-wider mb-1">
                  Level {levelData.id} Complete!
                </h2>
                <p className="text-lg font-bold text-primary mb-4">{levelData.badge.emoji} {levelData.badge.name}</p>
              </motion.div>

              <motion.div 
                className="grid grid-cols-2 gap-3 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                  <Wallet className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Money Left</p>
                  <p className="text-xl font-black text-emerald-400">₹{money.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-4 rounded-lg bg-card/50 border border-border/50">
                  <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Score</p>
                  <p className="text-xl font-black text-yellow-400">{score}%</p>
                </div>
              </motion.div>

              <motion.div 
                className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-cyan-500/5 border border-primary/20 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <p className="text-xs uppercase tracking-widest text-primary font-bold">Terms Unlocked</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {unlockedTerms.map((term, index) => (
                    <motion.span
                      key={term}
                      className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                    >
                      {term}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center justify-center gap-2 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-lg font-bold text-foreground">+{Math.round(xpEarned)} XP Earned</span>
              </motion.div>

              <motion.button
                onClick={handleProceed}
                className="btn-gradient w-full flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {levelData.id < 10 ? `Continue to Level ${levelData.id + 1}` : 'View Your Results'}
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GameLayout>
  );
}
