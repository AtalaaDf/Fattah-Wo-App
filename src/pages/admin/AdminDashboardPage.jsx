import React from 'react'
import { useDashboardStats } from '../../features/schedule/hooks/useDashboardStats'
import { Skeleton } from '../../components/ui/Skeleton'
import StatusChip from '../../components/ui/StatusChip'
import { Calendar, Users, Clock, TrendingUp, MapPin, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

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

const EVENT_TYPE_LABEL = {
  wedding: 'Pernikahan',
  birthday: 'Ulang Tahun',
  cultural: 'Budaya',
  corporate: 'Korporat',
  other: 'Lainnya',
}

export const AdminDashboardPage = () => {
  const { data: stats, isLoading } = useDashboardStats()
  const navigate = useNavigate()

  const upcoming = stats?.upcomingEvents || []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-primary">Dashboard Admin</h1>
        <p className="text-sm text-slate-muted mt-1">Overview operasional, revenue, dan statistik worker Fattah WO</p>
      </div>

      {/* Stat Cards */}
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

      {/* Upcoming Events */}
      <div className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-heading font-semibold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Event Mendatang
          </h2>
          <button
            onClick={() => navigate('/admin/schedule')}
            className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
          >
            Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {isLoading ? (
          <div className="divide-y divide-slate-100">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="px-6 py-4 flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-56" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
        ) : upcoming.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-slate-muted">
            Belum ada event mendatang yang dijadwalkan.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {upcoming.map((event) => {
              const dateObj = new Date(event.event_date + 'T00:00:00')
              const day = dateObj.toLocaleDateString('id-ID', { day: '2-digit' })
              const month = dateObj.toLocaleDateString('id-ID', { month: 'short' })
              return (
                <div
                  key={event.id}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => navigate('/admin/schedule')}
                >
                  {/* Date block */}
                  <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex flex-col items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-primary leading-none">{day}</span>
                    <span className="text-[10px] font-semibold text-slate-muted uppercase">{month}</span>
                  </div>
                  {/* Event details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{event.full_name}</p>
                    <p className="text-xs text-slate-muted flex items-center gap-1 mt-0.5">
                      <span className="font-medium text-slate-500">
                        {EVENT_TYPE_LABEL[event.reservation_type] || event.reservation_type}
                      </span>
                      {event.location && (
                        <>
                          <span className="text-slate-300">·</span>
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <StatusChip status={event.status} />
                    <StatusChip status={event.payment_status} />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboardPage
