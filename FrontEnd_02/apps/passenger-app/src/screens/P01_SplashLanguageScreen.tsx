import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { PotheLogo } from '../components/PotheLogo';
import { useLanguage, Language } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const P01_SplashLanguageScreen: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { loginAsGuest } = useAuth();
  const [selectedLang, setSelectedLang] = useState<Language>(language || 'bn');

  const handleContinue = () => {
    setLanguage(selectedLang);
    navigate('/login');
  };

  const handleGuest = () => {
    setLanguage(selectedLang);
    loginAsGuest();
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-[#EAF5EF] flex flex-col justify-between px-6 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative Faint Transit Watermark */}
      <svg
        className="absolute -bottom-10 -right-10 w-96 h-96 opacity-15 pointer-events-none text-pothe"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 180 C 60 180, 80 120, 120 120 C 160 120, 170 40, 190 20"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="20" cy="180" r="12" fill="white" stroke="currentColor" strokeWidth="6" />
        <circle cx="120" cy="120" r="12" fill="white" stroke="currentColor" strokeWidth="6" />
        <circle cx="190" cy="20" r="12" fill="white" stroke="currentColor" strokeWidth="6" />
      </svg>

      {/* Top Branding Section */}
      <div className="flex flex-col items-center text-center mt-8">
        <PotheLogo size={80} showText={true} />
        <p className="mt-4 text-sm font-semibold text-slate-800">
          Know your bus before it arrives
        </p>
        <p className="text-sm font-medium text-slate-700 font-bengali">
          বাস আসার আগেই জানুন
        </p>
      </div>

      {/* Language Selection Cards */}
      <div className="my-auto py-8">
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
          {/* English Card */}
          <button
            onClick={() => setSelectedLang('en')}
            className={`h-40 rounded-2xl p-4 flex flex-col items-center justify-center transition-all bg-white relative border-2 ${
              selectedLang === 'en'
                ? 'border-pothe shadow-md scale-[1.02]'
                : 'border-slate-200 shadow-xs hover:border-slate-300'
            }`}
          >
            {selectedLang === 'en' && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-pothe text-white flex items-center justify-center shadow-xs">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            )}
            <span className="text-xl font-extrabold text-slate-900">English</span>
          </button>

          {/* Bengali Card */}
          <button
            onClick={() => setSelectedLang('bn')}
            className={`h-40 rounded-2xl p-4 flex flex-col items-center justify-center transition-all bg-white relative border-2 ${
              selectedLang === 'bn'
                ? 'border-pothe shadow-md scale-[1.02]'
                : 'border-slate-200 shadow-xs hover:border-slate-300'
            }`}
          >
            {selectedLang === 'bn' && (
              <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-pothe text-white flex items-center justify-center shadow-xs">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            )}
            <span className="text-2xl font-extrabold text-slate-900 font-bengali">বাংলা</span>
          </button>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-4 z-10">
        <button
          onClick={handleContinue}
          className="w-full max-w-sm h-14 bg-pothe hover:bg-pothe-dark active:bg-pothe-800 active:scale-[0.99] text-white font-bold rounded-2xl shadow-lg shadow-emerald-900/30 text-base transition-all flex items-center justify-center gap-2"
        >
          <span>Continue</span>
          <span className="font-bengali opacity-90">/ চালিয়ে যান</span>
        </button>

        <button
          onClick={handleGuest}
          className="text-sm font-bold text-slate-800 hover:text-slate-950 py-2 transition-colors flex items-center gap-1.5"
        >
          <span>Continue as guest</span>
          <span className="font-bengali text-slate-700">/ অতিথি হিসেবে দেখুন</span>
        </button>
      </div>
    </div>
  );
};
