import React, { useState } from 'react';
import {
  AlertTriangle,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Eye,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { mockComplaints, Complaint } from '@pothe/mock-data';

export const GovComplaintsScreen: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const filtered = complaints.filter((c) => {
    const matchesStatus = filterStatus === 'all' || c.status === filterStatus;
    const matchesSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.targetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.busLicensePlate && c.busLicensePlate.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatus = (id: string, newStatus: 'in_review' | 'resolved') => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    setActionSuccess(`Complaint ${id} status updated to ${newStatus.replace('_', ' ').toUpperCase()}`);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
          Public Complaints & Citizen Grievance Redressal
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Oversight of passenger submissions concerning fare extortion, checker accuracy, and reckless driving
        </p>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-status-green/10 border border-status-green/30 rounded-lg text-xs text-status-green font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Complaint Categories Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-neutral-200">
          <span className="text-xs font-semibold uppercase text-neutral-500">Total Grievances</span>
          <p className="text-2xl font-bold text-neutral-900 mt-1">{complaints.length}</p>
          <span className="text-[11px] text-neutral-400">All registered complaints</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200">
          <span className="text-xs font-semibold uppercase text-status-red">Pending Review</span>
          <p className="text-2xl font-bold text-status-red mt-1">
            {complaints.filter((c) => c.status === 'open').length}
          </p>
          <span className="text-[11px] text-neutral-400">Requires authority inquiry</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200">
          <span className="text-xs font-semibold uppercase text-status-amber">Under Investigation</span>
          <p className="text-2xl font-bold text-status-amber mt-1">
            {complaints.filter((c) => c.status === 'in_review').length}
          </p>
          <span className="text-[11px] text-neutral-400">Owner responses requested</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-neutral-200">
          <span className="text-xs font-semibold uppercase text-status-green">Resolved & Closed</span>
          <p className="text-2xl font-bold text-status-green mt-1">
            {complaints.filter((c) => c.status === 'resolved').length}
          </p>
          <span className="text-[11px] text-neutral-400">With penalties or warnings</span>
        </div>
      </div>

      {/* Main Complaints List & Inspector Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table List (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
          {/* Filter Bar */}
          <div className="p-4 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/50">
            <div className="flex items-center gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs bg-white font-medium text-neutral-800"
              >
                <option value="all">All Statuses</option>
                <option value="open">Open</option>
                <option value="in_review">In Review</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search complaint..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-3 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-900 bg-white placeholder-neutral-400 focus:outline-hidden focus:border-pothe-500 w-48 sm:w-60"
              />
            </div>
          </div>

          <div className="divide-y divide-neutral-100">
            {filtered.map((c) => (
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
                  <p className="text-[10px] text-neutral-400 mt-1">Filed on: {c.createdAt}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-semibold text-neutral-700 block">
                    {c.busLicensePlate || c.targetName}
                  </span>
                  <span className="text-[10px] text-pothe-700 hover:underline font-semibold mt-1 inline-block">
                    Review Details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Complaint Detail Inspector (1 Col) */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between">
          {selectedComplaint ? (
            <div className="space-y-4">
              <div className="pb-3 border-b border-neutral-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase text-neutral-400">Inquiry Docket</span>
                  <h3 className="font-bold text-neutral-900 text-sm">{selectedComplaint.id}</h3>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    selectedComplaint.status === 'open'
                      ? 'bg-status-red/10 text-status-red'
                      : selectedComplaint.status === 'in_review'
                      ? 'bg-status-amber/10 text-status-amber'
                      : 'bg-status-green/10 text-status-green'
                  }`}
                >
                  {selectedComplaint.status.replace('_', ' ')}
                </span>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400 block">Category</label>
                <p className="text-xs font-semibold text-neutral-900">{selectedComplaint.category}</p>
                <p className="text-[11px] text-neutral-500 font-bengali">{selectedComplaint.categoryBn}</p>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400 block">Target of Grievance</label>
                <p className="text-xs font-semibold text-neutral-900">
                  {selectedComplaint.targetName}
                  {selectedComplaint.busLicensePlate && ` (${selectedComplaint.busLicensePlate})`}
                </p>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-neutral-400 block">Description</label>
                <p className="text-xs text-neutral-700 bg-neutral-50 p-2.5 rounded-lg border border-neutral-200 leading-relaxed mt-1">
                  {selectedComplaint.description}
                </p>
              </div>

              {selectedComplaint.photoUrl && (
                <div>
                  <label className="text-[10px] font-bold uppercase text-neutral-400 block mb-1">Attached Evidence</label>
                  <img
                    src={selectedComplaint.photoUrl}
                    alt="Complaint Evidence"
                    className="w-full h-32 object-cover rounded-lg border border-neutral-200"
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-3 border-t border-neutral-100 space-y-2">
                <label className="text-[10px] font-bold uppercase text-neutral-400 block">Authority Disposition</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedComplaint.id, 'in_review')}
                    className="py-1.5 px-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-semibold text-xs"
                  >
                    Mark In Review
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedComplaint.id, 'resolved')}
                    className="py-1.5 px-3 rounded-lg bg-pothe-700 hover:bg-pothe-800 text-white font-semibold text-xs"
                  >
                    Resolve & Close
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-neutral-400">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs font-semibold">Select a complaint from the list to review details and take action.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
