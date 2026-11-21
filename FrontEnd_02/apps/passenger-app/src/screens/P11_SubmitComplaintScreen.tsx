import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Camera, Lock, Check } from 'lucide-react';
import { BottomNavBar } from '../components/BottomNavBar';
import { useLanguage } from '../context/LanguageContext';
import { MockComplaintService } from '@pothe/mock-data';

export const P11_SubmitComplaintScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const stateAgainst = (location.state as any)?.against || 'checker';
  const stateBus = (location.state as any)?.busLicense || 'DM-11-2345';
  const stateCat = (location.state as any)?.category || 'Checker misbehavior';

  const [against, setAgainst] = useState<'checker' | 'bus_staff' | 'bus'>(stateAgainst);
  const [selectedBus, setSelectedBus] = useState(`Thikana Paribahan (${stateBus})`);
  const [category, setCategory] = useState(stateCat);
  const [description, setDescription] = useState(
    'Checker at Farmgate checkpoint was behaving rudely and recorded wrong passenger counts intentionally.'
  );
  const [hasPhoto, setHasPhoto] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await MockComplaintService.submitComplaint({
      against,
      targetName: against === 'checker' ? 'Checker at Farmgate Checkpoint' : selectedBus,
      busLicensePlate: stateBus,
      category,
      categoryBn: 'চেকারের অসদাচরণ',
      description,
      photoUrl: hasPhoto ? 'bus-complaint.jpg' : undefined,
    });
    setSubmitting(false);
    navigate('/complaints');
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col pb-24">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-5 pt-[max(16px,env(safe-area-inset-top))] pb-3 shadow-2xs">
        <h1 className="text-lg font-black text-slate-900 tracking-tight">
          File a Complaint <span className="font-bengali font-bold text-base">/ অভিযোগ করুন</span>
        </h1>
      </div>

      <div className="p-4 flex-1">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs space-y-4">
          {/* Target Selector Chips */}
          <div>
            <label className="text-xs font-extrabold text-slate-900 block mb-2">
              Complaint against <span className="font-bengali font-bold">/ কার বিরুদ্ধে অভিযোগ</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'checker', label: 'Checker' },
                { id: 'bus_staff', label: 'Bus Staff' },
                { id: 'bus', label: 'Bus' },
              ].map((item) => {
                const isSelected = against === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setAgainst(item.id as any)}
                    className={`py-2 rounded-full text-xs font-bold transition border ${
                      isSelected
                        ? 'bg-slate-200/90 border-slate-800 text-slate-900 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bus Dropdown */}
          <div>
            <div className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 truncate">{selectedBus}</span>
              <ChevronDown className="w-4 h-4 text-slate-600 shrink-0 ml-1" />
            </div>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Category <span className="font-bengali">/ বিভাগ</span>
            </label>
            <div className="bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-3 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">{category}</span>
              <ChevronDown className="w-4 h-4 text-slate-600 shrink-0 ml-1" />
            </div>
          </div>

          {/* Description Text Area */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Describe what happened <span className="font-bengali">/ ঘটনার বিবরণ লিখুন</span>
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs font-medium text-slate-800 outline-none focus:border-pothe focus:ring-1 focus:ring-pothe leading-relaxed"
            />
          </div>

          {/* Photo Upload Attachment */}
          <div>
            <label className="text-[11px] font-bold text-slate-700 block mb-1">
              Add photo (optional) <span className="font-bengali">/ ছবি যুক্ত করুন</span>
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-2xl p-3 flex items-center gap-3 bg-slate-50/50">
              <button
                type="button"
                onClick={() => setHasPhoto(!hasPhoto)}
                className="w-16 h-16 rounded-xl border border-slate-300 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition shadow-2xs"
              >
                <Camera className="w-6 h-6 text-slate-700" />
              </button>

              {hasPhoto && (
                <div className="w-16 h-16 rounded-xl bg-slate-800 overflow-hidden relative border border-slate-300">
                  <div className="w-full h-full bg-emerald-950 flex flex-col items-center justify-center text-white text-[10px] font-bold p-1 text-center">
                    🚌 Bus Photo Attached
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Privacy Note Reassurance Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-2.5 text-xs text-emerald-900 font-medium">
            <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Your identity is hidden from the person you report.</span>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full h-13 bg-pothe hover:bg-pothe-dark active:bg-pothe-800 active:scale-[0.99] text-white font-bold rounded-2xl shadow-md text-sm transition flex items-center justify-center gap-1.5 mt-2 disabled:opacity-50"
          >
            <span>{submitting ? 'Submitting...' : 'Submit Complaint'}</span>
            <span className="font-bengali opacity-90">/ অভিযোগ জমা দিন</span>
          </button>
        </form>
      </div>

      <BottomNavBar />
    </div>
  );
};
