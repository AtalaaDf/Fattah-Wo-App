import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Package, MessageSquare, Menu, X } from 'lucide-react';
import Logo from '../components/common/Logo';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';
import { useAuthStore } from '../store/useAuthStore';

const navItems = [
  { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Worker', path: '/admin/worker', icon: Users },
  { label: 'Schedule', path: '/admin/schedule', icon: Calendar },
  { label: 'Bundle', path: '/admin/bundle', icon: Package },
  { label: 'Feedback', path: '/admin/feedback', icon: MessageSquare },
];

export const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900 font-sans">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#104358] text-white sticky top-0 z-50 shadow-md">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
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
        homeLink="/admin/dashboard"
        username={profile?.full_name || user?.email || 'Admin Fattah WO'}
        roleLabel="Admin"
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

export default AdminLayout;
