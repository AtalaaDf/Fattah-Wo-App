import React from 'react'
import { Outlet, NavLink, Link } from 'react-router-dom'
import { LayoutDashboard, Users, Calendar, Package, MessageSquare } from 'lucide-react'
import Logo from '../components/common/Logo'

export const AdminLayout = () => {
  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Worker', path: '/admin/worker', icon: Users },
    { label: 'Schedule', path: '/admin/schedule', icon: Calendar },
    { label: 'Bundle', path: '/admin/bundle', icon: Package },
    { label: 'Feedback', path: '/admin/feedback', icon: MessageSquare },
  ]

  return (
    <div className="min-h-screen flex bg-surface">
      {/* Admin Sidebar */}
      <aside className="w-[260px] bg-sidebar-bg text-white flex flex-col fixed inset-y-0 left-0 z-30 border-r border-sidebar-active">
        <div className="p-6 border-b border-sidebar-active">
          <Link to="/admin/dashboard">
            <Logo variant="full" theme="dark" />
          </Link>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-sidebar-active text-white border-l-4 border-champagne-gold'
                      : 'text-slate-300 hover:bg-sidebar-active/60 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-active text-xs text-slate-400">
          <p className="font-semibold text-white">Admin Panel</p>
          <p>Fattah Wedding Organizer</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pl-[260px] flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-outline-variant px-8 flex items-center justify-between sticky top-0 z-20">
          <div className="text-sm font-semibold text-primary">Admin Control Center</div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full uppercase">
              Role: Admin
            </span>
          </div>
        </header>

        {/* Dynamic Page Outlet */}
        <main className="flex-1 p-8 max-w-container w-full mx-auto">
          <Outlet />
        </main>

        {/* In-app Footer */}
        <footer className="py-4 px-8 border-t border-outline-variant bg-white text-xs text-slate-500 flex justify-between items-center">
          <p>© {new Date().getFullYear()} Fattah Wedding Organizer</p>
          <p>v1.0.0 (Scaffolding)</p>
        </footer>
      </div>
    </div>
  )
}

export default AdminLayout
