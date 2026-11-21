import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, Bell, MessageSquare, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const BottomNavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const tabs = [
    {
      id: 'home',
      labelEn: 'Home',
      labelBn: 'হোম',
      path: '/home',
      icon: Home,
    },
    {
      id: 'buses',
      labelEn: 'Buses',
      labelBn: 'বাস সমূহ',
      path: '/buses-behind',
      icon: Compass,
      alternatePaths: ['/route-results', '/bus/', '/crowd-levels'],
    },
    {
      id: 'alerts',
      labelEn: 'Alerts',
      labelBn: 'অ্যালার্ট',
      path: '/alerts',
      icon: Bell,
    },
    {
      id: 'complaints',
      labelEn: 'Complaints',
      labelBn: 'অভিযোগ',
      path: '/complaints',
      icon: MessageSquare,
      alternatePaths: ['/submit-complaint'],
    },
    {
      id: 'profile',
      labelEn: 'Profile',
      labelBn: 'প্রোফাইল',
      path: '/profile',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 z-40 px-3 pt-2 pb-[max(10px,env(safe-area-inset-bottom))] shadow-lg">
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
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors relative ${
                isActive ? 'text-pothe font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isActive && (
                <span className="absolute -top-2 w-8 h-1 bg-pothe rounded-full" />
              )}
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive ? 'bg-pothe-50 text-pothe scale-110' : 'hover:bg-slate-100'
                }`}
              >
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight font-bengali ${isActive ? 'font-black text-pothe' : 'font-semibold text-slate-700'}`}>
                {t(tab.labelEn, tab.labelBn)}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
