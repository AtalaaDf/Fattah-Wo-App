import React, { useState } from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Package, MessageSquare, Menu, X, LogOut } from 'lucide-react';
import Logo from '../components/common/Logo';
import Footer from '../components/common/Footer';
import { useAuthStore } from '../store/useAuthStore';

export const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Worker', path: '/admin/worker', icon: Users },
    { label: 'Schedule', path: '/admin/schedule', icon: Calendar },
    { label: 'Bundle', path: '/admin/bundle', icon: Package },
    { label: 'Feedback', path: '/admin/feedback', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-900 font-sans">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-primary text-white sticky top-0 z-50 shadow-md">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <Logo size="sm" theme="dark" />
        </Link>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg text-white hover:bg-primary-container"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Admin Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-primary text-white flex flex-col justify-between transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div>
          <div className="hidden md:flex p-6 border-b border-primary-container/40">
            <Link to="/admin/dashboard">
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
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-primary-container/40 space-y-3">
          <div className="text-xs">
            <p className="font-bold text-white">{user?.full_name || 'Admin Fattah WO'}</p>
            <p className="text-slate-300">Role: Admin</p>
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

export default AdminLayout;
