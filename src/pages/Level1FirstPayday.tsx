import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGameProgress } from '@/hooks/useGameProgress';
import type { LevelProgress } from '@/types/gameProgress';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  Sparkles, 
  ChevronRight, 
  Trophy, 
  Star, 
  Zap,
  BookOpen,
  Target,
  Shield,
  TrendingUp,
  Coins,
  PiggyBank,
  Smartphone,
  Coffee,
  Bus,
  Gift
} from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  story: string;
  icon: React.ElementType;
  choices: {
    id: string;
    text: string;
    cost: number;
    effect: 'positive' | 'neutral' | 'negative';
    outcome: string;
    mentorMessage: string;
    term: string;
    termExplanation: string;
  }[];
}

const SCENARIOS: Scenario[] = [
  {
    id: 'liquidity',
    title: 'The Unexpected Need',
    story: 'Your friend calls — they need ₹500 urgently for a medical emergency. You want to help, but your money situation matters too.',
    icon: Wallet,
    choices: [
      {
        id: 'help-cash',
        text: 'Help with cash you have',
        cost: 500,
        effect: 'positive',
        outcome: 'You helped your friend immediately. Having cash ready made this possible.',
        mentorMessage: 'You had money ready when needed. That ability to use your money quickly is valuable.',
        term: 'Liquidity',
        termExplanation: 'Having money you can use right away, without waiting or losing value.'
      },
      {
        id: 'cant-help',
        text: 'Say you don\'t have cash right now',
        cost: 0,
        effect: 'neutral',
        outcome: 'You couldn\'t help because your money wasn\'t accessible.',
        mentorMessage: 'Sometimes we have value locked away but can\'t use it when needed. That\'s a lesson about keeping some money accessible.',
        term: 'Liquidity',
        termExplanation: 'Having money you can use right away, without waiting or losing value.'
      }
    ]
  },
  {
    id: 'saving',
    title: 'The Monthly Dilemma',
    story: 'It\'s the start of the month. You\'re tempted to spend on new headphones (₹1,200), but next month has a college trip.',
    icon: PiggyBank,
    choices: [
      {
        id: 'save-trip',
        text: 'Keep money for the trip',
        cost: 0,
        effect: 'positive',
        outcome: 'You kept ₹1,200 safe. Next month, you\'ll have enough for the trip!',
        mentorMessage: 'You chose future happiness over instant gratification. That takes real wisdom.',
        term: 'Saving',
        termExplanation: 'Setting aside money now so you can use it for something important later.'
      },
      {
        id: 'buy-headphones',
        text: 'Buy the headphones now',
        cost: 1200,
        effect: 'negative',
        outcome: 'New headphones! But now the college trip seems harder to afford...',
        mentorMessage: 'The headphones are nice, but now you might miss out on experiences. Balance is key.',
        term: 'Saving',
        termExplanation: 'Setting aside money now so you can use it for something important later.'
      }
    ]
  },
  {
    id: 'asset',
    title: 'The Book vs The Snack',
    story: 'You\'re at a bookstore. A skill-building book costs ₹400. The café next door has your favorite snack for ₹400 too.',
    icon: BookOpen,
    choices: [
      {
        id: 'buy-book',
        text: 'Buy the skill book',
        cost: 400,
        effect: 'positive',
        outcome: 'The book teaches you something new. This knowledge stays with you forever.',
        mentorMessage: 'You bought something that keeps giving value. Knowledge compounds over time.',
        term: 'Asset',
        termExplanation: 'Something you own that grows in value or helps you earn more over time.'
      },
      {
        id: 'buy-snack',
        text: 'Get the snack instead',
        cost: 400,
        effect: 'neutral',
        outcome: 'Delicious! But it\'s gone in 30 minutes. Nothing left to show for it.',
        mentorMessage: 'Sometimes enjoyment matters. But notice — the snack is consumed, while the book would have lasted.',
        term: 'Asset',
        termExplanation: 'Something you own that grows in value or helps you earn more over time.'
      }
    ]
  },
  {
    id: 'liability',
    title: 'The Subscription Trap',
    story: 'A gaming app offers a "free" premium trial. But it auto-renews at ₹299/month if you forget to cancel.',
    icon: Smartphone,
    choices: [
      {
        id: 'skip-trial',
        text: 'Skip the trial',
        cost: 0,
        effect: 'positive',
        outcome: 'You avoided a recurring payment. Smart move!',
        mentorMessage: 'You recognized something that would keep taking from you every month. Good instinct.',
        term: 'Liability',
        termExplanation: 'Something that takes money away from you regularly, often without adding real value.'
      },
      {
        id: 'take-trial',
        text: 'Start the free trial',
        cost: 299,
        effect: 'negative',
        outcome: 'You forgot to cancel. ₹299 gone automatically next month.',
        mentorMessage: 'These "free" trials often become ongoing costs we don\'t notice. Watch out for recurring charges.',
        term: 'Liability',
        termExplanation: 'Something that takes money away from you regularly, often without adding real value.'
      }
    ]
  },
  {
    id: 'investing',
    title: 'The Small Opportunity',
    story: 'Your college has a workshop on digital skills for ₹800. It could help you earn through freelancing later.',
    icon: TrendingUp,
    choices: [
      {
        id: 'attend-workshop',
        text: 'Attend the workshop',
        cost: 800,
        effect: 'positive',
        outcome: 'You learned skills that could help you earn money in the future!',
        mentorMessage: 'You spent money to grow yourself. That\'s one of the smartest uses of money.',
        term: 'Investing',
        termExplanation: 'Using money today in a way that can bring you more value or money in the future.'
      },
      {
        id: 'skip-workshop',
        text: 'Keep the money instead',
        cost: 0,
        effect: 'neutral',
        outcome: 'You saved ₹800, but missed a chance to learn something valuable.',
        mentorMessage: 'Keeping money is safe, but sometimes spending on growth can multiply your future options.',
        term: 'Investing',
        termExplanation: 'Using money today in a way that can bring you more value or money in the future.'
      }
    ]
  }
];

