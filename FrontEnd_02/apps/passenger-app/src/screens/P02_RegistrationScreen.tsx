import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';

export const P02_RegistrationScreen: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/otp', { state: { phone: phone || '1712-345678' } });
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col justify-between px-6 pt-[max(16px,env(safe-area-inset-top))] pb-8">
      <div>
        {/* Header */}
        <div className="flex items-center gap-3 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-xl text-slate-800 hover:bg-slate-200 active:bg-slate-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Create Account <span className="font-bengali text-lg font-bold">/ অ্যাকাউন্ট খুলুন</span>
          </h1>
        </div>

        <p className="text-xs text-slate-700 mt-2 leading-relaxed font-medium">
          Register with your phone number to file complaints and get alerts.
        </p>

        {/* Registration Form */}
        <form onSubmit={handleSendOtp} className="mt-6 space-y-4">
          {/* Full Name */}
          <div className="bg-white rounded-2xl border border-slate-300 px-4 py-3.5 flex items-center gap-3 shadow-xs focus-within:border-pothe focus-within:ring-1 focus-within:ring-pothe">
            <User className="w-5 h-5 text-slate-500 shrink-0" />
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name / আপনার নাম"
              className="w-full text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Email (Optional) */}
          <div className="bg-white rounded-2xl border border-slate-300 px-4 py-3.5 flex items-center gap-3 shadow-xs focus-within:border-pothe focus-within:ring-1 focus-within:ring-pothe">
            <Mail className="w-5 h-5 text-slate-500 shrink-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email (optional) / ইমেইল (ঐচ্ছিক)"
              className="w-full text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Phone Number */}
          <div className="bg-white rounded-2xl border border-slate-300 px-4 py-3.5 flex items-center gap-3 shadow-xs focus-within:border-pothe focus-within:ring-1 focus-within:ring-pothe">
            <Phone className="w-5 h-5 text-slate-500 shrink-0" />
            <span className="text-sm font-bold text-slate-800 pr-2 border-r border-slate-300">
              +880
            </span>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="1712-345678"
              className="w-full text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>

          {/* Password */}
          <div className="bg-white rounded-2xl border border-slate-300 px-4 py-3.5 flex items-center gap-3 shadow-xs focus-within:border-pothe focus-within:ring-1 focus-within:ring-pothe">
            <Lock className="w-5 h-5 text-slate-500 shrink-0" />
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password / পাসওয়ার্ড"
              className="w-full text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-500 hover:text-slate-800 p-1"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Terms checkbox */}
          <label className="flex items-center gap-2 pt-1 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="w-4 h-4 rounded text-pothe accent-pothe cursor-pointer"
            />
            <span className="text-xs text-slate-800 font-medium">
              I agree to <span className="underline font-bold">Terms & Privacy Policy</span>
            </span>
          </label>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={!agreed}
            className="w-full h-14 bg-pothe hover:bg-pothe-dark active:bg-pothe-800 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg shadow-emerald-900/30 text-base transition-all flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            <span>Send OTP</span>
            <span className="font-bengali opacity-90">/ ওটিপি পাঠান</span>
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center pt-6">
        <p className="text-xs text-slate-700 font-medium">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-pothe font-extrabold hover:underline"
          >
            Log in <span className="font-bengali">/ লগইন করুন</span>
          </button>
        </p>
      </div>
    </div>
  );
};
