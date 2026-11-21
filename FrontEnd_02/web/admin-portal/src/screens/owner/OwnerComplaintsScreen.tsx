import React, { useState } from 'react';
import {
  AlertTriangle,
  Send,
  CheckCircle,
  FileText,
  Clock,
  Bus,
  Search,
} from 'lucide-react';
import { mockComplaints, Complaint } from '@pothe/mock-data';
import { useAuth } from '../../context/AuthContext';

export const OwnerComplaintsScreen: React.FC = () => {
  const { user } = useAuth();
  const company = user?.company || 'Thikana Paribahan';

  // Filter complaints related to this company or general fleet complaints
  const [complaints, setComplaints] = useState<Complaint[]>(() =>
    mockComplaints.filter(
      (c) =>
        c.targetName.toLowerCase().includes('thikana') ||
        (c.busLicensePlate && c.busLicensePlate.includes('11-2345')) ||
        c.complaintAgainst === 'bus_staff' ||
        c.complaintAgainst === 'bus'
    )
  );

  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(complaints[0] || null);
  const [responseText, setResponseText] = useState('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const handleSendResponse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedComplaint || !responseText.trim()) return;

    setComplaints((prev) =>
      prev.map((c) =>
        c.id === selectedComplaint.id ? { ...c, status: 'resolved' } : c
      )
    );
    if (selectedComplaint) {
      setSelectedComplaint({ ...selectedComplaint, status: 'resolved' });
    }

    setActionSuccess(
      `Official operator response submitted for ${selectedComplaint.id}. Forwarded to DTCA Authority.`
    );
    setResponseText('');
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
          Fleet Grievance Management & Resolution
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Review public complaints filed against {company} drivers and bus staff, and submit official redressal
        </p>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-status-green/10 border border-status-green/30 rounded-lg text-xs text-status-green font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Main Split: Complaints targeting company vs Response Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Complaints List (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
          <div className="p-4 border-b border-neutral-200 bg-neutral-50/50 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-neutral-900 text-sm">Grievances Involving {company}</h3>
              <p className="text-xs text-neutral-500">Citizen reports verified via ticket transaction IDs</p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700">
              {complaints.length} Records
            </span>
          </div>

          <div className="divide-y divide-neutral-100">
            {complaints.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedComplaint(c)}
                className={`p-4 hover:bg-neutral-50/70 transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                  selectedComplaint?.id === c.id ? 'bg-pothe-50/50 border-l-4 border-pothe-600' : ''
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-neutral-900">{c.id}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full font-semibold uppercase bg-neutral-100 text-neutral-700">
                      {c.complaintAgainst.replace('_', ' ')}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.2 rounded-full font-bold uppercase ${
                        c.status === 'open'
                          ? 'bg-status-red/10 text-status-red'
                          : c.status === 'in_review'
                          ? 'bg-status-amber/10 text-status-amber'
                          : 'bg-status-green/10 text-status-green'
                      }`}
                    >
                      {c.status.replace('_', ' ')}
                    </span>
                  </div>

                  <p className="font-semibold text-xs text-neutral-800 mt-1">{c.category}</p>
                  <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">{c.description}</p>
                  <p className="text-[10px] text-neutral-400 mt-1">Reported on: {c.createdAt}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-semibold text-neutral-700 block">
                    {c.busLicensePlate || c.targetName}
                  </span>
                  <span className="text-[10px] text-pothe-700 font-semibold mt-1 inline-block">
                    Draft Response →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Response & Disciplinary Action Form (1 Col) */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          {selectedComplaint ? (
            <div className="space-y-4">
              <div className="pb-3 border-b border-neutral-100">
                <span className="text-[10px] font-bold uppercase text-neutral-400">Response Docket</span>
                <h3 className="font-bold text-neutral-900 text-sm mt-0.5">{selectedComplaint.id}</h3>
                <p className="text-xs text-neutral-600 font-medium mt-1">{selectedComplaint.category}</p>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400 block">Passenger Statement</label>
                <p className="text-xs text-neutral-700 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 leading-relaxed mt-1">
                  "{selectedComplaint.description}"
                </p>
              </div>

              {selectedComplaint.busLicensePlate && (
                <div>
                  <label className="text-[10px] font-bold uppercase text-neutral-400 block">Involved Vehicle</label>
                  <p className="text-xs font-bold text-neutral-900 mt-0.5">{selectedComplaint.busLicensePlate}</p>
                </div>
              )}

              <form onSubmit={handleSendResponse} className="space-y-3 pt-3 border-t border-neutral-100">
                <div>
                  <label className="text-xs font-bold text-neutral-800 block mb-1">
                    Operator Official Response & Action Taken
                  </label>
                  <textarea
                    rows={4}
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="E.g., Conductor cautioned for overcharging; fare difference refunded to passenger. Driver Abdul Karim issued warning letter..."
                    className="w-full p-2.5 rounded-lg border border-neutral-300 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-pothe-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!responseText.trim()}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-pothe-700 hover:bg-pothe-800 text-white font-bold text-xs transition-colors shadow-xs disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Redressal to DTCA</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center py-12 text-neutral-400 text-xs">
              Select a complaint to inspect and submit official response.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
