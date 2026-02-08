import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, Shield, TrendingUp, Sparkles, ChevronRight, 
  BookOpen, AlertTriangle, Headphones, Smartphone
} from 'lucide-react';
import { GameLayout } from '@/components/GameLayout';
import { StressMeter } from '@/components/game/StressMeter';
import { MoneyAllocation } from '@/components/game/MoneyAllocation';
import { WeekTimeline } from '@/components/game/WeekTimeline';
import { GrowthAnimation } from '@/components/game/GrowthAnimation';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGameProgress } from '@/hooks/useGameProgress';
import type { LevelProgress } from '@/types/gameProgress';

interface Allocation {
  wallet: number;
  safety: number;
  growth: number;
}

interface WeekEvent {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  cost: number;
  choices: {
    id: string;
    text: string;
    effect: () => void;
    outcome: string;
  }[];
}

const LEVEL_2_TERMS = [
  { term: 'Emergency Fund', explanation: 'Money set aside specifically for unexpected expenses or emergencies.' },
  { term: 'Financial Cushion', explanation: 'Extra money saved beyond regular expenses to handle unexpected situations.' },
  { term: 'Cash Flow', explanation: 'The movement of money in and out of your wallet over time.' },
  { term: 'Investing', explanation: 'Using money today in a way that can bring more value or money in the future.' },
  { term: 'Passive Income', explanation: 'Money that comes in regularly without continuous active effort.' },
  { term: 'Compound Interest', explanation: 'Interest earned on both your original money AND the interest already earned.' },
  { term: 'Opportunity Cost', explanation: 'What you sacrifice when choosing one option over another.' },
  { term: 'Time Value of Money', explanation: 'Money today is worth more than the same amount in the future because it can grow.' },
];

