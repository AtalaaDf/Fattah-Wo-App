import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import Card from '../../../../../components/ui/Card'

export const PaymentStatusSection = () => (
  <Card className="py-8 text-center bg-emerald-50 border-emerald-200">
    <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
    <h4 className="text-lg font-bold text-emerald-900">Pembayaran Lunas (Verified by Admin)</h4>
    <p className="text-xs text-emerald-700 mt-1">
      Admin telah memverifikasi bukti foto pembayaran Anda. Reservasi pernikahan Anda resmi Lunas.
    </p>
  </Card>
)

export default PaymentStatusSection
