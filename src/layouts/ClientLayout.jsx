import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { CalendarCheck, Package, Clock, HelpCircle, Menu, X } from 'lucide-react';
import Logo from '../components/common/Logo';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';
import { useAuthStore } from '../store/useAuthStore';

const navItems = [
  { label: 'Reservasi Saya', path: '/client/reservation', icon: CalendarCheck },
  { label: 'Browse Bundle', path: '/client/bundle', icon: Package },
  { label: 'Status Acara', path: '/client/schedule', icon: Clock },
];

// Extra nav item: WA bantuan (tidak pakai NavLink karena external link)
const WaBantuanLink = () => (
  <a
    href="https://wa.me/6281234567890"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white rounded-xl transition-all duration-200 mt-2"
  >
    <HelpCircle className="w-5 h-5 text-[#C5A059] shrink-0" />
    <span>Bantuan Layanan WA</span>
  </a>
);

export const ClientLayout = () => {
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
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#104358] text-white sticky top-0 z-50 shadow-md">
        <Link to="/client/reservation" className="flex items-center gap-2">
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
        homeLink="/client/reservation"
        username={profile?.full_name || user?.email || 'Client Fattah WO'}
        roleLabel="Client Pemesan"
        isMobileOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onLogout={handleLogout}
        extraNavItems={<WaBantuanLink />}
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

export default ClientLayout;
