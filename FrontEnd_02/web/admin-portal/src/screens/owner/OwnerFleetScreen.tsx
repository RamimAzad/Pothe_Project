import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bus,
  Users,
  CheckCircle2,
  Clock,
  Gauge,
  ArrowRight,
  Search,
  Filter,
} from 'lucide-react';
import { MetricCard } from '../../components/MetricCard';
import { LiveFleetMap } from '../../components/LiveFleetMap';
import { mockBuses, mockEstimatedBuses } from '@pothe/mock-data';
import { useAuth } from '../../context/AuthContext';

export const OwnerFleetScreen: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const company = user?.company || 'Thikana Paribahan';

  // Filter buses for this owner's company
  const ownerBuses = mockBuses.filter((b) => b.company === company || b.company.includes('Thikana'));
  const activeEstimated = mockEstimatedBuses.filter(
    (b) => b.company === company || b.company.includes('Thikana')
  );

  const filtered = ownerBuses.filter((b) =>
    b.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (b.driverName && b.driverName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
              {company} Fleet Dashboard
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-pothe-100 text-pothe-800">
              Authorized Operator
            </span>
          </div>
          <p className="text-sm text-neutral-500 mt-1">
            Live fleet tracking, per-checkpoint passenger loads, and capacity diagnostics
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Fleet in Operation"
          value={`${activeEstimated.length} / ${ownerBuses.length || 24}`}
          subtitle="Vehicles actively in revenue service"
          icon={Bus}
          variant="pothe"
        />
        <MetricCard
          title="Daily Commuters"
          value="4,820"
          subtitle="Tickets verified at checkpoints"
          icon={Users}
          trend={{ value: '8.1%', isPositive: true }}
        />
        <MetricCard
          title="Average Utilization"
          value="87.4%"
          subtitle="Seating & standing efficiency"
          icon={Gauge}
          variant="default"
        />
        <MetricCard
          title="Compliance Score"
          value="96%"
          subtitle="Audit rating by DTCA"
          icon={CheckCircle2}
          variant="pothe"
        />
      </div>

      {/* Fleet Live Tracking Corridor */}
      <LiveFleetMap filterCompany={company} />

      {/* Fleet Vehicles Table */}
      <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/50">
          <div>
            <h3 className="font-bold text-neutral-900 text-sm">Assigned Vehicles Inventory</h3>
            <p className="text-xs text-neutral-500">Live operational status and driver assignments</p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search plate or driver..."
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
                <th className="py-3 px-4">Bus License Plate</th>
                <th className="py-3 px-4">Route Assignment</th>
                <th className="py-3 px-4">Driver In Shift</th>
                <th className="py-3 px-4">Capacity Load</th>
                <th className="py-3 px-4">Operational State</th>
                <th className="py-3 px-4 text-right">Diagnostics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filtered.map((bus) => {
                const est = activeEstimated.find((e) => e.licensePlate === bus.licensePlate);
                return (
                  <tr key={bus.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-neutral-900 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-md bg-pothe-50 text-pothe-700 flex items-center justify-center">
                        <Bus className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span>{bus.licensePlate}</span>
                        {est && (
                          <span className="block text-[10px] text-neutral-400 font-normal">
                            ETA: {est.etaMinutes}m to {est.lastSeenCheckpoint}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-neutral-700 font-medium">
                      Route 7 (Mirpur 12 ↔ Motijheel)
                    </td>

                    <td className="py-3.5 px-4 text-neutral-700">
                      {bus.driverName || 'Abdul Karim (ID #402)'}
                    </td>

                    <td className="py-3.5 px-4">
                      {est ? (
                        <div>
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="font-semibold text-neutral-800">
                              {est.sittingCount + est.standingCount} / {est.sittingCapacity + est.standingCapacity} pax
                            </span>
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.2 rounded-xs uppercase ${
                                est.crowdStatus === 'high'
                                  ? 'bg-status-red/15 text-status-red'
                                  : 'bg-status-green/15 text-status-green'
                              }`}
                            >
                              {est.crowdStatus}
                            </span>
                          </div>
                          <div className="w-28 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-pothe-600 rounded-full"
                              style={{
                                width: `${Math.min(
                                  100,
                                  ((est.sittingCount + est.standingCount) /
                                    (est.sittingCapacity + est.standingCapacity)) *
                                    100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-neutral-400 italic">Off-duty / In depot</span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                          bus.status === 'active'
                            ? 'bg-status-green/10 text-status-green'
                            : 'bg-neutral-100 text-neutral-600'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            bus.status === 'active' ? 'bg-status-green' : 'bg-neutral-400'
                          }`}
                        />
                        {bus.status === 'active' ? 'Active in Route' : 'In Maintenance'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => navigate(`/owner/bus/${bus.id}`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-pothe-700 hover:text-white text-neutral-700 font-semibold text-[11px] transition-colors"
                      >
                        <span>Telemetry</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
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
