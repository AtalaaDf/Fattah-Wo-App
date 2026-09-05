import React, { useState } from 'react';
import { Calendar, List, MapPin, Phone, MessageSquare, UserPlus, UserX, Clock, Users, Tag, Image as ImageIcon, Eye, CheckCircle2, ShieldAlert } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import StatusChip from '../../../components/ui/StatusChip';
import Modal from '../../../components/ui/Modal';
import { usePayment } from '../../payment/hooks/usePayment';

export const AdminScheduleMaster = ({
  events = [],
  workersList = [],
  isLoading = false,
  onAssignWorker,
  onRemoveWorker,
  isAssigning,
  isRemoving,
}) => {
  const [viewMode, setViewMode] = useState('list');
  const [selectedEventForAssign, setSelectedEventForAssign] = useState(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [selectedRoleNeeded, setSelectedRoleNeeded] = useState('');

  const [selectedWorkerToRemove, setSelectedWorkerToRemove] = useState(null);
  const [removeReason, setRemoveReason] = useState('');

  // Admin View Proof & Verification Modal
  const [selectedEventForProof, setSelectedEventForProof] = useState(null);
  const { adminUpdateStatus, isAdminUpdating } = usePayment(selectedEventForProof?.id);

  const handleOpenAssignModal = (event) => {
    setSelectedEventForAssign(event);
    setSelectedWorkerId('');
    setSelectedRoleNeeded('');
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!selectedWorkerId) return;
    await onAssignWorker({
      reservationId: selectedEventForAssign.id,
      workerId: selectedWorkerId,
      roleNeeded: selectedRoleNeeded || 'Kru Acara',
    });
    setSelectedEventForAssign(null);
  };

  const handleRemoveSubmit = async (e) => {
    e.preventDefault();
    if (!selectedWorkerToRemove) return;
    await onRemoveWorker({
      eventWorkerId: selectedWorkerToRemove.id,
      reason: removeReason,
    });
    setSelectedWorkerToRemove(null);
    setRemoveReason('');
  };

  const handleAdminUpdatePaymentStatus = async (targetReservationId, newPaymentStatus) => {
    await adminUpdateStatus({
      targetReservationId,
      paymentStatus: newPaymentStatus,
      adminNotes: `Verified by Admin on ${new Date().toLocaleDateString('id-ID')}`,
    });
    setSelectedEventForProof(null);
  };

  return (
    <div className="space-y-6">
      {/* View Toggle & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
              viewMode === 'list'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <List className="w-3.5 h-3.5" />
            List View
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
              viewMode === 'calendar'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Calendar View
          </button>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Total Event Acara: <span className="font-bold text-slate-800">{events.length}</span>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <Card className="py-12 text-center text-slate-500">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-semibold text-slate-700">Belum Ada Jadwal Reservasi Event</p>
          <p className="text-sm text-slate-400 mt-1">
            Reservasi acara yang masuk dari client akan muncul di halaman ini.
          </p>
        </Card>
      ) : viewMode === 'list' ? (
        /* List View */
        <div className="space-y-4">
          {events.map((event) => {
            const activeWorkers = (event.event_workers || []).filter((ew) => ew.status === 'assigned');
            const cancelRequests = (event.event_workers || []).filter((ew) => ew.status === 'cancel_requested');
            const cleanPhone = (event.phone || '').replace(/\D/g, '');
            const waUrl = cleanPhone ? `https://wa.me/${cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone}` : '#';

            return (
              <Card key={event.id} className="p-5">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-100 pb-4 mb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {event.ref_code || 'REF-N/A'}
                      </span>
                      <StatusChip status={event.status} />

                      {/* Admin Quick Select Dropdown for Payment Status */}
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
                          <option value="unpaid">🔴 Belum Bayar</option>
                          <option value="dp_paid">🟡 Sudah Bayar DP</option>
                          <option value="paid">🟢 Lunas</option>
                        </select>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900">{event.full_name}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-3">
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
                    {/* View Photo Proof Button */}
                    <button
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
                  </div>
                </div>

                {/* Assigned Staff Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      Staf Kru Ditugaskan ({activeWorkers.length} / {event.workers_needed} Orang):
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      {activeWorkers.length === 0 ? (
                        <span className="text-xs text-amber-600 font-medium italic bg-amber-50 px-2.5 py-1 rounded-md">
                          Belum ada worker mengambil/ditugaskan
                        </span>
                      ) : (
                        activeWorkers.map((ew) => {
                          const profile = ew.profiles || {};
                          return (
                            <div
                              key={ew.id}
                              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800"
                            >
                              <div className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center uppercase">
                                {profile.full_name?.charAt(0) || 'W'}
                              </div>
                              <span>{profile.full_name || 'Worker'}</span>
                              <button
                                onClick={() => setSelectedWorkerToRemove(ew)}
                                className="text-slate-400 hover:text-rose-600 ml-1"
                                title="Keluarkan worker dari event ini"
                              >
                                <UserX className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })
                      )}

                      {cancelRequests.length > 0 && (
                        <div className="text-xs text-rose-700 font-bold bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          ⚠️ {cancelRequests.length} worker mengajukan batal
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleOpenAssignModal(event)}
                    className="text-xs shrink-0"
                  >
                    <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                    Assign Staf Manual
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Calendar View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <Card key={event.id} className="p-4 border-l-4 border-l-primary">
              <div className="text-xs font-bold text-primary mb-1">
                {new Date(event.event_date).toLocaleDateString('id-ID', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                })}
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{event.full_name}</h4>
              <p className="text-xs text-slate-500 mt-1">{event.location || 'Lokasi N/A'}</p>
              <div className="mt-3 flex items-center justify-between">
                <StatusChip status={event.payment_status} />
                <span className="text-xs font-medium text-slate-600">
                  {event.event_workers?.length || 0}/{event.workers_needed} Kru
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Admin Verification & Proof View Modal */}
      <Modal
        isOpen={!!selectedEventForProof}
        onClose={() => setSelectedEventForProof(null)}
        title="Verifikasi Bukti Foto Pembayaran"
        maxWidth="max-w-lg"
      >
        <div className="space-y-4">
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs space-y-1">
            <p className="font-bold text-slate-900">{selectedEventForProof?.full_name}</p>
            <p className="text-slate-500">Ref: {selectedEventForProof?.ref_code}</p>
            <p className="text-slate-700 font-medium">
              Total Tagihan Paket: Rp {Number(selectedEventForProof?.bundles?.price || 5000000).toLocaleString('id-ID')}
            </p>
          </div>

          {/* Uploaded Receipt Photo View */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Foto Struk Bukti Transfer Client:
            </label>
            <div className="h-64 rounded-xl border border-slate-200 bg-slate-100 overflow-hidden flex items-center justify-center">
              {selectedEventForProof?.payments?.proof_url ? (
                <img
                  src={selectedEventForProof.payments.proof_url}
                  alt="Bukti Transfer"
                  className="w-full h-full object-contain bg-slate-950"
                />
              ) : (
                <div className="text-center text-slate-400 p-4">
                  <ImageIcon className="w-10 h-10 mx-auto mb-2 opacity-40" />
                  <p className="text-xs font-semibold">Client belum mengunggah foto bukti pembayaran</p>
                </div>
              )}
            </div>
          </div>

          {/* Admin Change Payment Status Controls */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Ubah Status Pembayaran (Khusus Admin):
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                disabled={isAdminUpdating}
                onClick={() => handleAdminUpdatePaymentStatus(selectedEventForProof.id, 'unpaid')}
                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
                  selectedEventForProof?.payment_status === 'unpaid'
                    ? 'bg-rose-500 text-white border-rose-600'
                    : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                }`}
              >
                🔴 Belum Bayar
              </button>

              <button
                type="button"
                disabled={isAdminUpdating}
                onClick={() => handleAdminUpdatePaymentStatus(selectedEventForProof.id, 'dp_paid')}
                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
                  selectedEventForProof?.payment_status === 'dp_paid'
                    ? 'bg-amber-500 text-white border-amber-600'
                    : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                }`}
              >
                🟡 Bayar DP
              </button>

              <button
                type="button"
                disabled={isAdminUpdating}
                onClick={() => handleAdminUpdatePaymentStatus(selectedEventForProof.id, 'paid')}
                className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${
                  selectedEventForProof?.payment_status === 'paid'
                    ? 'bg-emerald-600 text-white border-emerald-700'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                🟢 Lunas
              </button>
            </div>
          </div>

          <div className="flex justify-end pt-3">
            <Button variant="outline" onClick={() => setSelectedEventForProof(null)}>
              Tutup
            </Button>
          </div>
        </div>
      </Modal>

      {/* Assign Modal */}
      <Modal
        isOpen={!!selectedEventForAssign}
        onClose={() => setSelectedEventForAssign(null)}
        title="Assign Staf Kru ke Event"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAssignSubmit} className="space-y-4">
          <p className="text-xs text-slate-500">
            Tugaskan worker secara manual untuk acara{' '}
            <strong className="text-slate-800">{selectedEventForAssign?.full_name}</strong>.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Worker</label>
            <select
              value={selectedWorkerId}
              onChange={(e) => setSelectedWorkerId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              required
            >
              <option value="">-- Pilih Worker Aktif --</option>
              {workersList
                .filter((w) => w.is_active)
                .map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.full_name} (@{w.username})
                  </option>
                ))}
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

      {/* Remove Modal */}
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
    </div>
  );
};

export default AdminScheduleMaster;
