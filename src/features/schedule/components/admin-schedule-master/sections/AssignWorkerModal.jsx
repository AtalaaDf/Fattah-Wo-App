import React from 'react'
import { Calendar } from 'lucide-react'
import Button from '../../../../../components/ui/Button'
import Modal from '../../../../../components/ui/Modal'

export const AssignWorkerModal = ({
  selectedEventForAssign,
  setSelectedEventForAssign,
  workersList,
  selectedWorkerId,
  setSelectedWorkerId,
  selectedRoleNeeded,
  setSelectedRoleNeeded,
  setAssignError,
  handleAssignSubmit,
  isAssigning,
}) => (
  <Modal
    isOpen={!!selectedEventForAssign}
    onClose={() => {
      setSelectedEventForAssign(null)
      setAssignError('')
    }}
    title="Assign Staf Kru ke Event"
    maxWidth="max-w-md"
  >
    <form onSubmit={handleAssignSubmit} className="space-y-4">
      <p className="text-xs text-slate-500">
        Tugaskan worker secara manual untuk acara{' '}
        <strong className="text-slate-800">{selectedEventForAssign?.full_name}</strong>.
      </p>
      <div className="flex items-center gap-2 rounded-lg bg-primary/5 border border-primary/10 px-3 py-2 text-xs font-semibold text-primary">
        <Calendar className="w-4 h-4 shrink-0" />
        <span>
          Tanggal acara: {selectedEventForAssign?.event_date
            ? new Date(selectedEventForAssign.event_date).toLocaleDateString('id-ID', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
              })
            : '-'}
        </span>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Worker</label>
        <select
          value={selectedWorkerId}
          onChange={(e) => setSelectedWorkerId(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
          required
        >
          <option value="">-- Pilih Worker Aktif --</option>
          {(() => {
            const assignedWorkerIds = (selectedEventForAssign?.event_workers || [])
              .filter((eventWorker) => eventWorker.status === 'assigned' || eventWorker.status === 'cancel_requested')
              .map((eventWorker) => eventWorker.worker_id)

            return workersList
              .filter((worker) => worker.is_active && !assignedWorkerIds.includes(worker.id))
              .map((worker) => {
                const details = Array.isArray(worker.worker_details) ? worker.worker_details[0] || {} : worker.worker_details || {}
                const isAvailable = details.is_available ?? true
                return (
                  <option key={worker.id} value={worker.id}>
                    {worker.full_name} (@{worker.username}) — {isAvailable ? 'Siap Kerja' : 'Sedang Libur'}
                  </option>
                )
              })
          })()}
        </select>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Peran / Tugas (Opsional)</label>
        <input
          type="text"
          placeholder="Contoh: Event Coordinator, Usher, Sound Master"
          value={selectedRoleNeeded}
          onChange={(e) => setSelectedRoleNeeded(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
        <Button type="button" variant="outline" onClick={() => setSelectedEventForAssign(null)}>
          Batal
        </Button>
        <Button type="submit" isLoading={isAssigning}>
          Tugaskan Worker
        </Button>
      </div>
    </form>
  </Modal>
)

export default AssignWorkerModal
