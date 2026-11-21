import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { PotheLogo } from '../../../passenger-app/src/components/PotheLogo';
import { useChecker } from '../context/CheckerContext';

export const C01_CheckerLoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useChecker();

  const [checkerId, setCheckerId] = useState('CHK-8801');
  const [password, setPassword] = useState('••••••••');
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/shift');
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col justify-between pb-8">
      {/* Top Green Header Band */}
      <div className="bg-pothe-DEFAULT text-white px-6 pt-[max(20px,env(safe-area-inset-top))] pb-8 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center font-black text-lg">
              P
            </div>
            <span className="text-xl font-black tracking-tight">Pothe</span>
          </div>

          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-full text-xs font-black transition border border-white/30"
          >
            {language === 'en' ? 'EN | বাং' : 'বাং | EN'}
          </button>
        </div>

        <h1 className="text-2xl font-black tracking-tight mt-6">
          Checker Portal <span className="font-bengali font-extrabold text-xl">/ চেকার পোর্টাল</span>
        </h1>
      </div>

      {/* Main Card */}
      <div className="px-6 -mt-6 z-10 flex-1 flex flex-col justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200/90 space-y-5"
        >
          {/* Input 1: Checker ID */}
          <div>
            <label className="text-xs font-black text-slate-800 block mb-1.5">
              Checker ID or Phone <span className="font-bengali font-bold">/ চেকার আইডি বা ফোন</span>
            </label>
            <input
              type="text"
              value={checkerId}
              onChange={(e) => setCheckerId(e.target.value)}
              className="w-full h-14 bg-slate-50 border-2 border-slate-300 rounded-2xl px-4 text-base font-extrabold text-slate-900 outline-none focus:border-pothe-DEFAULT transition"
            />
          </div>

          {/* Input 2: Password */}
          <div>
            <label className="text-xs font-black text-slate-800 block mb-1.5">
              Password <span className="font-bengali font-bold">/ পাসওয়ার্ড</span>
            </label>
            <div className="relative flex items-center">
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 bg-slate-50 border-2 border-slate-300 rounded-2xl px-4 pr-12 text-base font-extrabold text-slate-900 outline-none focus:border-pothe-DEFAULT transition"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 text-slate-600 hover:text-slate-900"
              >
                {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Giant 60px Login CTA Button */}
          <button
            type="submit"
            className="w-full h-15 bg-pothe-DEFAULT hover:bg-pothe-dark active:scale-[0.99] text-white font-black text-lg rounded-2xl shadow-lg shadow-emerald-900/30 transition flex items-center justify-center gap-2 mt-4"
          >
            <span>Log In</span>
            <span className="font-bengali opacity-90">/ লগইন</span>
          </button>
        </form>
      </div>

      {/* Footer Notice */}
      <div className="text-center px-6 pt-6">
        <p className="text-xs text-slate-500 font-semibold leading-relaxed">
          Account created by admin. Contact admin if you cannot log in.
        </p>
      </div>
    </div>
  );
};
