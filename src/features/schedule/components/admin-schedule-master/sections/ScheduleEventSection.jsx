import React from 'react'
import { Calendar, MapPin, MessageSquare, UserPlus, UserX, Users, Tag, Image as ImageIcon, AlertTriangle, Trash2 } from 'lucide-react'
import Card from '../../../../../components/ui/Card'
import Button from '../../../../../components/ui/Button'
import StatusChip from '../../../../../components/ui/StatusChip'

const AppointmentStatusBadge = ({ event, handleAdminUpdatePaymentStatus }) => (
  <div className="flex items-center gap-1">
    <select
      value={event.payment_status || 'unpaid'}
      onChange={(e) => handleAdminUpdatePaymentStatus(event.id, e.target.value)}
      className={`text-xs font-bold px-2 py-0.5 rounded-full border focus:outline-none cursor-pointer ${
        event.payment_status === 'paid'
          ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
          : event.payment_status === 'dp_paid'
          ? 'bg-amber-50 text-amber-700 border-amber-300'
          : 'bg-rose-50 text-rose-700 border-rose-300'
      }`}
    >
      <option value="unpaid">Belum Bayar</option>
      <option value="dp_paid">Sudah Bayar DP</option>
      <option value="paid">Lunas</option>
    </select>
  </div>
)

const EventWorkerChips = ({ activeWorkers, cancelRequests, setSelectedWorkerToRemove, onRemoveWorker }) => (
  <div className="flex flex-wrap items-center gap-2">
    {activeWorkers.length === 0 && cancelRequests.length === 0 ? (
      <span className="text-xs text-amber-600 font-medium italic bg-amber-50 px-2.5 py-1 rounded-md">
        Belum ada worker mengambil/ditugaskan
      </span>
    ) : (
      activeWorkers.map((eventWorker) => {
        const profile = eventWorker.profiles || {}
        return (
          <div
            key={eventWorker.id}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800"
          >
            <div className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center uppercase">
              {profile.full_name?.charAt(0) || 'W'}
            </div>
            <span>{profile.full_name || 'Worker'}</span>
            <button
              type="button"
              onClick={() => setSelectedWorkerToRemove(eventWorker)}
              className="text-slate-400 hover:text-rose-600 ml-1"
              title="Keluarkan worker dari event ini"
            >
              <UserX className="w-3.5 h-3.5" />
            </button>
          </div>
        )
      })
    )}

    {cancelRequests.map((eventWorker) => {
      const profile = eventWorker.profiles || {}
      return (
        <div
          key={eventWorker.id}
          className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800"
        >
          <span className="flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            {profile.full_name || 'Worker'} (Ajukan Batal)
          </span>
          <button
            type="button"
            onClick={() => onRemoveWorker({ eventWorkerId: eventWorker.id, reason: 'Pengajuan pembatalan worker disetujui Admin' })}
            className="px-2 py-0.5 rounded-md bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold transition-colors"
            title="Setujui pembatalan worker ini"
          >
            Setujui Batal
          </button>
        </div>
      )
    })}
  </div>
)

export const ScheduleEventSection = ({
  event,
  handleAdminUpdatePaymentStatus,
  setSelectedEventForProof,
  setSelectedEventToDelete,
  handleOpenAssignModal,
  setSelectedWorkerToRemove,
  onRemoveWorker,
}) => {
  const activeWorkers = (event.event_workers || []).filter((eventWorker) => eventWorker.status === 'assigned')
  const cancelRequests = (event.event_workers || []).filter((eventWorker) => eventWorker.status === 'cancel_requested')
  const cleanPhone = (event.phone || '').replace(/\D/g, '')
  const waUrl = cleanPhone ? `https://wa.me/${cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone}` : '#'

  return (
    <Card className="p-5">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-100 pb-4 mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {event.ref_code || 'REF-N/A'}
            </span>
            <StatusChip status={event.status} />
            <AppointmentStatusBadge event={event} handleAdminUpdatePaymentStatus={handleAdminUpdatePaymentStatus} />
          </div>

          <h3 className="text-lg font-bold text-slate-900">{event.full_name}</h3>
          <p className="text-xs text-slate-500 flex items-center gap-3">
            <span className="flex items-center gap-1 font-semibold text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              {new Date(event.event_date).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              {event.reservation_type} {event.bundles?.name ? `(${event.bundles.name})` : ''}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {event.location || 'Lokasi belum diisi'}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setSelectedEventForProof(event)}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
          >
            <ImageIcon className="w-4 h-4 text-slate-500" />
            Bukti Foto Bayar
          </button>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            Chat WA Client
          </a>

          <button
            type="button"
            onClick={() => setSelectedEventToDelete(event)}
            className="px-3 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
            title="Hapus Event"
          >
            <Trash2 className="w-4 h-4 text-rose-600" />
            Hapus Event
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" />
            Staf Kru Ditugaskan ({activeWorkers.length} / {event.workers_needed} Orang):
          </p>

          <EventWorkerChips
            activeWorkers={activeWorkers}
            cancelRequests={cancelRequests}
            setSelectedWorkerToRemove={setSelectedWorkerToRemove}
            onRemoveWorker={onRemoveWorker}
          />
        </div>

        <Button
          size="sm"
          variant="outline"
          leftIcon={<UserPlus className="w-3.5 h-3.5" />}
          onClick={() => handleOpenAssignModal(event)}
          className="text-xs shrink-0 flex-row whitespace-nowrap"
        >
          Assign Staf Manual
        </Button>
      </div>
    </Card>
  )
}

export default ScheduleEventSection