export default function Level2Page() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { completeLevel, progress, isLevelUnlocked, isLoading } = useGameProgress();

  // Get starting money from Level 1 completion or default
  const level1Progress = progress.levelProgress[1];
  const startingMoney = level1Progress?.moneyLeft ?? 4000;

  const [phase, setPhase] = useState<'intro' | 'allocate' | 'week' | 'event' | 'outcome' | 'growth' | 'complete'>('intro');
  const [currentWeek, setCurrentWeek] = useState(1);
  const [stress, setStress] = useState(20);
  const [allocation, setAllocation] = useState<Allocation>(() => ({ wallet: startingMoney, safety: 0, growth: 0 }));
  const [totalMoney, setTotalMoney] = useState(() => startingMoney);
  const [showGrowth, setShowGrowth] = useState(false);
  const [growthAmount, setGrowthAmount] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<any>(null);
  const [unlockedTerms, setUnlockedTerms] = useState<string[]>([]);
  const [weekOutcome, setWeekOutcome] = useState<{ title: string; message: string; mentorMessage: string; term?: string } | null>(null);
  const [choices, setChoices] = useState<{ scenarioId: string; choiceId: string; effect: 'positive' | 'neutral' | 'negative' }[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // Wait for progress to load before gating (prevents redirect loops)
    if (isLoading) return;

    if (!isLevelUnlocked(2)) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, isLevelUnlocked, navigate]);

  // Sync starting money after progress finishes loading (only if user hasn't started Level 2 yet)
  useEffect(() => {
    if (isLoading) return;
    if (phase !== 'intro' || choices.length > 0 || currentWeek !== 1) return;

    setAllocation({ wallet: startingMoney, safety: 0, growth: 0 });
    setTotalMoney(startingMoney);
  }, [isLoading, startingMoney, phase, choices.length, currentWeek]);

  if (!isAuthenticated) return null;

  if (isLoading) {
    return (
      <GameLayout>
        <div className="game-card scanlines max-w-lg mx-auto p-6 text-center">
          <p className="text-sm text-muted-foreground">Loading Level 2…</p>
        </div>
      </GameLayout>
    );
  }


  const weekEvents: Record<number, { title: string; description: string; icon: React.ElementType; cost: number; term: string; termExplanation: string }> = {
    2: {
      title: 'Earphones Broke!',
      description: 'Your earphones stopped working. New ones cost ₹700. This wasn\'t planned!',
      icon: Headphones,
      cost: 700,
      term: 'Emergency Fund',
      termExplanation: 'Money set aside specifically for unexpected expenses or emergencies.'
    },
    3: {
      title: 'Phone Screen Cracked',
      description: 'Your phone slipped and the screen cracked. Repair costs ₹1,500.',
      icon: Smartphone,
      cost: 1500,
      term: 'Financial Cushion',
      termExplanation: 'Extra money saved beyond regular expenses to handle unexpected situations.'
    }
  };

  const handleStart = () => {
    setPhase('allocate');
  };

  const handleAllocationComplete = () => {
    setPhase('week');
  };

  const handleWeekAction = () => {
    if (currentWeek === 1) {
      // Week 1 - Just allocation done, move to week 2
      setCurrentWeek(2);
      setPhase('event');
    } else if (currentWeek === 2) {
      // Week 2 - Event happened
      setPhase('event');
    } else if (currentWeek === 3) {
      // Week 3 - Growth tick
      const growthRate = 0.05; // 5% weekly growth for demo
      const earned = Math.round(allocation.growth * growthRate);
      if (earned > 0) {
        setGrowthAmount(earned);
        setShowGrowth(true);
        setAllocation(prev => ({ ...prev, growth: prev.growth + earned }));
        setTotalMoney(prev => prev + earned);
        if (!unlockedTerms.includes('Passive Income')) {
          setUnlockedTerms(prev => [...prev, 'Passive Income', 'Compound Interest']);
        }
      }
      setWeekOutcome({
        title: 'Growth Tick!',
        message: earned > 0 
          ? `Your investment grew by ₹${earned}! Money working while you sleep.`
          : 'No growth this week — you have no money in Growth Box.',
        mentorMessage: earned > 0 
          ? 'This is passive income — money that grows without active work. The magic of compound interest begins!'
          : 'To see growth, you need to allocate money to the Growth Box. That\'s investing.',
        term: 'Passive Income'
      });
      setPhase('outcome');
    } else if (currentWeek === 4) {
      // Week 4 - Final choice
      setPhase('week');
    }
  };

  const handleEventChoice = (useSafety: boolean) => {
    const event = weekEvents[currentWeek];
    if (!event) return;

    if (useSafety && allocation.safety >= event.cost) {
      // Use safety fund
      setAllocation(prev => ({ ...prev, safety: prev.safety - event.cost }));
      setStress(prev => Math.max(0, prev - 10));
      setWeekOutcome({
        title: 'Emergency Handled!',
        message: `Your Safety Jar covered the ₹${event.cost} expense. No stress, no borrowing!`,
        mentorMessage: 'This is exactly why we keep an emergency fund. It absorbs shocks so your life stays stable.',
        term: event.term
      });
      setChoices(prev => [...prev, { scenarioId: `week-${currentWeek}`, choiceId: 'use-safety', effect: 'positive' }]);
    } else if (useSafety && allocation.safety < event.cost) {
      // Not enough in safety
      const deficit = event.cost - allocation.safety;
      setAllocation(prev => ({ 
        ...prev, 
        safety: 0,
        wallet: prev.wallet - deficit
      }));
      setStress(prev => Math.min(100, prev + 15));
      setWeekOutcome({
        title: 'Partial Coverage',
        message: `Safety Jar helped, but you still needed ₹${deficit} from your wallet.`,
        mentorMessage: 'Your cushion softened the blow, but wasn\'t enough. Keep building it!',
        term: event.term
      });
      setChoices(prev => [...prev, { scenarioId: `week-${currentWeek}`, choiceId: 'partial-safety', effect: 'neutral' }]);
    } else {
      // Use wallet
      if (allocation.wallet >= event.cost) {
        setAllocation(prev => ({ ...prev, wallet: prev.wallet - event.cost }));
        setStress(prev => Math.min(100, prev + 25));
        setWeekOutcome({
          title: 'Emergency Paid',
          message: `You paid ₹${event.cost} from your wallet. It stings!`,
          mentorMessage: 'Without a safety fund, emergencies hurt more. Each surprise eats into your spending money.',
          term: 'Cash Flow'
        });
        setChoices(prev => [...prev, { scenarioId: `week-${currentWeek}`, choiceId: 'use-wallet', effect: 'negative' }]);
      } else {
        setStress(prev => Math.min(100, prev + 40));
        setWeekOutcome({
          title: 'Not Enough Money!',
          message: `You don\'t have ₹${event.cost}. You had to borrow from friends.`,
          mentorMessage: 'This is financial stress at its worst. Building an emergency fund prevents this.',
          term: 'Financial Cushion'
        });
        setChoices(prev => [...prev, { scenarioId: `week-${currentWeek}`, choiceId: 'borrowed', effect: 'negative' }]);
      }
    }
    if (!unlockedTerms.includes(event.term)) {
      setUnlockedTerms(prev => [...prev, event.term]);
    }
    setPhase('outcome');
  };

  const handleOutcomeContinue = () => {
    if (currentWeek < 4) {
      setCurrentWeek(prev => prev + 1);
      if (currentWeek === 2) {
        // After week 2 event, move to week 3 growth
        setPhase('week');
      } else {
        setPhase('week');
      }
    } else {
      handleComplete();
    }
  };

  const handleFinalChoice = (choice: 'spend' | 'save' | 'grow') => {
    let message = '';
    let mentorMsg = '';
    let term = '';
    
    switch (choice) {
      case 'spend':
        message = 'You chose to enjoy now! Short-term happiness has value too.';
        mentorMsg = 'Spending isn\'t bad, but balance matters. Short-term goals are about enjoying the present responsibly.';
        term = 'Short-term Goals';
        setChoices(prev => [...prev, { scenarioId: 'week-4', choiceId: 'spend', effect: 'neutral' }]);
        break;
      case 'save':
        message = 'You chose safety! Your cushion grows stronger.';
        mentorMsg = 'Building a financial cushion means peace of mind. You\'re thinking ahead!';
        term = 'Long-term Goals';
        setAllocation(prev => ({ ...prev, safety: prev.safety + Math.floor(prev.wallet * 0.3), wallet: prev.wallet * 0.7 }));
        setStress(prev => Math.max(0, prev - 10));
        setChoices(prev => [...prev, { scenarioId: 'week-4', choiceId: 'save', effect: 'positive' }]);
        break;
      case 'grow':
        message = 'You chose growth! Your money starts working harder.';
        mentorMsg = 'The time value of money means starting early beats waiting. Every month counts!';
        term = 'Time Value of Money';
        setAllocation(prev => ({ ...prev, growth: prev.growth + Math.floor(prev.wallet * 0.3), wallet: prev.wallet * 0.7 }));
        setChoices(prev => [...prev, { scenarioId: 'week-4', choiceId: 'grow', effect: 'positive' }]);
        break;
    }
    
    if (!unlockedTerms.includes(term)) {
      setUnlockedTerms(prev => [...prev, term]);
    }
    
    setWeekOutcome({
      title: 'Your Choice',
      message,
      mentorMessage: mentorMsg,
      term
    });
    setPhase('outcome');
  };

  const handleComplete = () => {
    const positiveChoices = choices.filter(c => c.effect === 'positive').length;
    const score = Math.round((positiveChoices / Math.max(choices.length, 1)) * 100);
    const xpEarned = positiveChoices * 150 + 500;
    
    const levelProgress: LevelProgress = {
      levelId: 2,
      completed: true,
      score,
      choicesMade: choices,
      termsUnlocked: unlockedTerms,
      moneyLeft: allocation.wallet + allocation.safety + allocation.growth,
      xpEarned: Math.round(xpEarned)
    };
    completeLevel(2, levelProgress);
    setPhase('complete');
  };

  const handleProceed = () => {
    navigate('/level/3');
  };

  const finalMoney = allocation.wallet + allocation.safety + allocation.growth;
  const positiveChoices = choices.filter(c => c.effect === 'positive').length;
  const score = Math.round((positiveChoices / Math.max(choices.length, 1)) * 100);

  return (
    <GameLayout>
      <div className="game-card scanlines max-w-lg mx-auto">
        {/* Header with Money & Stress */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Total Money</p>
                <motion.p 
                  className="text-xl font-black text-gradient"
                  key={totalMoney}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  ₹{(allocation.wallet + allocation.safety + allocation.growth).toLocaleString('en-IN')}
                </motion.p>
              </div>
            </div>
            {phase !== 'intro' && phase !== 'complete' && (
              <StressMeter stress={stress} className="w-32" />
            )}
          </div>
          
          {phase !== 'intro' && phase !== 'complete' && (
            <WeekTimeline currentWeek={currentWeek} totalWeeks={4} />
          )}
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
                className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl"
                animate={{ 
                  boxShadow: ['0 0 20px hsl(var(--primary) / 0.3)', '0 0 40px hsl(var(--primary) / 0.5)', '0 0 20px hsl(var(--primary) / 0.3)']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Shield className="w-10 h-10 text-white" />
              </motion.div>

              <p className="text-[10px] uppercase tracking-widest text-primary mb-1">Level 2</p>
              <h1 className="text-2xl font-black text-gradient uppercase tracking-wider mb-2">
                Safety & Growth
              </h1>
              <p className="text-sm text-muted-foreground mb-4">Reducing stress and making money work quietly</p>
              
              <div className="p-4 rounded-lg bg-card/50 border border-border/50 mb-4 text-left">
                <p className="text-sm text-foreground/80 italic leading-relaxed">
                  "This month feels normal.<br/>
                  No big plans. No big problems.<br/>
                  But small surprises don't warn you before arriving."
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <Wallet className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground">From Level 1</p>
                  <p className="text-lg font-black text-emerald-400">₹{startingMoney.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <TrendingUp className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-[10px] text-muted-foreground">4-Week Journey</p>
                  <p className="text-lg font-black text-primary">Plan → Adapt</p>
                </div>
              </div>

              <motion.button
                onClick={handleStart}
                className="btn-gradient w-full flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-4 h-4" />
                Begin Level 2
              </motion.button>
            </motion.div>
          )}

          {/* ALLOCATION PHASE */}
          {phase === 'allocate' && (
            <motion.div
              key="allocate"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <div className="mb-4">
                <p className="text-[10px] uppercase tracking-widest text-primary mb-1">Week 1 — Planning</p>
                <h2 className="text-lg font-bold text-foreground mb-2">Allocate Your Money</h2>
                <p className="text-sm text-muted-foreground">
                  Divide your ₹{startingMoney.toLocaleString('en-IN')} into three buckets. How you split it will affect your month!
                </p>
              </div>

              <MoneyAllocation
                totalMoney={startingMoney}
                currentAllocation={allocation}
                onChange={setAllocation}
              />

              <motion.button
                onClick={handleAllocationComplete}
                disabled={allocation.wallet + allocation.safety + allocation.growth < startingMoney * 0.8}
                className="btn-gradient w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Confirm Allocation
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}

          {/* WEEK PHASE */}
          {phase === 'week' && (
            <motion.div
              key={`week-${currentWeek}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              {currentWeek === 1 && (
                <>
                  <p className="text-[10px] uppercase tracking-widest text-primary mb-1">Week 1</p>
                  <h2 className="text-lg font-bold text-foreground mb-2">Your Plan is Set!</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Wallet (Liquid)</span>
                      <span className="text-emerald-400 font-bold">₹{allocation.wallet.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Safety Jar</span>
                      <span className="text-cyan-400 font-bold">₹{allocation.safety.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Growth Box</span>
                      <span className="text-violet-400 font-bold">₹{allocation.growth.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <p className="text-sm text-foreground/80 mb-4">
                    The week passes smoothly. Nothing unexpected... yet.
                  </p>
                </>
              )}
              
              {currentWeek === 3 && (
                <>
                  <p className="text-[10px] uppercase tracking-widest text-violet-400 mb-1">Week 3 — Growth Week</p>
                  <h2 className="text-lg font-bold text-foreground mb-2">Investment Check</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your Growth Box has been working quietly. Let's see what happened...
                  </p>
                  <div className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/30 mb-4">
                    <TrendingUp className="w-8 h-8 text-violet-400 mx-auto mb-2" />
                    <p className="text-sm text-center text-muted-foreground">
                      Currently in Growth Box: <span className="text-violet-400 font-bold">₹{allocation.growth.toLocaleString('en-IN')}</span>
                    </p>
                  </div>
                </>
              )}
              
              {currentWeek === 4 && (
                <>
                  <p className="text-[10px] uppercase tracking-widest text-primary mb-1">Week 4 — Final Choice</p>
                  <h2 className="text-lg font-bold text-foreground mb-2">Month Almost Over!</h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    You have ₹{allocation.wallet.toLocaleString('en-IN')} in your wallet. What's your priority?
                  </p>
                  
                  <div className="space-y-3">
                    <motion.button
                      onClick={() => handleFinalChoice('spend')}
                      className="w-full text-left p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 hover:border-amber-400/60 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <p className="font-medium text-foreground">Spend on something fun</p>
                      <p className="text-xs text-muted-foreground">Short-term enjoyment matters too</p>
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleFinalChoice('save')}
                      className="w-full text-left p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-400/60 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <p className="font-medium text-foreground">Add to Safety Jar</p>
                      <p className="text-xs text-muted-foreground">Build a stronger emergency fund</p>
                    </motion.button>
                    
                    <motion.button
                      onClick={() => handleFinalChoice('grow')}
                      className="w-full text-left p-4 rounded-lg bg-violet-500/10 border border-violet-500/30 hover:border-violet-400/60 transition-all"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <p className="font-medium text-foreground">Put in Growth Box</p>
                      <p className="text-xs text-muted-foreground">Let money work for your future</p>
                    </motion.button>
                  </div>
                </>
              )}

              {currentWeek !== 4 && (
                <motion.button
                  onClick={handleWeekAction}
                  className="btn-gradient w-full mt-4 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue to Week {currentWeek + 1}
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              )}
            </motion.div>
          )}

          {/* EVENT PHASE */}
          {phase === 'event' && weekEvents[currentWeek] && (
            <motion.div
              key={`event-${currentWeek}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-amber-400">Week {currentWeek} — Surprise!</p>
                    <h2 className="text-lg font-bold text-foreground">{weekEvents[currentWeek].title}</h2>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{weekEvents[currentWeek].description}</p>
              </div>

              <div className="space-y-3 mb-4">
                <div className="p-3 rounded-lg bg-card/50 border border-border/50">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Cost</span>
                    <span className="text-lg font-bold text-amber-400">₹{weekEvents[currentWeek].cost}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-center">
                    <p className="text-[10px] text-muted-foreground">Wallet</p>
                    <p className="text-lg font-bold text-emerald-400">₹{allocation.wallet.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-center">
                    <p className="text-[10px] text-muted-foreground">Safety Jar</p>
                    <p className="text-lg font-bold text-cyan-400">₹{allocation.safety.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <motion.button
                  onClick={() => handleEventChoice(true)}
                  disabled={allocation.safety <= 0}
                  className="w-full text-left p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:border-cyan-400/60 transition-all disabled:opacity-40"
                  whileHover={{ scale: allocation.safety > 0 ? 1.02 : 1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <p className="font-medium text-foreground">Use Safety Jar</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {allocation.safety >= weekEvents[currentWeek].cost 
                      ? 'Emergency fund will cover this!' 
                      : allocation.safety > 0 
                      ? 'Partial coverage available' 
                      : 'No emergency fund available'}
                  </p>
                </motion.button>
                
                <motion.button
                  onClick={() => handleEventChoice(false)}
                  className="w-full text-left p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400/60 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-emerald-400" />
                    <p className="font-medium text-foreground">Pay from Wallet</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Use your liquid cash</p>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* OUTCOME PHASE */}
          {phase === 'outcome' && weekOutcome && (
            <motion.div
              key="outcome"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className={`p-4 rounded-lg mb-4 ${
                weekOutcome.title.includes('Handled') || weekOutcome.title.includes('Growth')
                  ? 'bg-emerald-500/10 border border-emerald-500/20'
                  : weekOutcome.title.includes('Not Enough')
                  ? 'bg-red-500/10 border border-red-500/20'
                  : 'bg-primary/10 border border-primary/20'
              }`}>
                <h3 className="text-lg font-bold text-foreground mb-2">{weekOutcome.title}</h3>
                <p className="text-sm text-foreground/80">{weekOutcome.message}</p>
              </div>

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
                    <p className="text-sm text-muted-foreground leading-relaxed">{weekOutcome.mentorMessage}</p>
                  </div>
                </div>
              </motion.div>

              {weekOutcome.term && (
                <motion.div 
                  className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-cyan-500/5 border border-primary/20 mb-4"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <p className="text-xs uppercase tracking-widest text-primary font-bold">Term Unlocked</p>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{weekOutcome.term}</h3>
                  <p className="text-sm text-muted-foreground">
                    {LEVEL_2_TERMS.find(t => t.term === weekOutcome.term)?.explanation || ''}
                  </p>
                </motion.div>
              )}

              <motion.button
                onClick={handleOutcomeContinue}
                className="btn-gradient w-full flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentWeek < 4 ? 'Continue' : 'Complete Level'}
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
                className="w-24 h-24 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}
              >
                <Shield className="w-12 h-12 text-white" />
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <h2 className="text-2xl font-black text-gradient uppercase tracking-wider mb-1">
                  Level 2 Complete!
                </h2>
                <p className="text-lg font-bold text-primary mb-4">🏅 Safety Builder</p>
              </motion.div>

              <motion.div 
                className="grid grid-cols-3 gap-2 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <Wallet className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <p className="text-[8px] text-muted-foreground">Wallet</p>
                  <p className="text-sm font-bold text-emerald-400">₹{allocation.wallet.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                  <Shield className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <p className="text-[8px] text-muted-foreground">Safety</p>
                  <p className="text-sm font-bold text-cyan-400">₹{allocation.safety.toLocaleString('en-IN')}</p>
                </div>
                <div className="p-3 rounded-lg bg-violet-500/10 border border-violet-500/30">
                  <TrendingUp className="w-4 h-4 text-violet-400 mx-auto mb-1" />
                  <p className="text-[8px] text-muted-foreground">Growth</p>
                  <p className="text-sm font-bold text-violet-400">₹{allocation.growth.toLocaleString('en-IN')}</p>
                </div>
              </motion.div>

              <motion.div 
                className="p-4 rounded-lg bg-card/50 border border-border/50 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <StressMeter stress={stress} />
              </motion.div>

              <motion.div 
                className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-cyan-500/5 border border-primary/20 mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center justify-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <p className="text-xs uppercase tracking-widest text-primary font-bold">Terms Unlocked</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {unlockedTerms.map((term, index) => (
                    <motion.span
                      key={term}
                      className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.05 }}
                    >
                      {term}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="p-4 rounded-lg bg-violet-500/10 border border-violet-500/30 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Sparkles className="w-5 h-5 text-violet-400 mx-auto mb-2" />
                <p className="text-sm text-foreground/80 italic">
                  "You didn't panic.<br/>
                  You prepared.<br/>
                  That's real financial maturity."
                </p>
                <p className="text-xs text-muted-foreground mt-2">— Money Mentor</p>
              </motion.div>

              <motion.button
                onClick={handleProceed}
                className="btn-gradient w-full flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue to Level 3
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Growth Animation Overlay */}
        <GrowthAnimation
          amount={growthAmount}
          isVisible={showGrowth}
          onComplete={() => setShowGrowth(false)}
        />
      </div>
    </GameLayout>
  );
}
