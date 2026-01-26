import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { calculateAge } from '@/lib/storage';
import type { PersonalInfo } from '@/types/user';

const INCOME_SOURCES = [
  { value: 'pocket-money', label: 'Pocket money' },
  { value: 'scholarship', label: 'Scholarship' },
  { value: 'freelancing', label: 'Freelancing / Part-time work' },
  { value: 'family-support', label: 'Family support' },
  { value: 'other', label: 'Other' },
];

const INCOME_RANGES = [
  { value: 'less-than-2000', label: 'Less than ₹2,000' },
  { value: '2000-5000', label: '₹2,000 – ₹5,000' },
  { value: '5000-10000', label: '₹5,000 – ₹10,000' },
  { value: 'more-than-10000', label: 'More than ₹10,000' },
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

  // Redirect if not authenticated
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
      setError('Please fill in all required fields');
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
      setError('Failed to save information. Please try again.');
    }
  };

  return (
    <GameLayout>
      <div className="game-card">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-2">
          Tell us about yourself
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-6">
          Help us personalize your learning experience
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="error-box">{error}</div>}

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="form-label">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="form-input"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dob" className="form-label">
              Date of Birth *
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
            <label className="form-label">Gender *</label>
            <div className="space-y-2">
              {(['male', 'female', 'prefer-not-to-say'] as const).map((option) => (
                <label key={option} className="option-label">
                  <input
                    type="radio"
                    name="gender"
                    value={option}
                    checked={gender === option}
                    onChange={(e) => setGender(e.target.value as PersonalInfo['gender'])}
                    required
                  />
                  <span className="capitalize">{option.replace(/-/g, ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Education Status */}
          <div>
            <label htmlFor="education" className="form-label">
              Current Pursuing / Status *
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
            <label className="form-label">Current Monthly Money Source</label>
            <div className="space-y-2">
              {INCOME_SOURCES.map((source) => (
                <label key={source.value} className="option-label">
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
            <label className="form-label">Approximate Monthly Amount Received *</label>
            <div className="space-y-2">
              {INCOME_RANGES.map((range) => (
                <label key={range.value} className="option-label">
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

          <button type="submit" className="btn-gradient w-full">
            Continue
          </button>
        </form>
      </div>
    </GameLayout>
  );
}
