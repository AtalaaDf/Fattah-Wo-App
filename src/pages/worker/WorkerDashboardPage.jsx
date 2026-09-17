import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useWorkerDashboard } from '../../features/schedule/hooks/useWorkerDashboard'
import { useAuthStore } from '../../store/useAuthStore'
import { Skeleton } from '../../components/ui/Skeleton'
import StatusChip from '../../components/ui/StatusChip'
import {
  CheckCircle2, Calendar, Clock, AlertCircle, MapPin,
  Briefcase, ChevronRight, UserCheck,
} from 'lucide-react'

const EVENT_TYPE_LABEL = {
  wedding: 'Pernikahan',
  birthday: 'Ulang Tahun',
  cultural: 'Budaya',
  corporate: 'Korporat',
  other: 'Lainnya',
}

const StatCard = ({ label, value, icon: Icon, iconBg, iconColor, isLoading }) => (
  <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</p>
        {isLoading ? (
          <Skeleton className="h-9 w-14 mt-2" />
        ) : (
          <p className="text-3xl font-bold text-primary mt-2">{value}</p>
        )}
      </div>
      <div className={`p-3 rounded-xl ${iconBg}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
    </div>
  </div>
)

export const WorkerDashboardPage = () => {
  const navigate = useNavigate()
  const profile = useAuthStore((state) => state.profile)
  const { data: stats, isLoading } = useWorkerDashboard()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Halo, {profile?.full_name?.split(' ')[0] || 'Worker'} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Ringkasan statistik kerja dan jadwal acara terdekat Anda.
          </p>
        </div>
        <button
          onClick={() => navigate('/worker/profile')}
          className="hidden sm:flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 border border-primary/20 rounded-lg px-3 py-2 hover:bg-primary/5 transition-colors"
        >
          <UserCheck className="w-3.5 h-3.5" />
          Edit Profil
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          label="Event Selesai"
          value={stats?.completedCount ?? 0}
          icon={CheckCircle2}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          isLoading={isLoading}
        />
        <StatCard
          label="Jadwal Mendatang"
          value={stats?.upcomingCount ?? 0}
          icon={Calendar}
          iconBg="bg-primary/10"
          iconColor="text-primary"
          isLoading={isLoading}
        />
        <StatCard
          label="Ajuan Pembatalan"
          value={stats?.cancelRequestedCount ?? 0}
          icon={AlertCircle}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          isLoading={isLoading}
        />
      </div>

      {/* Upcoming Events */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="font-semibold text-slate-900 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            Jadwal Mendatang Saya
          </h2>
          <button
            onClick={() => navigate('/worker/schedule')}
            className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
          >
            Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {isLoading ? (
          <div className="divide-y divide-slate-100">
            {[...Array(3)].map((_, i) => (
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
        ) : stats?.upcomingEvents?.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <Briefcase className="w-10 h-10 text-slate-200 mx-auto mb-3" />
            <p className="font-semibold text-slate-600 text-sm">Belum Ada Jadwal Mendatang</p>
            <p className="text-xs text-slate-400 mt-1 mb-4">Ambil job dari halaman Available Opportunities</p>
            <button
              onClick={() => navigate('/worker/list')}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Briefcase className="w-3.5 h-3.5" />
              Lihat Kesempatan Kerja
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {stats.upcomingEvents.map((ew) => {
              const res = ew.reservations
              if (!res) return null
              const dateObj = new Date(res.event_date + 'T00:00:00')
              const day = dateObj.toLocaleDateString('id-ID', { day: '2-digit' })
              const month = dateObj.toLocaleDateString('id-ID', { month: 'short' })
              return (
                <div
                  key={ew.id}
                  className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => navigate('/worker/schedule')}
                >
                  {/* Date block */}
                  <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex flex-col items-center justify-center shrink-0">
                    <span className="text-lg font-bold text-primary leading-none">{day}</span>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">{month}</span>
                  </div>
                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{res.full_name}</p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 shrink-0" />
                      <span>{res.start_time ? res.start_time.slice(0, 5) : '–'}</span>
                      <span className="text-slate-300">·</span>
                      <span className="font-medium text-slate-500">
                        {EVENT_TYPE_LABEL[res.reservation_type] || res.reservation_type}
                      </span>
                      {res.location && (
                        <>
                          <span className="text-slate-300">·</span>
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="truncate">{res.location}</span>
                        </>
                      )}
                    </p>
                    {ew.role_needed && (
                      <span className="inline-block mt-1 text-[10px] font-semibold text-primary bg-primary/8 border border-primary/15 rounded-full px-2 py-0.5">
                        {ew.role_needed}
                      </span>
                    )}
                  </div>
                  <div className="shrink-0">
                    <StatusChip status={ew.status} />
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

export default WorkerDashboardPage
