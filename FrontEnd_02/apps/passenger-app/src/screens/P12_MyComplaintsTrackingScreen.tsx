import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Plus, CheckCircle2, Clock } from 'lucide-react';
import { BottomNavBar } from '../components/BottomNavBar';
import { useLanguage } from '../context/LanguageContext';
import { mockComplaints } from '@pothe/mock-data';

export const P12_MyComplaintsTrackingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'in_review' | 'resolved'>('all');
  const [expandedId, setExpandedId] = useState<string>('C-1042');

  const filtered =
    activeTab === 'all'
      ? mockComplaints
      : mockComplaints.filter((c) => c.status === activeTab);

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col pb-24 relative">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-5 pt-[max(16px,env(safe-area-inset-top))] pb-3 shadow-2xs">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-black text-slate-900 tracking-tight">
            My Complaints <span className="font-bengali font-bold text-base">/ আমার অভিযোগ</span>
          </h1>
          <button className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-700">
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: `All (${mockComplaints.length})` },
            { id: 'open', label: 'Open (1)' },
            { id: 'in_review', label: 'In Review (1)' },
            { id: 'resolved', label: 'Resolved (2)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition shrink-0 ${
                activeTab === tab.id
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Complaints List */}
      <div className="p-4 space-y-4 flex-1">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs space-y-3 cursor-pointer"
              onClick={() => setExpandedId(isExpanded ? '' : item.id)}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-extrabold text-slate-500">#{item.id}</span>
                  <h2 className="text-sm font-extrabold text-slate-900 mt-0.5">{item.category}</h2>
                  <p className="text-xs font-semibold text-slate-600 mt-0.5">{item.targetName}</p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold text-slate-500 block">
                    {item.createdAt}
                  </span>
                  <span
                    className={`mt-1 inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      item.status === 'resolved'
                        ? 'bg-emerald-600 text-white'
                        : item.status === 'in_review'
                        ? 'bg-amber-500 text-white'
                        : 'bg-slate-700 text-white'
                    }`}
                  >
                    {item.status === 'resolved'
                      ? 'Resolved'
                      : item.status === 'in_review'
                      ? 'In Review'
                      : 'Open'}
                  </span>
                </div>
              </div>

              {/* Expanded Timeline Tracker (As seen in Reference C-1042) */}
              {isExpanded && (
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <div className="pl-2 space-y-4 relative">
                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-emerald-600" />

                    {item.timeline.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-start gap-3 relative z-10">
                        <div
                          className={`w-3 h-3 rounded-full mt-0.5 ring-4 ring-white shrink-0 ${
                            step.isCompleted ? 'bg-emerald-600' : 'bg-slate-300'
                          }`}
                        />
                        <div className="flex-1 -mt-0.5">
                          <p className="text-xs font-extrabold text-slate-900">{step.title}</p>
                          <p className="text-[10px] font-semibold text-slate-500">{step.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Resolution Speech Bubble */}
                  {item.resolutionNote && (
                    <div className="bg-slate-100 rounded-2xl rounded-tl-none p-3.5 text-xs text-slate-800 leading-relaxed border border-slate-200/80 mt-2">
                      {item.resolutionNote}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Floating Action Button (+ New Complaint) */}
      <div className="fixed bottom-22 right-5 z-30">
        <button
          onClick={() => navigate('/submit-complaint')}
          className="h-12 px-5 bg-pothe hover:bg-pothe-dark active:bg-pothe-800 active:scale-[0.98] text-white rounded-full font-bold text-xs shadow-xl flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Complaint</span>
        </button>
      </div>

      <BottomNavBar />
    </div>
  );
};
