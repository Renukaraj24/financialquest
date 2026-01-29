import { 
  Wallet, Coins, ShoppingBag, Shield, TrendingUp, PiggyBank,
  Smartphone, AlertTriangle, Brain, Target, GraduationCap,
  Coffee, BookOpen, Gift, Zap, Home, Car, Utensils, Bus,
  Music, Gamepad2, Heart, Lock, CreditCard, Globe, Eye,
  Scale, Clock, Lightbulb, Award, Star, Trophy
} from 'lucide-react';

export interface FinancialTerm {
  term: string;
  explanation: string;
  category: string;
}

export interface Choice {
  id: string;
  text: string;
  cost: number;
  effect: 'positive' | 'neutral' | 'negative';
  outcome: string;
  mentorMessage: string;
  term: string;
  termExplanation: string;
}

export interface Scenario {
  id: string;
  title: string;
  story: string;
  icon: React.ElementType;
  choices: Choice[];
}

export interface LevelData {
  id: number;
  name: string;
  theme: string;
  description: string;
  startingMoney: number;
  terms: string[];
  badge: {
    name: string;
    emoji: string;
    icon: React.ElementType;
  };
  xpReward: number;
  scenarios: Scenario[];
}

export interface Badge {
  id: number;
  name: string;
  emoji: string;
  icon: React.ElementType;
  description: string;
  levelRequired: number;
}

