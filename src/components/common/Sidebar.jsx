import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import Logo from './Logo';

export const Sidebar = ({
  navItems = [],
  homeLink = '/',
  username = '',
  profilePhoto = '',
  roleLabel = '',
  isMobileOpen = false,
  onClose,
  onLogout,
  extraNavItems,
}) => {
  return (
    <aside
      className={`fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-[#104358] text-white flex flex-col justify-between transition-transform duration-300 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* Top: Logo + Nav */}
      <div className="flex flex-col min-h-0">
        {/* Logo — hanya tampil di desktop */}
        <div className="hidden md:flex p-6 border-b border-white/10 shrink-0">
          <Link to={homeLink} onClick={onClose}>
            <Logo size="md" theme="dark" />
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="p-4 space-y-1 overflow-y-auto flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-white/15 text-white border-l-4 border-[#C5A059] pl-3'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}

          {/* Extra items (e.g. WA link for client) */}
          {extraNavItems}
        </nav>
      </div>

      {/* Bottom: User Info + Logout */}
      <div className="p-4 border-t border-white/10 space-y-3 shrink-0">
        <div className="flex items-center gap-3">
          {/* Avatar initials or profile photo */}
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold shrink-0 uppercase overflow-hidden border border-white/20">
            {profilePhoto ? (
              <img src={profilePhoto} alt={username} className="w-full h-full object-cover" />
            ) : (
              username?.charAt(0) || '?'
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-bold text-white truncate">{username || 'Pengguna'}</p>
            <p className="text-[11px] text-slate-300 truncate">{roleLabel}</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-rose-500/20 text-rose-200 hover:bg-rose-500/30 active:bg-rose-500/40 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Keluar Akun
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
