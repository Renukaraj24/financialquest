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

// All 5 consolidated levels with scenarios
export const GAME_LEVELS: LevelData[] = [
  // LEVEL 1 - Money Basics & Spending Control (combines old Level 1 + Level 2)
  {
    id: 1,
    name: 'Money Basics & Spending Control',
    theme: 'Understanding money and controlling where it goes',
    description: 'You just received your monthly money. Time to learn what money is and where it tends to disappear!',
    startingMoney: 5000,
    terms: [
      'Income', 'Expense', 'Balance', 'Saving', 'Asset', 'Liability', 'Liquidity',
      'Needs', 'Wants', 'Budget', 'Impulse Spending', 'Fixed Expense', 'Variable Expense', 'Budget Leakage'
    ],
    badge: { name: 'Money Explorer', emoji: '🏅', icon: Coins },
    xpReward: 800,
    scenarios: [
      // From Level 1
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
      // From Level 2
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

  // LEVEL 2 - Safety & Growth Foundations (combines old Level 3 + Level 4)
  {
    id: 2,
    name: 'Safety & Growth Foundations',
    theme: 'Reducing stress and making money work quietly',
    description: 'Life throws surprises. Let\'s prepare for them AND learn how money can grow!',
    startingMoney: 6000,
    terms: [
      'Emergency Fund', 'Financial Cushion', 'Rainy Day Fund', 'Cash Flow', 'Disposable Income', 'Short-term Goals', 'Long-term Goals',
      'Investing', 'Interest', 'Compound Interest', 'Active Income', 'Passive Income', 'Opportunity Cost', 'Time Value of Money'
    ],
    badge: { name: 'Safety Builder', emoji: '🏅', icon: Shield },
    xpReward: 1000,
    scenarios: [
      // From Level 3
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
      },
      // From Level 4
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

  // LEVEL 3 - Investing & Digital Money Life (combines old Level 5 + Level 6)
  {
    id: 3,
    name: 'Investing & Digital Money Life',
    theme: 'Modern money usage and beginner investing',
    description: 'Explore beginner investments and master digital payment habits!',
    startingMoney: 5000,
    terms: [
      'Risk', 'Return', 'Risk-Return Tradeoff', 'Diversification', 'Mutual Fund', 'SIP', 'Index Fund',
      'UPI', 'Digital Wallet', 'Online Banking', 'Net Banking', 'Auto-Debit', 'Subscription Trap', 'Transaction History'
    ],
    badge: { name: 'Digital Money Master', emoji: '🏅', icon: Smartphone },
    xpReward: 1000,
    scenarios: [
      // From Level 5
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
        title: 'The Basket Rule',
        story: 'Would you put all your eggs in one basket? Same with money — what if that one thing fails?',
        icon: Coins,
        choices: [
          {
            id: 'spread-investments',
            text: 'Split across different options',
            cost: 0,
            effect: 'positive',
            outcome: 'You learned diversification — the golden rule of investing!',
            mentorMessage: 'Diversifying means spreading risk. If one fails, others protect you.',
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
      },
      // From Level 6
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
      }
    ]
  },

  // LEVEL 4 - Scams & Money Psychology (combines old Level 7 + Level 8)
  {
    id: 4,
    name: 'Scams & Money Psychology',
    theme: 'Protecting money and controlling emotions',
    description: 'Scammers are smart, but your brain can play tricks too. Let\'s outsmart both!',
    startingMoney: 5000,
    terms: [
      'Scam', 'Fraud', 'Phishing', 'Identity Theft', 'Fake Investment Scheme', 'Ponzi Scheme', 'Social Engineering',
      'Financial Discipline', 'Delayed Gratification', 'FOMO', 'Loss Aversion', 'Overconfidence Bias', 'Habit Loop', 'Decision Fatigue'
    ],
    badge: { name: 'Scam Shield', emoji: '🏅', icon: Shield },
    xpReward: 1200,
    scenarios: [
      // From Level 7
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
      // From Level 8
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

  // LEVEL 5 - Wealth & Adult Life Readiness (combines old Level 9 + Level 10)
  {
    id: 5,
    name: 'Wealth & Adult Life Readiness',
    theme: 'Thinking long-term and preparing for real life',
    description: 'Time to think like your future self. You\'re almost an adult — here\'s what\'s coming!',
    startingMoney: 10000,
    terms: [
      'Net Worth', 'Wealth', 'Inflation', 'Purchasing Power', 'Financial Planning', 'Financial Independence', 'Financial Resilience',
      'Credit Score', 'Bank Charges', 'Service Fees', 'Taxes', 'Salary Slip', 'Internship Stipend', 'Freelance Earnings', 'Part-time Income', 'Financial Goals'
    ],
    badge: { name: 'Money-Ready Student', emoji: '🏆', icon: Trophy },
    xpReward: 1500,
    scenarios: [
      // From Level 9
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
      // From Level 10
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
            mentorMessage: 'Gross vs Net salary — always clarify during job offers.',
            term: 'Salary Slip',
            termExplanation: 'A document showing your total earnings, deductions, and final take-home pay.'
          }
        ]
      },
      {
        id: 'credit-score',
        title: 'The Credit Mystery',
        story: 'Your friend couldn\'t get a loan because of "bad credit score." What is this score?',
        icon: Lock,
        choices: [
          {
            id: 'understand-credit',
            text: 'It\'s a rating that shows how trustworthy I am with borrowed money',
            cost: 0,
            effect: 'positive',
            outcome: 'Correct! Banks use this to decide if they should lend to you.',
            mentorMessage: 'Credit score is your financial reputation. Build it carefully.',
            term: 'Credit Score',
            termExplanation: 'A number (300-900) representing your reliability with credit and loans.'
          },
          {
            id: 'ignore-credit',
            text: 'I don\'t need loans, so I don\'t care',
            cost: 0,
            effect: 'neutral',
            outcome: 'You might need credit someday for a home or emergency.',
            mentorMessage: 'Credit score matters for major life purchases. Start building early.',
            term: 'Credit Score',
            termExplanation: 'A number (300-900) representing your reliability with credit and loans.'
          }
        ]
      },
      {
        id: 'taxes',
        title: 'The Tax Surprise',
        story: 'You earned ₹8 lakh this year. Government takes ₹52,500 as tax. Is this unfair?',
        icon: Coins,
        choices: [
          {
            id: 'understand-taxes',
            text: 'Taxes pay for roads, hospitals, schools. It\'s my contribution.',
            cost: 0,
            effect: 'positive',
            outcome: 'Mature thinking! Taxes fund public services.',
            mentorMessage: 'Taxes are mandatory and fund society. Learn to plan for them.',
            term: 'Taxes',
            termExplanation: 'Mandatory payments to government based on income, used for public services.'
          },
          {
            id: 'avoid-taxes',
            text: 'I\'ll find ways to avoid paying',
            cost: 0,
            effect: 'negative',
            outcome: 'Tax avoidance is legal (within limits), but evasion is illegal.',
            mentorMessage: 'Learn legal tax-saving methods. Evasion has serious consequences.',
            term: 'Taxes',
            termExplanation: 'Mandatory payments to government based on income, used for public services.'
          }
        ]
      },
      {
        id: 'bank-charges',
        title: 'The Minimum Balance',
        story: 'Your bank charged ₹150 for not maintaining minimum balance. You didn\'t know about this rule.',
        icon: CreditCard,
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

// Badge definitions - derived from levels
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
