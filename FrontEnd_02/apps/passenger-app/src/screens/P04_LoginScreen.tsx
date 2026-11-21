import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { PotheLogo } from '../components/PotheLogo';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const P04_LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const { login, loginAsGuest } = useAuth();

  const [identifier, setIdentifier] = useState('+880 1712-345678');
  const [password, setPassword] = useState('demo1234');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMsg('Please enter your phone number or email.');
      return;
    }
    await login(identifier, password);
    navigate('/home');
  };

  const handleGuest = () => {
    loginAsGuest();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between px-6 pt-[max(16px,env(safe-area-inset-top))] pb-8">
      <div>
        {/* Top Language Toggle */}
        <div className="flex justify-end">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-pothe text-white rounded-full text-xs font-bold shadow-xs hover:bg-pothe-dark active:bg-pothe-800 transition"
          >
            {language === 'en' ? 'EN | বাং' : 'বাং | EN'}
          </button>
        </div>

        {/* Center Logo */}
        <div className="flex flex-col items-center mt-6">
          <PotheLogo size={70} />
          <h1 className="text-xl font-black text-slate-900 mt-4 tracking-tight">
            Welcome back <span className="font-bengali font-extrabold text-lg">/ স্বাগতম</span>
          </h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          {/* Phone / Email Input with Floating Label */}
          <div className="relative border border-slate-400 rounded-xl p-3 focus-within:border-pothe focus-within:ring-1 focus-within:ring-pothe transition">
            <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-[11px] font-bold text-slate-800">
              Phone number or Email
            </label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full text-sm font-semibold text-slate-900 outline-none pt-1"
            />
          </div>

          {/* Password Input with Floating Label */}
          <div className="relative border border-slate-400 rounded-xl p-3 focus-within:border-pothe focus-within:ring-1 focus-within:ring-pothe transition">
            <label className="absolute -top-2.5 left-3 bg-white px-1.5 text-[11px] font-bold text-slate-800">
              Password
            </label>
            <div className="flex items-center justify-between pt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm font-semibold text-slate-900 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-600 hover:text-slate-900 ml-2 p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-pothe accent-pothe cursor-pointer"
              />
              <span className="text-slate-800 font-medium">Remember me</span>
            </label>

            <button
              type="button"
              onClick={() => alert('Password reset link sent to registered phone number.')}
              className="text-xs font-bold text-slate-800 hover:text-slate-950 underline"
            >
              <span>Forgot password?</span>{' '}
              <span className="font-bengali text-slate-700">পাসওয়ার্ড ভুলে গেছেন?</span>
            </button>
          </div>

          {/* Inline Error Banner */}
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-red-700 font-semibold shadow-xs">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Log In Button */}
          <button
            type="submit"
            className="w-full h-13 bg-pothe hover:bg-pothe-dark active:bg-pothe-800 active:scale-[0.99] text-white font-bold rounded-2xl shadow-md text-base transition-all flex items-center justify-center gap-1.5 mt-2"
          >
            <span>Log In</span>
            <span className="font-bengali opacity-90">/ লগইন</span>
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="px-3 text-xs text-slate-500 font-semibold">
            or <span className="font-bengali">/ অথবা</span>
          </span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Continue as Guest Button */}
        <button
          onClick={handleGuest}
          className="w-full h-12 border-2 border-slate-700 rounded-full text-sm font-bold text-slate-800 hover:bg-slate-50 active:bg-slate-100 transition flex items-center justify-center gap-1.5"
        >
          <span>Continue as guest</span>
          <span className="font-bengali font-semibold text-slate-700">/ অতিথি হিসেবে দেখুন</span>
        </button>
      </div>

      {/* Footer */}
      <div className="text-center pt-6">
        <p className="text-xs text-slate-700 font-medium">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-pothe font-extrabold hover:underline"
          >
            Sign up <span className="font-bengali">/ সাইন আপ</span>
          </button>
        </p>
      </div>
    </div>
  );
};
