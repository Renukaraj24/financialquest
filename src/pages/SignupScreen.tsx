import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { GameLayout } from '@/components/GameLayout';
import { useAuthContext } from '@/contexts/AuthContext';

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
      setError('Please fill in all required fields');
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
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-foreground mb-2">
          Create Your Account
        </h2>
        <p className="text-center text-muted-foreground text-sm mb-6">
          Begin your financial learning journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && <div className="error-box">{error}</div>}
          
          <div>
            <label htmlFor="name" className="form-label">
              Name (Optional)
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
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
              placeholder="Create a password"
              minLength={6}
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="btn-gradient w-full">
            Create Account
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
