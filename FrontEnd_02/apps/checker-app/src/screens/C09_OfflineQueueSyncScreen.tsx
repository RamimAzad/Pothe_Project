import React, { useState } from 'react';
import { CloudOff, RefreshCw, CheckCircle, Clock } from 'lucide-react';
import { CheckerBottomNav } from '../components/CheckerBottomNav';
import { useChecker } from '../context/CheckerContext';
import { mockQueuedOfflineEntries, MockCheckerService } from '@pothe/mock-data';

export const C09_OfflineQueueSyncScreen: React.FC = () => {
  const { isOnline, setIsOnline, refreshCounts } = useChecker();
  const [queued, setQueued] = useState(mockQueuedOfflineEntries);
  const [syncing, setSyncing] = useState(false);
  const [syncedSuccess, setSyncedSuccess] = useState(false);

  const handleSync = async () => {
    setSyncing(true);
    await MockCheckerService.syncOfflineQueue();
    setTimeout(() => {
      setSyncing(false);
      setQueued([]);
      setSyncedSuccess(true);
      setIsOnline(true);
      refreshCounts();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col pb-24">
      {/* Top Amber Offline Banner */}
      <div className="bg-amber-500 text-slate-950 px-5 pt-[max(16px,env(safe-area-inset-top))] pb-5 shadow-sm">
        <div className="flex items-start gap-3">
          <CloudOff className="w-8 h-8 shrink-0 mt-0.5" />
          <div>
            <h1 className="text-xl font-black tracking-tight leading-tight">
              You Are Offline <span className="font-bengali text-lg">/ অফলাইন মোড চালু রয়েছে</span>
            </h1>
            <p className="text-xs font-bold mt-1.5 leading-snug text-amber-950">
              Entries are saved locally on this device. They will be submitted automatically with original timestamp when signal returns.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Local Storage Queue Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm text-center space-y-1">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">
            LOCAL STORAGE QUEUE
          </span>
          <div className="text-4xl font-black text-amber-500 pt-1">
            {queued.length} entries waiting
          </div>
          <span className="text-xs font-bold text-slate-500 font-bengali block">
            {queued.length}টি এন্ট্রি সিঙ্কের অপেক্ষায়
          </span>
        </div>

        {/* Sync Action Button */}
        <div>
          <button
            onClick={handleSync}
            disabled={syncing || queued.length === 0}
            className={`w-full h-15 rounded-2xl font-black text-xs flex items-center justify-center gap-2 shadow-xs transition ${
              queued.length === 0
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-slate-300 hover:bg-slate-400 text-slate-800'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
            <span>
              {syncing
                ? 'Syncing Entries...'
                : queued.length === 0
                ? 'All Entries Synced'
                : 'Sync Now / এখনই সিঙ্ক করুন (Waiting for network)'}
            </span>
          </button>
          <p className="text-center text-[11px] font-bold text-slate-500 mt-2">
            Last synced successfully at 10:12 AM
          </p>
        </div>

        {/* Queued Records List */}
        <div>
          <h2 className="text-xs font-black text-slate-800 px-1 mb-2">
            Queued Records <span className="font-bengali text-slate-500 font-bold">/ পেন্ডিং রেকর্ডসমূহ</span>
          </h2>

          <div className="space-y-2.5">
            {queued.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-4 border border-amber-300 shadow-xs flex items-center justify-between"
              >
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    {item.licensePlate} ({item.company.split(' ')[0]})
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 mt-0.5">
                    S: {item.sittingCount} • St: {item.standingCount} • Original time: {item.timestamp}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-black">
                  Waiting
                </span>
              </div>
            ))}

            {queued.length === 0 && (
              <div className="bg-emerald-50 rounded-2xl p-6 text-center border border-emerald-200">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                <p className="text-xs font-black text-emerald-900">
                  Local queue is completely clear!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <CheckerBottomNav />
    </div>
  );
};
