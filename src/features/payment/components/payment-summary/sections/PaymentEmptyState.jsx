import React from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import Card from '../../../../../components/ui/Card'
import Button from '../../../../../components/ui/Button'

export const PaymentEmptyState = () => (
  <Card className="py-12 text-center text-slate-500 max-w-2xl mx-auto space-y-4">
    <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
    <div>
      <p className="font-bold text-slate-800 text-base">Data Reservasi Tidak Ditemukan</p>
      <p className="text-xs text-slate-400 mt-1">
        Reservasi ini mungkin sedang diproses atau ID tidak valid.
      </p>
    </div>
    <Link to="/client/reservation">
      <Button variant="outline" size="sm">Kembali ke Reservasi Saya</Button>
    </Link>
  </Card>
)

export default PaymentEmptyState
