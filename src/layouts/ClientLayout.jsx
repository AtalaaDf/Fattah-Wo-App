import React, { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { CalendarCheck, Package, Clock, HelpCircle, Menu, X, LogOut } from 'lucide-react';
import Logo from '../components/common/Logo';
import Footer from '../components/common/Footer';
import { useAuthStore } from '../store/useAuthStore';

export const ClientLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const navItems = [
    { label: 'Reservasi Saya', path: '/client/reservation', icon: CalendarCheck },
    { label: 'Browse Bundle', path: '/client/bundle', icon: Package },
    { label: 'Status Acara', path: '/client/schedule', icon: Clock },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900 font-sans">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-primary text-white sticky top-0 z-50 shadow-md">
        <Link to="/client/reservation" className="flex items-center gap-2">
          <Logo size="sm" theme="dark" />
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg text-white hover:bg-primary-container"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-primary text-white flex flex-col justify-between transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          <div className="hidden md:flex p-6 border-b border-primary-container/40">
            <Link to="/client/reservation">
              <Logo size="md" theme="dark" />
            </Link>
          </div>

          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-colors ${
                      isActive
                        ? 'bg-primary-container text-white border-l-4 border-champagne-gold'
                        : 'text-slate-200 hover:bg-primary-container/60 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}

            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-200 hover:bg-primary-container/60 hover:text-white rounded-xl transition-colors mt-4"
            >
              <HelpCircle className="w-5 h-5 text-champagne-gold" />
              <span>Bantuan Layanan WA</span>
            </a>
          </nav>
        </div>

        <div className="p-4 border-t border-primary-container/40 space-y-3">
          <div className="text-xs">
            <p className="font-bold text-white">{user?.full_name || 'Client Fattah WO'}</p>
            <p className="text-slate-300">Role: Client Pemesan</p>
          </div>
          <button
            onClick={() => {
              logout();
              window.location.href = '/login';
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-rose-500/20 text-rose-200 hover:bg-rose-500/30 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Keluar Akun
          </button>
        </div>
      </aside>

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
