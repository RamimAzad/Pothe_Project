import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Bus,
  ArrowLeft,
  Users,
  MapPin,
  Clock,
  ShieldCheck,
  AlertCircle,
  FileCheck,
  CheckCircle2,
} from 'lucide-react';
import { mockBuses, mockCheckerEntries, mockEstimatedBuses } from '@pothe/mock-data';

export const OwnerBusDetailScreen: React.FC = () => {
  const { busId } = useParams<{ busId: string }>();

  // Find bus or fallback to first Thikana bus
  const bus = mockBuses.find((b) => b.id === busId) || mockBuses[0];
  const est = mockEstimatedBuses.find((e) => e.licensePlate === bus.licensePlate) || mockEstimatedBuses[0];

  // Checkpoint entries recorded for this bus
  const entries = mockCheckerEntries.filter((e) => e.licensePlate === bus.licensePlate || e.busId === bus.id);

  const sittingPercentage = Math.round((est.sittingCount / est.sittingCapacity) * 100);
  const standingPercentage = Math.round((est.standingCount / est.standingCapacity) * 100);

  return (
    <div className="space-y-6">
      {/* Back Button & Title */}
      <div>
        <Link
          to="/owner/fleet"
          className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-800 font-semibold mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Fleet Overview</span>
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-pothe-700 text-white flex items-center justify-center font-bold">
              <Bus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">{bus.licensePlate}</h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-status-green/10 text-status-green">
                  Active in Transit
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5">
                {bus.company} • Route 7: Mirpur 12 ↔ Motijheel
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white font-medium text-neutral-700">
              Driver: <strong>Abdul Karim</strong> (BRTA Lic: #DL-88392)
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Occupancy Gauges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sitting Gauge */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-neutral-500 tracking-wider">Sitting Capacity</p>
              <h3 className="text-3xl font-bold text-neutral-900 mt-1">
                {est.sittingCount}{' '}
                <span className="text-base font-normal text-neutral-400">/ {est.sittingCapacity} seats</span>
              </h3>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                sittingPercentage >= 95
                  ? 'bg-status-red/10 text-status-red'
                  : 'bg-status-green/10 text-status-green'
              }`}
            >
              {sittingPercentage}% Filled
            </span>
          </div>

          <div className="mt-4">
            <div className="h-3 w-full bg-neutral-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  sittingPercentage >= 95 ? 'bg-status-red' : 'bg-pothe-600'
                }`}
                style={{ width: `${Math.min(100, sittingPercentage)}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-neutral-400 mt-2">
            Verified by human checker Rahim Uddin at {est.lastSeenCheckpoint}
          </p>
        </div>

        {/* Standing Gauge */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-neutral-500 tracking-wider">Standing Load</p>
              <h3 className="text-3xl font-bold text-neutral-900 mt-1">
                {est.standingCount}{' '}
                <span className="text-base font-normal text-neutral-400">/ {est.standingCapacity} standing</span>
              </h3>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                standingPercentage >= 80
                  ? 'bg-status-amber/15 text-status-amber'
                  : 'bg-neutral-100 text-neutral-700'
              }`}
            >
              {standingPercentage}% Density
            </span>
          </div>

          <div className="mt-4">
            <div className="h-3 w-full bg-neutral-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-status-amber rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, standingPercentage)}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-neutral-400 mt-2">
            Safety threshold: max 40 standing passengers per BRTA regulatory limit
          </p>
        </div>
      </div>

      {/* Checkpoint Detection History for this Bus */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50/50 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-neutral-900 text-sm">Today's Checkpoint Verification Log</h3>
            <p className="text-xs text-neutral-500">
              Official records submitted by geofenced checkers during revenue trips
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white border border-neutral-200 text-neutral-700">
            Trip #3 (Mirpur 12 → Motijheel)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/70 text-neutral-500 uppercase font-semibold">
                <th className="py-3 px-4">Checkpoint</th>
                <th className="py-3 px-4">Time Recorded</th>
                <th className="py-3 px-4">Sitting / Standing Count</th>
                <th className="py-3 px-4">Capacity Utilization</th>
                <th className="py-3 px-4">Geofence Status</th>
                <th className="py-3 px-4 text-right">Audit State</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {entries.map((entry) => {
                const total = entry.sittingCount + entry.standingCount;
                const util = Math.round((total / 76) * 100);
                return (
                  <tr key={entry.id} className="hover:bg-neutral-50/70">
                    <td className="py-3.5 px-4 font-bold text-neutral-900 flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-pothe-700" />
                      <span>{entry.checkpointName}</span>
                    </td>

                    <td className="py-3.5 px-4 text-neutral-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-neutral-400" />
                        <span>{entry.timestamp}</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-bold text-neutral-900">
                      <span className="text-pothe-700">{entry.sittingCount} Sit</span>
                      <span className="text-neutral-300 mx-1.5">/</span>
                      <span className="text-neutral-700">{entry.standingCount} Stand</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-neutral-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              util > 90 ? 'bg-status-red' : util > 75 ? 'bg-status-amber' : 'bg-status-green'
                            }`}
                            style={{ width: `${util}%` }}
                          />
                        </div>
                        <span className="font-semibold text-neutral-800">{util}%</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-status-green">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>50m Geofence Validated</span>
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          entry.status === 'saved'
                            ? 'bg-status-green/10 text-status-green'
                            : 'bg-status-amber/10 text-status-amber'
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
