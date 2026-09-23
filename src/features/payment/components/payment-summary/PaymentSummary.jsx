import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { uploadPaymentProof } from '../../../../lib/supabase/storage'
import { toast } from 'sonner'
import PostponePaymentModal from '../PostponePaymentModal'
import { PAYMENT_METHODS } from '../../data/paymentData'
import PaymentEmptyState from './sections/PaymentEmptyState'
import ReservationSummarySection from './sections/ReservationSummarySection'
import PaymentTypeSection from './sections/PaymentTypeSection'
import PaymentMethodSection from './sections/PaymentMethodSection'
import ProofUploadSection from './sections/ProofUploadSection'
import PaymentActionsSection from './sections/PaymentActionsSection'
import PaymentStatusSection from './sections/PaymentStatusSection'
import PaymentPostponeBanner from './sections/PaymentPostponeBanner'
import UploadConfirmationModal from './sections/UploadConfirmationModal'
import Card from '../../../../components/ui/Card'

export const PaymentSummary = ({ reservation, payment, onSubmitProof, onPostpone, isSubmittingProof, isPostponing }) => {
  const navigate = useNavigate()
  const [paymentType, setPaymentType] = useState('full')
  const [selectedMethodId, setSelectedMethodId] = useState('bca')
  const [copiedAccount, setCopiedAccount] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)
  const [isPostponeModalOpen, setIsPostponeModalOpen] = useState(false)
  const [isUploadConfirmationOpen, setIsUploadConfirmationOpen] = useState(false)

  if (!reservation) return <PaymentEmptyState />

  const bundle = reservation.bundles || {}
  const adminVerifiedAmount = payment?.total_amount
  const estimatedAmount = bundle.price || 0
  const displayAmount = adminVerifiedAmount || estimatedAmount
  const currentStatus = reservation.payment_status || 'unpaid'
  const currentMethodObj = PAYMENT_METHODS.find((method) => method.id === selectedMethodId) || PAYMENT_METHODS[0]

  const handleCopyAccount = (number) => {
    navigator.clipboard.writeText(number.replace(/\D/g, ''))
    setCopiedAccount(true)
    toast.success('Nomor rekening berhasil disalin!')
    setTimeout(() => setCopiedAccount(false), 2500)
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return
    setSelectedFile(file)
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => setFilePreview(reader.result)
      reader.readAsDataURL(file)
    } else {
      setFilePreview(null)
    }
  }

  const clearFileSelection = () => {
    setSelectedFile(null)
    setFilePreview(null)
  }

  const handleProofSubmit = async (event) => {
    event.preventDefault()
    if (!selectedFile) return
    setIsUploading(true)
    try {
      const proofUrl = await uploadPaymentProof(reservation.id, selectedFile)
      await onSubmitProof({
        proofUrl,
        method: currentMethodObj.methodEnum,
        paymentType,
      })
      clearFileSelection()
      setIsUploadConfirmationOpen(true)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <ReservationSummarySection
        reservation={reservation}
        bundle={bundle}
        payment={payment}
        currentStatus={currentStatus}
      />

      {currentStatus !== 'paid' ? (
        <form onSubmit={handleProofSubmit} className="space-y-5">
          <Card className="space-y-5">
            <PaymentTypeSection
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              displayAmount={displayAmount}
            />
            <PaymentMethodSection
              selectedMethodId={selectedMethodId}
              setSelectedMethodId={setSelectedMethodId}
              currentMethodObj={currentMethodObj}
              onCopyAccount={handleCopyAccount}
              copiedAccount={copiedAccount}
            />
            <ProofUploadSection
              selectedFile={selectedFile}
              filePreview={filePreview}
              fileInputRef={fileInputRef}
              onFileChange={handleFileChange}
              onClearSelection={clearFileSelection}
            />
            <PaymentActionsSection
              onPostpone={() => setIsPostponeModalOpen(true)}
              isSubmittingProof={isSubmittingProof}
              isUploading={isUploading}
              selectedFile={selectedFile}
            />
          </Card>
        </form>
      ) : (
        <PaymentStatusSection />
      )}

      <PaymentPostponeBanner payment={payment} />

      <PostponePaymentModal
        isOpen={isPostponeModalOpen}
        onClose={() => setIsPostponeModalOpen(false)}
        onConfirmPostpone={async ({ dpDueDate, fullDueDate }) => {
          await onPostpone({ dpDueDate, fullDueDate })
        }}
        isSubmitting={isPostponing}
      />

      <UploadConfirmationModal
        isOpen={isUploadConfirmationOpen}
        onClose={() => navigate('/client/reservation')}
        onNavigate={() => navigate('/client/reservation')}
      />
    </div>
  )
}

export default PaymentSummary
