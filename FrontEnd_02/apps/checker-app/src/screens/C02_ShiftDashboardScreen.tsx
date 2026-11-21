import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Check, Wifi, AlertCircle } from 'lucide-react';
import { CheckerBottomNav } from '../components/CheckerBottomNav';
import { useChecker } from '../context/CheckerContext';
import { mockCheckerEntries } from '@pothe/mock-data';

export const C02_ShiftDashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const { user, isOnline, isInsideGeofence, pendingSyncCount, currentShift } = useChecker();

  const recentLogs = mockCheckerEntries.slice(0, 2);

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col pb-24">
      {/* Top Green Duty Header Band (High Contrast Core Teal) */}
      <div className="bg-pothe text-white px-5 pt-[max(16px,env(safe-area-inset-top))] pb-6 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black tracking-wider text-emerald-100 uppercase">
              CHECKER DUTY <span className="font-bengali">/ চেকার ডিউটি</span>
            </span>
            <h1 className="text-2xl font-black tracking-tight mt-0.5 text-white">{user.name}</h1>
          </div>
          <span className="px-3 py-1 rounded-full bg-black/25 text-white font-black text-xs border border-white/25">
            #CHK-8801
          </span>
        </div>

        {/* Shift Card */}
        <div className="bg-black/25 rounded-3xl p-4 mt-4 border border-white/20 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-emerald-200 block">
                Checkpoint <span className="font-bengali">/ চেকপয়েন্ট</span>
              </span>
              <p className="text-base font-black text-white mt-0.5">
                {currentShift.checkpointName} ({currentShift.checkpointNameBn})
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-emerald-300 block">
                Route <span className="font-bengali">/ রুট</span>
              </span>
              <p className="text-sm font-extrabold text-white mt-0.5">{currentShift.route}</p>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-emerald-200 mb-1.5">
              <span>Shift: {currentShift.shiftHours}</span>
              <span>{currentShift.progressPercent}% completed</span>
            </div>
            <div className="w-full h-2 bg-emerald-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full"
                style={{ width: `${currentShift.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Status Chips Strip */}
        <div className="grid grid-cols-3 gap-2.5 mt-4">
          {/* Location Chip */}
          <div className="bg-emerald-900/80 rounded-2xl p-2.5 text-center border border-emerald-700/60">
            <span className="text-[10px] font-bold text-emerald-300 block">Location</span>
            <span className="text-xs font-black text-emerald-100 flex items-center justify-center gap-1 mt-0.5">
              {isInsideGeofence ? 'Inside ✓' : 'Outside ✕'}
            </span>
          </div>

          {/* Network Chip */}
          <div className="bg-emerald-900/80 rounded-2xl p-2.5 text-center border border-emerald-700/60">
            <span className="text-[10px] font-bold text-emerald-300 block">Network</span>
            <span className="text-xs font-black text-emerald-100 flex items-center justify-center gap-1 mt-0.5">
              {isOnline ? 'Online 🟢' : 'Offline 🟠'}
            </span>
          </div>

          {/* Pending Sync Chip */}
          <div className="bg-emerald-900/80 rounded-2xl p-2.5 text-center border border-emerald-700/60">
            <span className="text-[10px] font-bold text-emerald-300 block">Pending Sync</span>
            <span className="text-sm font-black text-white mt-0.5 block">{pendingSyncCount}</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-3.5">
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs text-center">
            <span className="text-xs font-bold text-slate-500">Entries Today</span>
            <span className="text-3xl font-black text-pothe-DEFAULT block mt-1">48</span>
            <span className="text-[10px] font-bold text-slate-400 font-bengali">মোট এন্ট্রি</span>
          </div>

          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs text-center">
            <span className="text-xs font-bold text-slate-500">Last Bus Count</span>
            <span className="text-3xl font-black text-slate-900 block mt-1">2 min</span>
            <span className="text-[10px] font-bold text-slate-400 font-bengali">সর্বশেষ এন্ট্রি</span>
          </div>
        </div>

        {/* Giant 80px CTA Button (+ New Bus Entry) */}
        <button
          onClick={() => navigate('/select-bus')}
          className="w-full h-20 bg-pothe-DEFAULT hover:bg-pothe-dark active:scale-[0.99] text-white rounded-3xl shadow-xl shadow-emerald-900/30 flex items-center justify-center gap-4 transition px-4"
        >
          <div className="w-12 h-12 rounded-full bg-white text-pothe-DEFAULT flex items-center justify-center shrink-0 shadow-md">
            <Plus className="w-8 h-8 stroke-[3]" />
          </div>
          <div className="text-left">
            <div className="text-xl font-black leading-tight tracking-tight">+ New Bus Entry</div>
            <div className="text-xs font-bold text-emerald-100 font-bengali">
              নতুন বাস এন্ট্রি ও যাত্রী গণনা
            </div>
          </div>
        </button>

        {/* Recent Logs Section */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className="text-xs font-extrabold text-slate-800">
              Recent Logs <span className="font-bengali text-slate-500 font-bold">/ সাম্প্রতিক এন্ট্রি</span>
            </h2>
            <button
              onClick={() => navigate('/history')}
              className="text-xs font-black text-pothe-DEFAULT hover:underline"
            >
              View History
            </button>
          </div>

          <div className="space-y-2.5">
            {recentLogs.map((log) => (
              <div
                key={log.id}
                className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs flex items-center justify-between"
              >
                <div>
                  <h3 className="text-xs font-black text-slate-900">
                    {log.licensePlate} ({log.company.split(' ')[0]})
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-500 mt-0.5">
                    {log.timestamp} • {currentShift.checkpointName}
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-full text-xs font-black">
                  S: {log.sittingCount} • St: {log.standingCount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CheckerBottomNav />
    </div>
  );
};
