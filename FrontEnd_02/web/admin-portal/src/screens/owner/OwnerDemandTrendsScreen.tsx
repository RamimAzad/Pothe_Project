import React from 'react';
import {
  TrendingUp,
  Clock,
  Lightbulb,
  CheckCircle,
  Calendar,
  DollarSign,
  Users,
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
import { mockHourlyDemand, mockPeriodicDemand } from '@pothe/mock-data';

export const OwnerDemandTrendsScreen: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
          Route Demand & Fleet Scheduling Optimization
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Predictive passenger flows along Route 7 to optimize headway dispatch and maximize seat utilization
        </p>
      </div>

      {/* Summary KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-neutral-500">Morning Rush Peak</span>
            <Clock className="w-4 h-4 text-status-amber" />
          </div>
          <p className="text-2xl font-bold text-neutral-900 mt-1">08:00 – 09:30 AM</p>
          <p className="text-xs text-status-amber font-semibold mt-1">97% corridor capacity</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-neutral-500">Evening Commute Peak</span>
            <Clock className="w-4 h-4 text-pothe-600" />
          </div>
          <p className="text-2xl font-bold text-neutral-900 mt-1">05:00 – 07:30 PM</p>
          <p className="text-xs text-pothe-700 font-semibold mt-1">94% corridor capacity</p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-neutral-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-neutral-500">Optimal Headway</span>
            <TrendingUp className="w-4 h-4 text-status-green" />
          </div>
          <p className="text-2xl font-bold text-neutral-900 mt-1">5 – 7 Minutes</p>
          <p className="text-xs text-status-green font-semibold mt-1">Recommended departure cadence</p>
        </div>
      </div>

      {/* Hourly Passenger Curve */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
        <div className="pb-4 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-neutral-900 text-base">Hourly Passenger Demand (Mirpur 12 – Motijheel)</h3>
            <p className="text-xs text-neutral-500">Sitting vs Standing commuters per departure window</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-pothe-50 text-pothe-800">
            Route 7 Corridor
          </span>
        </div>

        <div className="h-72 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockHourlyDemand} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={11} />
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
              <Bar dataKey="avgSitting" name="Seated Commuters" fill="#00796B" stackId="a" />
              <Bar dataKey="avgStanding" name="Standing Commuters" fill="#F57C00" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Dispatch Guidance Box */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs">
        <div className="flex items-center gap-2 pb-3 border-b border-neutral-100">
          <Lightbulb className="w-5 h-5 text-status-amber" />
          <h3 className="font-bold text-neutral-900 text-sm">Fleet Manager Dispatch Recommendations</h3>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-pothe-50/70 border border-pothe-200">
            <span className="text-xs font-bold text-pothe-900 block mb-1">
              Morning Shift (07:30 - 09:00 AM)
            </span>
            <p className="text-xs text-pothe-800 leading-relaxed">
              Dispatch 3 reserve vehicles from Mirpur 12 depot at 5-minute intervals starting 07:45 AM. Severe crowding detected between Kazipara and Farmgate checkpoints.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-neutral-50 border border-neutral-200">
            <span className="text-xs font-bold text-neutral-800 block mb-1">
              Mid-day Lull (11:30 AM - 03:00 PM)
            </span>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Extend dispatch interval to 12 minutes. Move 4 buses to depot for preventive maintenance or CNG refueling to reduce dead-mile costs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
