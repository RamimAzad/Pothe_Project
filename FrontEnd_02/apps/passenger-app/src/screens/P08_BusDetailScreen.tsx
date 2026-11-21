import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, MapPin, Bus, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { mockBuses, mockEstimatedBuses } from '@pothe/mock-data';

export const P08_BusDetailScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const busId = (location.state as any)?.busId || 'bus-thikana-2345';
  const bus = mockBuses.find((b) => b.id === busId) || mockBuses[0];
  const est = mockEstimatedBuses.find((b) => b.id === busId) || mockEstimatedBuses[0];

  const [alertSet, setAlertSet] = useState(false);

  const handleSetAlert = () => {
    setAlertSet(true);
    setTimeout(() => {
      navigate('/alerts');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col justify-between relative">
      {/* Top Floating Header */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 pt-[max(14px,env(safe-area-inset-top))] pb-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-white/95 shadow-md flex items-center justify-center text-slate-800 hover:bg-slate-100 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="bg-white/95 px-4 py-2 rounded-2xl shadow-md border border-slate-200">
          <h1 className="text-sm font-extrabold text-slate-900 tracking-tight">
            Bus Details <span className="font-bengali font-bold">/ বাসের বিস্তারিত</span>
          </h1>
        </div>
      </div>

      {/* Interactive Map Visualizer (Simulated Canvas / SVG Map) */}
      <div className="h-[48vh] w-full bg-[#E5ECE7] relative overflow-hidden">
        {/* Road Grid lines */}
        <svg className="w-full h-full" viewBox="0 0 400 400" preserveAspectRatio="none">
          {/* Subtle street grid */}
          <path d="M 0 100 L 400 120 M 0 250 L 400 240 M 120 0 L 140 400 M 280 0 L 260 400" stroke="#CCD8D0" strokeWidth="3" />
          <path d="M 50 0 L 350 400 M 0 350 L 400 50" stroke="#D7E2DC" strokeWidth="1.5" />

          {/* Green Route Polyline */}
          <path
            d="M 130 70 L 135 95 L 175 130 L 200 200 L 220 250 L 195 280 L 210 320"
            stroke="#0F7B4F"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Checkpoint Nodes */}
          <circle cx="130" cy="70" r="8" fill="#1E293B" />
          <text x="130" y="74" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">3</text>

          <circle cx="135" cy="95" r="8" fill="#1E293B" />
          <text x="135" y="99" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">2</text>

          <circle cx="175" cy="130" r="8" fill="#1E293B" />
          <text x="175" y="134" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">11</text>

          <circle cx="195" cy="280" r="8" fill="#1E293B" />
          <text x="195" y="284" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">8</text>

          {/* Passenger Current Stop Pin */}
          <g transform="translate(170, 115)">
            <circle cx="10" cy="10" r="6" fill="#2563EB" />
            <path d="M 10 10 L 40 -15" stroke="#1E293B" strokeWidth="1.5" />
            <rect x="42" y="-30" width="85" height="28" rx="6" fill="white" stroke="#CBD5E1" />
            <text x="47" y="-18" fontSize="8" fontWeight="bold" fill="#0F172A">Passenger's</text>
            <text x="47" y="-8" fontSize="8" fontWeight="bold" fill="#0F172A">current stop</text>
          </g>

          {/* Estimated Position with Pulsing Radius */}
          <g transform="translate(230, 190)">
            <circle cx="0" cy="0" r="32" fill="#0F7B4F" fillOpacity="0.12" stroke="#0F7B4F" strokeWidth="1.5" strokeDasharray="4 4" className="animate-pulse" />
            <circle cx="0" cy="0" r="18" fill="white" stroke="#0F7B4F" strokeWidth="2" />
            <rect x="-8" y="-8" width="16" height="16" rx="4" fill="#0F7B4F" />
            <rect x="-5" y="-5" width="10" height="5" rx="1" fill="white" />
            <circle cx="-3" cy="4" r="1.5" fill="white" />
            <circle cx="3" cy="4" r="1.5" fill="white" />

            {/* Label */}
            <text x="38" y="-5" fontSize="9" fontWeight="bold" fill="#0F172A">Estimated position</text>
            <text x="38" y="7" fontSize="8" fontWeight="medium" fill="#64748B">(not live GPS)</text>
          </g>
        </svg>
      </div>

      {/* Bottom Sheet Card Details */}
      <div className="bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 p-5 -mt-6 z-10 flex-1 flex flex-col justify-between">
        <div>
          {/* Drag Handle */}
          <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4" />

          {/* Bus Name & Big ETA */}
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-tight">
                {bus.company}
              </h2>
              <p className="text-xl font-extrabold text-slate-900 tracking-tight mt-0.5">
                {bus.licensePlate}
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                ETA
              </span>
              <span className="text-2xl font-black text-slate-900 leading-none">
                {est.etaMinutes} min
              </span>
              <span className="text-xs font-bold text-slate-600 block font-bengali">
                {est.etaMinutes === 6 ? '৬ মিনিট' : `${est.etaMinutes} মিনিট`}
              </span>
            </div>
          </div>

          {/* Confidence Tag & Freshness */}
          <div className="mt-2.5 flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
              High Confidence ({est.confidenceScore}%)
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-600 mt-1">
            Last seen at Mirpur 11 checkpoint, {est.lastSeenTimeAgo}
          </p>

          {/* Crowd Breakdown */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold text-slate-900">Crowd</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                Moderate Crowd
              </span>
            </div>

            {/* Sitting capacity progress bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-bold text-slate-700">
                <span>Sitting 28/36</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-pothe rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            {/* Standing capacity progress bar */}
            <div className="space-y-1 mt-2">
              <div className="flex justify-between text-[11px] font-bold text-slate-700">
                <span>Standing 14/40</span>
              </div>
              <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '35%' }} />
              </div>
            </div>
          </div>

          {/* Checkpoint Timeline */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-center text-[10px]">
              {/* Stop 1 */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-5 h-5 rounded-full bg-pothe text-white flex items-center justify-center mb-1">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span className="font-bold text-slate-800">Mirpur 12</span>
                <span className="text-emerald-700 font-semibold">passed</span>
              </div>

              <div className="h-0.5 flex-1 bg-pothe -mt-4" />

              {/* Stop 2 */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-5 h-5 rounded-full border-2 border-pothe p-0.5 flex items-center justify-center mb-1">
                  <div className="w-full h-full bg-pothe rounded-full" />
                </div>
                <span className="font-bold text-slate-800">Mirpur 11</span>
                <span className="text-emerald-800 font-semibold">last seen</span>
                <span className="text-slate-500 text-[9px]">10:24 AM</span>
              </div>

              <div className="h-0.5 flex-1 bg-slate-300 -mt-4" />

              {/* Stop 3 */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-4 h-4 rounded-full bg-slate-300 mb-1" />
                <span className="font-bold text-slate-800">Mirpur 10</span>
                <span className="text-slate-500 font-medium">upcoming</span>
                <span className="text-slate-500 text-[9px]">10:28 AM</span>
              </div>

              <div className="h-0.5 flex-1 bg-slate-300 -mt-4" />

              {/* Stop 4 */}
              <div className="flex flex-col items-center flex-1">
                <div className="w-4 h-4 rounded-full bg-slate-300 mb-1" />
                <span className="font-bold text-slate-800">Farmgate</span>
                <span className="text-slate-500 font-medium">upcoming</span>
                <span className="text-slate-500 text-[9px]">10:45 AM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-5 pb-2">
          <button
            onClick={handleSetAlert}
            className={`flex-1 h-12 rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition ${
              alertSet
                ? 'bg-emerald-900 text-white'
                : 'bg-pothe hover:bg-pothe-dark active:bg-pothe-800 text-white shadow-md'
            }`}
          >
            {alertSet ? (
              <span>✓ Alert Subscribed</span>
            ) : (
              <>
                <span>Set Arrival Alert</span>
                <span className="font-bengali opacity-90">/ এলার্ট সেট করুন</span>
              </>
            )}
          </button>

          <button
            onClick={() => navigate('/submit-complaint', { state: { busLicense: bus.licensePlate, against: 'bus' } })}
            className="flex-1 h-12 rounded-full border-2 border-slate-700 text-slate-800 hover:bg-slate-50 font-bold text-xs flex items-center justify-center gap-1.5 transition"
          >
            <span>Report an Issue</span>
            <span className="font-bengali">/ সমস্যা জানান</span>
          </button>
        </div>
      </div>
    </div>
  );
};
