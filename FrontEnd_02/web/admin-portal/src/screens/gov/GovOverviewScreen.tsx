import React, { useState } from 'react';
import {
  Users,
  Bus,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Download,
  CheckCircle2,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { MetricCard } from '../../components/MetricCard';
import { LiveFleetMap } from '../../components/LiveFleetMap';
import { ExportModal } from '../../components/ExportModal';
import { mockCheckerEntries } from '@pothe/mock-data';
import { Link } from 'react-router-dom';

export const GovOverviewScreen: React.FC = () => {
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Dhaka Metropolitan Transit Overview
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Real-time human-checkpoint telemetry and crowd congestion monitoring
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setExportOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold shadow-2xs transition-colors"
          >
            <Download className="w-4 h-4 text-neutral-600" />
            <span>Export DTCA Audit</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Active Buses Tracked"
          value="42 Buses"
          subtitle="Across 2 Major Corridors"
          icon={Bus}
          variant="pothe"
          trend={{ value: '12%', isPositive: true, period: 'vs morning' }}
        />
        <MetricCard
          title="Peak Hourly Volume"
          value="18,450"
          subtitle="Passengers moved per hour"
          icon={Users}
          trend={{ value: '6.4%', isPositive: true }}
        />
        <MetricCard
          title="Network Capacity Load"
          value="89.2%"
          subtitle="Overcrowded at 3 checkpoints"
          icon={TrendingUp}
          variant="warning"
        />
        <MetricCard
          title="Checkpoint Audits"
          value="98.7%"
          subtitle="Geofence-verified submissions"
          icon={CheckCircle2}
          variant="default"
        />
      </div>

      {/* Corridor Map */}
      <LiveFleetMap />

      {/* Two Column Section: Live Checker Entry Feed & Critical Bottlenecks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Submissions Feed (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <h3 className="font-bold text-neutral-900 text-sm">Live Checker Telemetry Feed</h3>
              <p className="text-xs text-neutral-500">Real-time counts validated within 50m geofence</p>
            </div>
            <Link
              to="/gov/operators"
              className="text-xs text-pothe-700 hover:text-pothe-800 font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="mt-4 divide-y divide-neutral-100">
            {mockCheckerEntries.map((entry) => (
              <div key={entry.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center text-neutral-700 font-bold text-xs">
                    <Bus className="w-4 h-4 text-neutral-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-xs text-neutral-900">{entry.licensePlate}</p>
                      <span className="text-[10px] px-2 py-0.2 rounded-full font-semibold bg-neutral-100 text-neutral-600">
                        {entry.company}
                      </span>
                    </div>
                    <p className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-neutral-400" />
                      <span>{entry.checkpointName}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3 text-neutral-400" />
                      <span>{entry.timestamp}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-neutral-900">
                    <span className="text-pothe-700">{entry.sittingCount} Sitting</span>
                    <span className="text-neutral-300 mx-1.5">/</span>
                    <span className="text-neutral-700">{entry.standingCount} Standing</span>
                  </div>
                  <span
                    className={`inline-block mt-0.5 text-[10px] font-semibold px-2 py-0.2 rounded-full ${
                      entry.status === 'saved'
                        ? 'bg-status-green/10 text-status-green'
                        : entry.status === 'corrected'
                        ? 'bg-status-amber/10 text-status-amber'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {entry.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corridor Bottlenecks Alert Card (1 Col) */}
        <div className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-status-red pb-3 border-b border-neutral-100">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-bold text-neutral-900 text-sm">Critical Corridor Alerts</h3>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-lg bg-status-red/5 border border-status-red/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-status-red">Kazipara Checkpoint</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-status-red text-white">
                    97% Cap
                  </span>
                </div>
                <p className="text-xs text-neutral-600 mt-1">
                  Average standing count exceeds safety margin (38 standing passengers). Additional fleet deployment recommended.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-status-amber/5 border border-status-amber/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-status-amber">Farmgate Junction</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-status-amber text-neutral-900">
                    93% Cap
                  </span>
                </div>
                <p className="text-xs text-neutral-600 mt-1">
                  Boarding wait times elevated to 14 mins. Suggest dispatching empty return trips from Motijheel.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-neutral-50 border border-neutral-200">
                <span className="text-xs font-bold text-neutral-800">Mirpur 12 Terminal</span>
                <p className="text-xs text-neutral-600 mt-1">
                  Dispatch cadence operating smoothly. Headway 6-8 minutes between departures.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-neutral-100">
            <Link
              to="/gov/demand"
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-pothe-50 text-pothe-700 text-xs font-bold hover:bg-pothe-100 transition-colors"
            >
              <span>Explore Demand Prediction Models</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      <ExportModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        reportTitle="Dhaka Transit System Daily Overview"
        dataSummary="Covers Route 7 and Route 3 corridors, 42 tracked buses, and 6 active checkpoints."
      />
    </div>
  );
};
