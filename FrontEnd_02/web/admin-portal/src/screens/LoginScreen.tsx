import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Building,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEMO_USERS } from '@pothe/mock-data';

export const LoginScreen: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState<'gov' | 'owner'>('gov');
  const [identifier, setIdentifier] = useState('planning@dtca.gov.bd');
  const [password, setPassword] = useState('demo1234');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRoleChange = (newRole: 'gov' | 'owner') => {
    setRole(newRole);
    if (newRole === 'gov') {
      setIdentifier('planning@dtca.gov.bd');
    } else {
      setIdentifier('rafiqul@thikanabus.com');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      setError('Please provide your ID/Email and password.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      await login(role, identifier);
      if (role === 'gov') {
        navigate('/gov/overview');
      } else {
        navigate('/owner/fleet');
      }
    } catch {
      setError('Invalid credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (targetRole: 'gov' | 'owner') => {
    setRole(targetRole);
    login(targetRole, targetRole === 'gov' ? 'planning@dtca.gov.bd' : 'rafiqul@thikanabus.com');
    if (targetRole === 'gov') {
      navigate('/gov/overview');
    } else {
      navigate('/owner/fleet');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Icon & Heading */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-pothe text-white flex items-center justify-center font-bold text-2xl shadow-md">
            প
          </div>
          <h2 className="mt-4 text-2xl font-black tracking-tight text-neutral-900">
            Pothe (পথে) Transit Portal
          </h2>
          <p className="mt-1 text-xs text-neutral-600 font-medium">
            Government Transit Intelligence & Bus Syndicate Fleet Management
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-md border border-neutral-300 rounded-2xl sm:px-10">
          {/* Role Selection Switcher */}
          <div className="mb-6">
            <label className="block text-xs font-bold uppercase text-neutral-600 mb-2">
              Select Operating Role
            </label>
            <div className="grid grid-cols-2 gap-2 bg-neutral-100 p-1 rounded-xl border border-neutral-200">
              <button
                type="button"
                onClick={() => handleRoleChange('gov')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  role === 'gov'
                    ? 'bg-white text-pothe shadow-xs border border-neutral-200'
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                <Building2 className="w-4 h-4 text-pothe" />
                <span>Government</span>
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('owner')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  role === 'owner'
                    ? 'bg-white text-pothe shadow-xs border border-neutral-200'
                    : 'text-neutral-700 hover:text-neutral-900'
                }`}
              >
                <Building className="w-4 h-4 text-pothe" />
                <span>Bus Owner</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-status-red/10 border border-status-red/30 rounded-lg text-xs text-status-red font-semibold">
              {error}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neutral-800">
                {role === 'gov' ? 'DTCA Officer ID / Official Email' : 'Operator Company ID / Email'}
              </label>
              <div className="mt-1 relative">
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="pl-9 pr-3 py-2.5 w-full rounded-lg border border-neutral-300 text-xs text-neutral-900 bg-white placeholder-neutral-400 focus:outline-none focus:border-pothe focus:ring-1 focus:ring-pothe shadow-2xs font-medium"
                  placeholder={role === 'gov' ? 'planning@dtca.gov.bd' : 'rafiqul@thikanabus.com'}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800">Password</label>
              <div className="mt-1 relative">
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-3 py-2.5 w-full rounded-lg border border-neutral-300 text-xs text-neutral-900 bg-white placeholder-neutral-400 focus:outline-none focus:border-pothe focus:ring-1 focus:ring-pothe shadow-2xs font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-pothe hover:bg-pothe-dark active:bg-pothe-800 text-white font-bold text-xs shadow-md transition-colors mt-2"
            >
              <span>{loading ? 'Authenticating...' : `Sign in as ${role === 'gov' ? 'Government Authority' : 'Bus Fleet Owner'}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Fill Buttons */}
          <div className="mt-6 pt-5 border-t border-neutral-200">
            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 text-center mb-3">
              One-Click Seeded Demo Login
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin('gov')}
                className="py-2.5 px-3 rounded-lg border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 active:bg-neutral-200 text-[11px] font-semibold text-neutral-900 text-left transition-colors shadow-2xs"
              >
                <div className="font-bold text-neutral-900">Gov (DTCA)</div>
                <div className="text-[10px] text-neutral-600 truncate">Dr. Shahabuddin</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('owner')}
                className="py-2.5 px-3 rounded-lg border border-neutral-300 bg-neutral-50 hover:bg-neutral-100 active:bg-neutral-200 text-[11px] font-semibold text-neutral-900 text-left transition-colors shadow-2xs"
              >
                <div className="font-bold text-neutral-900">Owner (Thikana)</div>
                <div className="text-[10px] text-neutral-600 truncate">Al-Haj Rafiqul</div>
              </button>
            </div>
          </div>
        </div>

        {/* Security / System Footer Note */}
        <p className="mt-6 text-center text-xs text-neutral-600 font-medium flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-status-green" />
          <span>SE231 Capstone Transit Infrastructure • Simulated Security Protocol</span>
        </p>
      </div>
    </div>
  );
};
