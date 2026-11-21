import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Minus, Plus, ChevronDown, AlertTriangle, ArrowLeft } from 'lucide-react';
import { CheckerBottomNav } from '../components/CheckerBottomNav';
import { MockCheckerService } from '@pothe/mock-data';

export const C08_CorrectOrVoidEntryScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const entry = (location.state as any)?.entry || {
    id: 'entry-101',
    licensePlate: 'DM-11-2345',
    company: 'Thikana Paribahan',
    sittingCount: 28,
    standingCount: 14,
    timestamp: '10:42 AM',
  };

  const [sitting, setSitting] = useState(30);
  const [standing, setStanding] = useState(12);
  const [reason, setReason] = useState('Typing mistake / টাইপিং ভুল');
  const [secondsLeft, setSecondsLeft] = useState(190);

  useEffect(() => {
    if (secondsLeft > 0) {
      const timer = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [secondsLeft]);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeFormatted = `0${mins}:${secs < 10 ? `0${secs}` : secs} Left`;

  const handleSaveCorrection = async () => {
    await MockCheckerService.correctEntry(entry.id, sitting, standing, reason);
    navigate('/history');
  };

  const handleVoidEntry = async () => {
    if (window.confirm('Are you sure you want to void this entry?')) {
      await MockCheckerService.voidEntry(entry.id);
      navigate('/history');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col pb-24">
      {/* Top Green Header Bar */}
      <div className="bg-pothe-DEFAULT text-white px-5 pt-[max(16px,env(safe-area-inset-top))] pb-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate(-1)}
              className="p-1 -ml-1 rounded-xl hover:bg-white/10 text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-black tracking-tight">
              Correct Entry <span className="font-bengali font-bold">/ এন্ট্রি সংশোধন</span>
            </h1>
          </div>
          <span className="px-3 py-1 rounded-full bg-red-600 text-white font-black text-xs shadow-xs animate-pulse">
            {timeFormatted}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Original Record Card */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">
            ORIGINAL RECORD:
          </span>
          <h2 className="text-base font-black text-slate-900 mt-1">
            {entry.licensePlate} ({entry.company})
          </h2>
          <p className="text-xs font-semibold text-slate-600 mt-0.5">
            Initial Count: Sitting {entry.sittingCount} • Standing {entry.standingCount} ({entry.timestamp})
          </p>
        </div>

        {/* Adjust Counts Card */}
        <div className="bg-white rounded-3xl p-5 border-2 border-pothe-DEFAULT shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-900">
              Adjust Counts <span className="font-bengali">/ সংখ্যা পরিবর্তন:</span>
            </span>
            <span className="text-[10px] font-extrabold text-pothe-DEFAULT bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Highlighted
            </span>
          </div>

          {/* Sitting adjustment */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-black text-slate-800">
              Sitting <span className="font-bengali text-slate-500">/ বসা:</span>
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSitting(Math.max(0, sitting - 1))}
                className="w-10 h-10 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-800 active:bg-slate-100 font-black shadow-2xs"
              >
                <Minus className="w-5 h-5 stroke-[2.5]" />
              </button>
              <span className="w-10 text-center text-2xl font-black text-pothe-DEFAULT">
                {sitting}
              </span>
              <button
                onClick={() => setSitting(sitting + 1)}
                className="w-10 h-10 rounded-xl bg-pothe-DEFAULT text-white flex items-center justify-center active:bg-pothe-dark font-black shadow-xs"
              >
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Standing adjustment */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-xs font-black text-slate-800">
              Standing <span className="font-bengali text-slate-500">/ দাঁড়ানো:</span>
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setStanding(Math.max(0, standing - 1))}
                className="w-10 h-10 rounded-xl bg-white border border-slate-300 flex items-center justify-center text-slate-800 active:bg-slate-100 font-black shadow-2xs"
              >
                <Minus className="w-5 h-5 stroke-[2.5]" />
              </button>
              <span className="w-10 text-center text-2xl font-black text-amber-500">
                {standing}
              </span>
              <button
                onClick={() => setStanding(standing + 1)}
                className="w-10 h-10 rounded-xl bg-pothe-DEFAULT text-white flex items-center justify-center active:bg-pothe-dark font-black shadow-xs"
              >
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Reason for Correction Dropdown */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-1.5">
          <label className="text-xs font-black text-slate-800 block">
            Reason for Correction *
          </label>
          <div className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900">{reason}</span>
            <ChevronDown className="w-4 h-4 text-slate-600" />
          </div>
        </div>

        {/* Void Warning Box */}
        <div className="bg-red-50/70 border border-dashed border-red-400 rounded-3xl p-4 text-center space-y-1">
          <h3 className="text-xs font-black text-red-700">
            Void Entry? <span className="font-bengali">/ এই এন্ট্রি বাতিল করবেন?</span>
          </h3>
          <p className="text-[11px] font-medium text-slate-600">
            This cannot be undone. Audit log will record this action.
          </p>
        </div>

        {/* Dual Actions */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleSaveCorrection}
            className="h-14 bg-pothe-DEFAULT hover:bg-pothe-dark active:scale-[0.99] text-white rounded-2xl font-black text-xs shadow-md transition flex items-center justify-center"
          >
            Save Correction
          </button>
          <button
            onClick={handleVoidEntry}
            className="h-14 border-2 border-red-500 bg-white hover:bg-red-50 active:scale-[0.99] text-red-600 rounded-2xl font-black text-xs transition flex items-center justify-center"
          >
            <span>Void Entry</span> <span className="font-bengali opacity-90 ml-1">/ বাতিল</span>
          </button>
        </div>

        <p className="text-center text-[10px] font-semibold text-slate-400 pt-2">
          All changes are digitally logged with checker ID & GPS timestamp.
        </p>
      </div>

      <CheckerBottomNav />
    </div>
  );
};
