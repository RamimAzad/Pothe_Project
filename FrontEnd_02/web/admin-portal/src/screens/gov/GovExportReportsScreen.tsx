import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Calendar,
  CheckCircle,
  FileSpreadsheet,
  Building2,
  FileCheck2,
} from 'lucide-react';

export const GovExportReportsScreen: React.FC = () => {
  const [reportType, setReportType] = useState('demand_summary');
  const [corridor, setCorridor] = useState('all');
  const [format, setFormat] = useState<'csv' | 'pdf'>('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      if (format === 'csv') {
        const csv =
          'data:text/csv;charset=utf-8,' +
          'Metric,Value,Corridor,DateRange,Status\n' +
          'Total Commuters,142000,Mirpur12-Motijheel,Past 30 Days,Verified\n' +
          'Peak Hour Congestion,94%,Kazipara Junction,Past 30 Days,Critical\n' +
          'Operator Compliance,92.8%,All Fleet,Past 30 Days,Compliant\n' +
          'Total Complaints Filed,24,System Wide,Past 30 Days,18 Resolved\n';
        const encodedUri = encodeURI(csv);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `pothe_${reportType}_export.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        window.print();
      }
      setExportComplete(`Report [${reportType.toUpperCase()}] generated and downloaded successfully.`);
      setTimeout(() => setExportComplete(null), 4000);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
          Audit Reports & Compliance Exports
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Generate formal statutory reporting for Dhaka Transport Coordination Authority (DTCA) and BRTA
        </p>
      </div>

      {exportComplete && (
        <div className="p-3 bg-status-green/10 border border-status-green/30 rounded-lg text-xs text-status-green font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>{exportComplete}</span>
        </div>
      )}

      {/* Configuration Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs max-w-2xl">
        <h3 className="font-bold text-neutral-900 text-base mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-pothe-700" />
          <span>Report Configuration</span>
        </h3>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-neutral-700 block mb-1">Select Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-neutral-300 bg-white font-medium text-neutral-800"
            >
              <option value="demand_summary">Corridor Demand & Passenger Volume Summary</option>
              <option value="operator_compliance">Bus Syndicate Compliance & Anomaly Audit</option>
              <option value="checkpoint_accuracy">Human Checker Geofence Accuracy & Verification Ledger</option>
              <option value="grievances_log">Public Grievances & Redressal Audit Trail</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-neutral-700 block mb-1">Transit Corridor</label>
              <select
                value={corridor}
                onChange={(e) => setCorridor(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-neutral-300 bg-white font-medium text-neutral-800"
              >
                <option value="all">All Corridors (System-wide)</option>
                <option value="route-7">Route 7: Mirpur 12 ↔ Motijheel</option>
                <option value="route-3">Route 3: Gabtoli ↔ Sayedabad</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-neutral-700 block mb-1">Output Format</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setFormat('csv')}
                  className={`p-2.5 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    format === 'csv'
                      ? 'border-pothe-600 bg-pothe-50 text-pothe-800'
                      : 'border-neutral-200 bg-white text-neutral-700'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4 text-status-green" />
                  <span>CSV Spreadsheet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormat('pdf')}
                  className={`p-2.5 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    format === 'pdf'
                      ? 'border-pothe-600 bg-pothe-50 text-pothe-800'
                      : 'border-neutral-200 bg-white text-neutral-700'
                  }`}
                >
                  <Printer className="w-4 h-4 text-pothe-700" />
                  <span>Print / PDF</span>
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="font-bold text-neutral-700 block mb-1">Reporting Period</label>
            <div className="flex items-center gap-2 p-2.5 rounded-lg border border-neutral-300 bg-neutral-50 text-neutral-600">
              <Calendar className="w-4 h-4 text-neutral-400" />
              <span>Current Operating Cycle (Last 30 Days – Month to Date)</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-[11px] text-neutral-600 font-medium">
            Standard ISO-compliant transit telemetry format
          </span>
          <button
            onClick={handleGenerate}
            disabled={isExporting}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-pothe-700 hover:bg-pothe-800 text-white font-bold text-xs transition-colors shadow-xs disabled:opacity-50"
          >
            {isExporting ? (
              <span>Compiling Report...</span>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Generate & Download</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
