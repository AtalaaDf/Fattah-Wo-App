import React from 'react'
import { Check, Copy } from 'lucide-react'
import { PAYMENT_METHODS } from '../../../data/paymentData'

export const PaymentMethodSection = ({ selectedMethodId, setSelectedMethodId, currentMethodObj, onCopyAccount, copiedAccount }) => (
  <div>
    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
      Langkah 2: Pilih Bank / Metode Transfer (Top-Up Style)
    </h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
      {PAYMENT_METHODS.map((item) => {
        const Icon = item.icon
        const isSelected = selectedMethodId === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedMethodId(item.id)}
            className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
              isSelected ? item.activeColor : item.color
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-white/80' : 'bg-white'}`}>
                <Icon className="w-4 h-4 text-slate-700" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs leading-tight truncate">{item.name}</p>
                <p className="text-[10px] text-slate-500 font-medium mt-0.5">{item.badge}</p>
              </div>
            </div>
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
              isSelected ? 'border-primary bg-primary text-white' : 'border-slate-300'
            }`}>
              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
          </button>
        )
      })}
    </div>

    <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">Tujuan Transfer ({currentMethodObj.name}):</span>
        <span className="text-amber-400 font-bold">{currentMethodObj.accountName}</span>
      </div>
      <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-800">
        <span className="font-mono text-lg font-extrabold tracking-wider text-white">
          {currentMethodObj.accountNumber}
        </span>
        <button
          type="button"
          onClick={() => onCopyAccount(currentMethodObj.accountNumber)}
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-xs font-semibold flex items-center gap-1.5 transition-colors shrink-0"
        >
          {copiedAccount ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Tersalin!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Salin No. Rekening</span>
            </>
          )}
        </button>
      </div>
    </div>
  </div>
)

export default PaymentMethodSection
