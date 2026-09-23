import React from 'react'

export const PaymentTypeSection = ({ paymentType, setPaymentType, displayAmount }) => (
  <div>
    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
      Langkah 1: Pilih Jenis Pembayaran
    </h4>
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => setPaymentType('dp')}
        className={`p-3.5 rounded-xl border text-left transition-all ${
          paymentType === 'dp'
            ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20'
            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
        }`}
      >
        <p className="font-bold text-xs">Uang Muka (DP 50%)</p>
        <p className="text-sm font-extrabold mt-1 text-primary">
          {displayAmount ? `Rp ${Number(displayAmount * 0.5).toLocaleString('id-ID')}` : 'Menunggu admin'}
        </p>
      </button>

      <button
        type="button"
        onClick={() => setPaymentType('full')}
        className={`p-3.5 rounded-xl border text-left transition-all ${
          paymentType === 'full'
            ? 'border-primary bg-primary/5 text-primary ring-2 ring-primary/20'
            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
        }`}
      >
        <p className="font-bold text-xs">Pelunasan Penuh (Full)</p>
        <p className="text-sm font-extrabold mt-1 text-primary">
          {displayAmount ? `Rp ${Number(displayAmount).toLocaleString('id-ID')}` : 'Menunggu admin'}
        </p>
      </button>
    </div>
  </div>
)

export default PaymentTypeSection
