import type { Location, LocationAction, RandomEvent, LifeCityBadge, GameAction, PlayerStats, LifeCityBadgeId } from '@/types/lifeCityGame';

export const LOCATIONS: Location[] = [
  { id: 'home', name: 'Home', emoji: '🏠', description: 'Rest and restore energy', x: 1, y: 1 },
  { id: 'food-street', name: 'Food Street', emoji: '🍔', description: 'Satisfy your hunger', x: 3, y: 1 },
  { id: 'college', name: 'College', emoji: '🏫', description: 'Attend classes', x: 2, y: 0 },
  { id: 'bank', name: 'Bank', emoji: '🏦', description: 'Manage your savings', x: 0, y: 2 },
  { id: 'skill-center', name: 'Skill Center', emoji: '📚', description: 'Invest in yourself', x: 2, y: 2 },
  { id: 'entertainment', name: 'Entertainment', emoji: '🎮', description: 'Relax and have fun', x: 4, y: 2 },
];

export const LOCATION_ACTIONS: Record<string, LocationAction[]> = {
  'home': [
    {
      id: 'rest',
      name: 'Rest',
      description: 'Take a nap (advances time by 2 hours)',
      cost: 0,
      effects: { energy: 40, stress: -10 },
    },
    {
      id: 'sleep',
      name: 'Sleep till Morning',
      description: 'Full rest (advances to next day)',
      cost: 0,
      effects: { energy: 100, stress: -20, hunger: -20 },
    },
    {
      id: 'cook',
      name: 'Cook at Home',
      description: 'Save money with home food',
      cost: 40,
      effects: { hunger: 35, energy: -5 },
    },
  ],
  'food-street': [
    {
      id: 'street-food',
      name: 'Street Food Stall',
      description: 'Quick and cheap',
      cost: 80,
      effects: { hunger: 30, stress: -5 },
    },
    {
      id: 'local-hotel',
      name: 'Local Hotel',
      description: 'Good meal, fair price',
      cost: 150,
      effects: { hunger: 50, stress: -10 },
    },
    {
      id: 'fast-food',
      name: 'Branded Fast Food',
      description: 'Trendy but expensive',
      cost: 300,
      effects: { hunger: 60, stress: -15 },
      hiddenEffect: 'lifestyle-inflation',
    },
  ],
  'college': [
    {
      id: 'attend-class',
      name: 'Attend Class',
      description: 'Study for 2 hours',
      cost: 0,
      effects: { energy: -15, stress: 10 },
    },
    {
      id: 'skip-class',
      name: 'Skip Class',
      description: 'Relax instead',
      cost: 0,
      effects: { stress: -5, energy: -5 },
    },
    {
      id: 'canteen',
      name: 'College Canteen',
      description: 'Quick affordable bite',
      cost: 60,
      effects: { hunger: 25 },
    },
  ],
  'bank': [
    {
      id: 'deposit-500',
      name: 'Deposit ₹500',
      description: 'Save for emergencies',
      cost: 500,
      effects: { bankBalance: 500, money: -500 },
    },
    {
      id: 'deposit-1000',
      name: 'Deposit ₹1,000',
      description: 'Build your cushion',
      cost: 1000,
      effects: { bankBalance: 1000, money: -1000 },
    },
    {
      id: 'withdraw-all',
      name: 'Withdraw All',
      description: 'Get your savings',
      cost: 0,
      effects: {}, // Handled specially
    },
  ],
  'skill-center': [
    {
      id: 'short-course',
      name: 'Quick Workshop',
      description: '2-hour skill boost',
      cost: 200,
      effects: { energy: -20 },
    },
    {
      id: 'certification',
      name: 'Certification Course',
      description: 'Invest in future income',
      cost: 500,
      effects: { energy: -30, stress: 10 },
    },
  ],
  'entertainment': [
    {
      id: 'arcade',
      name: 'Arcade Games',
      description: 'Fun gaming session',
      cost: 150,
      effects: { stress: -25, energy: -10 },
    },
    {
      id: 'movie',
      name: 'Watch a Movie',
      description: 'Relax with entertainment',
      cost: 300,
      effects: { stress: -35, energy: -5 },
    },
    {
      id: 'premium-lounge',
      name: 'Premium Lounge',
      description: 'Luxury experience',
      cost: 600,
      effects: { stress: -50, energy: 10 },
      hiddenEffect: 'wants-vs-needs',
    },
  ],
};

