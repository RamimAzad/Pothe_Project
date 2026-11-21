import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Map, RefreshCw, AlertTriangle } from 'lucide-react';
import { BottomNavBar } from '../components/BottomNavBar';
import { useLanguage } from '../context/LanguageContext';
import { mockEstimatedBuses } from '@pothe/mock-data';

export const P07_BusesBehindMeScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdatedSec, setLastUpdatedSec] = useState(20);

  const mostLikelyBuses = mockEstimatedBuses.filter((b) => b.probabilityTier === 'most_likely');
  const lessLikelyBuses = mockEstimatedBuses.filter((b) => b.probabilityTier === 'less_likely');

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setLastUpdatedSec(5);
    }, 600);
  };

  const handleBusClick = (busId: string) => {
    navigate('/bus-detail', { state: { busId } });
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col pb-24">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-5 pt-[max(14px,env(safe-area-inset-top))] pb-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate(-1)}
              className="p-1.5 -ml-1.5 rounded-xl hover:bg-slate-100 text-slate-800"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
                Buses Behind Me <span className="font-bengali font-bold text-sm">/ আমার পেছনের বাস</span>
              </h1>
            </div>
          </div>

          <button
            onClick={() => navigate('/bus-detail')}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-800 transition shadow-2xs"
            aria-label="Map View"
          >
            <Map className="w-4 h-4" />
          </button>
        </div>

        {/* Route Context Banner */}
        <div className="mt-3 bg-slate-100 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700">
          Route: Mirpur 10 → Motijheel • Your stop: Kazipara
        </div>

        {/* Freshness Indicator */}
        <div className="mt-2 flex items-center justify-between">
          <button
            onClick={handleRefresh}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200/80 text-[11px] font-bold text-slate-700 hover:bg-slate-300 transition"
          >
            <span>Updated {lastUpdatedSec}s ago</span>
            <RefreshCw className={`w-3 h-3 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Probability Tiers */}
      <div className="p-4 space-y-5 flex-1">
        {/* Tier 1: Most Likely (High Probability) */}
        <div className="rounded-3xl bg-emerald-100/70 p-3 space-y-3 border border-emerald-200">
          <div className="px-1 text-xs font-extrabold text-emerald-950 flex items-center gap-1">
            <span>Most Likely</span>
            <span className="font-bengali">/ সম্ভাব্য (High Probability)</span>
          </div>

          {mostLikelyBuses.map((bus) => (
            <div
              key={bus.id}
              onClick={() => handleBusClick(bus.id)}
              className="bg-white rounded-2xl p-4 shadow-xs border border-emerald-600/30 cursor-pointer active:scale-[0.99] transition hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">{bus.licensePlate}</h2>
                  <p className="text-xs font-semibold text-slate-500">{bus.company}</p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    bus.crowdStatus === 'low' || bus.crowdStatus === 'medium'
                      ? 'bg-emerald-900 text-emerald-100'
                      : 'bg-amber-500 text-white'
                  }`}
                >
                  {bus.crowdStatus === 'high' ? 'Standing only' : 'High Match'}
                </span>
              </div>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">{bus.etaMinutes} min</span>
              </div>

              <div className="mt-1 text-xs text-slate-600 font-medium">
                Last seen: {bus.lastSeenCheckpoint} • {bus.lastSeenTimeAgo}
              </div>

              {/* Crowd Progress Bar */}
              <div className="mt-3 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-bold">
                  Seats available
                </span>
                <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tier 2: Less Likely (Uncertain) */}
        <div className="rounded-3xl bg-amber-100/70 p-3 space-y-3 border border-amber-200">
          <div className="px-1 text-xs font-extrabold text-amber-950 flex items-center gap-1">
            <span>Less Likely</span>
            <span className="font-bengali">/ কম সম্ভাব্য (Uncertain)</span>
          </div>

          {lessLikelyBuses.map((bus) => (
            <div
              key={bus.id}
              onClick={() => handleBusClick(bus.id)}
              className="bg-white rounded-2xl p-4 shadow-xs border border-amber-300 cursor-pointer active:scale-[0.99] transition hover:shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-sm font-extrabold text-slate-900">{bus.licensePlate}</h2>
                  <p className="text-xs font-semibold text-slate-500">{bus.company}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold">
                  Low Match
                </span>
              </div>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">ETA {bus.etaMinutes} min</span>
              </div>

              {bus.missingAtLastCheckpoint && (
                <div className="mt-2 flex items-center gap-1.5 text-xs font-bold text-amber-700">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Not seen at last checkpoint</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};
