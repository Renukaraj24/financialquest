import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  RefreshCw, 
  ArrowRight, 
  Sparkles,
  BookOpen,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

interface Scenario {
  id: string;
  conceptName: string;
  situation: string;
  question: string;
  choices: {
    id: 'a' | 'b';
    text: string;
    isOptimal: boolean;
  }[];
  outcomes: {
    a: {
      result: string;
      mentorMessage: string;
      conceptIntro: string;
    };
    b: {
      result: string;
      mentorMessage: string;
      conceptIntro: string;
    };
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: 'asset',
    conceptName: 'Asset',
    situation: "You've saved ₹2,000 from your allowance. Your friend suggests two options.",
    question: "What would you do with this money?",
    choices: [
      { id: 'a', text: "Buy a course that teaches you a skill you can use to earn money", isOptimal: true },
      { id: 'b', text: "Buy the latest video game everyone's talking about", isOptimal: false }
    ],
    outcomes: {
      a: {
        result: "Three months later, you're earning ₹500/month using your new skill.",
        mentorMessage: "You chose something that keeps working for you over time. It didn't just sit there — it grew.",
        conceptIntro: "Things that help you earn or grow money are called assets. You just made one."
      },
      b: {
        result: "The game was fun for a few weeks, but now it's collecting dust.",
        mentorMessage: "It gave you joy for a while, and that's okay! But it didn't help you grow financially.",
        conceptIntro: "Things that lose value or don't earn you anything are expenses, not assets. Now you know the difference."
      }
    }
  },
  {
    id: 'liability',
    conceptName: 'Liability',
    situation: "Your old phone works fine, but a new model just launched with a fancy camera.",
    question: "Do you upgrade now with EMI payments?",
    choices: [
      { id: 'a', text: "Yes! I'll pay ₹1,500/month EMI for 12 months", isOptimal: false },
      { id: 'b', text: "No, I'll keep using my current phone and save instead", isOptimal: true }
    ],
    outcomes: {
      a: {
        result: "Every month, ₹1,500 leaves your account before you can decide what to do with it.",
        mentorMessage: "That EMI is now a commitment you can't escape. It takes money away from your future choices.",
        conceptIntro: "When something regularly takes money from your pocket, it's called a liability."
      },
      b: {
        result: "After 6 months, you've saved ₹9,000 and your phone still works great.",
        mentorMessage: "You avoided a trap that many people fall into. Your money stayed with you.",
        conceptIntro: "By avoiding unnecessary EMIs, you protected yourself from liabilities — things that drain your wallet."
      }
    }
  },
  {
    id: 'liquidity',
    conceptName: 'Liquidity',
    situation: "You have ₹5,000 to save. You're choosing between two options.",
    question: "Where would you keep this money?",
    choices: [
      { id: 'a', text: "A savings account you can access anytime", isOptimal: true },
      { id: 'b', text: "A fixed deposit locked for 2 years with slightly higher interest", isOptimal: false }
    ],
    outcomes: {
      a: {
        result: "Next month, an urgent expense comes up. You handle it easily from your savings.",
        mentorMessage: "Because your money was easy to access, you didn't need to borrow or stress.",
        conceptIntro: "Money you can use quickly when needed is called liquid. Keeping some money liquid is always smart."
      },
      b: {
        result: "An emergency comes up, but your money is locked. You have to borrow from a friend.",
        mentorMessage: "The extra interest wasn't worth the stress of not having access when you needed it.",
        conceptIntro: "This is why liquidity matters — it's about having money you can actually use when life surprises you."
      }
    }
  },
  {
    id: 'emergency-fund',
    conceptName: 'Emergency Fund',
    situation: "You just got your monthly allowance of ₹5,000.",
    question: "How do you plan your spending?",
    choices: [
      { id: 'a', text: "Spend it all on things I need and want this month", isOptimal: false },
      { id: 'b', text: "Set aside ₹500 first, then plan the rest", isOptimal: true }
    ],
    outcomes: {
      a: {
        result: "Mid-month, your bus pass gets lost. You scramble to find money for a new one.",
        mentorMessage: "When everything is allocated, even small surprises become big problems.",
        conceptIntro: "A small amount kept aside for surprises is called an emergency fund. It's your financial safety net."
      },
      b: {
        result: "When your headphones break unexpectedly, you handle it calmly with your saved amount.",
        mentorMessage: "That small buffer you kept gave you peace of mind when things went wrong.",
        conceptIntro: "You just experienced the power of an emergency fund — money waiting for when life happens."
      }
    }
  },
  {
    id: 'wants-needs',
    conceptName: 'Wants vs Needs',
    situation: "You have ₹800 left for the week. Your friends are going to a movie, but you also need to buy lunch for the next 3 days.",
    question: "What do you prioritize?",
    choices: [
      { id: 'a', text: "Go to the movie — I'll figure out lunch somehow", isOptimal: false },
      { id: 'b', text: "Skip the movie and make sure I have food sorted first", isOptimal: true }
    ],
    outcomes: {
      a: {
        result: "The movie was fun! But by Thursday, you're hungry and borrowing money for food.",
        mentorMessage: "Fun is important, but not eating properly affects everything — your mood, energy, and focus.",
        conceptIntro: "This is the classic struggle between wants and needs. Needs keep you going; wants make life enjoyable. Balance is key."
      },
      b: {
        result: "You miss the movie but feel good knowing you're sorted. You catch up with friends for free next weekend.",
        mentorMessage: "You prioritized what keeps you healthy and functional. That's a mature choice.",
        conceptIntro: "Understanding wants vs needs helps you make choices you won't regret. Needs first, then wants."
      }
    }
  }
];

