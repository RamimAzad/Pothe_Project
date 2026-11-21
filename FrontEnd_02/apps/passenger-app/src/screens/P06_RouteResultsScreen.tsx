import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Edit2, Bus } from 'lucide-react';
import { BottomNavBar } from '../components/BottomNavBar';
import { useLanguage } from '../context/LanguageContext';
import { mockRoutes } from '@pothe/mock-data';

export const P06_RouteResultsScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const origin = (location.state as any)?.origin || 'Mirpur 10';
  const destination = (location.state as any)?.destination || 'Motijheel';

  const [filter, setFilter] = useState<'best' | 'traffic' | 'distance'>('best');

  const handleViewBuses = (routeId: string) => {
    navigate('/buses-behind', { state: { routeId, origin, destination } });
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col pb-24">
      {/* Top Header */}
      <div className="bg-white border-b border-slate-200 px-5 pt-[max(14px,env(safe-area-inset-top))] pb-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 -ml-1.5 rounded-xl hover:bg-slate-100 text-slate-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="text-center flex-1 mx-2">
            <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
              {origin} → {destination}
            </h1>
            <p className="text-xs font-semibold text-slate-500 font-bengali">
              মিরপুর ১০ → মতিঝিল
            </p>
          </div>
          <button
            onClick={() => navigate('/home')}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-700"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilter('best')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
              filter === 'best'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Best match
          </button>
          <button
            onClick={() => setFilter('traffic')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
              filter === 'traffic'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Least traffic
          </button>
          <button
            onClick={() => setFilter('distance')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
              filter === 'distance'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Shortest distance
          </button>
        </div>
      </div>

      {/* Route Cards List */}
      <div className="p-4 space-y-4 flex-1">
        {mockRoutes.map((route) => {
          const isRec = route.isRecommended;

          return (
            <div
              key={route.id}
              className={`bg-white rounded-3xl p-4 transition-all shadow-xs ${
                isRec
                  ? 'border-2 border-pothe relative shadow-sm'
                  : 'border border-slate-200'
              }`}
            >
              {isRec && (
                <div className="inline-block bg-pothe text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md mb-2.5">
                  <span>Recommended</span>
                  <span className="font-bengali opacity-90"> / প্রস্তাবিত</span>
                </div>
              )}

              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pothe-50 border border-pothe flex items-center justify-center text-pothe shrink-0">
                    <Bus className="w-5 h-5 stroke-[2.2]" />
                  </div>
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900 leading-tight">
                      {route.name}
                    </h2>
                    <p className="text-xs text-slate-600 font-medium mt-0.5 font-bengali">
                      {route.viaBn}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs font-bold text-slate-700">
                <span>
                  {route.distanceKm} km • {route.durationMin} min
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                    route.trafficLevel === 'light'
                      ? 'bg-emerald-100 text-emerald-900'
                      : route.trafficLevel === 'moderate'
                      ? 'bg-amber-100 text-amber-900'
                      : 'bg-red-100 text-red-900'
                  }`}
                >
                  {route.trafficLevel === 'light'
                    ? 'Light Traffic'
                    : route.trafficLevel === 'moderate'
                    ? 'Moderate Traffic'
                    : 'Heavy Traffic'}
                </span>
              </div>

              <div className="mt-2 text-xs font-semibold text-slate-700">
                {route.busesBehindCount} {route.busesBehindCount === 1 ? 'bus' : 'buses'} behind you
              </div>

              <div className="mt-3.5">
                <button
                  onClick={() => handleViewBuses(route.id)}
                  className={`w-full h-11 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                    isRec
                      ? 'bg-pothe hover:bg-pothe-dark active:bg-pothe-800 text-white shadow-xs'
                      : 'border-2 border-pothe text-pothe hover:bg-pothe-50 active:bg-pothe-100 font-extrabold'
                  }`}
                >
                  <span>View Buses</span>
                  <span className="font-bengali opacity-90">/ বাস দেখুন</span>
                </button>
              </div>
            </div>
          );
        })}

        <p className="text-center text-xs font-semibold text-slate-500 pt-2">
          Ranked by distance and live traffic
        </p>
      </div>

      <BottomNavBar />
    </div>
  );
};
