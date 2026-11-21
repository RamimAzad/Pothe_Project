import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe,
  Lock,
  Bell,
  HelpCircle,
  ChevronRight,
  LogOut,
  CheckCircle2,
  Edit3,
} from 'lucide-react';
import { BottomNavBar } from '../components/BottomNavBar';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export const P14_ProfileSettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const { user, logout, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(true);
  const [name, setName] = useState(user?.name || 'Ramim Azad');
  const [email, setEmail] = useState(user?.email || 'ramim@example.com');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(name, email);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-neutral-bg flex flex-col pb-24">
      {/* Top Green Header Band (Prominent, High-Contrast Brand Teal) */}
      <div className="bg-pothe text-white px-5 pt-[max(16px,env(safe-area-inset-top))] pb-6 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-black tracking-tight text-white">Passenger Profile</h1>
          <span className="px-3 py-1 rounded-full bg-black/25 text-emerald-100 text-xs font-black border border-white/20">
            Pothe v1.0 pilot
          </span>
        </div>

        {/* Profile Identity Card */}
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-full bg-white text-pothe font-black text-xl flex items-center justify-center shadow-md">
            RA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold text-white">{name}</h2>
              <span className="px-2 py-0.5 rounded-full bg-black/25 text-white text-[10px] font-bold flex items-center gap-1 border border-white/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>Verified</span>
              </span>
            </div>
            <p className="text-xs text-white/95 font-medium mt-0.5">{user?.phone || '+880 1712-345678'}</p>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-bold text-emerald-100 underline mt-1 flex items-center gap-1 hover:text-white"
            >
              <span>Edit Profile</span>
              <span className="font-bengali">/ প্রোফাইল এডিট</span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 flex-1">
        {/* Settings Menu List */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
          {/* Language Toggle */}
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Language <span className="font-bengali font-bold">/ ভাষা</span>
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'en' ? 'English (Current)' : 'বাংলা (সক্রিয়)'}
                </p>
              </div>
            </div>

            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  language === 'en'
                    ? 'bg-white text-pothe shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('bn')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition font-bengali ${
                  language === 'bn'
                    ? 'bg-white text-pothe shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                বাংলা
              </button>
            </div>
          </div>

          {/* Privacy & Permissions */}
          <button
            onClick={() => alert('GPS Location: Granted (Within 50m geofence accuracy)')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 active:bg-slate-100 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Privacy & Permissions</h3>
                <p className="text-xs text-slate-500">Location, Geofencing, Camera</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          {/* Notification Preferences */}
          <button
            onClick={() => navigate('/alerts')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 active:bg-slate-100 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Notifications</h3>
                <p className="text-xs text-slate-500">Congestion alerts, Checker updates</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          {/* Help & Support */}
          <button
            onClick={() => alert('Pothe Passenger Helpline: 16216 (Toll-Free, 24/7)')}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50 active:bg-slate-100 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-900">Help & Support</h3>
                <p className="text-xs text-slate-500">FAQs, Citizen Transit Charter</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Profile Edit Card (Expanded by Default per Reference) */}
        {isEditing && (
          <form
            onSubmit={handleSave}
            className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3.5"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-pothe" />
                <h3 className="text-sm font-black text-slate-900">Edit Personal Information</h3>
              </div>
              <span className="text-[11px] font-bold text-slate-500">Optional</span>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Full Name <span className="font-bengali">/ পুরো নাম</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-pothe rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none transition"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Email Address <span className="font-bengali">/ ইমেইল</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-200 focus:border-pothe rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-900 outline-none transition"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-700 block mb-1">
                Phone (Verified, read-only)
              </label>
              <input
                type="text"
                readOnly
                value={user?.phone || '+880 1712-345678'}
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-500 outline-none cursor-not-allowed"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-pothe hover:bg-pothe-dark active:bg-pothe-800 active:scale-[0.99] text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>{savedSuccess ? '✓ Saved Successfully' : 'Save Changes'}</span>
              <span className="font-bengali opacity-90">/ সংরক্ষণ করুন</span>
            </button>
          </form>
        )}

        {/* Log Out Button */}
        <button
          onClick={handleLogout}
          className="w-full h-12 bg-white border-2 border-red-500 rounded-2xl text-xs font-bold text-red-600 hover:bg-red-50 active:bg-red-100 transition flex items-center justify-center gap-2 shadow-2xs"
        >
          <LogOut className="w-4 h-4" />
          <span>Log Out</span>
          <span className="font-bengali">/ লগআউট</span>
        </button>
      </div>

      <BottomNavBar />
    </div>
  );
};
