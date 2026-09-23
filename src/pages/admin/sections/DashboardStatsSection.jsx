import React from 'react'
import { Calendar, Users, Clock, TrendingUp } from 'lucide-react'
import { Skeleton } from '../../../components/ui/Skeleton'

const StatCard = ({ label, value, icon: Icon, iconColor, isLoading }) => (
  <div className="p-6 bg-white border border-outline-variant rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-muted uppercase tracking-wide">{label}</p>
        {isLoading ? (
          <Skeleton className="h-9 w-16 mt-2" />
        ) : (
          <p className="text-3xl font-heading font-bold text-primary mt-2">{value}</p>
        )}
      </div>
      <div className={`p-3 rounded-xl ${iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
  </div>
)

export const DashboardStatsSection = ({ stats, isLoading }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <StatCard
      label="Total Reservasi"
      value={stats?.totalReservations ?? '—'}
      icon={Calendar}
      iconColor="bg-primary/10 text-primary"
      isLoading={isLoading}
    />
    <StatCard
      label="Worker Aktif"
      value={stats?.activeWorkers ?? '—'}
      icon={Users}
      iconColor="bg-emerald-50 text-emerald-600"
      isLoading={isLoading}
    />
    <StatCard
      label="Perlu Staffing"
      value={stats?.pendingStaffing ?? '—'}
      icon={Clock}
      iconColor="bg-amber-50 text-amber-600"
      isLoading={isLoading}
    />
    <StatCard
      label="Revenue Terverifikasi"
      value={stats ? `Rp ${Number(stats.totalRevenue).toLocaleString('id-ID')}` : '—'}
      icon={TrendingUp}
      iconColor="bg-secondary/10 text-secondary"
      isLoading={isLoading}
    />
  </div>
)

export default DashboardStatsSection
