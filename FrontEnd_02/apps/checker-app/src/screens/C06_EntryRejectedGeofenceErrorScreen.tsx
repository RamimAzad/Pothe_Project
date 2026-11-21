import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, AlertTriangle, Check, X, RefreshCw } from 'lucide-react';
import { CheckerBottomNav } from '../components/CheckerBottomNav';
import { useChecker } from '../context/CheckerContext';

export const C06_EntryRejectedGeofenceErrorScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentShift, setIsInsideGeofence } = useChecker();
  const [retrying, setRetrying] = useState(false);

  const handleRetryLocation = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      setIsInsideGeofence(true); // reset to inside
      navigate('/shift');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col justify-between pb-24">
      {/* Red Alert Header */}
      <div className="bg-red-600 text-white px-5 pt-[max(16px,env(safe-area-inset-top))] pb-5 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight">Entry Not Accepted</h1>
            <p className="text-xs font-bold font-bengali opacity-95">এন্ট্রি গ্রহণ করা হয়নি</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Geofence Restriction Failed Card */}
        <div className="bg-white rounded-3xl p-5 border-2 border-red-300 shadow-sm space-y-4">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-black text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Geofence Restriction Failed</span>
            </div>
            <p className="text-xs font-bold text-slate-700 mt-2 leading-relaxed">
              You are outside the <span className="font-black text-slate-900">{currentShift.checkpointName}</span>{' '}
              checkpoint area (about <span className="text-red-600 font-black">240 m away</span>).
            </p>
          </div>

          {/* Schematic Circular Geofence Diagram */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 relative h-48 flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 300 160">
              {/* Road line */}
              <line x1="20" y1="60" x2="280" y2="120" stroke="#A7F3D0" strokeWidth="8" strokeLinecap="round" />

              {/* Geofence circle */}
              <circle
                cx="140"
                cy="85"
                r="45"
                fill="#ECFDF5"
                stroke="#0F7B4F"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <circle cx="140" cy="85" r="5" fill="#0F7B4F" />
              <text x="140" y="32" textAnchor="middle" fill="#0F7B4F" fontSize="10" fontWeight="bold">
                Mirpur 10 Geofence
              </text>

              {/* User Out of Bounds Point */}
              <circle cx="230" cy="110" r="7" fill="#2563EB" stroke="white" strokeWidth="2" />
              <text x="230" y="130" textAnchor="middle" fill="#2563EB" fontSize="10" fontWeight="bold">
                You (240m)
              </text>
            </svg>
          </div>
        </div>

        {/* Validation Checklist Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Additional Validation Checks:
          </h2>

          <div className="space-y-2.5 text-xs font-bold">
            <div className="flex items-center gap-2.5 text-emerald-700">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Passenger counts are whole numbers</span>
            </div>

            <div className="flex items-center gap-2.5 text-red-600">
              <X className="w-4 h-4 stroke-[3]" />
              <span>Checker GPS coordinate out-of-bounds</span>
            </div>

            <div className="flex items-center gap-2.5 text-emerald-700">
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Standing count within bus threshold</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={handleRetryLocation}
            disabled={retrying}
            className="w-full h-15 bg-pothe-DEFAULT hover:bg-pothe-dark active:scale-[0.99] text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition"
          >
            <RefreshCw className={`w-4 h-4 ${retrying ? 'animate-spin' : ''}`} />
            <span>Retry Location Check</span>
            <span className="font-bengali opacity-90">/ অবস্থান পুনরায় যাচাই</span>
          </button>

          <button
            onClick={() => navigate('/shift')}
            className="w-full h-13 border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-800 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <span>Back</span>
            <span className="font-bengali">/ ফিরে যান</span>
          </button>
        </div>
      </div>

      <CheckerBottomNav />
    </div>
  );
};
