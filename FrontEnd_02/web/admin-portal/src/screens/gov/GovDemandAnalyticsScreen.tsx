import React, { useState } from 'react';
import {
  TrendingUp,
  Clock,
  Download,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { mockPeriodicDemand, mockHourlyDemand } from '@pothe/mock-data';
import { ExportModal } from '../../components/ExportModal';

export const GovDemandAnalyticsScreen: React.FC = () => {
  const [period, setPeriod] = useState<'weekly' | 'monthly' | 'six_monthly' | 'yearly'>('weekly');
  const [exportOpen, setExportOpen] = useState(false);

  const trendData = mockPeriodicDemand[period];

  return (
    <div className="space-y-6">
      {/* Header & Period Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Demand Prediction & Route Analytics
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Aggregated passenger loads, peak congestion patterns, and route capacity utilization
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Time Horizon Filter Buttons */}
          <div className="flex items-center bg-white rounded-lg p-1 border border-neutral-200 shadow-2xs">
            <button
              onClick={() => setPeriod('weekly')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                period === 'weekly'
                  ? 'bg-pothe-700 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setPeriod('monthly')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                period === 'monthly'
                  ? 'bg-pothe-700 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPeriod('six_monthly')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                period === 'six_monthly'
                  ? 'bg-pothe-700 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              6-Monthly
            </button>
            <button
              onClick={() => setPeriod('yearly')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                period === 'yearly'
                  ? 'bg-pothe-700 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Annual
            </button>
          </div>

          <button
            onClick={() => setExportOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-semibold shadow-2xs"
          >
            <Download className="w-4 h-4 text-neutral-500" />
            <span>Export Data</span>
          </button>
        </div>
      </div>

      {/* Main Passenger Volume Over Time Chart */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between pb-4 border-b border-neutral-100 gap-2">
          <div>
            <h3 className="font-bold text-neutral-900 text-base">
              Passenger Transit Volume Trend ({period.toUpperCase()})
            </h3>
            <p className="text-xs text-neutral-500">
              Aggregated commuter volumes on Mirpur 12 – Motijheel & Gabtoli – Sayedabad trunks
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-neutral-600">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-pothe-600" />
              <span>Total Commuters</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-xs bg-status-amber" />
              <span>Congestion Index</span>
            </span>
          </div>
        </div>

        <div className="h-72 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="passengerColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00796B" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00796B" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
              />
              <Area
                type="monotone"
                dataKey="passengers"
                stroke="#00796B"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#passengerColor)"
                name="Passengers"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two-Column Section: Hourly Checkpoint Heat & Capacity Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Checkpoint Demand: Sitting vs Standing */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div>
              <h3 className="font-bold text-neutral-900 text-sm">Hourly Load by Checkpoint</h3>
              <p className="text-xs text-neutral-500">Sitting vs Standing Passenger Distribution</p>
            </div>
            <Clock className="w-4 h-4 text-neutral-400" />
          </div>

          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockHourlyDemand} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="checkpointName" stroke="#64748b" fontSize={10} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderColor: '#e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="avgSitting" name="Sitting Passengers" fill="#00796B" stackId="a" />
                <Bar dataKey="avgStanding" name="Standing Passengers" fill="#E65100" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Checkpoint Capacity Utilization Table */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div>
                <h3 className="font-bold text-neutral-900 text-sm">Checkpoint Capacity Index</h3>
                <p className="text-xs text-neutral-500">Peak hour stress testing across checkpoints</p>
              </div>
              <TrendingUp className="w-4 h-4 text-pothe-600" />
            </div>

            <div className="mt-4 space-y-3">
              {mockHourlyDemand.slice(0, 5).map((d, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <div className="w-32">
                    <span className="font-bold text-neutral-800">{d.checkpointName}</span>
                    <span className="text-[10px] text-neutral-400 block">{d.hour}</span>
                  </div>

                  <div className="flex-1 mx-3">
                    <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          d.capacityUtilization > 90
                            ? 'bg-status-red'
                            : d.capacityUtilization > 75
                            ? 'bg-status-amber'
                            : 'bg-status-green'
                        }`}
                        style={{ width: `${d.capacityUtilization}%` }}
                      />
                    </div>
                  </div>

                  <span
                    className={`font-bold w-12 text-right ${
                      d.capacityUtilization > 90
                        ? 'text-status-red'
                        : d.capacityUtilization > 75
                        ? 'text-status-amber'
                        : 'text-status-green'
                    }`}
                  >
                    {d.capacityUtilization}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendation Banner */}
          <div className="mt-5 p-3 rounded-lg bg-pothe-50 border border-pothe-200 flex items-start gap-2.5 text-xs text-pothe-900">
            <Lightbulb className="w-4 h-4 text-pothe-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="font-semibold">Scheduling Optimization:</strong> Deploying 4 reserve buses from Mirpur 12 at 08:15 AM will relieve Kazipara bottleneck by ~28% and decrease waiting time by 6 minutes.
            </p>
          </div>
        </div>
      </div>

      <ExportModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        reportTitle={`Dhaka Route Demand Analytics (${period})`}
        dataSummary="Historical load and predictive capacity utilization for DTCA strategic transit planning."
      />
    </div>
  );
};
