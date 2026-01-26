import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { calculateAge } from '@/lib/storage';
import type { PersonalInfo } from '@/types/user';
import { motion } from 'framer-motion';
import { User, ArrowRight } from 'lucide-react';

const INCOME_SOURCES = [
  { value: 'pocket-money', label: 'Pocket money', emoji: '💵' },
  { value: 'scholarship', label: 'Scholarship', emoji: '🎓' },
  { value: 'freelancing', label: 'Freelancing / Part-time', emoji: '💼' },
  { value: 'family-support', label: 'Family support', emoji: '👨‍👩‍👧' },
  { value: 'other', label: 'Other', emoji: '✨' },
];

const INCOME_RANGES = [
  { value: 'less-than-2000', label: 'Less than ₹2,000' },
  { value: '2000-5000', label: '₹2,000 – ₹5,000' },
  { value: '5000-10000', label: '₹5,000 – ₹10,000' },
  { value: 'more-than-10000', label: 'More than ₹10,000' },
];

const EDUCATION_OPTIONS = [
  { value: 'school-student', label: 'School Student 📚' },
  { value: 'college-student', label: 'College Student 🎓' },
  { value: 'postgraduate', label: 'Postgraduate 🔬' },
  { value: 'other', label: 'Other ✨' },
];

export default function PersonalInfoScreen() {
  const navigate = useNavigate();
  const { updatePersonalInfo, getNextRoute, isAuthenticated } = useAuthContext();
  
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<PersonalInfo['gender'] | ''>('');
  const [educationStatus, setEducationStatus] = useState<PersonalInfo['educationStatus'] | ''>('');
  const [incomeSources, setIncomeSources] = useState<string[]>([]);
  const [incomeRange, setIncomeRange] = useState<PersonalInfo['incomeRange'] | ''>('');
  const [error, setError] = useState('');

  if (!isAuthenticated) {
    navigate('/');
    return null;
  }

  const handleIncomeSourceChange = (value: string, checked: boolean) => {
    if (checked) {
      setIncomeSources(prev => [...prev, value]);
    } else {
      setIncomeSources(prev => prev.filter(s => s !== value));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName || !dob || !gender || !educationStatus || !incomeRange) {
      setError('Please fill in all required fields 💭');
      return;
    }

    const personalInfo: PersonalInfo = {
      name: fullName.trim(),
      dob,
      age: calculateAge(dob),
      gender,
      educationStatus,
      incomeSources,
      incomeRange,
    };

    if (updatePersonalInfo(personalInfo)) {
      const nextRoute = getNextRoute();
      navigate(`/${nextRoute}`);
    } else {
      setError('Oops! Something went wrong. Try again! 🔄');
    }
  };

  const genderOptions = [
    { value: 'male', label: 'Male 👦' },
    { value: 'female', label: 'Female 👧' },
    { value: 'prefer-not-to-say', label: 'Prefer not to say 🤫' },
  ];

  return (
    <GameLayout>
      <div className="game-card">
        <motion.div 
          className="emoji-badge mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          👋
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold text-center text-gradient mb-2">
          About You
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-8 flex items-center justify-center gap-2">
          <User className="w-4 h-4" />
          Help us personalize your journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <motion.div 
              className="error-box"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="form-label">
              Your Name ✨
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="What should we call you?"
              required
              className="form-input"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="form-label">
              Birthday 🎂
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
              className="form-input"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="form-label">You are... 🌈</label>
            <div className="space-y-2">
              {genderOptions.map((option) => (
                <motion.label 
                  key={option.value} 
                  className="option-label"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={gender === option.value}
                    onChange={(e) => setGender(e.target.value as PersonalInfo['gender'])}
                    required
                  />
                  <span>{option.label}</span>
                </motion.label>
              ))}
            </div>
          </div>

          {/* Education Status */}
          <div>
            <label htmlFor="education" className="form-label">
              Currently... 📖
            </label>
            <select
              id="education"
              value={educationStatus}
              onChange={(e) => setEducationStatus(e.target.value as PersonalInfo['educationStatus'])}
              required
              className="form-input"
            >
              <option value="">Select your status</option>
              {EDUCATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Income Sources */}
          <div>
            <label className="form-label">Money comes from... 💸</label>
            <div className="space-y-2">
              {INCOME_SOURCES.map((source) => (
                <motion.label 
                  key={source.value} 
                  className="option-label"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="checkbox"
                    value={source.value}
                    checked={incomeSources.includes(source.value)}
                    onChange={(e) => handleIncomeSourceChange(source.value, e.target.checked)}
                  />
                  <span>{source.emoji} {source.label}</span>
                </motion.label>
              ))}
            </div>
          </div>

          {/* Income Range */}
          <div>
            <label className="form-label">Monthly amount 💰</label>
            <div className="space-y-2">
              {INCOME_RANGES.map((range) => (
                <motion.label 
                  key={range.value} 
                  className="option-label"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <input
                    type="radio"
                    name="incomeRange"
                    value={range.value}
                    checked={incomeRange === range.value}
                    onChange={(e) => setIncomeRange(e.target.value as PersonalInfo['incomeRange'])}
                    required
                  />
                  <span>{range.label}</span>
                </motion.label>
              ))}
            </div>
          </div>

          <motion.button 
            type="submit" 
            className="btn-gradient w-full flex items-center justify-center gap-2"
            whileTap={{ scale: 0.98 }}
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </form>
      </div>
    </GameLayout>
  );
}
