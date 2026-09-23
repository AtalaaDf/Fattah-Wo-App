import React from 'react'
import { Clock } from 'lucide-react'
import Card from '../../../../../components/ui/Card'

export const PaymentPostponeBanner = ({ payment }) => {
  if (!payment?.is_postponed) return null

  return (
    <Card className="bg-amber-50 border-amber-200 text-amber-900 p-4 text-xs space-y-1">
      <p className="font-bold flex items-center gap-1.5">
        <Clock className="w-4 h-4 text-amber-600" />
        Status: Penundaan Pembayaran Diaktifkan
      </p>
      <p>Batas DP: {payment.dp_due_date || '-'}</p>
      <p>Batas Pelunasan Full: {payment.full_due_date || '-'}</p>
    </Card>
  )
}

export default PaymentPostponeBanner
