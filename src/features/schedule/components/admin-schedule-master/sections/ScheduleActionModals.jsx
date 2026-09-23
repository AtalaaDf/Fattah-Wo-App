import React from 'react'
import { AlertTriangle, ShieldAlert } from 'lucide-react'
import Button from '../../../../../components/ui/Button'
import Modal from '../../../../../components/ui/Modal'

export const AssignConflictModal = ({ assignError, setAssignError }) => (
  <Modal
    isOpen={!!assignError}
    onClose={() => setAssignError('')}
    title="Worker Tidak Dapat Ditugaskan"
    maxWidth="max-w-md"
  >
    <div className="space-y-4 text-center">
      <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <p className="text-sm font-medium text-slate-800">{assignError}</p>
      <Button type="button" onClick={() => setAssignError('')} className="w-full flex-row">
        Mengerti
      </Button>
    </div>
  </Modal>
)

export const RemoveWorkerModal = ({ selectedWorkerToRemove, setSelectedWorkerToRemove, removeReason, setRemoveReason, handleRemoveSubmit, isRemoving }) => (
  <Modal
    isOpen={!!selectedWorkerToRemove}
    onClose={() => setSelectedWorkerToRemove(null)}
    title="Keluarkan Worker dari Event"
    maxWidth="max-w-md"
  >
    <form onSubmit={handleRemoveSubmit} className="space-y-4">
      <p className="text-xs text-slate-600">
        Apakah Anda yakin ingin mengeluarkan{' '}
        <strong className="text-slate-900">{selectedWorkerToRemove?.profiles?.full_name}</strong> dari acara ini?
      </p>
      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Alasan Penghapusan (Opsional)</label>
        <input
          type="text"
          placeholder="Contoh: Permintaan pembatalan disetujui"
          value={removeReason}
          onChange={(e) => setRemoveReason(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
        <Button type="button" variant="outline" onClick={() => setSelectedWorkerToRemove(null)}>
          Batal
        </Button>
        <Button type="submit" variant="ghost" className="text-rose-600 bg-rose-50 hover:bg-rose-100" isLoading={isRemoving}>
          Keluarkan Worker
        </Button>
      </div>
    </form>
  </Modal>
)

export const DeleteEventModal = ({ selectedEventToDelete, setSelectedEventToDelete, handleDeleteSubmit, isDeleting }) => (
  <Modal
    isOpen={!!selectedEventToDelete}
    onClose={() => setSelectedEventToDelete(null)}
    title="Konfirmasi Hapus Event Reservasi"
    maxWidth="max-w-md"
  >
    <form onSubmit={handleDeleteSubmit} className="space-y-4">
      <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 space-y-1.5">
        <p className="font-bold flex items-center gap-1.5 text-rose-900">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
          Peringatan Penghapusan Event Permanen
        </p>
        <p className="text-[11px] text-rose-700 leading-relaxed">
          Jika pembayaran/pelunasan belum dilakukan hingga melewati tanggal tunda atau tanggal event, Admin berhak menghapus event ini secara permanen.
        </p>
      </div>
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
        <p className="text-slate-500">Klien: <strong className="text-slate-900">{selectedEventToDelete?.full_name}</strong></p>
        <p className="text-slate-500">Ref Code: <span className="font-mono text-slate-700 font-bold">{selectedEventToDelete?.ref_code}</span></p>
        <p className="text-slate-500">Tanggal Acara: <strong className="text-slate-900">{selectedEventToDelete?.event_date}</strong></p>
        <p className="text-slate-500">Status Bayar: <span className="capitalize font-bold text-rose-600">{selectedEventToDelete?.payment_status}</span></p>
      </div>
      <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
        <Button type="button" variant="outline" onClick={() => setSelectedEventToDelete(null)}>
          Batal
        </Button>
        <Button type="submit" variant="danger" isLoading={isDeleting}>
          Ya, Hapus Event Ini
        </Button>
      </div>
    </form>
  </Modal>
)
