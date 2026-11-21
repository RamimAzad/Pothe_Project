import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Clock, RefreshCw, User } from 'lucide-react';
import { useChecker } from '../context/CheckerContext';

export const CheckerBottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, pendingSyncCount } = useChecker();

  const tabs = [
    {
      id: 'entry',
      path: '/shift',
      alternatePaths: ['/select-bus', '/enter-counts', '/entry-success', '/geofence-error'],
      labelEn: 'Entry',
      labelBn: 'নতুন এন্ট্রি',
      icon: Plus,
    },
    {
      id: 'history',
      path: '/history',
      alternatePaths: ['/correct-entry'],
      labelEn: 'History',
      labelBn: 'ইতিহাস',
      icon: Clock,
    },
    {
      id: 'sync',
      path: '/sync',
      labelEn: 'Sync',
      labelBn: 'সিঙ্ক',
      icon: RefreshCw,
      badge: pendingSyncCount > 0 ? pendingSyncCount : undefined,
    },
    {
      id: 'profile',
      path: '/profile',
      labelEn: 'Profile',
      labelBn: 'প্রোফাইল',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-200 z-40 px-3 pt-2 pb-[max(12px,env(safe-area-inset-bottom))] shadow-xl">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive =
            location.pathname === tab.path ||
            Boolean(tab.alternatePaths && tab.alternatePaths.some((p) => location.pathname.startsWith(p)));
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative min-h-[48px] ${
                isActive ? 'text-pothe font-black' : 'text-slate-600 hover:text-slate-900 font-bold'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all relative ${
                  isActive ? 'bg-pothe-50 text-pothe font-black scale-105' : 'hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-6 h-6 stroke-[2.2]`} />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-600 text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-0.5 tracking-tight font-bengali ${isActive ? 'font-black text-pothe' : 'font-semibold text-slate-700'}`}>
                {language === 'bn' ? tab.labelBn : tab.labelEn}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