// All 10 levels with scenarios
export const GAME_LEVELS: LevelData[] = [
  // LEVEL 1 - First Payday
  {
    id: 1,
    name: 'First Payday',
    theme: 'Touching money for the first time',
    description: 'You just received ₹5,000 as your monthly allowance. Time to learn how money really works!',
    startingMoney: 5000,
    terms: ['Income', 'Expense', 'Balance', 'Saving', 'Asset', 'Liability', 'Liquidity'],
    badge: { name: 'Money Explorer', emoji: '🏅', icon: Coins },
    xpReward: 500,
    scenarios: [
      {
        id: 'income',
        title: 'The Monthly Allowance',
        story: 'Your parents just transferred ₹5,000 to your account. This is your monthly money. How do you feel about receiving this?',
        icon: Wallet,
        choices: [
          {
            id: 'track-it',
            text: 'Note it down and plan',
            cost: 0,
            effect: 'positive',
            outcome: 'You opened a notes app and recorded ₹5,000 received. Smart start!',
            mentorMessage: 'Tracking what comes in is the first step to managing money. You just acknowledged your income.',
            term: 'Income',
            termExplanation: 'Money that comes to you regularly — from parents, job, or any source.'
          },
          {
            id: 'spend-immediately',
            text: 'Excited! Let\'s spend it!',
            cost: 0,
            effect: 'neutral',
            outcome: 'The excitement is real! But knowing how much you have before spending helps.',
            mentorMessage: 'It\'s okay to be excited, but knowing your total income helps you plan better.',
            term: 'Income',
            termExplanation: 'Money that comes to you regularly — from parents, job, or any source.'
          }
        ]
      },
      {
        id: 'expense',
        title: 'The Food Court Decision',
        story: 'You\'re at college. Hunger strikes! A meal costs ₹150 at the canteen vs ₹80 for a simple lunch box.',
        icon: Utensils,
        choices: [
          {
            id: 'simple-lunch',
            text: 'Go for the ₹80 lunch box',
            cost: 80,
            effect: 'positive',
            outcome: 'A filling meal that didn\'t empty your wallet. ₹70 saved!',
            mentorMessage: 'You chose value over show. This is how you keep more money with you.',
            term: 'Expense',
            termExplanation: 'Any money that leaves your wallet — for food, travel, fun, or anything else.'
          },
          {
            id: 'fancy-meal',
            text: 'Treat yourself at the canteen',
            cost: 150,
            effect: 'neutral',
            outcome: 'Delicious! But that\'s ₹70 more than needed.',
            mentorMessage: 'Sometimes treats are fine, but notice how small choices add up over time.',
            term: 'Expense',
            termExplanation: 'Any money that leaves your wallet — for food, travel, fun, or anything else.'
          }
        ]
      },
      {
        id: 'balance',
        title: 'End of Week Check',
        story: 'It\'s been a week. You\'ve spent on food, transport, and a few snacks. Do you know how much you have left?',
        icon: Scale,
        choices: [
          {
            id: 'check-balance',
            text: 'Open the app and check',
            cost: 0,
            effect: 'positive',
            outcome: 'You checked your balance. Knowing where you stand is powerful!',
            mentorMessage: 'Checking your balance regularly prevents surprises. It\'s your financial health check.',
            term: 'Balance',
            termExplanation: 'The amount of money you have left after subtracting all expenses from income.'
          },
          {
            id: 'guess-it',
            text: 'I think I have enough',
            cost: 0,
            effect: 'negative',
            outcome: 'Guessing might lead to unexpected problems later...',
            mentorMessage: 'Assuming you have money without checking can lead to overspending.',
            term: 'Balance',
            termExplanation: 'The amount of money you have left after subtracting all expenses from income.'
          }
        ]
      },
      {
        id: 'saving',
        title: 'The Temptation',
        story: 'New headphones for ₹1,500! They look amazing. But you also want to save for a college trip next month.',
        icon: PiggyBank,
        choices: [
          {
            id: 'save-for-trip',
            text: 'Skip headphones, save for trip',
            cost: 0,
            effect: 'positive',
            outcome: 'You kept ₹1,500 safe for the trip. Future you will thank you!',
            mentorMessage: 'Choosing future goals over instant wants is a superpower. That\'s the essence of saving.',
            term: 'Saving',
            termExplanation: 'Setting aside money now to use for something important later.'
          },
          {
            id: 'buy-headphones',
            text: 'Buy the headphones now',
            cost: 1500,
            effect: 'negative',
            outcome: 'Nice headphones! But the trip fund just got harder to build...',
            mentorMessage: 'Instant gratification feels good, but can hurt long-term plans. Balance is key.',
            term: 'Saving',
            termExplanation: 'Setting aside money now to use for something important later.'
          }
        ]
      },
      {
        id: 'asset-liability',
        title: 'The Book vs The Subscription',
        story: 'A skill book costs ₹400. Or you could start a ₹400/month gaming subscription.',
        icon: BookOpen,
        choices: [
          {
            id: 'buy-book',
            text: 'Buy the skill book',
            cost: 400,
            effect: 'positive',
            outcome: 'The book teaches you something valuable. Knowledge stays forever!',
            mentorMessage: 'You bought something that adds value over time. That\'s building an asset.',
            term: 'Asset',
            termExplanation: 'Something you own that grows in value or helps you earn more over time.'
          },
          {
            id: 'start-subscription',
            text: 'Start the gaming subscription',
            cost: 400,
            effect: 'negative',
            outcome: 'Fun for now! But this will take ₹400 every month automatically.',
            mentorMessage: 'Recurring costs that don\'t add value are liabilities — they keep taking from you.',
            term: 'Liability',
            termExplanation: 'Something that takes money away from you regularly without adding real value.'
          }
        ]
      },
      {
        id: 'liquidity',
        title: 'The Emergency',
        story: 'Your friend needs ₹500 urgently for a medical situation. Can you help right now?',
        icon: Heart,
        choices: [
          {
            id: 'help-friend',
            text: 'Help with available cash',
            cost: 500,
            effect: 'positive',
            outcome: 'You helped immediately because you had accessible money!',
            mentorMessage: 'Having money you can use right away saved the day. That\'s liquidity.',
            term: 'Liquidity',
            termExplanation: 'Having money you can access and use immediately without delay or loss.'
          },
          {
            id: 'money-locked',
            text: 'Sorry, my money is not accessible',
            cost: 0,
            effect: 'neutral',
            outcome: 'You couldn\'t help because your money wasn\'t readily available.',
            mentorMessage: 'Sometimes we have value but can\'t use it when needed. Keep some money liquid.',
            term: 'Liquidity',
            termExplanation: 'Having money you can access and use immediately without delay or loss.'
          }
        ]
      }
    ]
  },
  
  // LEVEL 2 - Needs vs Wants
  {
    id: 2,
    name: 'Needs vs Wants',
    theme: 'Why money disappears fast',
    description: 'Money seems to vanish! Let\'s discover why and how to control it.',
    startingMoney: 4000,
    terms: ['Needs', 'Wants', 'Budget', 'Impulse Spending', 'Fixed Expense', 'Variable Expense', 'Budget Leakage'],
    badge: { name: 'Smart Chooser', emoji: '🏅', icon: ShoppingBag },
    xpReward: 550,
    scenarios: [
      {
        id: 'needs',
        title: 'The Essential Purchase',
        story: 'Your notebook is full. Classes continue tomorrow. A basic notebook costs ₹50.',
        icon: BookOpen,
        choices: [
          {
            id: 'buy-notebook',
            text: 'Buy the notebook immediately',
            cost: 50,
            effect: 'positive',
            outcome: 'You got what you needed for studies. Essential purchase!',
            mentorMessage: 'This was a need — something required for your basic activities. Good call.',
            term: 'Needs',
            termExplanation: 'Essential things you must have — food, transport, study materials, basic clothing.'
          },
          {
            id: 'delay-purchase',
            text: 'Maybe I can manage without it',
            cost: 0,
            effect: 'negative',
            outcome: 'You struggled to take notes. Some things can\'t be skipped.',
            mentorMessage: 'Delaying genuine needs causes problems. Identify what\'s truly essential.',
            term: 'Needs',
            termExplanation: 'Essential things you must have — food, transport, study materials, basic clothing.'
          }
        ]
      },
      {
        id: 'wants',
        title: 'The Trendy Item',
        story: 'Your friends have a cool new phone case. It costs ₹800. Your current case works fine.',
        icon: Smartphone,
        choices: [
          {
            id: 'skip-case',
            text: 'My current case is fine',
            cost: 0,
            effect: 'positive',
            outcome: 'You kept ₹800! Looking cool doesn\'t require spending.',
            mentorMessage: 'That was a want, not a need. Recognizing the difference saves money.',
            term: 'Wants',
            termExplanation: 'Things you desire but don\'t require — latest gadgets, trendy items, upgrades.'
          },
          {
            id: 'buy-case',
            text: 'Get the trendy case',
            cost: 800,
            effect: 'neutral',
            outcome: 'Nice case! But ₹800 for something you didn\'t really need.',
            mentorMessage: 'Wants make life fun, but too many wants drain your money fast.',
            term: 'Wants',
            termExplanation: 'Things you desire but don\'t require — latest gadgets, trendy items, upgrades.'
          }
        ]
      },
      {
        id: 'budget',
        title: 'Planning the Month',
        story: 'It\'s month start. You have ₹4,000. Should you plan how to use it?',
        icon: Target,
        choices: [
          {
            id: 'make-budget',
            text: 'Divide it into categories',
            cost: 0,
            effect: 'positive',
            outcome: 'You planned: ₹1,500 food, ₹500 transport, ₹1,000 savings, ₹1,000 fun. Clear!',
            mentorMessage: 'You just created a budget! This roadmap prevents overspending.',
            term: 'Budget',
            termExplanation: 'A plan that shows how much you\'ll spend on different categories.'
          },
          {
            id: 'no-plan',
            text: 'I\'ll spend as I go',
            cost: 0,
            effect: 'negative',
            outcome: 'Without a plan, money tends to disappear mysteriously.',
            mentorMessage: 'No plan often means no savings. A budget gives your money a purpose.',
            term: 'Budget',
            termExplanation: 'A plan that shows how much you\'ll spend on different categories.'
          }
        ]
      },
      {
        id: 'impulse',
        title: 'The Flash Sale',
        story: '50% OFF! A jacket you don\'t need is now ₹1,200 instead of ₹2,400. Limited time!',
        icon: Zap,
        choices: [
          {
            id: 'resist-sale',
            text: 'A discount on something I don\'t need is still a cost',
            cost: 0,
            effect: 'positive',
            outcome: 'You saved ₹1,200! Not buying unneeded things is the real saving.',
            mentorMessage: 'Brilliant! You didn\'t let urgency trick you into spending.',
            term: 'Impulse Spending',
            termExplanation: 'Buying something suddenly because of emotion or pressure, not actual need.'
          },
          {
            id: 'grab-deal',
            text: 'Such a deal! Grab it now!',
            cost: 1200,
            effect: 'negative',
            outcome: 'You bought something unnecessary. The discount felt like saving, but you spent.',
            mentorMessage: 'Impulse buying is when emotions, not logic, drive purchases.',
            term: 'Impulse Spending',
            termExplanation: 'Buying something suddenly because of emotion or pressure, not actual need.'
          }
        ]
      },
      {
        id: 'fixed-expense',
        title: 'The Monthly Bus Pass',
        story: 'A monthly bus pass costs ₹600. Daily tickets cost ₹30. You travel 25 days.',
        icon: Bus,
        choices: [
          {
            id: 'buy-pass',
            text: 'Get the monthly pass',
            cost: 600,
            effect: 'positive',
            outcome: 'You saved ₹150! Monthly pass = ₹600 vs Daily = ₹750.',
            mentorMessage: 'Fixed expenses like passes are predictable and often cheaper.',
            term: 'Fixed Expense',
            termExplanation: 'Expenses that stay the same each month — rent, subscriptions, passes.'
          },
          {
            id: 'daily-tickets',
            text: 'Pay daily as I go',
            cost: 750,
            effect: 'neutral',
            outcome: 'You spent ₹150 extra over the month.',
            mentorMessage: 'Variable daily costs can add up. Fixed costs are easier to plan.',
            term: 'Fixed Expense',
            termExplanation: 'Expenses that stay the same each month — rent, subscriptions, passes.'
          }
        ]
      },
      {
        id: 'leakage',
        title: 'The Small Spends',
        story: 'You notice: ₹20 tea, ₹30 snack, ₹50 chai with friends — every day. That\'s ₹100/day!',
        icon: Coffee,
        choices: [
          {
            id: 'reduce-leakage',
            text: 'Cut down to ₹50/day',
            cost: 50,
            effect: 'positive',
            outcome: 'By cutting small spends, you save ₹1,500/month!',
            mentorMessage: 'You found the leak! Small daily expenses that add up are budget leakage.',
            term: 'Budget Leakage',
            termExplanation: 'Small, unnoticed expenses that slowly drain your money over time.'
          },
          {
            id: 'continue-spending',
            text: 'It\'s just small amounts',
            cost: 100,
            effect: 'negative',
            outcome: '₹100 × 30 days = ₹3,000/month on "small things"!',
            mentorMessage: 'These tiny spends are leaks. They seem harmless but cause big damage.',
            term: 'Budget Leakage',
            termExplanation: 'Small, unnoticed expenses that slowly drain your money over time.'
          }
        ]
      }
    ]
  },

  // LEVEL 3 - Safety First
  {
    id: 3,
    name: 'Safety First',
    theme: 'Reducing stress',
    description: 'Life throws surprises. Let\'s prepare for them!',
    startingMoney: 6000,
    terms: ['Emergency Fund', 'Financial Cushion', 'Rainy Day Fund', 'Cash Flow', 'Disposable Income', 'Short-term Goals', 'Long-term Goals'],
    badge: { name: 'Safety Builder', emoji: '🏅', icon: Shield },
    xpReward: 600,
    scenarios: [
      {
        id: 'emergency-fund',
        title: 'The Phone Repair',
        story: 'Your phone screen cracked! Repair costs ₹2,000. You have a choice: use savings or panic.',
        icon: Smartphone,
        choices: [
          {
            id: 'use-emergency',
            text: 'Use emergency savings',
            cost: 0,
            effect: 'positive',
            outcome: 'Your emergency fund covered it! No stress, no borrowing.',
            mentorMessage: 'This is exactly why we keep emergency money aside. Peace of mind!',
            term: 'Emergency Fund',
            termExplanation: 'Money set aside specifically for unexpected expenses or emergencies.'
          },
          {
            id: 'borrow-money',
            text: 'Ask friends to lend money',
            cost: 0,
            effect: 'negative',
            outcome: 'You got the money but now owe someone. Stressful.',
            mentorMessage: 'Without emergency savings, surprises become problems.',
            term: 'Emergency Fund',
            termExplanation: 'Money set aside specifically for unexpected expenses or emergencies.'
          }
        ]
      },
      {
        id: 'cushion',
        title: 'Building Your Buffer',
        story: 'You have ₹1,000 extra this month. What do you do with it?',
        icon: Shield,
        choices: [
          {
            id: 'save-cushion',
            text: 'Add to my financial cushion',
            cost: 0,
            effect: 'positive',
            outcome: 'Your safety net grows! ₹1,000 more protection.',
            mentorMessage: 'A financial cushion absorbs shocks. Keep building it!',
            term: 'Financial Cushion',
            termExplanation: 'Extra money saved beyond regular expenses to handle unexpected situations.'
          },
          {
            id: 'spend-extra',
            text: 'Treat yourself completely',
            cost: 1000,
            effect: 'neutral',
            outcome: 'Fun times! But no buffer for next month\'s surprises.',
            mentorMessage: 'It\'s okay sometimes, but having no cushion means living on edge.',
            term: 'Financial Cushion',
            termExplanation: 'Extra money saved beyond regular expenses to handle unexpected situations.'
          }
        ]
      },
      {
        id: 'cash-flow',
        title: 'The Timing Problem',
        story: 'Rent is due on the 5th. Your allowance comes on the 10th. You have ₹200 left.',
        icon: Clock,
        choices: [
          {
            id: 'plan-ahead',
            text: 'Note: next month, save rent money first',
            cost: 0,
            effect: 'positive',
            outcome: 'You learned to match income timing with expense timing.',
            mentorMessage: 'Cash flow is about when money comes vs when it goes. Timing matters!',
            term: 'Cash Flow',
            termExplanation: 'The timing of money coming in and going out. Good flow = right money at right time.'
          },
          {
            id: 'panic',
            text: 'Panic and borrow',
            cost: 0,
            effect: 'negative',
            outcome: 'You managed this time, but the stress was real.',
            mentorMessage: 'When income and expenses don\'t align, it creates cash flow problems.',
            term: 'Cash Flow',
            termExplanation: 'The timing of money coming in and going out. Good flow = right money at right time.'
          }
        ]
      },
      {
        id: 'disposable-income',
        title: 'After the Essentials',
        story: 'From ₹6,000: ₹3,000 goes to essentials. You have ₹3,000 left. What is this money?',
        icon: Wallet,
        choices: [
          {
            id: 'understand-disposable',
            text: 'This is my free-to-use money',
            cost: 0,
            effect: 'positive',
            outcome: 'Correct! This is your disposable income — yours to decide.',
            mentorMessage: 'Disposable income is what\'s left after essentials. Use it wisely!',
            term: 'Disposable Income',
            termExplanation: 'Money left after paying for essential needs — available for savings, wants, or investing.'
          },
          {
            id: 'think-its-profit',
            text: 'I earned extra money!',
            cost: 0,
            effect: 'neutral',
            outcome: 'Not extra — it\'s what remains after needs are covered.',
            mentorMessage: 'It\'s not "extra" — it\'s disposable income, the money you control.',
            term: 'Disposable Income',
            termExplanation: 'Money left after paying for essential needs — available for savings, wants, or investing.'
          }
        ]
      },
      {
        id: 'short-term-goal',
        title: 'The Concert Ticket',
        story: 'Your favorite artist is performing in 2 months. Tickets are ₹1,500. Can you save for it?',
        icon: Music,
        choices: [
          {
            id: 'plan-save',
            text: 'Save ₹750/month for 2 months',
            cost: 0,
            effect: 'positive',
            outcome: 'You set a short-term goal and a plan to achieve it!',
            mentorMessage: 'Goals within a year are short-term. Planning makes them achievable.',
            term: 'Short-term Goals',
            termExplanation: 'Financial targets you want to achieve within a year — trips, gadgets, events.'
          },
          {
            id: 'no-plan',
            text: 'Hope I have money when tickets release',
            cost: 0,
            effect: 'negative',
            outcome: 'Without planning, you might miss the concert.',
            mentorMessage: 'Hope isn\'t a strategy. Short-term goals need short-term plans.',
            term: 'Short-term Goals',
            termExplanation: 'Financial targets you want to achieve within a year — trips, gadgets, events.'
          }
        ]
      },
      {
        id: 'long-term-goal',
        title: 'Future Dreams',
        story: 'You dream of a laptop for college (₹50,000). That\'s 2 years away. What do you do?',
        icon: Target,
        choices: [
          {
            id: 'start-small',
            text: 'Save ₹2,000/month starting now',
            cost: 0,
            effect: 'positive',
            outcome: 'In 2 years, you\'ll have ₹48,000+ towards your laptop!',
            mentorMessage: 'Long-term goals need early starts. Time is your friend here.',
            term: 'Long-term Goals',
            termExplanation: 'Major financial targets years away — education, big purchases, career investments.'
          },
          {
            id: 'worry-later',
            text: 'I\'ll think about it when the time comes',
            cost: 0,
            effect: 'negative',
            outcome: 'Big goals are hard to achieve last minute.',
            mentorMessage: 'Long-term goals feel far away, but starting early makes them possible.',
            term: 'Long-term Goals',
            termExplanation: 'Major financial targets years away — education, big purchases, career investments.'
          }
        ]
      }
    ]
  },

  // LEVEL 4 - Make Money Work
  {
    id: 4,
    name: 'Make Money Work',
    theme: 'Growth mindset',
    description: 'Your money can grow even while you sleep. Let\'s learn how!',
    startingMoney: 5000,
    terms: ['Investing', 'Interest', 'Compound Interest', 'Active Income', 'Passive Income', 'Opportunity Cost', 'Time Value of Money'],
    badge: { name: 'Growth Thinker', emoji: '🏅', icon: TrendingUp },
    xpReward: 650,
    scenarios: [
      {
        id: 'investing',
        title: 'The Workshop Opportunity',
        story: 'A digital skills workshop costs ₹800. It could help you earn through freelancing later.',
        icon: GraduationCap,
        choices: [
          {
            id: 'invest-skills',
            text: 'Attend the workshop',
            cost: 800,
            effect: 'positive',
            outcome: 'You gained skills that could earn you money in the future!',
            mentorMessage: 'Spending money to gain value later is investing. In yourself!',
            term: 'Investing',
            termExplanation: 'Using money today in a way that can bring more value or money in the future.'
          },
          {
            id: 'skip-workshop',
            text: 'Keep the money safe',
            cost: 0,
            effect: 'neutral',
            outcome: 'Money saved, but opportunity missed.',
            mentorMessage: 'Saving is safe, but sometimes investing in growth multiplies returns.',
            term: 'Investing',
            termExplanation: 'Using money today in a way that can bring more value or money in the future.'
          }
        ]
      },
      {
        id: 'interest',
        title: 'The Savings Account',
        story: 'Your bank offers 4% interest on savings. If you keep ₹3,000 for a year, you get extra money!',
        icon: PiggyBank,
        choices: [
          {
            id: 'understand-interest',
            text: 'Great! My money earns money',
            cost: 0,
            effect: 'positive',
            outcome: '₹3,000 becomes ₹3,120 in a year. That\'s ₹120 for doing nothing!',
            mentorMessage: 'Interest is money paid to you for letting the bank use your money.',
            term: 'Interest',
            termExplanation: 'Money earned on your savings or investments, paid by banks or borrowers.'
          },
          {
            id: 'ignore-interest',
            text: '4% sounds too small',
            cost: 0,
            effect: 'neutral',
            outcome: 'Small percentage, but free money is free money!',
            mentorMessage: 'Even small interest adds up. It\'s better than keeping cash at home.',
            term: 'Interest',
            termExplanation: 'Money earned on your savings or investments, paid by banks or borrowers.'
          }
        ]
      },
      {
        id: 'compound',
        title: 'The Magic of Time',
        story: 'If you earn interest on your interest, ₹1,000 at 10% becomes ₹1,100, then ₹1,210, then ₹1,331...',
        icon: Zap,
        choices: [
          {
            id: 'understand-compound',
            text: 'Wow, it keeps growing faster!',
            cost: 0,
            effect: 'positive',
            outcome: 'You discovered compound interest — the 8th wonder of the world!',
            mentorMessage: 'Compound interest means earning interest on interest. Growth accelerates!',
            term: 'Compound Interest',
            termExplanation: 'Interest earned on both your original money AND the interest already earned.'
          },
          {
            id: 'confused',
            text: 'Too complicated for me',
            cost: 0,
            effect: 'neutral',
            outcome: 'It\'s simpler than it sounds — money grows on its own growth!',
            mentorMessage: 'Just remember: the longer you save, the faster it grows.',
            term: 'Compound Interest',
            termExplanation: 'Interest earned on both your original money AND the interest already earned.'
          }
        ]
      },
      {
        id: 'active-income',
        title: 'The Tutoring Gig',
        story: 'You can tutor juniors for ₹200/hour. It takes your time and effort.',
        icon: BookOpen,
        choices: [
          {
            id: 'take-tutoring',
            text: 'Start tutoring 5 hours/week',
            cost: 0,
            effect: 'positive',
            outcome: 'You earn ₹1,000/week by actively working. Nice!',
            mentorMessage: 'This is active income — you trade your time for money.',
            term: 'Active Income',
            termExplanation: 'Money earned by actively working — jobs, freelancing, services.'
          },
          {
            id: 'skip-tutoring',
            text: 'Too busy for extra work',
            cost: 0,
            effect: 'neutral',
            outcome: 'That\'s okay. Active income requires time you might not have.',
            mentorMessage: 'Active income needs effort. It\'s limited by your available time.',
            term: 'Active Income',
            termExplanation: 'Money earned by actively working — jobs, freelancing, services.'
          }
        ]
      },
      {
        id: 'passive-income',
        title: 'The YouTube Idea',
        story: 'Your friend earns ₹500/month from old YouTube videos. He worked once, gets paid repeatedly.',
        icon: Globe,
        choices: [
          {
            id: 'understand-passive',
            text: 'That\'s amazing! Money without daily work!',
            cost: 0,
            effect: 'positive',
            outcome: 'You understood passive income — money that flows while you sleep!',
            mentorMessage: 'Passive income comes from work done once that keeps paying.',
            term: 'Passive Income',
            termExplanation: 'Money that comes in regularly without continuous active effort.'
          },
          {
            id: 'dismiss-idea',
            text: 'Sounds too good to be true',
            cost: 0,
            effect: 'neutral',
            outcome: 'It\'s real! But requires initial effort to set up.',
            mentorMessage: 'Passive income needs upfront work, then pays over time.',
            term: 'Passive Income',
            termExplanation: 'Money that comes in regularly without continuous active effort.'
          }
        ]
      },
      {
        id: 'opportunity-cost',
        title: 'The Study vs Party Choice',
        story: 'Big party tonight! But you could study for tomorrow\'s test. Both have value.',
        icon: Scale,
        choices: [
          {
            id: 'study',
            text: 'Study now, party next time',
            cost: 0,
            effect: 'positive',
            outcome: 'You chose long-term benefit over short-term fun.',
            mentorMessage: 'Every choice has an opportunity cost — what you give up to get something else.',
            term: 'Opportunity Cost',
            termExplanation: 'What you sacrifice when choosing one option over another.'
          },
          {
            id: 'party',
            text: 'Party now, study later',
            cost: 0,
            effect: 'neutral',
            outcome: 'The party was fun, but grades might suffer.',
            mentorMessage: 'The opportunity cost of partying was potentially better grades.',
            term: 'Opportunity Cost',
            termExplanation: 'What you sacrifice when choosing one option over another.'
          }
        ]
      }
    ]
  },

  // LEVEL 5 - Beginner Investing
  {
    id: 5,
    name: 'Beginner Investing',
    theme: 'Risk awareness',
    description: 'Ready to learn how investing actually works? Let\'s start simple!',
    startingMoney: 5000,
    terms: ['Risk', 'Return', 'Risk-Return Tradeoff', 'Diversification', 'Mutual Fund', 'SIP', 'Index Fund'],
    badge: { name: 'Investor in Training', emoji: '🏅', icon: TrendingUp },
    xpReward: 700,
    scenarios: [
      {
        id: 'risk',
        title: 'The Risky Bet',
        story: 'A friend says he doubled his money in crypto. He also lost ₹5,000 once. High reward = high risk.',
        icon: AlertTriangle,
        choices: [
          {
            id: 'understand-risk',
            text: 'I see — higher gains mean higher chances of loss',
            cost: 0,
            effect: 'positive',
            outcome: 'You understood the first rule of investing: risk and return go together.',
            mentorMessage: 'Risk is the possibility of losing money. Every investment has some.',
            term: 'Risk',
            termExplanation: 'The chance that your investment might lose value or not grow as expected.'
          },
          {
            id: 'want-high-return',
            text: 'I want to double my money too!',
            cost: 0,
            effect: 'neutral',
            outcome: 'Ambition is good, but understand what you\'re risking first.',
            mentorMessage: 'Wanting returns is natural, but ignoring risk is dangerous.',
            term: 'Risk',
            termExplanation: 'The chance that your investment might lose value or not grow as expected.'
          }
        ]
      },
      {
        id: 'return',
        title: 'The Return Question',
        story: 'Savings account: 4% return. Stocks: 12% possible return. Which sounds better?',
        icon: TrendingUp,
        choices: [
          {
            id: 'balanced-view',
            text: 'Higher return, but also higher risk',
            cost: 0,
            effect: 'positive',
            outcome: 'Perfect! You see both sides of the coin.',
            mentorMessage: 'Return is what you gain. Always ask: what\'s the risk?',
            term: 'Return',
            termExplanation: 'The profit or growth you get from an investment, usually shown as percentage.'
          },
          {
            id: 'just-higher',
            text: '12% obviously!',
            cost: 0,
            effect: 'neutral',
            outcome: 'The higher number isn\'t always better if you could lose it all.',
            mentorMessage: 'Higher return sounds great but comes with strings attached.',
            term: 'Return',
            termExplanation: 'The profit or growth you get from an investment, usually shown as percentage.'
          }
        ]
      },
      {
        id: 'tradeoff',
        title: 'The Balance',
        story: 'Low risk = low return (savings account). High risk = high return (stocks). Where do you fit?',
        icon: Scale,
        choices: [
          {
            id: 'moderate',
            text: 'I\'ll take moderate risk for moderate return',
            cost: 0,
            effect: 'positive',
            outcome: 'You found your comfort zone in the risk-return tradeoff!',
            mentorMessage: 'Everyone\'s risk appetite is different. Find yours.',
            term: 'Risk-Return Tradeoff',
            termExplanation: 'The principle that higher potential returns come with higher potential risks.'
          },
          {
            id: 'avoid-all',
            text: 'I want high returns with no risk',
            cost: 0,
            effect: 'negative',
            outcome: 'That doesn\'t exist. Be careful of anyone promising it.',
            mentorMessage: 'No risk + high return = scam. The tradeoff is real.',
            term: 'Risk-Return Tradeoff',
            termExplanation: 'The principle that higher potential returns come with higher potential risks.'
          }
        ]
      },
      {
        id: 'diversification',
        title: 'Eggs and Baskets',
        story: 'You have ₹2,000 to invest. Put all in one stock, or spread across 4 different investments?',
        icon: Shield,
        choices: [
          {
            id: 'spread-it',
            text: 'Spread across 4 investments',
            cost: 0,
            effect: 'positive',
            outcome: 'Smart! If one fails, others can protect you.',
            mentorMessage: 'Diversification means not putting all eggs in one basket.',
            term: 'Diversification',
            termExplanation: 'Spreading money across different investments to reduce overall risk.'
          },
          {
            id: 'all-in-one',
            text: 'Put all in the best one',
            cost: 0,
            effect: 'neutral',
            outcome: 'Risky! If that one fails, you lose everything.',
            mentorMessage: 'Concentration increases risk. Diversification reduces it.',
            term: 'Diversification',
            termExplanation: 'Spreading money across different investments to reduce overall risk.'
          }
        ]
      },
      {
        id: 'mutual-fund',
        title: 'The Easy Option',
        story: 'A mutual fund pools money from many people and invests in multiple stocks. Experts manage it.',
        icon: Coins,
        choices: [
          {
            id: 'understand-mf',
            text: 'So I don\'t have to pick stocks myself?',
            cost: 0,
            effect: 'positive',
            outcome: 'Exactly! Mutual funds are beginner-friendly.',
            mentorMessage: 'Mutual funds let you invest without becoming an expert yourself.',
            term: 'Mutual Fund',
            termExplanation: 'A professionally managed pool of money from many investors, invested in diversified assets.'
          },
          {
            id: 'want-control',
            text: 'I want to pick my own stocks',
            cost: 0,
            effect: 'neutral',
            outcome: 'You can, but it needs more knowledge and time.',
            mentorMessage: 'Direct investing is harder. Mutual funds are good for beginners.',
            term: 'Mutual Fund',
            termExplanation: 'A professionally managed pool of money from many investors, invested in diversified assets.'
          }
        ]
      },
      {
        id: 'sip',
        title: 'The Regular Route',
        story: 'Instead of ₹12,000 once a year, you can invest ₹1,000 every month automatically.',
        icon: Clock,
        choices: [
          {
            id: 'start-sip',
            text: 'Monthly sounds easier to manage',
            cost: 0,
            effect: 'positive',
            outcome: 'You discovered SIP — the easiest way to invest regularly!',
            mentorMessage: 'SIP makes investing a habit. Small amounts add up over time.',
            term: 'SIP',
            termExplanation: 'Systematic Investment Plan — investing a fixed amount regularly instead of lump sum.'
          },
          {
            id: 'lump-sum',
            text: 'I\'d rather invest once when I have a lot',
            cost: 0,
            effect: 'neutral',
            outcome: 'That works too, but needs discipline to save that lump sum.',
            mentorMessage: 'SIP removes the timing stress and builds discipline.',
            term: 'SIP',
            termExplanation: 'Systematic Investment Plan — investing a fixed amount regularly instead of lump sum.'
          }
        ]
      }
    ]
  },

  // LEVEL 6 - Digital Money Life
  {
    id: 6,
    name: 'Digital Money Life',
    theme: 'Convenience vs control',
    description: 'Digital payments are everywhere! Learn to use them wisely.',
    startingMoney: 4000,
    terms: ['UPI', 'Digital Wallet', 'Online Banking', 'Net Banking', 'Auto-Debit', 'Subscription Trap', 'Transaction History'],
    badge: { name: 'Digital Money Master', emoji: '🏅', icon: Smartphone },
    xpReward: 600,
    scenarios: [
      {
        id: 'upi',
        title: 'The Quick Payment',
        story: 'Friend paid you ₹500 via UPI. It reached your bank in 2 seconds. No cash, no ATM.',
        icon: Smartphone,
        choices: [
          {
            id: 'appreciate-upi',
            text: 'So convenient and instant!',
            cost: 0,
            effect: 'positive',
            outcome: 'UPI has made money transfer as easy as sending a message!',
            mentorMessage: 'UPI is India\'s digital payment system — fast, free, direct to bank.',
            term: 'UPI',
            termExplanation: 'Unified Payments Interface — instant bank-to-bank transfer using phone.'
          },
          {
            id: 'prefer-cash',
            text: 'I still prefer cash',
            cost: 0,
            effect: 'neutral',
            outcome: 'Cash works, but digital is faster and trackable.',
            mentorMessage: 'UPI leaves a record. Cash doesn\'t. Choose what works for you.',
            term: 'UPI',
            termExplanation: 'Unified Payments Interface — instant bank-to-bank transfer using phone.'
          }
        ]
      },
      {
        id: 'wallet',
        title: 'The App Money',
        story: 'You have ₹500 in Paytm wallet and ₹500 in bank. Both can buy the same things.',
        icon: Wallet,
        choices: [
          {
            id: 'understand-wallet',
            text: 'Wallet is like a digital pocket',
            cost: 0,
            effect: 'positive',
            outcome: 'Right! It\'s convenient but money sits with the company.',
            mentorMessage: 'Digital wallets are useful but bank is safer for large amounts.',
            term: 'Digital Wallet',
            termExplanation: 'An app that stores money for quick payments — Paytm, PhonePe, GPay wallets.'
          },
          {
            id: 'keep-in-wallet',
            text: 'I keep most money in wallet',
            cost: 0,
            effect: 'neutral',
            outcome: 'Convenient, but no interest and more risk than bank.',
            mentorMessage: 'Keep wallet balance low. Bank is better for savings.',
            term: 'Digital Wallet',
            termExplanation: 'An app that stores money for quick payments — Paytm, PhonePe, GPay wallets.'
          }
        ]
      },
      {
        id: 'auto-debit',
        title: 'The Forgotten Subscription',
        story: 'You signed up for a free trial. Forgot to cancel. ₹299 debited automatically!',
        icon: CreditCard,
        choices: [
          {
            id: 'set-reminder',
            text: 'I\'ll set reminders for trial end dates',
            cost: 0,
            effect: 'positive',
            outcome: 'Smart! You\'ll never get charged unexpectedly again.',
            mentorMessage: 'Auto-debit is convenient but can catch you off guard. Stay alert!',
            term: 'Auto-Debit',
            termExplanation: 'Automatic payment that deducts money without you manually approving each time.'
          },
          {
            id: 'forget-again',
            text: 'It happens, just ₹299',
            cost: 299,
            effect: 'negative',
            outcome: '₹299/month × 12 = ₹3,588/year for something you don\'t use!',
            mentorMessage: 'Small auto-debits add up. Review them regularly.',
            term: 'Auto-Debit',
            termExplanation: 'Automatic payment that deducts money without you manually approving each time.'
          }
        ]
      },
      {
        id: 'subscription-trap',
        title: 'The Subscription Stack',
        story: 'Netflix ₹199, Spotify ₹119, Prime ₹179, YouTube ₹129... You pay ₹626/month for streaming!',
        icon: Music,
        choices: [
          {
            id: 'audit-subscriptions',
            text: 'Cancel what I don\'t use regularly',
            cost: 0,
            effect: 'positive',
            outcome: 'You kept 2, cancelled 2. Saved ₹318/month!',
            mentorMessage: 'Subscription trap: many small payments that stack up unnoticed.',
            term: 'Subscription Trap',
            termExplanation: 'When multiple small subscriptions quietly drain significant money each month.'
          },
          {
            id: 'keep-all',
            text: 'I use all of them sometimes',
            cost: 626,
            effect: 'negative',
            outcome: '"Sometimes" costs ₹7,512/year. Is it worth it?',
            mentorMessage: 'Review value vs cost. Subscriptions should be actively used.',
            term: 'Subscription Trap',
            termExplanation: 'When multiple small subscriptions quietly drain significant money each month.'
          }
        ]
      },
      {
        id: 'transaction-history',
        title: 'The Money Mystery',
        story: 'You had ₹4,000. Now you have ₹2,000. Where did it go?',
        icon: Eye,
        choices: [
          {
            id: 'check-history',
            text: 'Check transaction history in app',
            cost: 0,
            effect: 'positive',
            outcome: 'Found it! Small UPI payments you forgot about.',
            mentorMessage: 'Transaction history is your money trail. Review it weekly!',
            term: 'Transaction History',
            termExplanation: 'Record of all money coming in and going out — available in banking apps.'
          },
          {
            id: 'shrug-it',
            text: 'It\'s somewhere, doesn\'t matter',
            cost: 0,
            effect: 'negative',
            outcome: 'Mystery money loss continues. No control.',
            mentorMessage: 'If you don\'t track, you can\'t control. History reveals patterns.',
            term: 'Transaction History',
            termExplanation: 'Record of all money coming in and going out — available in banking apps.'
          }
        ]
      },
      {
        id: 'net-banking',
        title: 'The Full Access',
        story: 'Net banking lets you transfer money, pay bills, check statements — all from your laptop.',
        icon: Globe,
        choices: [
          {
            id: 'use-netbanking',
            text: 'Set it up securely',
            cost: 0,
            effect: 'positive',
            outcome: 'You have full control of your bank from anywhere!',
            mentorMessage: 'Net banking is powerful. Use strong passwords and 2FA.',
            term: 'Net Banking',
            termExplanation: 'Managing your bank account through a website — transfers, bills, statements.'
          },
          {
            id: 'avoid-netbanking',
            text: 'Too risky, I\'ll go to the bank',
            cost: 0,
            effect: 'neutral',
            outcome: 'Extra safe, but less convenient. Balance is key.',
            mentorMessage: 'Net banking is safe if you follow security practices.',
            term: 'Net Banking',
            termExplanation: 'Managing your bank account through a website — transfers, bills, statements.'
          }
        ]
      }
    ]
  },

  // LEVEL 7 - Scams & Safety
  {
    id: 7,
    name: 'Scams & Safety',
    theme: 'Protecting money',
    description: 'Scammers are smart. But you can be smarter!',
    startingMoney: 5000,
    terms: ['Scam', 'Fraud', 'Phishing', 'Identity Theft', 'Fake Investment Scheme', 'Ponzi Scheme', 'Social Engineering'],
    badge: { name: 'Scam Shield', emoji: '🏅', icon: Shield },
    xpReward: 750,
    scenarios: [
      {
        id: 'phishing',
        title: 'The Suspicious Link',
        story: 'SMS: "Your account is blocked! Click here to verify: bit.ly/bank-xyz"',
        icon: AlertTriangle,
        choices: [
          {
            id: 'ignore-link',
            text: 'Banks don\'t send such links. Ignore it.',
            cost: 0,
            effect: 'positive',
            outcome: 'You avoided a phishing attack!',
            mentorMessage: 'Phishing tricks you into clicking fake links to steal your info.',
            term: 'Phishing',
            termExplanation: 'Fake messages pretending to be from trusted sources to steal your information.'
          },
          {
            id: 'click-link',
            text: 'Click to check what\'s wrong',
            cost: 500,
            effect: 'negative',
            outcome: 'The fake site stole your login. Money gone!',
            mentorMessage: 'Never click links in unexpected messages. Go to official apps directly.',
            term: 'Phishing',
            termExplanation: 'Fake messages pretending to be from trusted sources to steal your information.'
          }
        ]
      },
      {
        id: 'fake-investment',
        title: 'The "Guaranteed" Return',
        story: 'WhatsApp forward: "Invest ₹5,000, get ₹15,000 in 7 days! Guaranteed! 10,000 people earned already!"',
        icon: TrendingUp,
        choices: [
          {
            id: 'recognize-scam',
            text: 'No investment gives 200% in 7 days. Scam!',
            cost: 0,
            effect: 'positive',
            outcome: 'You spotted the red flags perfectly!',
            mentorMessage: 'Unrealistic returns + urgency + WhatsApp forward = guaranteed scam.',
            term: 'Fake Investment Scheme',
            termExplanation: 'Fraudulent schemes promising impossible returns to steal your money.'
          },
          {
            id: 'consider-it',
            text: 'Maybe try with small amount?',
            cost: 500,
            effect: 'negative',
            outcome: 'Even ₹500 feeds the scam. You lost it.',
            mentorMessage: 'No legit investment promises guaranteed high returns. Never.',
            term: 'Fake Investment Scheme',
            termExplanation: 'Fraudulent schemes promising impossible returns to steal your money.'
          }
        ]
      },
      {
        id: 'ponzi',
        title: 'The Chain System',
        story: 'A friend says: "Join this chain. Invest ₹1,000, recruit 2 people, get ₹2,000 back!"',
        icon: Coins,
        choices: [
          {
            id: 'recognize-ponzi',
            text: 'Where does money come from? New people\'s payments? That\'s a pyramid!',
            cost: 0,
            effect: 'positive',
            outcome: 'You recognized a Ponzi scheme!',
            mentorMessage: 'If returns come from new investors, not real profits, it\'s a Ponzi.',
            term: 'Ponzi Scheme',
            termExplanation: 'A fraud where old investors are paid using new investors\' money, not real returns.'
          },
          {
            id: 'join-chain',
            text: 'My friend made money, so maybe it works',
            cost: 1000,
            effect: 'negative',
            outcome: 'Early people get paid. Latecomers lose. You\'re a latecomer.',
            mentorMessage: 'Ponzi always collapses. Someone always loses. Usually the majority.',
            term: 'Ponzi Scheme',
            termExplanation: 'A fraud where old investors are paid using new investors\' money, not real returns.'
          }
        ]
      },
      {
        id: 'social-engineering',
        title: 'The "Bank Call"',
        story: 'Caller: "I\'m from SBI. Your card is blocked. Share OTP to unblock."',
        icon: Smartphone,
        choices: [
          {
            id: 'hang-up',
            text: 'Banks never ask OTP. Hang up!',
            cost: 0,
            effect: 'positive',
            outcome: 'You stopped a social engineering attack!',
            mentorMessage: 'Social engineering uses psychology to manipulate you into sharing secrets.',
            term: 'Social Engineering',
            termExplanation: 'Manipulating people into revealing confidential information through tricks.'
          },
          {
            id: 'share-otp',
            text: 'Share OTP to fix the problem quickly',
            cost: 2000,
            effect: 'negative',
            outcome: 'With OTP, they emptied your account.',
            mentorMessage: 'OTP is like your digital signature. Never share with anyone.',
            term: 'Social Engineering',
            termExplanation: 'Manipulating people into revealing confidential information through tricks.'
          }
        ]
      },
      {
        id: 'identity-theft',
        title: 'The Public WiFi',
        story: 'Free WiFi at café! You log into your bank app while connected.',
        icon: Lock,
        choices: [
          {
            id: 'avoid-banking',
            text: 'Don\'t do banking on public WiFi',
            cost: 0,
            effect: 'positive',
            outcome: 'You protected your identity and banking info!',
            mentorMessage: 'Public WiFi can be monitored. Banking needs secure networks.',
            term: 'Identity Theft',
            termExplanation: 'When criminals steal your personal information to commit fraud in your name.'
          },
          {
            id: 'quick-check',
            text: 'Just checking balance quickly',
            cost: 0,
            effect: 'negative',
            outcome: 'Hackers on the network could capture your login!',
            mentorMessage: 'Identity theft starts with small data leaks. Stay cautious.',
            term: 'Identity Theft',
            termExplanation: 'When criminals steal your personal information to commit fraud in your name.'
          }
        ]
      },
      {
        id: 'fraud',
        title: 'The "Lucky Winner"',
        story: 'Email: "Congratulations! You won ₹10 lakhs! Pay ₹5,000 processing fee to claim."',
        icon: Gift,
        choices: [
          {
            id: 'delete-email',
            text: 'I didn\'t enter any contest. Delete.',
            cost: 0,
            effect: 'positive',
            outcome: 'Classic scam avoided!',
            mentorMessage: 'You can\'t win contests you didn\'t enter. This is advance fee fraud.',
            term: 'Fraud',
            termExplanation: 'Intentional deception to take your money or information illegally.'
          },
          {
            id: 'pay-fee',
            text: 'Pay ₹5,000 to get ₹10 lakhs? Great deal!',
            cost: 5000,
            effect: 'negative',
            outcome: 'No prize. You paid for nothing.',
            mentorMessage: 'If you need to pay to receive a prize, it\'s fraud.',
            term: 'Fraud',
            termExplanation: 'Intentional deception to take your money or information illegally.'
          }
        ]
      }
    ]
  },

  // LEVEL 8 - Money Psychology
  {
    id: 8,
    name: 'Money Psychology',
    theme: 'Why we make bad decisions',
    description: 'Your brain plays tricks on you with money. Let\'s outsmart it!',
    startingMoney: 4500,
    terms: ['Financial Discipline', 'Delayed Gratification', 'FOMO', 'Loss Aversion', 'Overconfidence Bias', 'Habit Loop', 'Decision Fatigue'],
    badge: { name: 'Mindful Spender', emoji: '🏅', icon: Brain },
    xpReward: 700,
    scenarios: [
      {
        id: 'fomo',
        title: 'The Group Buy',
        story: 'Friends are buying concert tickets for ₹2,000. You can\'t really afford it, but everyone\'s going!',
        icon: Heart,
        choices: [
          {
            id: 'resist-fomo',
            text: 'Skip this one, there\'ll be more concerts',
            cost: 0,
            effect: 'positive',
            outcome: 'You didn\'t let fear of missing out control your wallet.',
            mentorMessage: 'FOMO makes us spend to fit in. Your budget > social pressure.',
            term: 'FOMO',
            termExplanation: 'Fear Of Missing Out — anxiety that makes you spend to not feel left out.'
          },
          {
            id: 'join-anyway',
            text: 'Can\'t miss this! Figure out money later',
            cost: 2000,
            effect: 'negative',
            outcome: 'Fun night, but now you\'re stressed about money.',
            mentorMessage: 'FOMO is powerful. Learning to say "next time" is a skill.',
            term: 'FOMO',
            termExplanation: 'Fear Of Missing Out — anxiety that makes you spend to not feel left out.'
          }
        ]
      },
      {
        id: 'delayed-gratification',
        title: 'The Now vs Later',
        story: 'New phone now for ₹15,000, or wait 3 months for a better model at same price?',
        icon: Clock,
        choices: [
          {
            id: 'wait-for-better',
            text: 'Wait 3 months for better value',
            cost: 0,
            effect: 'positive',
            outcome: 'You chose future benefit over instant satisfaction!',
            mentorMessage: 'Delayed gratification is choosing later rewards over instant ones.',
            term: 'Delayed Gratification',
            termExplanation: 'The ability to resist immediate temptation for a better future reward.'
          },
          {
            id: 'buy-now',
            text: 'I want it now!',
            cost: 0,
            effect: 'neutral',
            outcome: 'You got the phone, but newer model comes out soon.',
            mentorMessage: 'Instant gratification feels good but often has opportunity cost.',
            term: 'Delayed Gratification',
            termExplanation: 'The ability to resist immediate temptation for a better future reward.'
          }
        ]
      },
      {
        id: 'loss-aversion',
        title: 'The Sale Pressure',
        story: '"Last 2 items left! Others are viewing!" — Do you really need it, or is fear of losing the deal pushing you?',
        icon: AlertTriangle,
        choices: [
          {
            id: 'recognize-trick',
            text: 'This is a sales trick. I\'ll decide based on need.',
            cost: 0,
            effect: 'positive',
            outcome: 'You didn\'t let fake urgency pressure you.',
            mentorMessage: 'Loss aversion: we hate losing more than we enjoy gaining. Sellers exploit this.',
            term: 'Loss Aversion',
            termExplanation: 'The tendency to fear losses more than we value equivalent gains.'
          },
          {
            id: 'buy-fast',
            text: 'Quick, buy before it\'s gone!',
            cost: 800,
            effect: 'negative',
            outcome: 'You bought something unnecessary out of fear.',
            mentorMessage: 'Scarcity creates urgency. Real needs don\'t panic you.',
            term: 'Loss Aversion',
            termExplanation: 'The tendency to fear losses more than we value equivalent gains.'
          }
        ]
      },
      {
        id: 'overconfidence',
        title: 'The Sure Bet',
        story: 'You\'re confident about a stock tip. "Can\'t fail!" — Do you put all your savings?',
        icon: TrendingUp,
        choices: [
          {
            id: 'stay-cautious',
            text: 'Even "sure things" can fail. Only invest what I can afford to lose.',
            cost: 0,
            effect: 'positive',
            outcome: 'You stayed humble and protected your savings.',
            mentorMessage: 'Overconfidence makes us underestimate risks. Stay humble with money.',
            term: 'Overconfidence Bias',
            termExplanation: 'Believing you know more than you do, leading to risky decisions.'
          },
          {
            id: 'go-all-in',
            text: 'All in! I know this will work.',
            cost: 0,
            effect: 'negative',
            outcome: 'When it fails, you lose everything. Ouch.',
            mentorMessage: 'Even experts are wrong sometimes. Never bet everything.',
            term: 'Overconfidence Bias',
            termExplanation: 'Believing you know more than you do, leading to risky decisions.'
          }
        ]
      },
      {
        id: 'habit-loop',
        title: 'The Daily Coffee',
        story: 'Every day: Stressed → Buy coffee → Feel better → Repeat. ₹100/day = ₹3,000/month!',
        icon: Coffee,
        choices: [
          {
            id: 'break-habit',
            text: 'Replace with homemade coffee some days',
            cost: 50,
            effect: 'positive',
            outcome: 'You saved ₹1,500/month by breaking the loop partially!',
            mentorMessage: 'Habits have triggers. Change the routine to change spending.',
            term: 'Habit Loop',
            termExplanation: 'A cycle of cue → routine → reward that creates automatic behaviors, including spending.'
          },
          {
            id: 'continue-habit',
            text: 'It\'s just my routine, can\'t change',
            cost: 100,
            effect: 'negative',
            outcome: '₹36,000/year on coffee. That\'s a vacation!',
            mentorMessage: 'Habits feel automatic but can be changed with awareness.',
            term: 'Habit Loop',
            termExplanation: 'A cycle of cue → routine → reward that creates automatic behaviors, including spending.'
          }
        ]
      },
      {
        id: 'decision-fatigue',
        title: 'The Late Night Shopping',
        story: 'It\'s 11 PM. You\'re tired but browsing online shopping. Everything looks appealing.',
        icon: Brain,
        choices: [
          {
            id: 'sleep-on-it',
            text: 'Add to cart, decide tomorrow with fresh mind',
            cost: 0,
            effect: 'positive',
            outcome: 'Morning you deleted half the cart. Good call!',
            mentorMessage: 'Decision fatigue makes us choose poorly when tired. Sleep on big decisions.',
            term: 'Decision Fatigue',
            termExplanation: 'Poor choices made when mentally exhausted from too many decisions.'
          },
          {
            id: 'buy-now',
            text: 'Just buy and sleep',
            cost: 1500,
            effect: 'negative',
            outcome: 'You ordered things you don\'t even remember wanting.',
            mentorMessage: 'Tired brain = weak self-control. Avoid financial decisions when exhausted.',
            term: 'Decision Fatigue',
            termExplanation: 'Poor choices made when mentally exhausted from too many decisions.'
          }
        ]
      }
    ]
  },

  // LEVEL 9 - Wealth Thinking
  {
    id: 9,
    name: 'Wealth Thinking',
    theme: 'Thinking long-term',
    description: 'Time to think like your future self. Wealth is a mindset!',
    startingMoney: 5000,
    terms: ['Net Worth', 'Wealth', 'Inflation', 'Purchasing Power', 'Financial Planning', 'Financial Independence', 'Financial Resilience'],
    badge: { name: 'Future Builder', emoji: '🏅', icon: Target },
    xpReward: 750,
    scenarios: [
      {
        id: 'net-worth',
        title: 'Your Total Picture',
        story: 'You have ₹10,000 saved, a laptop worth ₹30,000, but owe ₹5,000 to a friend. What\'s your net worth?',
        icon: Wallet,
        choices: [
          {
            id: 'calculate-correctly',
            text: 'Assets (₹40,000) - Debts (₹5,000) = ₹35,000',
            cost: 0,
            effect: 'positive',
            outcome: 'You calculated your net worth correctly!',
            mentorMessage: 'Net worth = What you own - What you owe. It\'s your true financial position.',
            term: 'Net Worth',
            termExplanation: 'Total value of everything you own minus everything you owe.'
          },
          {
            id: 'just-cash',
            text: 'I have ₹10,000 in bank',
            cost: 0,
            effect: 'neutral',
            outcome: 'That\'s just cash. Net worth includes all assets and debts.',
            mentorMessage: 'Net worth gives a complete picture, not just bank balance.',
            term: 'Net Worth',
            termExplanation: 'Total value of everything you own minus everything you owe.'
          }
        ]
      },
      {
        id: 'inflation',
        title: 'The Shrinking Money',
        story: 'Last year, ₹100 bought 5 samosas. This year, only 4. Your ₹100 didn\'t change. What happened?',
        icon: TrendingUp,
        choices: [
          {
            id: 'understand-inflation',
            text: 'Prices went up. My money buys less now.',
            cost: 0,
            effect: 'positive',
            outcome: 'Exactly! This is inflation eating your purchasing power.',
            mentorMessage: 'Inflation makes money worth less over time. Savings must grow to keep up.',
            term: 'Inflation',
            termExplanation: 'General increase in prices that reduces what your money can buy.'
          },
          {
            id: 'blame-shopkeeper',
            text: 'The shopkeeper is cheating!',
            cost: 0,
            effect: 'neutral',
            outcome: 'It\'s not cheating — it\'s how economies work.',
            mentorMessage: 'Inflation is natural. Your money must grow faster than inflation.',
            term: 'Inflation',
            termExplanation: 'General increase in prices that reduces what your money can buy.'
          }
        ]
      },
      {
        id: 'purchasing-power',
        title: 'The Real Value',
        story: 'Your grandfather bought a house for ₹50,000 in 1980. Today, ₹50,000 can\'t even buy a scooter.',
        icon: Home,
        choices: [
          {
            id: 'understand-power',
            text: 'Same amount, but much less power to buy things',
            cost: 0,
            effect: 'positive',
            outcome: 'You understand purchasing power — the real value of money.',
            mentorMessage: 'Purchasing power is what your money can actually buy, not the number.',
            term: 'Purchasing Power',
            termExplanation: 'The actual buying capacity of your money, which decreases with inflation.'
          },
          {
            id: 'money-is-money',
            text: '₹50,000 is still ₹50,000',
            cost: 0,
            effect: 'neutral',
            outcome: 'The number is same, but the value changed dramatically.',
            mentorMessage: 'Nominal value (number) vs Real value (purchasing power) — big difference!',
            term: 'Purchasing Power',
            termExplanation: 'The actual buying capacity of your money, which decreases with inflation.'
          }
        ]
      },
      {
        id: 'financial-planning',
        title: 'The 10-Year Vision',
        story: 'Where do you want to be financially in 10 years? Do you have a plan?',
        icon: Target,
        choices: [
          {
            id: 'make-plan',
            text: 'Yes! Save 20%, invest 10%, build emergency fund first.',
            cost: 0,
            effect: 'positive',
            outcome: 'You have a financial plan! This dramatically increases success odds.',
            mentorMessage: 'Financial planning is creating a roadmap for your money goals.',
            term: 'Financial Planning',
            termExplanation: 'Creating a step-by-step strategy to achieve your financial goals.'
          },
          {
            id: 'no-plan',
            text: 'I\'ll figure it out as I go',
            cost: 0,
            effect: 'neutral',
            outcome: 'Without a plan, you might end up somewhere you didn\'t intend.',
            mentorMessage: 'Failing to plan is planning to fail. Start with small goals.',
            term: 'Financial Planning',
            termExplanation: 'Creating a step-by-step strategy to achieve your financial goals.'
          }
        ]
      },
      {
        id: 'financial-independence',
        title: 'The Freedom Dream',
        story: 'Imagine: Your investments generate ₹50,000/month. You don\'t need a job to survive. What\'s that called?',
        icon: Star,
        choices: [
          {
            id: 'identify-fi',
            text: 'Financial independence — money works for me!',
            cost: 0,
            effect: 'positive',
            outcome: 'Exactly! This is the ultimate money goal for many.',
            mentorMessage: 'Financial independence means your money generates enough to cover your life.',
            term: 'Financial Independence',
            termExplanation: 'Having enough wealth that you no longer need to work for basic needs.'
          },
          {
            id: 'sounds-impossible',
            text: 'That\'s only for rich people',
            cost: 0,
            effect: 'neutral',
            outcome: 'It starts small. Every rupee invested moves you closer.',
            mentorMessage: 'FI is achievable with time, discipline, and smart investing. Start early!',
            term: 'Financial Independence',
            termExplanation: 'Having enough wealth that you no longer need to work for basic needs.'
          }
        ]
      },
      {
        id: 'resilience',
        title: 'The Crisis Test',
        story: 'Economic crisis hits. Jobs are lost. Those with savings, skills, and multiple income sources survive best.',
        icon: Shield,
        choices: [
          {
            id: 'build-resilience',
            text: 'I should build multiple safety nets',
            cost: 0,
            effect: 'positive',
            outcome: 'You\'re thinking about financial resilience — the ability to bounce back.',
            mentorMessage: 'Resilience comes from diversification: skills, income, savings, investments.',
            term: 'Financial Resilience',
            termExplanation: 'The ability to recover from financial setbacks through preparation and adaptability.'
          },
          {
            id: 'ignore-crisis',
            text: 'That won\'t happen to me',
            cost: 0,
            effect: 'negative',
            outcome: 'Everyone thinks that until it does.',
            mentorMessage: 'Hope for the best, prepare for the worst. That\'s resilience.',
            term: 'Financial Resilience',
            termExplanation: 'The ability to recover from financial setbacks through preparation and adaptability.'
          }
        ]
      }
    ]
  },

  // LEVEL 10 - Adult World Prep
  {
    id: 10,
    name: 'Adult World Prep',
    theme: 'What\'s coming next',
    description: 'You\'re almost an adult. Here\'s what the real world looks like!',
    startingMoney: 10000,
    terms: ['Credit Score', 'Bank Charges', 'Service Fees', 'Taxes', 'Salary Slip', 'Internship Stipend', 'Freelance Earnings', 'Part-time Income', 'Financial Goals'],
    badge: { name: 'Money-Ready Adult', emoji: '🏆', icon: Trophy },
    xpReward: 1000,
    scenarios: [
      {
        id: 'salary-slip',
        title: 'Your First Job',
        story: 'Congratulations! You got a job offering ₹30,000/month. But your first salary slip shows ₹26,500 credited.',
        icon: Wallet,
        choices: [
          {
            id: 'understand-deductions',
            text: 'There must be deductions like PF, tax, etc.',
            cost: 0,
            effect: 'positive',
            outcome: 'Correct! Gross salary ≠ In-hand salary. Deductions happen.',
            mentorMessage: 'Salary slip shows all: gross pay, deductions, and net (in-hand) pay.',
            term: 'Salary Slip',
            termExplanation: 'A document showing your total earnings, deductions, and final take-home pay.'
          },
          {
            id: 'feel-cheated',
            text: 'They cheated me! I was promised 30K!',
            cost: 0,
            effect: 'neutral',
            outcome: 'Not cheating — deductions are standard. Ask HR to explain.',
            mentorMessage: 'Always ask about CTC vs In-hand during job offers.',
            term: 'Salary Slip',
            termExplanation: 'A document showing your total earnings, deductions, and final take-home pay.'
          }
        ]
      },
      {
        id: 'taxes',
        title: 'The Tax Reality',
        story: 'A portion of your salary goes to the government as Income Tax. It funds roads, schools, hospitals.',
        icon: Home,
        choices: [
          {
            id: 'accept-taxes',
            text: 'Fair. I use public services too.',
            cost: 0,
            effect: 'positive',
            outcome: 'You understand taxes are part of being a responsible citizen.',
            mentorMessage: 'Taxes are mandatory. Learn to plan and save legally on taxes.',
            term: 'Taxes',
            termExplanation: 'Money paid to the government from your income to fund public services.'
          },
          {
            id: 'resent-taxes',
            text: 'That\'s my hard-earned money!',
            cost: 0,
            effect: 'neutral',
            outcome: 'It is, but taxes are how societies function.',
            mentorMessage: 'You can minimize tax legally through savings schemes. Learn about 80C!',
            term: 'Taxes',
            termExplanation: 'Money paid to the government from your income to fund public services.'
          }
        ]
      },
      {
        id: 'credit-score',
        title: 'The Trust Score',
        story: 'Banks check your "credit score" before giving loans. It shows if you repay on time.',
        icon: Star,
        choices: [
          {
            id: 'care-about-score',
            text: 'I should pay bills on time to build good score',
            cost: 0,
            effect: 'positive',
            outcome: 'Smart! Good credit score = easier loans, better rates.',
            mentorMessage: 'Credit score is your financial reputation. Build it early, maintain it always.',
            term: 'Credit Score',
            termExplanation: 'A number that shows how trustworthy you are with credit and loans.'
          },
          {
            id: 'ignore-score',
            text: 'I don\'t take loans, doesn\'t matter',
            cost: 0,
            effect: 'neutral',
            outcome: 'Someday you might need one for home, car, or business.',
            mentorMessage: 'Even if you don\'t need loans now, your future self might.',
            term: 'Credit Score',
            termExplanation: 'A number that shows how trustworthy you are with credit and loans.'
          }
        ]
      },
      {
        id: 'bank-charges',
        title: 'The Hidden Costs',
        story: 'Your bank charged ₹150 for not maintaining minimum balance. You didn\'t know this rule.',
        icon: AlertTriangle,
        choices: [
          {
            id: 'learn-rules',
            text: 'I should read my bank\'s terms carefully',
            cost: 0,
            effect: 'positive',
            outcome: 'You avoided future charges by understanding the rules!',
            mentorMessage: 'Bank charges are sneaky. Know minimum balance, ATM limits, etc.',
            term: 'Bank Charges',
            termExplanation: 'Fees banks charge for services or not following account rules.'
          },
          {
            id: 'ignore-charges',
            text: 'Just ₹150, whatever',
            cost: 150,
            effect: 'negative',
            outcome: '₹150 × 12 months = ₹1,800/year for not reading rules.',
            mentorMessage: 'Small charges add up. Prevention is better than payment.',
            term: 'Bank Charges',
            termExplanation: 'Fees banks charge for services or not following account rules.'
          }
        ]
      },
      {
        id: 'freelance',
        title: 'The Side Income',
        story: 'You do graphic design on weekends and earn ₹5,000. It\'s irregular but adds up.',
        icon: Globe,
        choices: [
          {
            id: 'track-freelance',
            text: 'Track it separately and save taxes for it',
            cost: 0,
            effect: 'positive',
            outcome: 'You\'re managing freelance income like a pro!',
            mentorMessage: 'Freelance earnings need tracking. You pay your own taxes on them.',
            term: 'Freelance Earnings',
            termExplanation: 'Money earned from independent work, not a regular job — requires self-tax management.'
          },
          {
            id: 'spend-immediately',
            text: 'Extra money! Spend it all.',
            cost: 5000,
            effect: 'neutral',
            outcome: 'Fun, but when tax time comes, you\'ll owe money you spent.',
            mentorMessage: 'Set aside 20-30% of freelance income for taxes.',
            term: 'Freelance Earnings',
            termExplanation: 'Money earned from independent work, not a regular job — requires self-tax management.'
          }
        ]
      },
      {
        id: 'financial-goals',
        title: 'The Big Picture',
        story: 'You\'re 22. What are your financial goals for the next 10 years?',
        icon: Target,
        choices: [
          {
            id: 'set-goals',
            text: 'Emergency fund by 24, car by 27, home down payment by 30',
            cost: 0,
            effect: 'positive',
            outcome: 'You have clear, time-bound goals. You\'ll likely achieve them!',
            mentorMessage: 'Written goals with deadlines are far more likely to happen.',
            term: 'Financial Goals',
            termExplanation: 'Specific money targets with timelines — the roadmap for your financial journey.'
          },
          {
            id: 'no-goals',
            text: 'I\'ll see what happens',
            cost: 0,
            effect: 'neutral',
            outcome: 'Without goals, you might drift without direction.',
            mentorMessage: 'Goals turn dreams into plans. Start with one small goal.',
            term: 'Financial Goals',
            termExplanation: 'Specific money targets with timelines — the roadmap for your financial journey.'
          }
        ]
      }
    ]
  }
];

// Badge definitions
export const BADGES: Badge[] = GAME_LEVELS.map(level => ({
  id: level.id,
  name: level.badge.name,
  emoji: level.badge.emoji,
  icon: level.badge.icon,
  description: `Complete Level ${level.id}: ${level.name}`,
  levelRequired: level.id
}));

// Calculate literacy percentage based on completed levels and terms
export function calculateLiteracyPercentage(completedLevels: number[]): number {
  if (completedLevels.length === 0) return 0;
  return Math.round((completedLevels.length / GAME_LEVELS.length) * 100);
}

// Get level data by ID
export function getLevelById(levelId: number): LevelData | undefined {
  return GAME_LEVELS.find(level => level.id === levelId);
}

// Get total XP for completed levels
export function getTotalXP(completedLevels: number[]): number {
  return completedLevels.reduce((total, levelId) => {
    const level = getLevelById(levelId);
    return total + (level?.xpReward || 0);
  }, 0);
}

// Get all unlocked terms from completed levels
export function getUnlockedTerms(completedLevels: number[]): string[] {
  const terms: string[] = [];
  completedLevels.forEach(levelId => {
    const level = getLevelById(levelId);
    if (level) {
      terms.push(...level.terms);
    }
  });
  return terms;
}
