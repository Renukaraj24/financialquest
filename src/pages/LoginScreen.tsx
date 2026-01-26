import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';

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
      setError('Please fill in all required fields');
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
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-6">
          Continue your learning journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="error-box">{error}</div>}
          
          <div>
            <label htmlFor="emailOrPhone" className="form-label">
              Email or Phone *
            </label>
            <input
              type="text"
              id="emailOrPhone"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="email@example.com or +1234567890"
              required
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="password" className="form-label">
              Password *
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="btn-gradient w-full">
            Login
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn-text w-full"
          >
            Back to Welcome
          </button>
        </form>
      </div>
    </GameLayout>
  );
}
