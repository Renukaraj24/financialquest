import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Shield, TrendingUp, Minus, Plus } from 'lucide-react';

interface Allocation {
  wallet: number;
  safety: number;
  growth: number;
}

interface MoneyAllocationProps {
  totalMoney: number;
  currentAllocation: Allocation;
  onChange: (allocation: Allocation) => void;
  disabled?: boolean;
}

export function MoneyAllocation({ totalMoney, currentAllocation, onChange, disabled = false }: MoneyAllocationProps) {
  const [allocation, setAllocation] = useState(currentAllocation);

  useEffect(() => {
    setAllocation(currentAllocation);
  }, [currentAllocation]);

  const handleChange = (type: keyof Allocation, delta: number) => {
    if (disabled) return;
    
    const step = 500;
    const newValue = Math.max(0, allocation[type] + (delta * step));
    const otherTotal = Object.entries(allocation)
      .filter(([key]) => key !== type)
      .reduce((sum, [, val]) => sum + val, 0);
    
    if (newValue + otherTotal <= totalMoney) {
      const newAllocation = { ...allocation, [type]: newValue };
      setAllocation(newAllocation);
      onChange(newAllocation);
    }
  };

  const remaining = totalMoney - (allocation.wallet + allocation.safety + allocation.growth);

  const boxes = [
    { 
      key: 'wallet' as const, 
      label: 'Wallet', 
      sublabel: 'Liquid Cash',
      icon: Wallet, 
      color: 'from-emerald-400 to-green-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30'
    },
    { 
      key: 'safety' as const, 
      label: 'Safety Jar', 
      sublabel: 'Emergency Fund',
      icon: Shield, 
      color: 'from-cyan-400 to-blue-500',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30'
    },
    { 
      key: 'growth' as const, 
      label: 'Growth Box', 
      sublabel: 'Investment',
      icon: TrendingUp, 
      color: 'from-violet-400 to-purple-500',
      bgColor: 'bg-violet-500/10',
      borderColor: 'border-violet-500/30'
    },
  ];

  return (
    <div className="space-y-3">
      {boxes.map((box, index) => (
        <motion.div
          key={box.key}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-3 rounded-lg ${box.bgColor} border ${box.borderColor} ${disabled ? 'opacity-60' : ''}`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${box.color} flex items-center justify-center`}>
                <box.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">{box.label}</p>
                <p className="text-[10px] text-muted-foreground">{box.sublabel}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => handleChange(box.key, -1)}
                disabled={disabled || allocation[box.key] <= 0}
                className="w-8 h-8 rounded-lg bg-card/50 border border-border/50 flex items-center justify-center disabled:opacity-30 hover:bg-card/80 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <Minus className="w-4 h-4" />
              </motion.button>
              <div className="w-20 text-center">
                <motion.span
                  key={allocation[box.key]}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-lg font-black text-foreground"
                >
                  ₹{allocation[box.key].toLocaleString('en-IN')}
                </motion.span>
              </div>
              <motion.button
                onClick={() => handleChange(box.key, 1)}
                disabled={disabled || remaining <= 0}
                className="w-8 h-8 rounded-lg bg-card/50 border border-border/50 flex items-center justify-center disabled:opacity-30 hover:bg-card/80 transition-colors"
                whileTap={{ scale: 0.9 }}
              >
                <Plus className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
      
      {remaining > 0 && (
        <motion.p 
          className="text-center text-sm text-amber-400"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ₹{remaining.toLocaleString('en-IN')} unallocated
        </motion.p>
      )}
    </div>
  );
}
