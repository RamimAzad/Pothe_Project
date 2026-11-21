import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ArrowUpDown, Bell, Bus as BusIcon, Search } from 'lucide-react';
import { BottomNavBar } from '../components/BottomNavBar';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { mockEstimatedBuses } from '@pothe/mock-data';

export const P05_HomeDestinationSearchScreen: React.FC = () => {
  const navigate = useNavigate();
  const { language, toggleLanguage, t } = useLanguage();
  const { user } = useAuth();

  const [origin, setOrigin] = useState('Mirpur 10');
  const [destination, setDestination] = useState('');

  const userName = user?.name ? user.name.split(' ')[0] : 'Ramim';

  const handleSwap = () => {
    if (destination) {
      const temp = origin;
      setOrigin(destination);
      setDestination(temp);
    }
  };

  const handleFindBuses = () => {
    navigate('/route-results', { state: { origin, destination: destination || 'Motijheel' } });
  };

  const selectRecent = (dest: string) => {
    setDestination(dest);
    navigate('/route-results', { state: { origin, destination: dest } });
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col pb-24">
      {/* Top Header */}
      <div className="px-5 pt-[max(16px,env(safe-area-inset-top))] pb-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
            Good morning, {userName} <span className="text-xl">👋</span>
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-full text-xs font-bold transition-colors"
          >
            {language === 'en' ? 'EN | বাংলা' : 'বাংলা | EN'}
          </button>

          <button
            onClick={() => navigate('/alerts')}
            className="w-9 h-9 rounded-full bg-white border border-slate-300 shadow-xs flex items-center justify-center text-slate-800 relative hover:bg-slate-50 active:bg-slate-100 transition"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>
        </div>
      </div>

      <div className="px-5 space-y-4">
        {/* Pilot Route Banner */}
        <div className="bg-slate-200/90 rounded-xl px-4 py-2 text-center text-xs font-bold text-slate-800 border border-slate-300/60">
          Pilot route: Thikana Paribahan
        </div>

        {/* Main Search Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3.5">
          {/* Origin Input with Live GPS Pin */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                <span>Start Point</span>
                <span className="font-bengali">/ কোথা থেকে</span>
              </label>
              <span className="text-[10px] font-bold text-pothe flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-pothe animate-ping" />
                Live GPS
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5 focus-within:border-pothe focus-within:ring-1 focus-within:ring-pothe">
                <div className="w-3 h-3 rounded-full bg-pothe shrink-0" />
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-full text-sm font-bold text-slate-900 bg-transparent outline-none"
                />
              </div>

              {/* Swap Button */}
              <button
                type="button"
                onClick={handleSwap}
                className="w-11 h-11 rounded-xl bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-pothe flex items-center justify-center border border-slate-300 shrink-0 transition"
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Destination Input */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Where do you want to go?
            </label>
            <div className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 flex items-center gap-2.5 focus-within:border-pothe focus-within:ring-1 focus-within:ring-pothe">
              <Search className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                type="text"
                placeholder="Search destination / গন্তব্য খুঁজুন"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full text-sm font-medium text-slate-900 bg-transparent outline-none placeholder-slate-400 font-bengali"
              />
            </div>
          </div>

          {/* Find Buses CTA */}
          <button
            onClick={handleFindBuses}
            className="w-full h-13 bg-pothe hover:bg-pothe-dark active:bg-pothe-800 active:scale-[0.99] text-white font-bold rounded-2xl shadow-md text-sm transition flex items-center justify-center gap-1.5"
          >
            <span>Find Buses</span>
            <span className="font-bengali opacity-90">/ বাস খুঁজুন</span>
          </button>
        </div>

        {/* Recent Destinations Chips */}
        <div>
          <h2 className="text-sm font-extrabold text-slate-900 mb-2">Recent destinations</h2>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => selectRecent('Farmgate')}
              className="bg-white border border-slate-300 rounded-full px-3.5 py-2 flex items-center gap-1.5 text-xs font-bold text-slate-800 shadow-2xs hover:bg-slate-50 active:bg-slate-100 shrink-0"
            >
              <BusIcon className="w-3.5 h-3.5 text-slate-700" />
              <span>Farmgate</span>
              <span className="font-bengali text-slate-500">ফার্মগেট</span>
            </button>
            <button
              onClick={() => selectRecent('Motijheel')}
              className="bg-white border border-slate-300 rounded-full px-3.5 py-2 flex items-center gap-1.5 text-xs font-bold text-slate-800 shadow-2xs hover:bg-slate-50 active:bg-slate-100 shrink-0"
            >
              <BusIcon className="w-3.5 h-3.5 text-slate-700" />
              <span>Motijheel</span>
              <span className="font-bengali text-slate-500">মতিঝিল</span>
            </button>
            <button
              onClick={() => selectRecent('Shahbag')}
              className="bg-white border border-slate-300 rounded-full px-3.5 py-2 flex items-center gap-1.5 text-xs font-bold text-slate-800 shadow-2xs hover:bg-slate-50 active:bg-slate-100 shrink-0"
            >
              <BusIcon className="w-3.5 h-3.5 text-slate-700" />
              <span>Shahbag</span>
              <span className="font-bengali text-slate-500">শাহবাগ</span>
            </button>
          </div>
        </div>

        {/* Buses Approaching Corridor */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-extrabold text-slate-900">Buses near you</h2>
            <button
              onClick={() => navigate('/buses-behind')}
              className="text-xs font-bold text-pothe hover:underline"
            >
              See all →
            </button>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {mockEstimatedBuses.slice(0, 3).map((bus) => (
              <div
                key={bus.id}
                onClick={() => navigate(`/bus/${bus.id}`)}
                className="w-56 bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs cursor-pointer hover:border-pothe active:bg-slate-50 shrink-0 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">{bus.licensePlate}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pothe-50 text-pothe">
                    ETA {bus.etaMinutes}m
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 font-medium">{bus.company}</p>
                <div className="mt-3 flex items-center justify-between text-[11px] pt-2 border-t border-slate-100">
                  <span className="font-bold text-slate-700">
                    {bus.sittingCount} Sit / {bus.standingCount} Stand
                  </span>
                  <span
                    className={`font-black text-[10px] uppercase ${
                      bus.crowdStatus === 'high'
                        ? 'text-status-red'
                        : bus.crowdStatus === 'medium'
                        ? 'text-status-amber'
                        : 'text-status-green'
                    }`}
                  >
                    {bus.crowdStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};
