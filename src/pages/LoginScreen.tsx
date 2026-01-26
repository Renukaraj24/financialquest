import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { LogIn, ArrowLeft, Sparkles } from 'lucide-react';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { login, getNextRoute } = useAuthContext();
  
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!emailOrPhone || !password) {
      setError('Please fill in all fields 💭');
      return;
    }

    const result = login(emailOrPhone, password);
    
    if (result.success) {
      const nextRoute = getNextRoute();
      navigate(`/${nextRoute}`);
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <GameLayout>
      <div className="game-card">
        <motion.div 
          className="emoji-badge mx-auto mb-6"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          👋
        </motion.div>

        <h2 className="text-2xl md:text-3xl font-bold text-center text-gradient mb-2">
          Welcome Back!
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-8 flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4" />
          Continue your journey
          <Sparkles className="w-4 h-4" />
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
            <label htmlFor="emailOrPhone" className="form-label">
              Email or Phone 📧
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
              Password 🔑
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your secret password"
              required
              className="form-input"
            />
          </div>

          <motion.button 
            type="submit" 
            className="btn-gradient w-full flex items-center justify-center gap-2"
            whileTap={{ scale: 0.98 }}
          >
            <LogIn className="w-5 h-5" />
            Let's Go!
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
