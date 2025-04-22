import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { register } from '../services/auth';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validatePassword = () => {
    const { password } = formData;
    return {
      length: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
    };
  };

  const passwordChecks = validatePassword();
  const isPasswordValid = Object.values(passwordChecks).every(check => check);
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isPasswordValid) {
      setError('Please ensure your password meets all requirements.');
      return;
    }
    
    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }
    
    setLoading(true);
    
    try {
      const user = await register(formData.name, formData.email, formData.password);
      setUser(user);
      navigate('/');
    } catch (error) {
      setError('Error creating account. Email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex flex-col justify-center pt-20 pb-12">
      <div className="container-custom max-w-md">
        <div className="bg-dark-800 rounded-lg shadow-xl p-8 sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-slate-400">Join StreamVerse to start streaming</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-error-900/30 border border-error-700 text-error-200 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="input w-full"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="input w-full"
                placeholder="you@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input w-full pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              
              {/* Password requirements */}
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-xs">
                  <span className={`mr-1 ${passwordChecks.length ? 'text-success-500' : 'text-slate-500'}`}>
                    {passwordChecks.length ? <Check className="h-3 w-3" /> : '•'}
                  </span>
                  <span className={passwordChecks.length ? 'text-success-500' : 'text-slate-500'}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center text-xs">
                  <span className={`mr-1 ${passwordChecks.hasUpperCase ? 'text-success-500' : 'text-slate-500'}`}>
                    {passwordChecks.hasUpperCase ? <Check className="h-3 w-3" /> : '•'}
                  </span>
                  <span className={passwordChecks.hasUpperCase ? 'text-success-500' : 'text-slate-500'}>
                    At least one uppercase letter
                  </span>
                </div>
                <div className="flex items-center text-xs">
                  <span className={`mr-1 ${passwordChecks.hasLowerCase ? 'text-success-500' : 'text-slate-500'}`}>
                    {passwordChecks.hasLowerCase ? <Check className="h-3 w-3" /> : '•'}
                  </span>
                  <span className={passwordChecks.hasLowerCase ? 'text-success-500' : 'text-slate-500'}>
                    At least one lowercase letter
                  </span>
                </div>
                <div className="flex items-center text-xs">
                  <span className={`mr-1 ${passwordChecks.hasNumber ? 'text-success-500' : 'text-slate-500'}`}>
                    {passwordChecks.hasNumber ? <Check className="h-3 w-3" /> : '•'}
                  </span>
                  <span className={passwordChecks.hasNumber ? 'text-success-500' : 'text-slate-500'}>
                    At least one number
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`input w-full ${
                  formData.confirmPassword && !passwordsMatch ? 'border-error-500' : ''
                }`}
                placeholder="••••••••"
              />
              {formData.confirmPassword && !passwordsMatch && (
                <p className="mt-1 text-xs text-error-500">Passwords do not match</p>
              )}
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading || !isPasswordValid || !passwordsMatch}
                className="btn btn-primary w-full py-2.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-700 text-center">
            <p className="text-sm text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;