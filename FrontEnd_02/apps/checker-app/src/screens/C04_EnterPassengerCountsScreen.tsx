import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Plus, Minus, Lock, AlertTriangle, Check } from 'lucide-react';
import { CheckerBottomNav } from '../components/CheckerBottomNav';
import { useChecker } from '../context/CheckerContext';
import { mockBuses, MockCheckerService } from '@pothe/mock-data';

export const C04_EnterPassengerCountsScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isInsideGeofence, currentShift } = useChecker();

  const busId = (location.state as any)?.busId || 'bus-thikana-2345';
  const bus = mockBuses.find((b) => b.id === busId) || mockBuses[0];

  const [sitting, setSitting] = useState(28);
  const [standing, setStanding] = useState(14);
  const [submitting, setSubmitting] = useState(false);

  const isHighCount = sitting + standing > 40;

  const handleSubmit = async () => {
    setSubmitting(true);
    // If not inside geofence, navigate to C06 error
    if (!isInsideGeofence) {
      setTimeout(() => {
        setSubmitting(false);
        navigate('/geofence-error', { state: { bus, sitting, standing } });
      }, 400);
      return;
    }

    const res = await MockCheckerService.submitCount({
      busId: bus.id,
      licensePlate: bus.licensePlate,
      company: bus.company,
      companyBn: bus.companyBn,
      checkpointId: 'cp-mirpur-10',
      checkpointName: 'Mirpur 10',
      checkpointNameBn: 'মিরপুর ১০',
      sitting,
      standing,
      simulatedDistanceMeters: 20, // inside 100m
    });

    setSubmitting(false);
    navigate('/entry-success', { state: { entry: res.entry, bus } });
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col pb-24">
      {/* Top Green Header Bar */}
      <div className="bg-pothe-DEFAULT text-white px-5 pt-[max(16px,env(safe-area-inset-top))] pb-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black tracking-tight">
            Passenger Count <span className="font-bengali font-bold text-lg">/ যাত্রী সংখ্যা</span>
          </h1>
          <span className="px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs">
            Step 2 of 3
          </span>
        </div>

        {/* Selected Bus Banner */}
        <div className="bg-emerald-950/70 rounded-2xl p-3.5 mt-3 border border-emerald-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-black text-white">
              {bus.licensePlate} ({bus.company.split(' ')[0]})
            </h2>
          </div>
          <span className="text-xs font-bold text-emerald-200">
            Cap: {bus.seatingCapacity} seats / {bus.standingCapacity} standing
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Automatic Timestamp & GPS Lock Badges */}
        <div className="bg-slate-200/80 rounded-2xl p-2.5 flex items-center justify-around text-xs font-black text-slate-700">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>Time: 10:42 AM (Auto Server)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>Loc: {currentShift.checkpointName} (GPS Locked)</span>
          </div>
        </div>

        {/* Counter Block 1: SITTING */}
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-900 tracking-wider">
              SITTING <span className="font-bengali text-slate-600">/ বসা</span>
            </span>
            <span className="text-xs font-bold text-slate-500">Max: {bus.seatingCapacity}</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Giant Minus */}
            <button
              onClick={() => setSitting(Math.max(0, sitting - 1))}
              className="w-20 h-18 rounded-2xl bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-800 active:bg-slate-200 transition shadow-2xs"
            >
              <Minus className="w-8 h-8 stroke-[3]" />
            </button>

            {/* Giant Counter Display */}
            <span className="text-5xl font-black text-pothe-DEFAULT tracking-tight">
              {sitting}
            </span>

            {/* Giant Plus */}
            <button
              onClick={() => setSitting(sitting + 1)}
              className="w-20 h-18 rounded-2xl bg-pothe-DEFAULT flex items-center justify-center text-white active:bg-pothe-dark transition shadow-md shadow-emerald-900/20"
            >
              <Plus className="w-8 h-8 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Counter Block 2: STANDING */}
        <div className="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-900 tracking-wider">
              STANDING <span className="font-bengali text-slate-600">/ দাঁড়ানো</span>
            </span>
            <span className="text-xs font-bold text-slate-500">Max: {bus.standingCapacity}</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            {/* Giant Minus */}
            <button
              onClick={() => setStanding(Math.max(0, standing - 1))}
              className="w-20 h-18 rounded-2xl bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-800 active:bg-slate-200 transition shadow-2xs"
            >
              <Minus className="w-8 h-8 stroke-[3]" />
            </button>

            {/* Giant Counter Display */}
            <span className="text-5xl font-black text-amber-500 tracking-tight">
              {standing}
            </span>

            {/* Giant Plus */}
            <button
              onClick={() => setStanding(standing + 1)}
              className="w-20 h-18 rounded-2xl bg-pothe-DEFAULT flex items-center justify-center text-white active:bg-pothe-dark transition shadow-md shadow-emerald-900/20"
            >
              <Plus className="w-8 h-8 stroke-[3]" />
            </button>
          </div>

          {/* Soft Capacity Warning Banner */}
          {isHighCount && (
            <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 flex items-start gap-2 text-xs text-amber-900 font-bold mt-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>Count looks high for this bus. Please recheck before submitting.</span>
            </div>
          )}
        </div>

        {/* Giant Submit CTA */}
        <div className="pt-2">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full h-16 bg-pothe-DEFAULT hover:bg-pothe-dark active:scale-[0.99] text-white rounded-2xl font-black text-lg shadow-xl shadow-emerald-900/30 flex items-center justify-center gap-2 transition"
          >
            <span>{submitting ? 'Submitting...' : 'Submit Entry'}</span>
            <span className="font-bengali opacity-90">/ জমা দিন ✓</span>
          </button>
        </div>
      </div>

      <CheckerBottomNav />
    </div>
  );
};
