import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Bus, CheckCircle, AlertTriangle } from 'lucide-react';
import { BottomNavBar } from '../components/BottomNavBar';
import { useLanguage } from '../context/LanguageContext';
import { mockNotifications, mockRouteSubscriptions } from '@pothe/mock-data';

export const P13_NotificationsAlertsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'notif' | 'routes'>('notif');
  const [subscriptions, setSubscriptions] = useState(mockRouteSubscriptions);

  const toggleSub = (routeId: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.routeId === routeId ? { ...s, isEnabled: !s.isEnabled } : s))
    );
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col pb-24">
      {/* Top Green Header Band */}
      <div className="bg-pothe text-white px-5 pt-[max(16px,env(safe-area-inset-top))] pb-6 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black tracking-tight text-white">Alerts</h1>
            <p className="text-xs font-bold font-bengali text-emerald-100">বিজ্ঞপ্তি ও ট্র্যাকিং সতর্কতা</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center border border-white/20">
            <Bell className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Dual Segment Switcher */}
        <div className="mt-4 bg-black/25 p-1 rounded-2xl flex items-center border border-white/10">
          <button
            onClick={() => setActiveTab('notif')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition text-center ${
              activeTab === 'notif'
                ? 'bg-white text-pothe shadow-xs'
                : 'text-white/90 hover:text-white'
            }`}
          >
            <div>Notifications</div>
            <div className="text-[10px] font-bengali font-semibold">বিজ্ঞপ্তি (3)</div>
          </button>
          <button
            onClick={() => setActiveTab('routes')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition text-center ${
              activeTab === 'routes'
                ? 'bg-white text-pothe shadow-xs'
                : 'text-white/90 hover:text-white'
            }`}
          >
            <div>My Route Alerts</div>
            <div className="text-[10px] font-bengali font-semibold">রুট সাবস্ক্রিপশন</div>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Active Route Alerts Card */}
        <div className="bg-white rounded-3xl p-4 border border-slate-200/90 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold text-slate-900">
              Active Route Alerts <span className="font-bengali">/ সতর্কবার্তা চালু</span>
            </h2>
            <button
              onClick={() => navigate('/route-results')}
              className="text-xs font-bold text-pothe hover:underline"
            >
              + Subscribe
            </button>
          </div>

          <div className="space-y-2.5 pt-1">
            {subscriptions.map((sub) => (
              <div
                key={sub.routeId}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      sub.isEnabled ? 'bg-emerald-500' : 'bg-slate-400'
                    }`}
                  />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{sub.routeName}</h3>
                    <p className="text-[11px] text-slate-500 font-bengali">{sub.routeNameBn}</p>
                  </div>
                </div>

                {/* Custom Toggle Switch */}
                <button
                  onClick={() => toggleSub(sub.routeId)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    sub.isEnabled ? 'bg-pothe' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      sub.isEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div>
          <h2 className="text-xs font-extrabold text-slate-500 tracking-wider uppercase mb-2 px-1">
            Recent Activity <span className="font-bengali">/ সাম্প্রতিক তথ্য</span>
          </h2>

          <div className="space-y-3">
            {mockNotifications.map((notif) => {
              const isBus = notif.type === 'bus_approaching';
              const isComplaint = notif.type === 'complaint_resolved';
              const isTraffic = notif.type === 'traffic_delay';

              return (
                <div
                  key={notif.id}
                  onClick={() => {
                    if (notif.busId) navigate('/bus-detail', { state: { busId: notif.busId } });
                    if (notif.complaintId) navigate('/complaints');
                  }}
                  className={`bg-white rounded-3xl p-4 border shadow-xs cursor-pointer active:scale-[0.99] transition ${
                    isBus
                      ? 'border-l-4 border-l-emerald-600 border-slate-200'
                      : isComplaint
                      ? 'border-l-4 border-l-blue-600 border-slate-200'
                      : 'border-l-4 border-l-amber-500 border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                        isBus
                          ? 'bg-emerald-100 text-emerald-800'
                          : isComplaint
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {isBus && <Bus className="w-5 h-5" />}
                      {isComplaint && <CheckCircle className="w-5 h-5" />}
                      {isTraffic && <AlertTriangle className="w-5 h-5" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-extrabold text-slate-900 truncate">
                          {notif.title}
                        </h3>
                        <div className="flex items-center gap-1.5 shrink-0">
                          {notif.etaPill && (
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                                isBus ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {notif.etaPill}
                            </span>
                          )}
                          {isComplaint && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800">
                              Resolved
                            </span>
                          )}
                          {notif.isUnread && (
                            <span className="w-2 h-2 rounded-full bg-blue-600" />
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 font-medium mt-1 leading-snug">
                        {notif.message}
                      </p>

                      <p className="text-[10px] font-semibold text-slate-400 mt-2">
                        {notif.timeAgo} • <span className="font-bengali">{notif.timeAgoBn}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNavBar />
    </div>
  );
};
