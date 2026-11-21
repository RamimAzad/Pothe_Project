import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Check, Clock, AlertOctagon } from 'lucide-react';
import { CheckerBottomNav } from '../components/CheckerBottomNav';
import { useChecker } from '../context/CheckerContext';

export const C05_EntrySubmittedSuccessScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentShift } = useChecker();

  const entry = (location.state as any)?.entry || {
    id: 'entry-demo',
    licensePlate: 'DM-11-2345',
    company: 'Thikana Paribahan',
    sittingCount: 28,
    standingCount: 14,
    timestamp: '10:42:18 AM',
  };

  const [secondsRemaining, setSecondsRemaining] = useState(272); // 4m 32s

  useEffect(() => {
    if (secondsRemaining > 0) {
      const timer = setInterval(() => setSecondsRemaining((s) => s - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [secondsRemaining]);

  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const timeFormatted = `0${mins}:${secs < 10 ? `0${secs}` : secs} min`;

  const handleCorrect = () => {
    navigate('/correct-entry', { state: { entry } });
  };

  const handleVoid = () => {
    if (window.confirm('Void this entry? Audit log will record this cancellation.')) {
      navigate('/history');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col justify-between pb-24">
      <div className="p-5 flex-1 flex flex-col items-center justify-center">
        {/* Animated Green Checkmark */}
        <div className="w-24 h-24 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-xl shadow-emerald-500/30 mb-5 animate-bounce">
          <Check className="w-14 h-14 stroke-[3.5]" />
        </div>

        <h1 className="text-3xl font-black text-slate-900 tracking-tight text-center">
          Entry Saved!
        </h1>
        <p className="text-sm font-extrabold text-pothe-DEFAULT font-bengali text-center mt-1">
          এন্ট্রি সফলভাবে সংরক্ষিত হয়েছে
        </p>

        {/* Summary Card */}
        <div className="w-full max-w-sm bg-white rounded-3xl p-5 border border-slate-200 shadow-sm mt-6 space-y-3.5">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500">
              Bus ID <span className="font-bengali">/ বাস নং</span>
            </span>
            <span className="text-sm font-black text-slate-900">
              {entry.licensePlate} ({entry.company.split(' ')[0]})
            </span>
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500">Passenger Count</span>
            <span className="text-sm font-black text-pothe-DEFAULT">
              Sitting: {entry.sittingCount} • Standing: {entry.standingCount}
            </span>
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500">Checkpoint</span>
            <span className="text-xs font-bold text-slate-900">
              {currentShift.checkpointName} ({currentShift.checkpointNameBn})
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Timestamp</span>
            <span className="text-xs font-bold text-slate-900">{entry.timestamp}</span>
          </div>
        </div>

        {/* 5-Min Countdown Action Box */}
        <div className="w-full max-w-sm bg-amber-50/80 rounded-3xl p-4 border-2 border-amber-300 shadow-xs mt-4 space-y-3 text-center">
          <div className="flex items-center justify-center gap-2 text-xs font-black text-amber-950">
            <span>⏳ Editable for next:</span>
            <span className="px-2 py-0.5 rounded-md bg-amber-200 text-amber-950 font-black">
              {timeFormatted}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleCorrect}
              className="py-2.5 rounded-xl border-2 border-slate-700 bg-white text-xs font-black text-slate-800 hover:bg-slate-50 transition"
            >
              <span>Correct</span> <span className="font-bengali">/ সংশোধন</span>
            </button>
            <button
              onClick={handleVoid}
              className="py-2.5 rounded-xl border-2 border-red-500 bg-white text-xs font-black text-red-600 hover:bg-red-50 transition"
            >
              <span>Void</span> <span className="font-bengali">/ বাতিল</span>
            </button>
          </div>
        </div>

        {/* Giant Next Bus CTA */}
        <div className="w-full max-w-sm mt-5 space-y-3">
          <button
            onClick={() => navigate('/select-bus')}
            className="w-full h-15 bg-pothe-DEFAULT hover:bg-pothe-dark active:scale-[0.99] text-white rounded-2xl font-black text-base shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition"
          >
            <span>Next Bus</span>
            <span className="font-bengali opacity-90">/ পরবর্তী বাস ➔</span>
          </button>

          <button
            onClick={() => navigate('/shift')}
            className="w-full text-center text-xs font-bold text-slate-600 hover:text-slate-900 py-1 underline"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <CheckerBottomNav />
    </div>
  );
};
