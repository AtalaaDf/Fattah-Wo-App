import React from 'react'
import { Calendar, Upload } from 'lucide-react'
import Button from '../../../../../components/ui/Button'

export const PaymentActionsSection = ({ onPostpone, isSubmittingProof, isUploading, selectedFile }) => (
  <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-100">
    <Button
      type="button"
      variant="outline"
      onClick={onPostpone}
      leftIcon={<Calendar className="w-4 h-4 text-slate-500" />}
      className="flex-1 whitespace-nowrap"
    >
      Tunda Payment
    </Button>

    <Button
      type="submit"
      isLoading={isSubmittingProof || isUploading}
      disabled={!selectedFile}
      leftIcon={<Upload className="w-4 h-4" />}
      className="flex-1 whitespace-nowrap"
    >
      {isUploading ? 'Mengunggah...' : 'Kirim Bukti Foto Pembayaran'}
    </Button>
  </div>
)

export default PaymentActionsSection
