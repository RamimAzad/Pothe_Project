import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Info } from 'lucide-react';
import { BottomNavBar } from '../components/BottomNavBar';
import { useLanguage } from '../context/LanguageContext';

interface StopCrowdData {
  name: string;
  sitting: number;
  standing: number;
  timeAgo: string;
  level: 'low' | 'medium' | 'high';
  isCurrentStop?: boolean;
}

export const P09_RouteCrowdLevelScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [direction, setDirection] = useState<'up' | 'down'>('up');

  const stops: StopCrowdData[] = [
    { name: 'Mirpur 14', sitting: 22, standing: 4, timeAgo: '2 min ago', level: 'low' },
    { name: 'Mirpur 10', sitting: 34, standing: 16, timeAgo: '3 min ago', level: 'medium' },
    { name: 'Kazipara', sitting: 36, standing: 28, timeAgo: '1 min ago', level: 'high' },
    {
      name: 'Farmgate',
      sitting: 36,
      standing: 32,
      timeAgo: 'Just now',
      level: 'high',
      isCurrentStop: true,
    },
    { name: 'Shahbag', sitting: 30, standing: 12, timeAgo: '5 min ago', level: 'medium' },
    { name: 'Motijheel', sitting: 18, standing: 2, timeAgo: '8 min ago', level: 'low' },
  ];

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col pb-24">
      {/* Green Header Band */}
      <div className="bg-pothe text-white px-5 pt-[max(16px,env(safe-area-inset-top))] pb-5 shadow-md">
        <h1 className="text-lg font-black tracking-tight text-center text-white">
          Route Crowd Level <span className="font-bengali font-bold text-emerald-100">/ রুটের ভিড়</span>
        </h1>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Route Dropdown Selector */}
        <div className="bg-white rounded-2xl border border-slate-300 px-4 py-3 flex items-center justify-between shadow-2xs">
          <span className="text-sm font-bold text-slate-800">
            Route 7: Mirpur 12 to Motijheel
          </span>
          <ChevronDown className="w-5 h-5 text-slate-600" />
        </div>

        {/* Direction Switcher (Up / Down) */}
        <div className="bg-slate-200/90 p-1 rounded-full flex items-center">
          <button
            onClick={() => setDirection('up')}
            className={`flex-1 py-2 rounded-full text-xs font-extrabold transition ${
              direction === 'up'
                ? 'bg-pothe text-white shadow-xs'
                : 'text-slate-800 hover:text-slate-950'
            }`}
          >
            <span>Up</span> <span className="font-bengali">/ আপ</span>
          </button>
          <button
            onClick={() => setDirection('down')}
            className={`flex-1 py-2 rounded-full text-xs font-extrabold transition ${
              direction === 'down'
                ? 'bg-pothe text-white shadow-xs'
                : 'text-slate-800 hover:text-slate-950'
            }`}
          >
            <span>Down</span> <span className="font-bengali">/ ডাউন</span>
          </button>
        </div>

        {/* Vertical Checkpoint Timeline */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs relative">
          {/* Vertical connecting line */}
          <div className="absolute left-[33px] top-7 bottom-7 w-0.5 bg-slate-200" />

          <div className="space-y-6 relative">
            {stops.map((stop, idx) => {
              const dotColor =
                stop.level === 'low'
                  ? 'bg-emerald-500'
                  : stop.level === 'medium'
                  ? 'bg-amber-500'
                  : 'bg-red-500';

              return (
                <div key={idx} className="flex items-start gap-4">
                  {/* Status Dot */}
                  <div className="relative z-10 mt-1">
                    {stop.isCurrentStop ? (
                      <div className="w-5 h-5 rounded-full border-2 border-blue-600 p-0.5 flex items-center justify-center bg-white">
                        <div className={`w-full h-full rounded-full ${dotColor}`} />
                      </div>
                    ) : (
                      <div className={`w-3.5 h-3.5 rounded-full ${dotColor} ring-4 ring-white`} />
                    )}
                  </div>

                  {/* Stop Details */}
                  <div
                    className={`flex-1 ${
                      stop.isCurrentStop
                        ? 'bg-blue-50/70 -m-2 p-2.5 rounded-2xl border border-blue-200'
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-extrabold text-slate-900">{stop.name}</h3>
                        {stop.isCurrentStop && (
                          <span className="bg-blue-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full">
                            Your Current Stop <span className="font-bengali">/ আপনার বর্তমান স্টপ</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">{stop.timeAgo}</span>
                    </div>

                    <p className="text-xs font-semibold text-slate-600 mt-0.5">
                      Sitting {stop.sitting} • Standing {stop.standing}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-around bg-white rounded-2xl p-3 border border-slate-200/80 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Low (&lt;60%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span>Medium (60-90%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500" />
            <span>High (&gt;90%)</span>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-slate-200/60 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
          <Info className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
          <p>
            Crowd level shows the passengers counted at checkpoints.{' '}
            <span className="font-bengali block mt-0.5">
              চেকপয়েন্টে গণনাকৃত যাত্রীর সংখ্যা অনুযায়ী ভিড়ের তথ্য।
            </span>
          </p>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};
