import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { LogIn, ArrowLeft, AlertTriangle } from 'lucide-react';

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
      setError('All fields required');
      return;
    }

    const result = login(emailOrPhone, password);
    
    if (result.success) {
      const nextRoute = getNextRoute();
      navigate(`/${nextRoute}`);
    } else {
      setError(result.error || 'Authentication failed');
    }
  };

  return (
    <GameLayout>
      <div className="game-card scanlines">
        <motion.div 
          className="icon-cute mx-auto mb-4"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <LogIn className="w-6 h-6 text-primary-foreground" />
        </motion.div>

        <h2 className="text-xl font-black text-center text-gradient mb-1 uppercase tracking-wider">
          Access Terminal
        </h2>
        <p className="text-center text-muted-foreground text-xs uppercase tracking-widest mb-6">
          Enter your credentials
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
          
          <div>
            <label htmlFor="emailOrPhone" className="form-label">
              Contact ID
            </label>
            <input
              type="text"
              id="emailOrPhone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="Email or phone"
              required
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label">
              Access Code
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              className="form-input"
            />
          </div>

          <motion.button 
            type="submit" 
            className="btn-gradient w-full flex items-center justify-center gap-2"
            whileTap={{ scale: 0.98 }}
          >
            <LogIn className="w-4 h-4" />
            Access System
          </motion.button>
          
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-text w-full flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-3 h-3" />
            Return to Base
          </button>
        </form>
      </div>
    </GameLayout>
  );
}
