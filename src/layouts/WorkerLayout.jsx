import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, UserCheck, Briefcase, Calendar, Menu, X } from 'lucide-react';
import Logo from '../components/common/Logo';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';
import { useAuthStore } from '../store/useAuthStore';
import { useLogoutMutation } from '../features/auth/hooks/useAuthHooks';

const navItems = [
  { label: 'Dashboard', path: '/worker/dashboard', icon: LayoutDashboard },
  { label: 'Biodata & Profil', path: '/worker/profile', icon: UserCheck },
  { label: 'Ambil Job', path: '/worker/list', icon: Briefcase },
  { label: 'Jadwal Saya', path: '/worker/schedule', icon: Calendar },
];

export const WorkerLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const logoutMutation = useLogoutMutation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900 font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#104358] text-white sticky top-0 z-50 shadow-md">
        <Link to="/worker/dashboard" className="flex items-center gap-2">
          <Logo size="sm" theme="dark" />
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          aria-label={isMobileMenuOpen ? 'Tutup menu' : 'Buka menu'}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar
        navItems={navItems}
        homeLink="/worker/dashboard"
        username={profile?.full_name || user?.email || 'Worker Fattah WO'}
        profilePhoto={profile?.worker_details?.[0]?.profile_photo_url || profile?.avatar_url}
        roleLabel="Worker / Kru"
        isMobileOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default WorkerLayout;
