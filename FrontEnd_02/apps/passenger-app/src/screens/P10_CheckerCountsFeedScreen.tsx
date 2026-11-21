import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, RefreshCw, CheckCircle2, Armchair, PersonStanding } from 'lucide-react';
import { BottomNavBar } from '../components/BottomNavBar';
import { useLanguage } from '../context/LanguageContext';
import { mockCheckerEntries } from '@pothe/mock-data';

export const P10_CheckerCountsFeedScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleReportInaccurate = (busLicense: string) => {
    navigate('/submit-complaint', {
      state: {
        against: 'checker',
        category: 'Inaccurate Count',
        busLicense,
      },
    });
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-5 pt-[max(16px,env(safe-area-inset-top))] pb-3 shadow-2xs">
        <h1 className="text-lg font-black text-slate-900 tracking-tight">
          Checker Counts <span className="font-bengali font-bold text-base">/ চেকারের গণনা</span>
        </h1>

        {/* Route Selector */}
        <div className="mt-3 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 flex items-center justify-between">
          <div className="text-xs font-bold text-slate-800">
            <span className="text-slate-500 block text-[10px]">Route</span>
            Route 7: Mirpur 12 – Motijheel
          </div>
          <ChevronDown className="w-4 h-4 text-slate-600" />
        </div>
      </div>

      {/* Pull to refresh icon */}
      <div className="flex justify-center -my-3 z-10">
        <div className="w-8 h-8 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center text-slate-600">
          <RefreshCw className="w-4 h-4" />
        </div>
      </div>

      {/* Feed Cards */}
      <div className="p-4 space-y-4 flex-1">
        {mockCheckerEntries
          .filter((e) => e.status !== 'voided' && e.status !== 'pending_sync')
          .map((entry) => {
            const isHigh = entry.sittingCount + entry.standingCount > 40;
            const isLow = entry.standingCount === 0;

            return (
              <div
                key={entry.id}
                className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-xs space-y-3"
              >
                {/* Header row */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-sm font-extrabold text-slate-900">
                      {entry.checkpointName}
                    </h2>
                    <p className="text-xs font-bold text-slate-700 mt-0.5">
                      Bus {entry.company} {entry.licensePlate}
                    </p>
                  </div>
                  <span className="text-xs font-extrabold text-slate-700">{entry.timestamp}</span>
                </div>

                {/* Verified by Checker Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Verified by checker</span>
                  <span className="font-bengali">/ চেকার যাচাইকৃত</span>
                </div>

                {/* Sitting & Standing Count Tiles */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-2xl p-3 flex items-center gap-3 border border-slate-100">
                    <div className="p-2 bg-white rounded-xl text-slate-800 shadow-2xs">
                      <Armchair className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 block">Sitting</span>
                      <span className="text-xl font-black text-slate-900">{entry.sittingCount}</span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-3 flex items-center gap-3 border border-slate-100">
                    <div className="p-2 bg-white rounded-xl text-slate-800 shadow-2xs">
                      <PersonStanding className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 block">Standing</span>
                      <span className="text-xl font-black text-slate-900">{entry.standingCount}</span>
                    </div>
                  </div>
                </div>

                {/* Crowd Level Badge */}
                <div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                      isHigh
                        ? 'bg-red-500 text-white'
                        : isLow
                        ? 'bg-emerald-600 text-white'
                        : 'bg-amber-400 text-slate-900'
                    }`}
                  >
                    {isHigh ? 'High Crowd' : isLow ? 'Low' : 'Moderate'}
                  </span>
                </div>

                {/* Report inaccurate count link */}
                <div className="pt-2 border-t border-slate-100 text-center">
                  <button
                    onClick={() => handleReportInaccurate(entry.licensePlate)}
                    className="text-xs font-bold text-slate-700 hover:text-red-700 transition"
                  >
                    Report inaccurate count{' '}
                    <span className="font-bengali font-semibold text-slate-500">
                      / ভুল গণনা রিপোর্ট করুন
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      <BottomNavBar />
    </div>
  );
};
