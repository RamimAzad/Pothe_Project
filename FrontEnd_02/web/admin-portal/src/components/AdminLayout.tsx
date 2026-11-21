import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Bus,
  Gauge,
  LogOut,
  User as UserIcon,
  Menu,
  X,
  ChevronDown,
  Building2,
  Building,
  Radio,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, role, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const govLinks = [
    { name: 'Transit Overview', path: '/gov/overview', icon: LayoutDashboard },
    { name: 'Demand & Corridors', path: '/gov/demand', icon: TrendingUp },
    { name: 'Operator Monitoring', path: '/gov/operators', icon: ShieldCheck },
    { name: 'Public Complaints', path: '/gov/complaints', icon: AlertTriangle },
    { name: 'Export & Audits', path: '/gov/export', icon: FileText },
  ];

  const ownerLinks = [
    { name: 'Fleet Overview', path: '/owner/fleet', icon: Bus },
    { name: 'Live Bus Monitor', path: '/owner/bus/bus-thikana-01', icon: Gauge },
    { name: 'Demand & Scheduling', path: '/owner/demand', icon: TrendingUp },
    { name: 'Fleet Complaints', path: '/owner/complaints', icon: AlertTriangle },
  ];

  const navLinks = role === 'gov' ? govLinks : ownerLinks;

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-neutral-300 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo & Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-pothe text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  প
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-lg text-neutral-900 tracking-tight">Pothe (পথে)</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-pothe-50 text-pothe-800 border border-pothe-200">
                      Intelligence Portal
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-600 font-medium hidden sm:block">
                    Dhaka Smart Transit Monitoring & Demand Prediction
                  </p>
                </div>
              </div>
            </div>

            {/* Role Switcher & User Profile */}
            <div className="flex items-center gap-3">
              {/* Live Signal Indicator */}
              <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-status-green/15 text-status-green border border-status-green/20 text-xs font-bold">
                <Radio className="w-3.5 h-3.5 animate-pulse text-status-green" />
                <span>Checkpoints Live</span>
              </div>

              {/* Role Quick Switcher */}
              <div className="relative">
                <button
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 active:bg-neutral-100 text-xs font-bold text-neutral-900 transition-colors shadow-2xs"
                >
                  {role === 'gov' ? (
                    <>
                      <Building2 className="w-4 h-4 text-pothe" />
                      <span>Gov Authority (DTCA)</span>
                    </>
                  ) : (
                    <>
                      <Building className="w-4 h-4 text-pothe" />
                      <span>Bus Operator ({user?.company || 'Thikana'})</span>
                    </>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-600" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-neutral-200 py-1.5 z-50 text-xs">
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase text-neutral-500 tracking-wider">
                      Switch Active Role
                    </div>
                    <button
                      onClick={() => {
                        switchRole('gov');
                        setRoleDropdownOpen(false);
                        navigate('/gov/overview');
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors ${
                        role === 'gov' ? 'bg-pothe-50 text-pothe-900 font-bold border-l-4 border-pothe' : 'text-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-pothe" />
                        <div>
                          <p className="font-bold text-neutral-900">Government Transit Authority</p>
                          <p className="text-[10px] text-neutral-500 font-normal">DTCA / City Transport Oversight</p>
                        </div>
                      </div>
                      {role === 'gov' && <span className="w-2 h-2 rounded-full bg-pothe" />}
                    </button>
                    <button
                      onClick={() => {
                        switchRole('owner');
                        setRoleDropdownOpen(false);
                        navigate('/owner/fleet');
                      }}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors ${
                        role === 'owner' ? 'bg-pothe-50 text-pothe-900 font-bold border-l-4 border-pothe' : 'text-neutral-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-pothe" />
                        <div>
                          <p className="font-bold text-neutral-900">Bus Fleet Operator</p>
                          <p className="text-[10px] text-neutral-500 font-normal">Thikana Paribahan Fleet</p>
                        </div>
                      </div>
                      {role === 'owner' && <span className="w-2 h-2 rounded-full bg-pothe" />}
                    </button>
                  </div>
                )}
              </div>

              {/* User Avatar & Logout */}
              <div className="flex items-center gap-2 pl-2 border-l border-neutral-300">
                <div className="w-8 h-8 rounded-full bg-pothe text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  {user?.name ? user.name[0] : <UserIcon className="w-4 h-4" />}
                </div>
                <div className="hidden sm:block text-left text-xs">
                  <p className="font-bold text-neutral-900 leading-none">{user?.name}</p>
                  <p className="text-[10px] text-neutral-600 mt-0.5 font-medium">{user?.email || user?.phone}</p>
                </div>
                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="p-1.5 rounded-lg text-neutral-500 hover:text-status-red hover:bg-status-red/10 active:bg-status-red/20 transition-colors ml-1"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col lg:flex-row gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white rounded-xl border border-neutral-200 p-3 shadow-xs sticky top-22">
            <div className="px-3 py-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                {role === 'gov' ? 'Transit Authority Modules' : 'Fleet Management Modules'}
              </span>
            </div>
            <nav className="space-y-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || (item.path !== '/owner/bus/bus-thikana-01' && location.pathname.startsWith(item.path));
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-pothe text-white shadow-xs font-bold'
                        : 'text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-500'}`} />
                    <span>{item.name}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Quick Helper / Info Box */}
            <div className="mt-8 p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-600 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                <span className="w-2 h-2 rounded-full bg-status-green" />
                <span>SE231 Smart Transit</span>
              </div>
              <p className="text-[11px] leading-relaxed text-neutral-600 font-medium">
                Data generated via geofenced human checkers and probabilistic Kalman-filtering algorithms.
              </p>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-xs flex">
            <div className="w-72 bg-white h-full p-4 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
                  <span className="font-bold text-neutral-900">Pothe Navigation</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-neutral-500 hover:text-neutral-800">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="mt-4 space-y-1">
                  {navLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold ${
                          location.pathname === item.path
                            ? 'bg-pothe text-white font-bold'
                            : 'text-neutral-800 hover:bg-neutral-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </NavLink>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-4 border-t border-neutral-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-neutral-100 text-neutral-800 text-sm font-semibold hover:bg-status-red/10 hover:text-status-red transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
};
