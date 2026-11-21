import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  Bus,
  Search,
  Filter,
  CheckCircle,
  FileCheck,
  Send,
} from 'lucide-react';
import { mockOperatorCompliance } from '@pothe/mock-data';
import { ExportModal } from '../../components/ExportModal';

export const GovOperatorMonitoringScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [exportOpen, setExportOpen] = useState(false);
  const [noticeSent, setNoticeSent] = useState<string | null>(null);

  const filteredOperators = mockOperatorCompliance.filter((op) =>
    op.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleIssueNotice = (company: string) => {
    setNoticeSent(`Compliance audit notice issued to ${company}.`);
    setTimeout(() => setNoticeSent(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Bus Operator & Fleet Compliance
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Regulatory monitoring of private transport syndicates and automated checkpoint audits
          </p>
        </div>

        <button
          onClick={() => setExportOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold shadow-2xs"
        >
          <FileCheck className="w-4 h-4 text-pothe-700" />
          <span>Export Operator Ledger</span>
        </button>
      </div>

      {noticeSent && (
        <div className="p-3 bg-status-green/10 border border-status-green/30 rounded-lg text-xs text-status-green font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{noticeSent}</span>
        </div>
      )}

      {/* Silent Checkpoint Anomaly Detector Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-status-red/10 text-status-red">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-neutral-900 text-sm">
                Automated Checkpoint Anomaly Detector
              </h3>
              <p className="text-xs text-neutral-500">
                Identifies unscheduled detour bypasses or missed checker scans
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-status-red/10 text-status-red">
            1 Active Anomaly
          </span>
        </div>

        <div className="mt-4 p-3.5 rounded-lg bg-status-amber/5 border border-status-amber/20 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <div className="flex items-center gap-2 font-bold text-neutral-900">
              <span>Dhaka Metro-Ba 11-4567</span>
              <span className="text-neutral-500 font-normal">(Bikolpo Paribahan)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-status-amber text-neutral-900 font-bold">
                Bypassed Checkpoint
              </span>
            </div>
            <p className="text-neutral-600 mt-1">
              Vehicle failed to record passenger count at <strong>Kazipara Checkpoint</strong> at 08:35 AM despite geofence proximity ping. Possible flyover detour.
            </p>
          </div>

          <button
            onClick={() => handleIssueNotice('Bikolpo Paribahan')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Route Audit Notice</span>
          </button>
        </div>
      </div>

      {/* Operator Compliance Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-pothe-700" />
            <h3 className="font-bold text-neutral-900 text-sm">Operator Performance Ratings</h3>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-lg border border-neutral-200 text-xs text-neutral-900 bg-white placeholder-neutral-400 focus:outline-hidden focus:border-pothe-500 w-48 sm:w-60"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/70 text-neutral-500 uppercase font-semibold">
                <th className="py-3 px-4">Operator Company</th>
                <th className="py-3 px-4">Active / Registered</th>
                <th className="py-3 px-4">Punctuality Score</th>
                <th className="py-3 px-4">Compliance Rating</th>
                <th className="py-3 px-4">Complaints Filed</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredOperators.map((op, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-neutral-900 flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-md bg-neutral-100 flex items-center justify-center text-neutral-700">
                      <Bus className="w-3.5 h-3.5 text-pothe-700" />
                    </div>
                    <span>{op.company}</span>
                  </td>

                  <td className="py-3.5 px-4 text-neutral-700">
                    <span className="font-semibold text-neutral-900">{op.activeToday}</span>
                    <span className="text-neutral-400 mx-1">/</span>
                    <span>{op.registeredBuses} buses</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-pothe-600 rounded-full"
                          style={{ width: `${op.onTimePunctuality}%` }}
                        />
                      </div>
                      <span className="font-semibold text-neutral-800">{op.onTimePunctuality}%</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        op.complianceRate >= 90
                          ? 'bg-status-green/10 text-status-green'
                          : 'bg-status-amber/10 text-status-amber'
                      }`}
                    >
                      {op.complianceRate}% Verified
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`font-semibold ${
                        op.totalComplaints > 5 ? 'text-status-red' : 'text-neutral-700'
                      }`}
                    >
                      {op.totalComplaints} Reports
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleIssueNotice(op.company)}
                      className="px-2.5 py-1 rounded-md border border-neutral-200 text-neutral-700 hover:bg-neutral-100 font-medium text-[11px] transition-colors"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ExportModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        reportTitle="DTCA Bus Operator Compliance Rating Ledger"
        dataSummary="Audited metrics for all 5 authorized transit companies operating on Dhaka North-South corridors."
      />
    </div>
  );
};