export default function Level1FirstPayday() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { completeLevel } = useGameProgress();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [money, setMoney] = useState(5000);
  const [phase, setPhase] = useState<'intro' | 'scenario' | 'outcome' | 'complete'>('intro');
  const [selectedChoice, setSelectedChoice] = useState<typeof SCENARIOS[0]['choices'][0] | null>(null);
  const [unlockedTerms, setUnlockedTerms] = useState<string[]>([]);
  const [choices, setChoices] = useState<{ scenarioId: string; choiceId: string; effect: 'positive' | 'neutral' | 'negative' }[]>([]);

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const currentScenario = SCENARIOS[currentScenarioIndex];
  const positiveChoices = choices.filter(c => c.effect === 'positive').length;
  const score = Math.round((positiveChoices / SCENARIOS.length) * 100);
  const xpEarned = positiveChoices * 100 + 400;

  const handleStartGame = () => {
    setPhase('scenario');
  };

  const handleChoice = (choice: typeof SCENARIOS[0]['choices'][0]) => {
    setSelectedChoice(choice);
    setMoney(prev => prev - choice.cost);
    setChoices(prev => [...prev, { 
      scenarioId: currentScenario.id, 
      choiceId: choice.id, 
      effect: choice.effect as 'positive' | 'neutral' | 'negative' 
    }]);
    if (!unlockedTerms.includes(choice.term)) {
      setUnlockedTerms(prev => [...prev, choice.term]);
    }
    setPhase('outcome');
  };

  const handleContinue = () => {
    if (currentScenarioIndex < SCENARIOS.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setSelectedChoice(null);
      setPhase('scenario');
    } else {
      // Complete Level 1 and save progress
      const levelProgress: LevelProgress = {
        levelId: 1,
        completed: true,
        score,
        choicesMade: choices,
        termsUnlocked: unlockedTerms,
        moneyLeft: money,
        xpEarned: Math.round(xpEarned)
      };
      completeLevel(1, levelProgress);
      setPhase('complete');
    }
  };

  const handleProceedToLevel2 = () => {
    navigate('/level/2');
  };

  const getBadge = () => {
    if (score >= 80) return { name: 'Money Master', icon: Trophy, color: 'from-yellow-400 to-amber-500' };
    if (score >= 60) return { name: 'Wise Spender', icon: Star, color: 'from-cyan-400 to-blue-500' };
    return { name: 'Learning Warrior', icon: Zap, color: 'from-violet-400 to-purple-500' };
  };

  const badge = getBadge();

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
                <p className="text-sm font-bold text-primary">{currentScenarioIndex + 1}/{SCENARIOS.length}</p>
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
                <Coins className="w-10 h-10 text-white" />
              </motion.div>

              <h1 className="text-2xl font-black text-gradient uppercase tracking-wider mb-2">
                Level 1: First Payday
              </h1>
              <p className="text-muted-foreground text-sm mb-6">
                You just received your monthly money. Let's see how wisely you can use it!
              </p>

              {/* Money Note UI */}
              <motion.div 
                className="relative mx-auto w-64 h-32 mb-6"
                initial={{ rotateY: 90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500 rounded-lg shadow-xl transform perspective-1000">
                  <div className="absolute inset-1 border-2 border-white/20 rounded-lg flex flex-col items-center justify-center">
                    <p className="text-white/60 text-xs uppercase tracking-widest">Monthly Allowance</p>
                    <p className="text-4xl font-black text-white">₹5,000</p>
                    <p className="text-white/60 text-[10px] uppercase tracking-wider mt-1">Student Finance Mission</p>
                  </div>
                  <div className="absolute top-2 left-2 w-6 h-6 border border-white/30 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white/50" />
                  </div>
                  <div className="absolute top-2 right-2 w-6 h-6 border border-white/30 rounded-full flex items-center justify-center">
                    <Star className="w-3 h-3 text-white/50" />
                  </div>
                </div>
              </motion.div>

              <div className="space-y-2 text-left mb-6">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Target className="w-4 h-4 text-primary" />
                  <span>Make choices based on real-life scenarios</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>Learn financial terms through your decisions</span>
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
                Begin Your Journey
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
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center`}>
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
              {/* Outcome */}
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

              {/* Mentor Message */}
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

              {/* Term Unlocked */}
              <motion.div 
                className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-cyan-500/5 border border-primary/20"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
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
              {/* Badge */}
              <motion.div 
                className={`w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br ${badge.color} rounded-2xl`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
              >
                <badge.icon className="w-12 h-12 text-white" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-2xl font-black text-gradient uppercase tracking-wider mb-1">
                  Level 1 Complete!
                </h2>
                <p className="text-lg font-bold text-primary mb-4">🏅 Money Explorer</p>
              </motion.div>

              {/* Stats */}
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

              {/* Terms Unlocked */}
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
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      {term}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Points */}
              <motion.div 
                className="flex items-center justify-center gap-2 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-lg font-bold text-foreground">+{xpEarned} XP Earned</span>
              </motion.div>

              <motion.button
                onClick={handleProceedToLevel2}
                className="btn-gradient w-full flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue to Level 2
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GameLayout>
  );
}
