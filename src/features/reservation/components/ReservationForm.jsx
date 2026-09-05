import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { reservationSchema } from '../schemas/reservationSchema';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { User, Phone, Mail, Calendar, Clock, MapPin, Users, Send, Package } from 'lucide-react';

export const ReservationForm = ({ bundles = [], selectedBundle, onSubmitReservation, isSubmitting, currentUser }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      full_name: currentUser?.full_name || '',
      phone: currentUser?.phone || '',
      email: currentUser?.email || '',
      reservation_type: selectedBundle?.category || 'wedding',
      bundle_id: selectedBundle?.id || '',
      event_date: '',
      start_time: '08:00',
      end_time: '17:00',
      location: '',
      guest_count: 500,
      workers_needed: 4,
      notes: '',
    },
  });

  useEffect(() => {
    if (selectedBundle) {
      setValue('bundle_id', selectedBundle.id);
      if (selectedBundle.category) {
        setValue('reservation_type', selectedBundle.category);
      }
    }
  }, [selectedBundle, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmitReservation)} className="space-y-6 max-w-3xl mx-auto">
      {/* Selected Bundle Header Banner */}
      {selectedBundle && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-amber-800 font-semibold uppercase">Paket Dipilih:</p>
              <h4 className="font-bold text-amber-900">{selectedBundle.name}</h4>
            </div>
          </div>
          <p className="text-lg font-extrabold text-amber-900">
            Rp {Number(selectedBundle.price).toLocaleString('id-ID')}
          </p>
        </div>
      )}

      {/* Section 1: Data Kontak Client */}
      <Card>
        <div className="pb-3 mb-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            1. Informasi Kontak Pemesan
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Nama Lengkap Penanggung Jawab"
            placeholder="Nama Pemesan"
            icon={<User className="w-4 h-4" />}
            error={errors.full_name?.message}
            {...register('full_name')}
          />

          <Input
            label="Nomor WhatsApp / HP"
            placeholder="08123456789"
            icon={<Phone className="w-4 h-4" />}
            error={errors.phone?.message}
            {...register('phone')}
          />

          <div className="sm:col-span-2">
            <Input
              label="Email Aktif"
              placeholder="email@domain.com"
              type="email"
              icon={<Mail className="w-4 h-4" />}
              error={errors.email?.message}
              {...register('email')}
            />
          </div>
        </div>
      </Card>

      {/* Section 2: Detail Acara */}
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
              ...bundles.map((b) => ({
                value: b.id,
                label: `${b.name} (Rp ${Number(b.price).toLocaleString('id-ID')})`,
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

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <Button type="submit" size="lg" isLoading={isSubmitting} className="w-full sm:w-auto">
          <Send className="w-4 h-4 mr-2" />
          Kirim Reservasi Sekarang
        </Button>
      </div>
    </form>
  );
};

export default ReservationForm;
