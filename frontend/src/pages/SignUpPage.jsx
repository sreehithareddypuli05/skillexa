import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const perks = [
  'Access 50+ courses free',
  'Career guidance & mentorship',
  'Join 12,000+ student community',
  'Certificate on completion',
];

export default function SignUpPage() {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', username: '', phone: '', password: '', password2: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      await register(form);
      navigate('/');
    } catch (err) {
      const data = err.response?.data;
      if (data && typeof data === 'object') {
        setErrors(data);
      } else {
        setErrors({ general: 'Registration failed. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  const f = (field) => ({
    value: form[field],
    onChange: (e) => setForm({...form, [field]: e.target.value})
  });

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="w-full max-w-5xl relative">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left — value prop */}
          <div className="hidden lg:block text-white">
            <Link to="/" className="inline-flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-2xl">Skill<span className="text-blue-300">exa</span></span>
            </Link>
            <h1 className="text-4xl font-bold mb-4">Start Your Journey Today</h1>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              Join 12,000+ students who are already learning, growing, and landing their dream careers with Skillexa.
            </p>
            <div className="space-y-3">
              {perks.map(perk => (
                <div key={perk} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-white/80">{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div>
            <div className="text-center mb-6 lg:hidden">
              <Link to="/" className="inline-flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-xl text-white">Skill<span className="text-blue-300">exa</span></span>
              </Link>
              <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="hidden lg:block text-2xl font-bold text-gray-900 mb-6">Create Your Account</h2>

              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl p-4 mb-5 text-sm">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input required className={`input-field ${errors.first_name ? 'border-red-300' : ''}`} placeholder="First" {...f('first_name')} />
                    {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name[0]}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input required className={`input-field ${errors.last_name ? 'border-red-300' : ''}`} placeholder="Last" {...f('last_name')} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input required type="email" className={`input-field ${errors.email ? 'border-red-300' : ''}`} placeholder="you@example.com" {...f('email')} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email[0]}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                    <input required className={`input-field ${errors.username ? 'border-red-300' : ''}`} placeholder="username" {...f('username')} />
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username[0]}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input type="tel" className="input-field" placeholder="+91 xxxxx" {...f('phone')} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                  <div className="relative">
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      className={`input-field pr-12 ${errors.password ? 'border-red-300' : ''}`}
                      placeholder="Min. 8 characters"
                      {...f('password')}
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password[0]}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password *</label>
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    className={`input-field ${errors.password2 ? 'border-red-300' : ''}`}
                    placeholder="Repeat password"
                    {...f('password2')}
                  />
                  {errors.password2 && <p className="text-red-500 text-xs mt-1">{errors.password2[0]}</p>}
                </div>

                <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base mt-2">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating account...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      Create My Account <ArrowRight className="w-4 h-4" />
                    </span>
                  )}
                </button>
              </form>

              <div className="mt-5 text-center text-sm">
                <span className="text-gray-500">Already have an account? </span>
                <Link to="/signin" className="text-blue-600 hover:text-blue-700 font-semibold">Sign in →</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}