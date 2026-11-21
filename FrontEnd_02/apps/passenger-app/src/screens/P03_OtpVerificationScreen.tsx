import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, RefreshCw, Delete } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const P03_OtpVerificationScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const phone = (location.state as { phone?: string })?.phone || '1712-345678';

  const [digits, setDigits] = useState(['5', '8', '2', '', '', '']); // Matches mockup with partially filled digits
  const [activeIdx, setActiveIdx] = useState(3);

  const handleKeyPress = (num: string) => {
    if (activeIdx < 6) {
      const newDigits = [...digits];
      newDigits[activeIdx] = num;
      setDigits(newDigits);
      setActiveIdx(activeIdx + 1);
    }
  };

  const handleBackspace = () => {
    if (activeIdx > 0) {
      const newDigits = [...digits];
      const targetIdx = activeIdx === 6 || !newDigits[activeIdx] ? activeIdx - 1 : activeIdx;
      newDigits[targetIdx] = '';
      setDigits(newDigits);
      setActiveIdx(targetIdx);
    }
  };

  const handleVerify = async () => {
    await login('+880 ' + phone, '1234');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col justify-between">
      {/* Top Green Header Band (Crisp High-Contrast Brand Teal) */}
      <div className="bg-pothe text-white px-5 pt-[max(16px,env(safe-area-inset-top))] pb-5 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 -ml-1.5 rounded-xl hover:bg-black/15 active:bg-black/25 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-base font-extrabold tracking-tight text-white">
            Verify your phone <span className="font-bengali font-bold text-emerald-100">/ ফোন যাচাই করুন</span>
          </h1>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center px-6 pt-8 pb-4">
        <div className="w-14 h-14 rounded-2xl bg-pothe-50 border border-pothe-200 text-pothe flex items-center justify-center mb-4 shadow-xs">
          <ShieldCheck className="w-8 h-8 stroke-[2.2]" />
        </div>

        <h2 className="text-xl font-black text-slate-900 tracking-tight text-center">
          Enter 6-digit Code <span className="font-bengali font-bold block text-base text-slate-700 mt-0.5">৬-সংখ্যার কোড দিন</span>
        </h2>
        <p className="text-xs text-slate-600 mt-2 text-center max-w-xs font-medium">
          Sent via SMS to <span className="font-bold text-slate-900">+880 {phone}</span>
        </p>

        {/* 6 OTP Boxes */}
        <div className="flex items-center gap-2.5 mt-8">
          {digits.map((digit, idx) => (
            <div
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`w-11 h-14 rounded-xl bg-white flex items-center justify-center text-xl font-black transition-all cursor-pointer border-2 shadow-xs ${
                activeIdx === idx
                  ? 'border-pothe ring-2 ring-pothe/20 text-slate-900 scale-105'
                  : digit
                  ? 'border-slate-300 text-slate-900'
                  : 'border-slate-200 text-slate-400'
              }`}
            >
              {digit || (activeIdx === idx ? <span className="w-2 h-0.5 bg-pothe animate-pulse" /> : '')}
            </div>
          ))}
        </div>

        {/* Resend OTP Row */}
        <div className="flex items-center gap-2 mt-5 text-xs">
          <span className="text-slate-600 font-medium">Didn't get code?</span>
          <button
            onClick={() => setDigits(['7', '2', '9', '4', '1', '5'])}
            className="text-pothe font-extrabold flex items-center gap-1 hover:underline"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Resend OTP (30s)</span>
          </button>
        </div>

        {/* Quick Demo Fill Pill */}
        <button
          onClick={() => {
            setDigits(['1', '2', '3', '4', '5', '6']);
            setActiveIdx(6);
          }}
          className="mt-4 px-3 py-1 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-bold transition-colors"
        >
          Auto-fill Demo Code (123456)
        </button>

        {/* Verify CTA Button */}
        <button
          onClick={handleVerify}
          className="w-full max-w-sm h-13 bg-pothe hover:bg-pothe-dark active:bg-pothe-800 active:scale-[0.99] text-white font-bold rounded-2xl shadow-md text-sm transition-all flex items-center justify-center gap-1.5 mt-5"
        >
          <span>Verify & Continue</span>
          <span className="font-bengali opacity-90">/ যাচাই করুন</span>
        </button>

        <button
          onClick={() => navigate('/login')}
          className="text-xs font-bold text-slate-700 underline mt-3 hover:text-slate-900"
        >
          Change phone number
        </button>
      </div>

      {/* Numerical Keypad */}
      <div className="bg-slate-200/90 border-t border-slate-300/80 p-4 pb-[max(16px,env(safe-area-inset-bottom))] shadow-inner">
        <div className="max-w-xs mx-auto grid grid-cols-3 gap-2.5">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((n) => (
            <button
              key={n}
              onClick={() => handleKeyPress(n)}
              className="h-12 bg-white rounded-xl shadow-xs text-lg font-bold text-slate-900 hover:bg-slate-50 active:bg-slate-200 transition flex items-center justify-center"
            >
              {n}
            </button>
          ))}
          <div className="h-12 flex items-center justify-center" />
          <button
            onClick={() => handleKeyPress('0')}
            className="h-12 bg-white rounded-xl shadow-xs text-lg font-bold text-slate-900 hover:bg-slate-50 active:bg-slate-200 transition flex items-center justify-center"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="h-12 bg-white rounded-xl shadow-xs text-slate-800 hover:bg-slate-50 active:bg-slate-200 transition flex items-center justify-center"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
