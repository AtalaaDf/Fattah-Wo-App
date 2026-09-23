import React from 'react'
import { Calendar, MapPin, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Skeleton } from '../../../components/ui/Skeleton'
import StatusChip from '../../../components/ui/StatusChip'

const EVENT_TYPE_LABEL = {
  wedding: 'Pernikahan',
  birthday: 'Ulang Tahun',
  cultural: 'Budaya',
  corporate: 'Korporat',
  other: 'Lainnya',
}

const EventRow = ({ event, onClick }) => {
  const dateObj = new Date(event.event_date + 'T00:00:00')
  const day = dateObj.toLocaleDateString('id-ID', { day: '2-digit' })
  const month = dateObj.toLocaleDateString('id-ID', { month: 'short' })

  return (
    <div
      className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-xl bg-primary/5 border border-primary/10 flex flex-col items-center justify-center shrink-0">
        <span className="text-lg font-bold text-primary leading-none">{day}</span>
        <span className="text-[10px] font-semibold text-slate-muted uppercase">{month}</span>
      </div>
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
}

const UpcomingEventsContent = ({ upcoming, isLoading, onEventClick }) => {
  if (isLoading) {
    return (
      <div className="divide-y divide-slate-100">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="px-6 py-4 flex items-center gap-4">
            <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-56" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>
    )
  }

  if (upcoming.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-sm text-slate-muted">
        Belum ada event mendatang yang dijadwalkan.
      </div>
    )
  }

  return (
    <div className="divide-y divide-slate-100">
      {upcoming.map((event) => (
        <EventRow key={event.id} event={event} onClick={onEventClick} />
      ))}
    </div>
  )
}

export const UpcomingEventsSection = ({ upcoming, isLoading }) => {
  const navigate = useNavigate()
  const goToSchedule = () => navigate('/admin/schedule')

  return (
    <div className="bg-white border border-outline-variant rounded-xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="font-heading font-semibold text-slate-900 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          Event Mendatang
        </h2>
        <button
          type="button"
          onClick={goToSchedule}
          className="text-xs font-semibold text-primary hover:text-primary/80 flex items-center gap-1 transition-colors"
        >
          Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
      <UpcomingEventsContent upcoming={upcoming} isLoading={isLoading} onEventClick={goToSchedule} />
    </div>
  )
}

export default UpcomingEventsSection
