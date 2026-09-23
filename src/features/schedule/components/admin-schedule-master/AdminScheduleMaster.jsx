import React, { useEffect, useState } from 'react'
import Card from '../../../../components/ui/Card'
import { Calendar } from 'lucide-react'
import { usePayment } from '../../../payment/hooks/usePayment'
import { getPaymentProofSignedUrl } from '../../../../lib/supabase/storage'
import ScheduleFilterSection from './sections/ScheduleFilterSection'
import ScheduleEventSection from './sections/ScheduleEventSection'
import ProofVerificationModal from './sections/ProofVerificationModal'
import AssignWorkerModal from './sections/AssignWorkerModal'
import { AssignConflictModal, RemoveWorkerModal, DeleteEventModal } from './sections/ScheduleActionModals'

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
  const [searchTerm, setSearchTerm] = useState('')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [staffFilter, setStaffFilter] = useState('all')
  const [selectedEventForAssign, setSelectedEventForAssign] = useState(null)
  const [selectedWorkerId, setSelectedWorkerId] = useState('')
  const [selectedRoleNeeded, setSelectedRoleNeeded] = useState('')
  const [assignError, setAssignError] = useState('')
  const [selectedWorkerToRemove, setSelectedWorkerToRemove] = useState(null)
  const [removeReason, setRemoveReason] = useState('')
  const [selectedEventToDelete, setSelectedEventToDelete] = useState(null)
  const [selectedEventForProof, setSelectedEventForProof] = useState(null)
  const [proofSignedUrl, setProofSignedUrl] = useState('')
  const [isLoadingProof, setIsLoadingProof] = useState(false)
  const { adminUpdateStatus, isAdminUpdating } = usePayment(selectedEventForProof?.id)

  const getPayment = (event) => {
    if (!event?.payments) return null
    return Array.isArray(event.payments) ? (event.payments[0] ?? null) : event.payments
  }

  useEffect(() => {
    async function fetchProofUrl() {
      const payment = getPayment(selectedEventForProof)
      const proofUrl = payment?.proof_url

      if (proofUrl) {
        if (proofUrl.startsWith('http')) {
          setProofSignedUrl(proofUrl)
          return
        }

        setIsLoadingProof(true)
        try {
          const signedUrl = await getPaymentProofSignedUrl(proofUrl)
          setProofSignedUrl(signedUrl)
        } catch (error) {
          console.error('Error fetching signed URL:', error)
          setProofSignedUrl('')
        } finally {
          setIsLoadingProof(false)
        }
      } else {
        setProofSignedUrl('')
      }
    }

    fetchProofUrl()
  }, [selectedEventForProof])

  const filteredEvents = events.filter((event) => {
    const activeWorkers = (event.event_workers || []).filter((eventWorker) => eventWorker.status === 'assigned')
    const search = searchTerm.toLowerCase()
    const matchesSearch =
      event.full_name?.toLowerCase().includes(search) ||
      event.ref_code?.toLowerCase().includes(search) ||
      event.location?.toLowerCase().includes(search) ||
      event.bundles?.name?.toLowerCase().includes(search)
    const matchesPayment = paymentFilter === 'all' || event.payment_status === paymentFilter
    const matchesStaff =
      staffFilter === 'all' ||
      (staffFilter === 'needs_staff' && activeWorkers.length < (event.workers_needed || 1)) ||
      (staffFilter === 'staff_full' && activeWorkers.length >= (event.workers_needed || 1))

    return matchesSearch && matchesPayment && matchesStaff
  })

  const handleOpenAssignModal = (event) => {
    setSelectedEventForAssign(event)
    setSelectedWorkerId('')
    setSelectedRoleNeeded('')
    setAssignError('')
  }

  const handleAssignSubmit = async (event) => {
    event.preventDefault()
    if (!selectedWorkerId) return

    try {
      await onAssignWorker({
        reservationId: selectedEventForAssign.id,
        workerId: selectedWorkerId,
        roleNeeded: selectedRoleNeeded || 'Kru Acara',
      })
      setSelectedEventForAssign(null)
    } catch (error) {
      const message = error?.message || ''
      if (message.includes('schedule_conflict')) {
        setAssignError('Worker tersebut sudah memiliki pekerjaan pada tanggal acara ini. Pilih worker lain atau tanggal event yang berbeda.')
      } else if (message.includes('event_full')) {
        setAssignError('Kuota worker untuk event ini sudah penuh.')
      } else if (message.includes('worker_inactive')) {
        setAssignError('Worker tersebut sedang dibekukan dan tidak dapat ditugaskan.')
      } else {
        setAssignError(message || 'Worker gagal ditugaskan. Silakan coba lagi.')
      }
    }
  }

  const handleRemoveSubmit = async (event) => {
    event.preventDefault()
    if (!selectedWorkerToRemove) return
    await onRemoveWorker({
      eventWorkerId: selectedWorkerToRemove.id,
      reason: removeReason,
    })
    setSelectedWorkerToRemove(null)
    setRemoveReason('')
  }

  const handleDeleteSubmit = async (event) => {
    event.preventDefault()
    if (!selectedEventToDelete || !onDeleteEvent) return
    await onDeleteEvent(selectedEventToDelete.id)
    setSelectedEventToDelete(null)
  }

  const handleAdminUpdatePaymentStatus = async (targetReservationId, newPaymentStatus) => {
    await adminUpdateStatus({
      targetReservationId,
      paymentStatus: newPaymentStatus,
      adminNotes: `Verified by Admin on ${new Date().toLocaleDateString('id-ID')}`,
    })
    setSelectedEventForProof(null)
  }

  return (
    <div className="space-y-6">
      <ScheduleFilterSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        staffFilter={staffFilter}
        setStaffFilter={setStaffFilter}
        totalEvents={events.length}
        filteredEventsCount={filteredEvents.length}
      />

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((index) => (
            <div key={index} className="h-44 bg-slate-100 rounded-xl animate-pulse" />
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
      ) : (
        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <ScheduleEventSection
              key={event.id}
              event={event}
              handleAdminUpdatePaymentStatus={handleAdminUpdatePaymentStatus}
              setSelectedEventForProof={setSelectedEventForProof}
              setSelectedEventToDelete={setSelectedEventToDelete}
              handleOpenAssignModal={handleOpenAssignModal}
              setSelectedWorkerToRemove={setSelectedWorkerToRemove}
              onRemoveWorker={onRemoveWorker}
            />
          ))}
        </div>
      )}

      <ProofVerificationModal
        selectedEventForProof={selectedEventForProof}
        setSelectedEventForProof={setSelectedEventForProof}
        proofSignedUrl={proofSignedUrl}
        isLoadingProof={isLoadingProof}
        isAdminUpdating={isAdminUpdating}
        handleAdminUpdatePaymentStatus={handleAdminUpdatePaymentStatus}
      />
      <AssignWorkerModal
        selectedEventForAssign={selectedEventForAssign}
        setSelectedEventForAssign={setSelectedEventForAssign}
        workersList={workersList}
        selectedWorkerId={selectedWorkerId}
        setSelectedWorkerId={setSelectedWorkerId}
        selectedRoleNeeded={selectedRoleNeeded}
        setSelectedRoleNeeded={setSelectedRoleNeeded}
        setAssignError={setAssignError}
        handleAssignSubmit={handleAssignSubmit}
        isAssigning={isAssigning}
      />
      <AssignConflictModal assignError={assignError} setAssignError={setAssignError} />
      <RemoveWorkerModal
        selectedWorkerToRemove={selectedWorkerToRemove}
        setSelectedWorkerToRemove={setSelectedWorkerToRemove}
        removeReason={removeReason}
        setRemoveReason={setRemoveReason}
        handleRemoveSubmit={handleRemoveSubmit}
        isRemoving={isRemoving}
      />
      <DeleteEventModal
        selectedEventToDelete={selectedEventToDelete}
        setSelectedEventToDelete={setSelectedEventToDelete}
        handleDeleteSubmit={handleDeleteSubmit}
        isDeleting={isDeleting}
      />
    </div>
  )
}

export default AdminScheduleMaster
