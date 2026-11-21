import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle2, Bus as BusIcon, AlertCircle } from 'lucide-react';
import { CheckerBottomNav } from '../components/CheckerBottomNav';
import { useChecker } from '../context/CheckerContext';
import { mockBuses } from '@pothe/mock-data';

export const C03_SelectBusIdScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentShift } = useChecker();

  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [search, setSearch] = useState('');
  const [selectedBusId, setSelectedBusId] = useState('bus-thikana-2345');

  const filteredBuses = mockBuses.filter((b) =>
    b.licensePlate.toLowerCase().includes(search.toLowerCase()) ||
    b.company.toLowerCase().includes(search.toLowerCase())
  );

  const handleNext = () => {
    navigate('/enter-counts', { state: { busId: selectedBusId, direction } });
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col pb-24">
      {/* Top Green Header Bar */}
      <div className="bg-pothe-DEFAULT text-white px-5 pt-[max(16px,env(safe-area-inset-top))] pb-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tight">
            Select Bus <span className="font-bengali font-bold text-lg">/ বাস নির্বাচন</span>
          </h1>
          <span className="px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs">
            Step 1 of 3
          </span>
        </div>

        {/* Direction Switcher (Up / Down) */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={() => setDirection('up')}
            className={`py-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
              direction === 'up'
                ? 'bg-white text-pothe-DEFAULT shadow-md'
                : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-900'
            }`}
          >
            <span>Up Direction ↓</span>
            <span className="font-bengali font-bold">(উর্ধ্বগামী)</span>
          </button>
          <button
            onClick={() => setDirection('down')}
            className={`py-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
              direction === 'down'
                ? 'bg-white text-pothe-DEFAULT shadow-md'
                : 'bg-emerald-900/60 text-emerald-100 hover:bg-emerald-900'
            }`}
          >
            <span>Down Direction ↑</span>
            <span className="font-bengali font-bold">(নিম্নগামী)</span>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3.5 flex-1">
        {/* Search Input */}
        <div className="bg-white rounded-2xl border border-slate-300 px-4 py-3 flex items-center gap-2.5 shadow-xs focus-within:border-pothe-DEFAULT">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Type bus number (e.g. 2345)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-sm font-bold text-slate-900 outline-none bg-transparent placeholder-slate-400"
          />
        </div>

        <p className="text-xs font-black text-slate-700 px-1">
          Registered buses on {currentShift.route} route:
        </p>

        {/* Bus List Tiles */}
        <div className="space-y-3">
          {filteredBuses.map((bus) => {
            const isSelected = selectedBusId === bus.id;
            const isPassedRecent = bus.licensePlate === 'DM-11-8921';

            return (
              <div
                key={bus.id}
                onClick={() => setSelectedBusId(bus.id)}
                className={`bg-white rounded-2xl p-4 transition-all cursor-pointer shadow-xs min-h-[72px] flex items-center justify-between border-2 ${
                  isSelected
                    ? 'border-pothe-DEFAULT bg-emerald-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      isSelected
                        ? 'bg-pothe-DEFAULT text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isSelected ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <BusIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-black text-slate-900">{bus.licensePlate}</h2>
                      {isPassedRecent && (
                        <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-black">
                          Passed 5m ago!
                        </span>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {bus.company} • <span className="font-bengali">{bus.companyBn}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded-md text-[10px] font-black inline-block">
                    {direction === 'up' ? 'Up ↓' : 'Down ↑'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 block mt-1">
                    Cap: {bus.totalCapacity}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Giant Next CTA */}
        <div className="pt-2">
          <button
            onClick={handleNext}
            className="w-full h-15 bg-pothe-DEFAULT hover:bg-pothe-dark active:scale-[0.99] text-white rounded-2xl font-black text-base shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2 transition"
          >
            <span>Next: Enter Counts</span>
            <span className="font-bengali opacity-90">/ পরবর্তী ➔</span>
          </button>
        </div>
      </div>

      <CheckerBottomNav />
    </div>
  );
};
