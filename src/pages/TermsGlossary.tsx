import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, Search, Lock, ChevronDown, ChevronUp } from 'lucide-react';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { useGameProgress } from '@/hooks/useGameProgress';
import { GAME_LEVELS } from '@/data/gameData';
import { Input } from '@/components/ui/input';

export default function TermsGlossary() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { progress } = useGameProgress();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLevel, setExpandedLevel] = useState<number | null>(null);

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  // Get all terms with their level info
  const allTerms = GAME_LEVELS.flatMap(level => 
    level.terms.map(term => ({
      term,
      levelId: level.id,
      levelName: level.name,
      isUnlocked: progress.totalTermsUnlocked.includes(term)
    }))
  );

  // Filter terms based on search
  const filteredTerms = searchQuery
    ? allTerms.filter(t => 
        t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.levelName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allTerms;

  // Group terms by level for accordion view
  const termsByLevel = GAME_LEVELS.map(level => ({
    level,
    terms: level.terms.map(term => ({
      term,
      isUnlocked: progress.totalTermsUnlocked.includes(term)
    }))
  }));

  const unlockedCount = progress.totalTermsUnlocked.length;
  const totalTerms = allTerms.length;

  return (
    <GameLayout>
      <div className="max-w-lg mx-auto space-y-6">
        {/* Header */}
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-lg bg-card/50 border border-border/50 flex items-center justify-center hover:border-primary/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-primary">Financial Dictionary</p>
            <h1 className="text-2xl font-black text-gradient uppercase tracking-wider">
              Terms Glossary
            </h1>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          className="game-card scanlines"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Terms Learned</p>
              <p className="text-3xl font-black text-gradient">{unlockedCount}/{totalTerms}</p>
            </div>
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/10 border border-cyan-400/30 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/30 border-border/50"
            />
          </div>
        </motion.div>

        {/* Search Results */}
        {searchQuery && (
          <motion.div
            className="game-card scanlines"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="section-header mb-4">Search Results ({filteredTerms.length})</h2>
            <div className="space-y-2">
              {filteredTerms.map((item, index) => (
                <motion.div
                  key={`${item.levelId}-${item.term}`}
                  className={`p-3 rounded-lg border ${
                    item.isUnlocked
                      ? 'bg-primary/5 border-primary/20'
                      : 'bg-muted/20 border-border/30'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {item.isUnlocked ? (
                        <BookOpen className="w-4 h-4 text-primary" />
                      ) : (
                        <Lock className="w-4 h-4 text-muted-foreground" />
                      )}
                      <span className={`text-sm font-medium ${item.isUnlocked ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {item.term}
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground uppercase">
                      Level {item.levelId}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Terms by Level (Accordion) */}
        {!searchQuery && (
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {termsByLevel.map(({ level, terms }, index) => {
              const unlockedInLevel = terms.filter(t => t.isUnlocked).length;
              const isExpanded = expandedLevel === level.id;
              const LevelIcon = level.badge.icon;

              return (
                <motion.div
                  key={level.id}
                  className="game-card scanlines !p-0 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <button
                    onClick={() => setExpandedLevel(isExpanded ? null : level.id)}
                    className="w-full p-4 flex items-center justify-between hover:bg-primary/5 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        unlockedInLevel === terms.length
                          ? 'bg-gradient-to-br from-emerald-400 to-green-500'
                          : unlockedInLevel > 0
                          ? 'bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20'
                          : 'bg-muted/30'
                      }`}>
                        <LevelIcon className={`w-5 h-5 ${
                          unlockedInLevel === terms.length ? 'text-white' : 'text-primary'
                        }`} />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          Level {level.id}
                        </p>
                        <p className="text-sm font-bold text-foreground">{level.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">
                        {unlockedInLevel}/{terms.length}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-primary" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 space-y-2">
                          {terms.map((item, idx) => (
                            <motion.div
                              key={item.term}
                              className={`p-3 rounded-lg border ${
                                item.isUnlocked
                                  ? 'bg-primary/5 border-primary/20'
                                  : 'bg-muted/20 border-border/30'
                              }`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.03 }}
                            >
                              <div className="flex items-center gap-2">
                                {item.isUnlocked ? (
                                  <BookOpen className="w-4 h-4 text-primary" />
                                ) : (
                                  <Lock className="w-4 h-4 text-muted-foreground" />
                                )}
                                <span className={`text-sm font-medium ${
                                  item.isUnlocked ? 'text-foreground' : 'text-muted-foreground'
                                }`}>
                                  {item.term}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </GameLayout>
  );
}