export default function TrainingModeScreen() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<'a' | 'b' | null>(null);
  const [showOutcome, setShowOutcome] = useState(false);
  const [completedConcepts, setCompletedConcepts] = useState<string[]>([]);

  const currentScenario = SCENARIOS[currentIndex];
  const isLastScenario = currentIndex === SCENARIOS.length - 1;
  const allComplete = completedConcepts.length === SCENARIOS.length;

  const handleChoice = (choice: 'a' | 'b') => {
    setSelectedChoice(choice);
    setShowOutcome(true);
  };

  const handleNext = () => {
    if (!completedConcepts.includes(currentScenario.id)) {
      setCompletedConcepts([...completedConcepts, currentScenario.id]);
    }
    
    if (isLastScenario) {
      // All done
    } else {
      setCurrentIndex(currentIndex + 1);
      setSelectedChoice(null);
      setShowOutcome(false);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedChoice(null);
    setShowOutcome(false);
    setCompletedConcepts([]);
  };

  const handleExit = () => {
    navigate('/spending-dashboard');
  };

  return (
    <GameLayout>
      <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
        {/* Header */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-3">
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-xs uppercase tracking-widest text-primary font-medium">
              Training Mode
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-gradient uppercase tracking-wider">
            Money Mentor Training
          </h1>
          <p className="text-muted-foreground text-sm mt-2">
            Learn by doing, not by reading
          </p>
        </motion.div>

        {/* Progress */}
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {SCENARIOS.map((scenario, i) => (
            <div 
              key={scenario.id}
              className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                completedConcepts.includes(scenario.id)
                  ? 'bg-primary'
                  : i === currentIndex
                    ? 'bg-primary/50'
                    : 'bg-muted/30'
              }`}
            />
          ))}
        </motion.div>

        {/* All Complete State */}
        {allComplete && showOutcome ? (
          <motion.div
            className="game-card scanlines text-center py-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </motion.div>
            
            <h2 className="text-2xl font-black text-gradient mb-3">
              Training Complete!
            </h2>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              You've explored 5 key money concepts through real choices. Remember: learning happens when you apply these ideas.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {SCENARIOS.map((s) => (
                <span 
                  key={s.id}
                  className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium"
                >
                  {s.conceptName}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={handleRetry}
                className="btn-gradient flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Retry Training
              </button>
              <button 
                onClick={handleExit}
                className="px-6 py-3 bg-muted/20 hover:bg-muted/30 rounded-xl font-medium transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Scenario Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScenario.id}
                className="game-card scanlines"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {/* Concept badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Scenario {currentIndex + 1} of {SCENARIOS.length}
                  </span>
                  <span className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" />
                    {currentScenario.conceptName}
                  </span>
                </div>

                {/* Situation */}
                <div className="mb-6">
                  <p className="text-foreground leading-relaxed mb-4">
                    {currentScenario.situation}
                  </p>
                  <h3 className="text-lg font-bold text-primary">
                    {currentScenario.question}
                  </h3>
                </div>

                {/* Choices */}
                {!showOutcome && (
                  <div className="space-y-3">
                    {currentScenario.choices.map((choice) => (
                      <motion.button
                        key={choice.id}
                        onClick={() => handleChoice(choice.id)}
                        className="w-full text-left p-4 bg-background/50 hover:bg-background/80 border border-border/50 hover:border-primary/50 rounded-xl transition-all duration-200 group"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-sm uppercase group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            {choice.id}
                          </span>
                          <span className="flex-1 text-foreground/90">
                            {choice.text}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Outcome */}
                {showOutcome && selectedChoice && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    {/* Selected choice indicator */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>You chose:</span>
                      <span className="px-2 py-0.5 bg-primary/20 rounded text-primary font-medium">
                        Option {selectedChoice.toUpperCase()}
                      </span>
                    </div>

                    {/* Result */}
                    <div className="p-4 bg-background/60 rounded-xl border border-border/30">
                      <p className="text-foreground font-medium">
                        {currentScenario.outcomes[selectedChoice].result}
                      </p>
                    </div>

                    {/* Mentor message */}
                    <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <div className="space-y-2">
                          <p className="text-foreground/90 leading-relaxed">
                            {currentScenario.outcomes[selectedChoice].mentorMessage}
                          </p>
                          <p className="text-indigo-300 italic leading-relaxed">
                            {currentScenario.outcomes[selectedChoice].conceptIntro}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Continue button */}
                    <motion.button
                      onClick={handleNext}
                      className="btn-gradient w-full flex items-center justify-center gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {isLastScenario ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Complete Training
                        </>
                      ) : (
                        <>
                          Next Scenario
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Skip option */}
            {!showOutcome && (
              <motion.div 
                className="text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <button 
                  onClick={handleExit}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Skip training for now
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </GameLayout>
  );
}
