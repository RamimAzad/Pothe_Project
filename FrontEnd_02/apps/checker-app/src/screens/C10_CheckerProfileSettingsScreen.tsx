import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, LogOut, PhoneCall } from 'lucide-react';
import { CheckerBottomNav } from '../components/CheckerBottomNav';
import { useChecker } from '../context/CheckerContext';

export const C10_CheckerProfileSettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    largeTextMode,
    setLargeTextMode,
    language,
    toggleLanguage,
    currentShift,
    pendingSyncCount,
  } = useChecker();

  const handleLogout = () => {
    if (pendingSyncCount > 0) {
      alert(`You have ${pendingSyncCount} unsynced entries! Please sync before logging out.`);
      return;
    }
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col pb-24">
      {/* Top Green Header Bar (High-Contrast Core Teal) */}
      <div className="bg-pothe text-white px-5 pt-[max(16px,env(safe-area-inset-top))] pb-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-black tracking-tight text-white">Checker Profile</h1>
          <span className="px-3 py-0.5 rounded-full bg-black/25 text-emerald-100 text-xs font-black border border-white/20">
            Active Shift
          </span>
        </div>

        {/* Identity Row */}
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-white text-pothe font-black text-xl flex items-center justify-center shadow-md">
            RU
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white">{user.name}</h2>
              <span className="px-2 py-0.5 rounded-md bg-black/25 text-white text-[10px] font-black border border-white/20">
                ID: #CHK-8801
              </span>
            </div>
            <p className="text-xs text-white/95 font-medium mt-0.5">{user.phone}</p>
            <p className="text-[11px] text-emerald-100 font-bold mt-0.5">
              Assigned by Dhaka Bus Association
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Shift Details Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500">
              Assigned Stop <span className="font-bengali">/ চেকপয়েন্ট</span>
            </span>
            <span className="text-xs font-black text-slate-900">
              {currentShift.checkpointName} ({currentShift.checkpointNameBn})
            </span>
          </div>

          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500">Authorized Route</span>
            <span className="text-xs font-black text-slate-900">{currentShift.route}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Current Shift</span>
            <span className="text-xs font-black text-pothe-DEFAULT">
              {currentShift.shiftHours} (Morning)
            </span>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {/* Large Text Mode Toggle (Direct Sunlight Legibility) */}
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black text-slate-900">
                Large Text Mode <span className="font-bengali">/ বড় হরফ</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Enhanced legibility for direct sunlight
              </p>
            </div>

            <button
              onClick={() => setLargeTextMode(!largeTextMode)}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                largeTextMode ? 'bg-pothe-DEFAULT' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  largeTextMode ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Language Picker */}
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black text-slate-900">
                Language <span className="font-bengali">/ ভাষা</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">English & বাংলা</p>
            </div>

            <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              <button
                onClick={toggleLanguage}
                className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                  language === 'en' ? 'bg-pothe-DEFAULT text-white' : 'text-slate-600'
                }`}
              >
                EN
              </button>
              <button
                onClick={toggleLanguage}
                className={`px-3 py-1 rounded-lg text-xs font-black transition ${
                  language === 'bn' ? 'bg-pothe-DEFAULT text-white' : 'text-slate-600'
                }`}
              >
                বাং
              </button>
            </div>
          </div>

          {/* Change PIN / Password */}
          <button
            onClick={() => navigate('/login')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 transition"
          >
            <div>
              <h3 className="text-xs font-black text-slate-900">Change PIN / Password</h3>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Help / Contact Admin */}
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black text-slate-900">Help / Contact Admin</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Call Dispatch Support: 16216</p>
            </div>
            <PhoneCall className="w-4 h-4 text-pothe-DEFAULT" />
          </div>
        </div>

        {/* Safe Logout Check Confirmation */}
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-3.5 flex items-center gap-2.5 text-xs text-emerald-950 font-black">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>✓ You have {pendingSyncCount} unsynced entries. Safe to log out.</span>
        </div>

        {/* Log Out CTA Button */}
        <button
          onClick={handleLogout}
          className="w-full h-13 border-2 border-red-500 rounded-2xl text-xs font-black text-red-600 hover:bg-red-50 active:bg-red-100 transition flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
          <span className="font-bengali">/ লগআউট</span>
        </button>
      </div>

      <CheckerBottomNav />
    </div>
  );
};
