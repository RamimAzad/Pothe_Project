import React, { useState } from 'react';
import { Bus, MapPin, Users, AlertCircle, Clock } from 'lucide-react';
import { mockRoutes, mockEstimatedBuses } from '@pothe/mock-data';

export const LiveFleetMap: React.FC<{ filterCompany?: string }> = ({ filterCompany }) => {
  const [selectedRouteId, setSelectedRouteId] = useState<string>('route-7');
  const [selectedBusId, setSelectedBusId] = useState<string | null>(null);

  const route = mockRoutes.find((r) => r.id === selectedRouteId) || mockRoutes[0];
  const buses = mockEstimatedBuses.filter((b) => {
    if (filterCompany && b.company !== filterCompany) return false;
    return b.routeId === selectedRouteId;
  });

  const selectedBus = buses.find((b) => b.id === selectedBusId) || buses[0];

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs">
      {/* Map Header & Controls */}
      <div className="p-4 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3 bg-neutral-50/50">
        <div>
          <h4 className="font-bold text-neutral-900 text-sm flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-status-green animate-ping" />
            <span>Dhaka Transit Corridor - Live Telemetry & Checkpoints</span>
          </h4>
          <p className="text-xs text-neutral-500 mt-0.5">
            Real-time checkpoint detections and Kalman estimated inter-stop trajectories
          </p>
        </div>

        {/* Route Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-500 font-medium">Corridor:</span>
          <select
            value={selectedRouteId}
            onChange={(e) => {
              setSelectedRouteId(e.target.value);
              setSelectedBusId(null);
            }}
            className="px-2.5 py-1.5 rounded-lg border border-neutral-300 bg-white font-medium text-neutral-800 shadow-2xs focus:outline-hidden focus:border-pothe-500"
          >
            {mockRoutes.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.origin} ↔ {r.destination})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Schematic Interactive Map Canvas */}
      <div className="p-6 relative bg-gradient-to-b from-neutral-50 via-white to-neutral-50">
        {/* Dhaka City Geographic Backdrop Graphic */}
        <div className="relative py-8">
          {/* Main Transit Corridor Trunk Line */}
          <div className="absolute top-1/2 left-8 right-8 h-3.5 bg-neutral-200 rounded-full -translate-y-1/2 shadow-inner">
            <div className="h-full bg-gradient-to-r from-pothe-500 via-pothe-600 to-pothe-700 rounded-full opacity-80" />
          </div>

          {/* Checkpoints along the line */}
          <div className="relative flex justify-between items-center z-10 px-4">
            {route.checkpoints.map((cp, idx) => {
              const crowdColor =
                cp.crowdLevel === 'high'
                  ? 'border-crowd-high bg-crowd-high text-white'
                  : cp.crowdLevel === 'medium'
                  ? 'border-crowd-med bg-crowd-med text-neutral-900'
                  : 'border-crowd-low bg-crowd-low text-white';

              return (
                <div key={cp.id} className="flex flex-col items-center group">
                  {/* Distance / Order Tag */}
                  <span className="text-[10px] font-semibold text-neutral-600 mb-1.5 opacity-90 group-hover:text-pothe-700">
                    CP #{idx + 1}
                  </span>

                  {/* Node Circle */}
                  <div
                    className={`w-9 h-9 rounded-full border-4 flex items-center justify-center font-bold text-xs shadow-md transition-transform group-hover:scale-110 cursor-pointer ${crowdColor}`}
                  >
                    <MapPin className="w-4 h-4" />
                  </div>

                  {/* Label */}
                  <div className="mt-2 text-center max-w-[80px]">
                    <p className="text-xs font-bold text-neutral-800 leading-tight group-hover:text-pothe-700">
                      {cp.name}
                    </p>
                    <p className="text-[10px] text-neutral-600 font-bengali leading-none mt-0.5">{cp.nameBn}</p>
                    <span className="inline-block mt-1 text-[9px] px-1.5 py-0.2 rounded-full font-semibold uppercase bg-neutral-100 text-neutral-600">
                      {cp.crowdLevel || 'normal'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bus Markers dynamically placed on line */}
          <div className="mt-8 pt-4 border-t border-dashed border-neutral-200">
            <div className="flex items-center justify-between mb-3 text-xs text-neutral-500 font-medium">
              <span>Active Fleet Tracking on Route</span>
              <span>{buses.length} Vehicles In Transit</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {buses.map((bus) => {
                const isSelected = selectedBus?.id === bus.id;
                return (
                  <button
                    key={bus.id}
                    onClick={() => setSelectedBusId(bus.id)}
                    className={`text-left p-3 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-pothe-600 bg-pothe-50/70 shadow-xs ring-2 ring-pothe-500/20'
                        : 'border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-pothe text-white">
                          <Bus className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-bold text-xs text-neutral-900">{bus.licensePlate}</p>
                          <p className="text-[10px] text-neutral-500 font-medium">{bus.company}</p>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-neutral-100 text-neutral-700">
                        ETA: {bus.etaMinutes} min
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-neutral-400" />
                        <span>
                          {bus.sittingCount} sit / {bus.standingCount} stnd
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                          bus.crowdStatus === 'high'
                            ? 'bg-status-red/15 text-status-red'
                            : bus.crowdStatus === 'medium'
                            ? 'bg-status-amber/15 text-status-amber'
                            : 'bg-status-green/15 text-status-green'
                        }`}
                      >
                        {bus.crowdStatus.toUpperCase()}
                      </span>
                    </div>

                    <div className="mt-2 text-[10px] text-neutral-500 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-neutral-400" />
                      <span>Last at {bus.lastSeenCheckpoint} ({bus.lastSeenTimeAgo})</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Bus Inspection Flyout */}
      {selectedBus && (
        <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-neutral-500 text-[10px] block uppercase font-semibold">Active Inspector</span>
              <span className="font-bold text-neutral-900 text-sm">{selectedBus.licensePlate}</span>
              <span className="text-neutral-500 ml-1.5">({selectedBus.company})</span>
            </div>
            <div className="h-7 w-px bg-neutral-300" />
            <div>
              <span className="text-neutral-500 text-[10px] block uppercase font-semibold">Confidence Metric</span>
              <span className="font-extrabold text-pothe text-sm">{selectedBus.confidenceScore}%</span>
              <span className="text-neutral-500 ml-1">Kalman filter match</span>
            </div>
            <div className="h-7 w-px bg-neutral-300 hidden sm:block" />
            <div className="hidden sm:block">
              <span className="text-neutral-500 text-[10px] block uppercase font-semibold">Occupancy Load</span>
              <span className="font-bold text-neutral-900">
                {selectedBus.sittingCount + selectedBus.standingCount} /{' '}
                {selectedBus.sittingCapacity + selectedBus.standingCapacity} pax
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {selectedBus.missingAtLastCheckpoint && (
              <span className="flex items-center gap-1 text-[11px] font-semibold text-status-red bg-status-red/10 px-2 py-1 rounded-md">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Bypassed Checkpoint Detected</span>
              </span>
            )}
            <span className="text-neutral-500 text-[11px]">
              Progress: {Math.round(selectedBus.currentSegmentProgress * 100)}% to next stop
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
