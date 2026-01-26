import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { UserPlus, ArrowLeft } from 'lucide-react';

export default function SignupScreen() {
  const navigate = useNavigate();
  const { register, getNextRoute } = useAuthContext();
  
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!emailOrPhone || !password) {
      setError('Please fill in all required fields 💭');
      return;
    }

    const result = register(name, emailOrPhone, password);
    
    if (result.success) {
      const nextRoute = getNextRoute();
      navigate(`/${nextRoute}`);
    } else {
      setError(result.error || 'Failed to create account');
    }
  };

  return (
    <GameLayout>
      <div className="game-card">
        <motion.div 
          className="emoji-badge mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          ✨
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold text-center text-gradient mb-2">
          Join the Fun!
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-8">
          Create your account and start learning 🎯
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <motion.div 
              className="error-box"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}
          
          <div>
            <label htmlFor="name" className="form-label">
              Your Name 💫
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What should we call you?"
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="emailOrPhone" className="form-label">
              Email or Phone *
            </label>
            <input
              type="text"
              id="emailOrPhone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="hello@example.com"
              required
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label">
              Secret Password 🔐
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Make it strong!"
              minLength={6}
              required
              className="form-input"
            />
          </div>

          <motion.button 
            type="submit" 
            className="btn-gradient w-full flex items-center justify-center gap-2"
            whileTap={{ scale: 0.98 }}
          >
            <UserPlus className="w-5 h-5" />
            Create Account
          </motion.button>
          
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-text w-full flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Welcome
          </button>
        </form>
      </div>
    </GameLayout>
  );
}