export const RANDOM_EVENTS: RandomEvent[] = [
  {
    id: 'phone-damage',
    title: 'Phone Screen Cracked!',
    description: 'Your phone slipped and the screen cracked. Repair needed.',
    emoji: '📱',
    type: 'expense',
    options: [
      {
        id: 'repair',
        text: 'Pay ₹800 for repair',
        effects: { money: -800, stress: 10 },
        outcome: 'Phone repaired. That was unexpected!',
      },
      {
        id: 'manage',
        text: 'Manage with cracked screen',
        effects: { stress: 25 },
        outcome: 'Stressful to use, but you saved money.',
      },
    ],
  },
  {
    id: 'medical-expense',
    title: 'Sudden Fever',
    description: 'You\'re not feeling well. Need medicine.',
    emoji: '🤒',
    type: 'expense',
    options: [
      {
        id: 'doctor',
        text: 'Visit doctor (₹400)',
        effects: { money: -400, stress: -10, energy: 20 },
        outcome: 'Proper treatment received. Feel better!',
      },
      {
        id: 'pharmacy',
        text: 'Just buy medicine (₹150)',
        effects: { money: -150, stress: 5, energy: 10 },
        outcome: 'Basic medicine helps a bit.',
      },
    ],
  },
  {
    id: 'friend-money',
    title: 'Friend Needs Money',
    description: 'Your close friend urgently needs ₹500. They promise to return.',
    emoji: '🤝',
    type: 'expense',
    options: [
      {
        id: 'lend',
        text: 'Lend ₹500',
        effects: { money: -500, stress: -5 },
        outcome: 'You helped a friend. Hope they return it!',
      },
      {
        id: 'decline',
        text: 'Politely decline',
        effects: { stress: 15 },
        outcome: 'Awkward, but you protected your budget.',
      },
    ],
  },
  {
    id: 'cashback',
    title: 'Cashback Notification!',
    description: 'You received cashback from a previous purchase!',
    emoji: '💸',
    type: 'income',
    options: [
      {
        id: 'accept',
        text: 'Nice! ₹100 received',
        effects: { money: 100, stress: -5 },
        outcome: 'Small unexpected income. Sweet!',
      },
    ],
  },
  {
    id: 'scam-popup',
    title: 'Prize Winner Alert!',
    description: '"You won ₹50,000! Pay ₹500 processing fee to claim."',
    emoji: '🎰',
    type: 'scam',
    options: [
      {
        id: 'ignore',
        text: 'This looks like a scam',
        effects: { stress: -5 },
        outcome: 'Smart! You avoided a scam.',
      },
      {
        id: 'pay',
        text: 'Pay ₹500 to claim prize',
        effects: { money: -500, stress: 30 },
        outcome: 'It was a scam! Money lost, prize never came.',
      },
    ],
  },
  {
    id: 'flash-sale',
    title: 'Flash Sale Alert!',
    description: 'Amazing deal on headphones! 70% off, only ₹600!',
    emoji: '⚡',
    type: 'opportunity',
    options: [
      {
        id: 'buy',
        text: 'Grab the deal!',
        effects: { money: -600, stress: -10 },
        outcome: 'New headphones! But did you need them?',
      },
      {
        id: 'skip',
        text: 'Pass on this',
        effects: {},
        outcome: 'You resisted the impulse. Budget intact.',
      },
    ],
  },
  {
    id: 'part-time',
    title: 'Quick Gig Available',
    description: 'Earn ₹300 helping with a project (takes 2 hours)',
    emoji: '💼',
    type: 'opportunity',
    options: [
      {
        id: 'accept',
        text: 'Take the gig',
        effects: { money: 300, energy: -25 },
        outcome: 'Extra income earned!',
      },
      {
        id: 'decline',
        text: 'Too tired',
        effects: {},
        outcome: 'Rest is important too.',
      },
    ],
  },
];

// Badges for Life City
export const LIFE_CITY_BADGES: LifeCityBadge[] = [
  {
    id: 'survivor',
    name: 'Survivor',
    emoji: '🛡️',
    description: 'Completed the simulation',
    condition: (actions: GameAction[], stats: PlayerStats) => true, // Awarded on completion
  },
  {
    id: 'asset-builder',
    name: 'Asset Builder',
    emoji: '💎',
    description: 'Invested in skills',
    condition: (actions: GameAction[], stats: PlayerStats) => 
      actions.some(a => a.location === 'skill-center'),
  },
  {
    id: 'impulse-breaker',
    name: 'Impulse Breaker',
    emoji: '🚫',
    description: 'Avoided a scam or flash sale',
    condition: (actions: GameAction[], stats: PlayerStats) =>
      actions.some(a => a.action === 'ignore' || a.action === 'skip'),
  },
  {
    id: 'calm-pressure',
    name: 'Calm Under Pressure',
    emoji: '🧠',
    description: 'Kept stress below 50% throughout',
    condition: (actions: GameAction[], stats: PlayerStats) => stats.stress < 50,
  },
  {
    id: 'saver',
    name: 'Smart Saver',
    emoji: '🏦',
    description: 'Saved money in bank',
    condition: (actions: GameAction[], stats: PlayerStats) => stats.bankBalance >= 1000,
  },
  {
    id: 'balanced',
    name: 'Balanced Life',
    emoji: '⚖️',
    description: 'Finished with good stats across the board',
    condition: (actions: GameAction[], stats: PlayerStats) =>
      stats.hunger >= 50 && stats.stress <= 50 && stats.energy >= 50,
  },
];

// Financial concepts tested (revealed at end)
export const FINANCIAL_CONCEPTS_TESTED = [
  { concept: 'Asset vs Liability', description: 'Skills add value (assets), subscriptions drain money (liabilities)' },
  { concept: 'Liquidity', description: 'Cash in hand vs money saved in bank' },
  { concept: 'Saving', description: 'Setting aside money for future/emergencies' },
  { concept: 'Spending Discipline', description: 'Choosing needs over wants' },
  { concept: 'Needs vs Wants', description: 'Essential purchases vs luxury desires' },
  { concept: 'Lifestyle Inflation', description: 'Spending more as you feel richer' },
  { concept: 'Emergency Fund', description: 'Money saved for unexpected expenses' },
  { concept: 'Impulse Control', description: 'Resisting sudden spending urges' },
];

export function getTimeOfDay(hour: number): 'morning' | 'afternoon' | 'evening' | 'night' {
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

export function formatGameTime(hour: number, minute: number): string {
  const period = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
}
