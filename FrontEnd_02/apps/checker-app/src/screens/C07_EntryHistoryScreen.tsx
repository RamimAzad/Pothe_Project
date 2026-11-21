import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Edit2, Cloud, CheckCircle, XCircle } from 'lucide-react';
import { CheckerBottomNav } from '../components/CheckerBottomNav';
import { useChecker } from '../context/CheckerContext';
import { mockCheckerEntries } from '@pothe/mock-data';

export const C07_EntryHistoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const { currentShift } = useChecker();
  const [filter, setFilter] = useState<'today' | 'yesterday' | 'week'>('today');

  const entries = mockCheckerEntries;

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col pb-24">
      {/* Top Green Header Band */}
      <div className="bg-pothe-DEFAULT text-white px-5 pt-[max(16px,env(safe-area-inset-top))] pb-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black tracking-tight">
              My Entries <span className="font-bengali font-bold text-lg">/ আমার এন্ট্রি</span>
            </h1>
            <p className="text-xs font-bold text-emerald-200 mt-0.5">
              Checkpoint: {currentShift.checkpointName}
            </p>
          </div>
          <button className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Date Filter Chips */}
        <div className="flex items-center gap-2 mt-4">
          <button
            onClick={() => setFilter('today')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition ${
              filter === 'today'
                ? 'bg-white text-pothe-DEFAULT shadow-xs'
                : 'bg-emerald-950/40 text-emerald-100 hover:bg-emerald-950/60'
            }`}
          >
            Today (48)
          </button>
          <button
            onClick={() => setFilter('yesterday')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition ${
              filter === 'yesterday'
                ? 'bg-white text-pothe-DEFAULT shadow-xs'
                : 'bg-emerald-950/40 text-emerald-100 hover:bg-emerald-950/60'
            }`}
          >
            Yesterday
          </button>
          <button
            onClick={() => setFilter('week')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition ${
              filter === 'week'
                ? 'bg-white text-pothe-DEFAULT shadow-xs'
                : 'bg-emerald-950/40 text-emerald-100 hover:bg-emerald-950/60'
            }`}
          >
            This Week
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Summary Strip */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center justify-around text-center">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total</span>
            <span className="text-lg font-black text-slate-900">48</span>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Corrected</span>
            <span className="text-lg font-black text-blue-600">2</span>
          </div>
          <div className="w-px h-8 bg-slate-200" />
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Voided</span>
            <span className="text-lg font-black text-slate-400">1</span>
          </div>
        </div>

        {/* Entries List */}
        <div className="space-y-3">
          {entries.map((entry) => {
            const isSaved = entry.status === 'saved';
            const isCorrected = entry.status === 'corrected';
            const isVoided = entry.status === 'voided';
            const isPending = entry.status === 'pending_sync';

            return (
              <div
                key={entry.id}
                className={`bg-white rounded-3xl p-4 border shadow-xs transition ${
                  isPending
                    ? 'border-l-4 border-l-amber-500 border-slate-200'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2
                        className={`text-base font-black ${
                          isVoided ? 'line-through text-slate-400' : 'text-slate-900'
                        }`}
                      >
                        {entry.licensePlate}
                      </h2>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                          isSaved
                            ? 'bg-emerald-100 text-emerald-900'
                            : isCorrected
                            ? 'bg-blue-100 text-blue-900'
                            : isVoided
                            ? 'bg-slate-200 text-slate-600'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {isPending && '☁️ '}
                        {isSaved
                          ? 'Saved'
                          : isCorrected
                          ? 'Corrected'
                          : isVoided
                          ? 'Voided'
                          : 'Pending Sync'}
                      </span>
                    </div>

                    <p
                      className={`text-xs font-bold mt-1 ${
                        isVoided ? 'line-through text-slate-400' : 'text-slate-700'
                      }`}
                    >
                      S: {entry.sittingCount} • St: {entry.standingCount}
                    </p>
                    <p className="text-[11px] font-medium text-slate-500 mt-0.5">
                      {entry.timestamp} • {entry.company.split(' ')[0]}
                    </p>
                  </div>

                  {/* Actions / Status Right */}
                  <div className="text-right">
                    {isSaved && !entry.isLocked ? (
                      <button
                        onClick={() => navigate('/correct-entry', { state: { entry } })}
                        className="px-3 py-1.5 rounded-xl border border-amber-400 bg-amber-50 hover:bg-amber-100 text-amber-950 font-black text-xs flex items-center gap-1 shadow-2xs"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-amber-700" />
                        <span>Edit (3:10)</span>
                      </button>
                    ) : isCorrected ? (
                      <span className="text-xs font-bold text-slate-400">Locked</span>
                    ) : isVoided ? (
                      <span className="text-xs font-bold text-red-500">Cancelled</span>
                    ) : isPending ? (
                      <span className="text-xs font-black text-amber-600">Queued</span>
                    ) : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CheckerBottomNav />
    </div>
  );
};
