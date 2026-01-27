import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { calculateAge } from '@/lib/storage';
import type { PersonalInfo } from '@/types/user';
import { motion } from 'framer-motion';
import { User, ArrowRight, AlertTriangle, Shield } from 'lucide-react';

const INCOME_SOURCES = [
  { value: 'pocket-money', label: 'Pocket Money' },
  { value: 'scholarship', label: 'Scholarship' },
  { value: 'freelancing', label: 'Freelancing / Part-time' },
  { value: 'family-support', label: 'Family Support' },
  { value: 'other', label: 'Other' },
];

const INCOME_RANGES = [
  { value: 'less-than-2000', label: 'Under ₹2,000' },
  { value: '2000-5000', label: '₹2,000 – ₹5,000' },
  { value: '5000-10000', label: '₹5,000 – ₹10,000' },
  { value: 'more-than-10000', label: 'Over ₹10,000' },
];

const EDUCATION_OPTIONS = [
  { value: 'school-student', label: 'School Student' },
  { value: 'college-student', label: 'College Student' },
  { value: 'postgraduate', label: 'Postgraduate' },
  { value: 'other', label: 'Other' },
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
      setError('All fields required');
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
      setError('System error - retry');
    }
  };

  const genderOptions = [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'prefer-not-to-say', label: 'Classified' },
  ];

  return (
    <GameLayout>
      <div className="game-card scanlines">
        <motion.div 
          className="icon-cute mx-auto mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <Shield className="w-6 h-6 text-primary-foreground" />
        </motion.div>

        <h2 className="text-xl font-black text-center text-gradient mb-1 uppercase tracking-wider">
          Profile Configuration
        </h2>
        <p className="text-center text-muted-foreground text-xs uppercase tracking-widest mb-6 flex items-center justify-center gap-2">
          <User className="w-3 h-3" />
          Initialize user parameters
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <motion.div 
              className="error-box flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertTriangle className="w-3 h-3" />
              {error}
            </motion.div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="form-label">
              Operator Name
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter designation"
              required
              className="form-input"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="form-label">
              Birth Date
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
            <label className="form-label">Classification</label>
            <div className="space-y-2">
              {genderOptions.map((option) => (
                <label 
                  key={option.value} 
                  className="option-label"
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
                </label>
              ))}
            </div>
          </div>

          {/* Education Status */}
          <div>
            <label htmlFor="education" className="form-label">
              Current Status
            </label>
            <select
              id="education"
              value={educationStatus}
              onChange={(e) => setEducationStatus(e.target.value as PersonalInfo['educationStatus'])}
              required
              className="form-input"
            >
              <option value="">Select status</option>
              {EDUCATION_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Income Sources */}
          <div>
            <label className="form-label">Revenue Streams</label>
            <div className="space-y-2">
              {INCOME_SOURCES.map((source) => (
                <label 
                  key={source.value} 
                  className="option-label"
                >
                  <input
                    type="checkbox"
                    value={source.value}
                    checked={incomeSources.includes(source.value)}
                    onChange={(e) => handleIncomeSourceChange(source.value, e.target.checked)}
                  />
                  <span>{source.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Income Range */}
          <div>
            <label className="form-label">Monthly Credits</label>
            <div className="space-y-2">
              {INCOME_RANGES.map((range) => (
                <label 
                  key={range.value} 
                  className="option-label"
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
                </label>
              ))}
            </div>
          </div>

          <motion.button 
            type="submit" 
            className="btn-gradient w-full flex items-center justify-center gap-2"
            whileTap={{ scale: 0.98 }}
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </form>
      </div>
    </GameLayout>
  );
}
