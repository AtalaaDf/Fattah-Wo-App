import React, { useState, useEffect } from 'react';
import { Calendar, List, MapPin, Phone, MessageSquare, UserPlus, UserX, Clock, Users, Tag, Image as ImageIcon, Eye, CheckCircle2, ShieldAlert, Search, Filter, Trash2 } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import StatusChip from '../../../components/ui/StatusChip';
import Modal from '../../../components/ui/Modal';
import { usePayment } from '../../payment/hooks/usePayment';
import { getPaymentProofSignedUrl } from '../../../lib/supabase/storage';

export const AdminScheduleMaster = ({
  events = [],
  workersList = [],
  isLoading = false,
  onAssignWorker,
  onRemoveWorker,
  onDeleteEvent,
  isAssigning,
  isRemoving,
  isDeleting,
}) => {
  const [viewMode, setViewMode] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [staffFilter, setStaffFilter] = useState('all');

  const [selectedEventForAssign, setSelectedEventForAssign] = useState(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState('');
  const [selectedRoleNeeded, setSelectedRoleNeeded] = useState('');

  const [selectedWorkerToRemove, setSelectedWorkerToRemove] = useState(null);
  const [removeReason, setRemoveReason] = useState('');

  const [selectedEventToDelete, setSelectedEventToDelete] = useState(null);

  // Admin View Proof & Verification Modal
  const [selectedEventForProof, setSelectedEventForProof] = useState(null);
  const [proofSignedUrl, setProofSignedUrl] = useState('');
  const [isLoadingProof, setIsLoadingProof] = useState(false);
  const { adminUpdateStatus, isAdminUpdating } = usePayment(selectedEventForProof?.id);

  const getPayment = (event) => {
    if (!event?.payments) return null;
    return Array.isArray(event.payments) ? (event.payments[0] ?? null) : event.payments;
  };

  useEffect(() => {
    async function fetchProofUrl() {
      const payment = getPayment(selectedEventForProof);
      const proofUrl = payment?.proof_url;

      if (proofUrl) {
        if (proofUrl.startsWith('http')) {
          setProofSignedUrl(proofUrl);
          return;
        }

        setIsLoadingProof(true);
        try {
          const signedUrl = await getPaymentProofSignedUrl(proofUrl);
          setProofSignedUrl(signedUrl);
        } catch (error) {
          console.error('Error fetching signed URL:', error);
          setProofSignedUrl('');
        } finally {
          setIsLoadingProof(false);
        }
      } else {
        setProofSignedUrl('');
      }
    }
    fetchProofUrl();
  }, [selectedEventForProof]);

  const filteredEvents = events.filter((event) => {
    const activeWorkers = (event.event_workers || []).filter((ew) => ew.status === 'assigned');
    const matchesSearch =
      event.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.ref_code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.bundles?.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPayment =
      paymentFilter === 'all' || event.payment_status === paymentFilter;

    const matchesStaff =
      staffFilter === 'all' ||
      (staffFilter === 'needs_staff' && activeWorkers.length < (event.workers_needed || 1)) ||
      (staffFilter === 'staff_full' && activeWorkers.length >= (event.workers_needed || 1));

    return matchesSearch && matchesPayment && matchesStaff;
  });

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

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    if (!selectedEventToDelete || !onDeleteEvent) return;
    await onDeleteEvent(selectedEventToDelete.id);
    setSelectedEventToDelete(null);
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
      {/* View Toggle & Filter Controls Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto flex-1">
          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg shrink-0">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              List
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-1.5 transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              Kalender
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama client, ref code, lokasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
            />
          </div>

          {/* Payment Status Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
          >
            <option value="all">Semua Status Bayar</option>
            <option value="unpaid">Belum Bayar</option>
            <option value="dp_paid">DP Paid</option>
            <option value="paid">Lunas</option>
          </select>

          {/* Staffing Filter */}
          <select
            value={staffFilter}
            onChange={(e) => setStaffFilter(e.target.value)}
            className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
          >
            <option value="all">Semua Kuota Kru</option>
            <option value="needs_staff">Butuh Tambahan Kru</option>
            <option value="staff_full">Kuota Kru Lengkap</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 font-medium shrink-0">
          Ditampilkan: <span className="font-bold text-slate-800">{filteredEvents.length}</span> / {events.length} Event
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-44 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filteredEvents.length === 0 ? (
        <Card className="py-12 text-center text-slate-500">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-semibold text-slate-700">Tidak ada jadwal reservasi event ditemukan</p>
          <p className="text-sm text-slate-400 mt-1">
            {searchTerm || paymentFilter !== 'all' || staffFilter !== 'all'
              ? 'Coba ubah kata kunci pencarian atau filter status.'
              : 'Reservasi acara yang masuk dari client akan muncul di halaman ini.'}
          </p>
        </Card>
      ) : viewMode === 'list' ? (
        /* List View */
        <div className="space-y-4">
          {filteredEvents.map((event) => {
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
                          <option value="unpaid">Belum Bayar</option>
                          <option value="dp_paid">Sudah Bayar DP</option>
                          <option value="paid">Lunas</option>
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

                {/* Assigned Staff Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      Staf Kru Ditugaskan ({activeWorkers.length} / {event.workers_needed} Orang):
                    </p>

                    <div className="flex flex-wrap items-center gap-2">
                      {activeWorkers.length === 0 && cancelRequests.length === 0 ? (
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

                      {/* Cancel Request Approval Items */}
                      {cancelRequests.map((ew) => {
                        const profile = ew.profiles || {};
                        return (
                          <div
                            key={ew.id}
                            className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-800"
                          >
                            <span className="flex items-center gap-1">
                              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                              {profile.full_name || 'Worker'} (Ajukan Batal)
                            </span>
                            <button
                              type="button"
                              onClick={() => onRemoveWorker({ eventWorkerId: ew.id, reason: 'Pengajuan pembatalan worker disetujui Admin' })}
                              className="px-2 py-0.5 rounded-md bg-rose-600 hover:bg-rose-700 text-white text-[10px] font-bold transition-colors"
                              title="Setujui pembatalan worker ini"
                            >
                              Setujui Batal
                            </button>
                          </div>
                        );
                      })}
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
          {filteredEvents.map((event) => (
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
              {isLoadingProof ? (
                <div className="text-center text-slate-400 p-4">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-xs font-semibold">Memuat foto...</p>
                </div>
              ) : proofSignedUrl ? (
                <a href={proofSignedUrl} target="_blank" rel="noopener noreferrer" className="w-full h-full block">
                  <img
                    src={proofSignedUrl}
                    alt="Bukti Transfer"
                    className="w-full h-full object-contain bg-slate-950 hover:opacity-90 transition-opacity cursor-pointer"
                  />
                </a>
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
                Belum Bayar
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
                Bayar DP
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
                Lunas
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
              {(() => {
                const assignedWorkerIds = (selectedEventForAssign?.event_workers || [])
                  .filter((ew) => ew.status === 'assigned' || ew.status === 'cancel_requested')
                  .map((ew) => ew.worker_id);

                return workersList
                  .filter((w) => w.is_active && !assignedWorkerIds.includes(w.id))
                  .map((w) => {
                    const details = Array.isArray(w.worker_details) ? w.worker_details[0] || {} : w.worker_details || {};
                    const isAvailable = details.is_available ?? true;
                    return (
                      <option key={w.id} value={w.id}>
                        {w.full_name} (@{w.username}) — {isAvailable ? 'Siap Kerja' : 'Sedang Libur'}
                      </option>
                    );
                  });
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

      {/* Delete Event Confirmation Modal */}
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
    </div>
  );
};

export default AdminScheduleMaster;
