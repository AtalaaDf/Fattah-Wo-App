import React from 'react'
import Card from '../../../../../components/ui/Card'
import Input from '../../../../../components/ui/Input'
import Select from '../../../../../components/ui/Select'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

export const EventDetailSection = ({ register, errors, bundles }) => (
  <Card>
    <div className="pb-3 mb-4 border-b border-slate-100">
      <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
        <Calendar className="w-5 h-5 text-primary" />
        2. Detail Acara Pernikahan / Event
      </h3>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Select
        label="Jenis / Kategori Acara"
        error={errors.reservation_type?.message}
        options={[
          { value: 'wedding', label: 'Pernikahan (Wedding)' },
          { value: 'birthday', label: 'Ulang Tahun (Birthday)' },
          { value: 'cultural', label: 'Acara Adat / Cultural' },
          { value: 'corporate', label: 'Acara Perusahaan (Corporate)' },
          { value: 'other', label: 'Lainnya' },
        ]}
        {...register('reservation_type')}
      />

      <Select
        label="Pilih Paket Layanan (Opsional)"
        error={errors.bundle_id?.message}
        options={[
          { value: '', label: '-- Tanpa Paket / Custom --' },
          ...bundles.map((bundle) => ({
            value: bundle.id,
            label: `${bundle.name} (Rp ${Number(bundle.price).toLocaleString('id-ID')})`,
          })),
        ]}
        {...register('bundle_id')}
      />

      <Input
        label="Tanggal Acara"
        type="date"
        icon={<Calendar className="w-4 h-4" />}
        error={errors.event_date?.message}
        {...register('event_date')}
      />

      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Jam Mulai"
          type="time"
          icon={<Clock className="w-4 h-4" />}
          error={errors.start_time?.message}
          {...register('start_time')}
        />
        <Input
          label="Jam Selesai"
          type="time"
          icon={<Clock className="w-4 h-4" />}
          error={errors.end_time?.message}
          {...register('end_time')}
        />
      </div>

      <div className="sm:col-span-2">
        <Input
          label="Lokasi / Gedung Acara"
          placeholder="Contoh: Gedung Anekamaya, Palembang"
          icon={<MapPin className="w-4 h-4" />}
          error={errors.location?.message}
          {...register('location')}
        />
      </div>

      <Input
        label="Estimasi Tamu Undangan"
        type="number"
        placeholder="500"
        icon={<Users className="w-4 h-4" />}
        error={errors.guest_count?.message}
        {...register('guest_count')}
      />

      <Input
        label="Jumlah Kru / Worker Dibutuhkan"
        type="number"
        placeholder="4"
        icon={<Users className="w-4 h-4" />}
        helperText="Jumlah staf kru yang dibutuhkan di lapangan"
        error={errors.workers_needed?.message}
        {...register('workers_needed')}
      />

      <div className="sm:col-span-2">
        <label className="block text-xs font-semibold text-slate-700 mb-1.5">Catatan Tambahan (Opsional)</label>
        <textarea
          rows={3}
          placeholder="Tuliskan permintaan khusus mengenai tema, susunan acara, atau instruksi..."
          className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          {...register('notes')}
        />
      </div>
    </div>
  </Card>
)

export default EventDetailSection
