import React, { useState } from 'react';
import { Download, Printer, CheckCircle, FileSpreadsheet, FileText, X } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportTitle: string;
  dataSummary: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  reportTitle,
  dataSummary,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleDownloadCSV = () => {
    // Generate mock CSV content and trigger browser download
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Checkpoint,Hour,AvgSitting,AvgStanding,TotalDemand,CapacityUtilization%\n' +
      'Mirpur 12,07:00,28,8,36,47\n' +
      'Mirpur 10,08:00,36,32,68,89\n' +
      'Kazipara,08:30,36,38,74,97\n' +
      'Farmgate,09:00,36,35,71,93\n' +
      'Shahbag,09:30,32,18,50,66\n' +
      'Motijheel,10:00,20,4,24,32\n';

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pothe_${reportTitle.toLowerCase().replace(/\s+/g, '_')}_export.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess('CSV export downloaded successfully!');
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl border border-neutral-200 max-w-lg w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-pothe-50 text-pothe-700">
            <Download className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-neutral-900 text-lg">Export Transit Data</h3>
            <p className="text-xs text-neutral-500">Government & Operator Compliance Auditing</p>
          </div>
        </div>

        <div className="mt-4 p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs">
          <p className="font-semibold text-neutral-800">{reportTitle}</p>
          <p className="text-neutral-600 mt-0.5">{dataSummary}</p>
          <p className="text-neutral-600 mt-1">Generated: {new Date().toLocaleDateString()} | DTCA Public Transport Bureau</p>
        </div>

        {downloadSuccess && (
          <div className="mt-3 p-2.5 rounded-lg bg-status-green/10 text-status-green flex items-center gap-2 text-xs font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span>{downloadSuccess}</span>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={handleDownloadCSV}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-sm font-semibold transition-colors shadow-2xs"
          >
            <FileSpreadsheet className="w-4 h-4 text-status-green" />
            <span>Download CSV</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-pothe hover:bg-pothe-dark active:bg-pothe-800 text-white text-sm font-semibold transition-colors shadow-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-xs text-neutral-500 hover:text-neutral-800 font-medium"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
