import { useState } from 'react';
import { Lock } from 'lucide-react';

interface PasswordGateProps {
  onSuccess: () => void;
}

export function PasswordGate({ onSuccess }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Get password from environment variable (will be set in Vercel dashboard)
  const correctPassword = import.meta.env.VITE_GWS_ACCESS_PASSWORD || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a brief delay for security
    setTimeout(() => {
      if (password === correctPassword) {
        localStorage.setItem('gws_access_token', password);
        onSuccess();
      } else {
        setError('Invalid password. Please try again.');
        setPassword('');
        setIsLoading(false);
      }
    }, 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md mx-auto px-6">
        <div className="bg-white rounded-lg shadow-2xl p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-100 p-3 rounded-full">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-2">GWS Website</h1>
          <p className="text-slate-600 mb-8">Internal access only</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access password"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-slate-100"
                autoFocus
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              {isLoading ? 'Verifying...' : 'Access'}
            </button>
          </form>

          <p className="text-xs text-slate-500 mt-6">
            This is a confidential preview for internal use only.
          </p>
        </div>
      </div>
    </div>
  );
}
