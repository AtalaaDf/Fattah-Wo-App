import React from 'react'
import { Search } from 'lucide-react'

export const ScheduleFilterSection = ({
  searchTerm,
  setSearchTerm,
  paymentFilter,
  setPaymentFilter,
  staffFilter,
  setStaffFilter,
  totalEvents,
  filteredEventsCount,
}) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto flex-1">
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
      Ditampilkan: <span className="font-bold text-slate-800">{filteredEventsCount}</span> / {totalEvents} Event
    </div>
  </div>
)

export default ScheduleFilterSection
