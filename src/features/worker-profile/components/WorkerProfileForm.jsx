import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { workerProfileSchema } from '../schemas/profileSchema';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { User, Calendar, MapPin, GraduationCap, Phone, Mail, Image, Save, CheckCircle, AlertCircle, Power } from 'lucide-react';

export const WorkerProfileForm = ({ details = {}, onSave, isSaving }) => {
  const [successMessage, setSuccessMessage] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(workerProfileSchema),
    defaultValues: {
      birth_date: details.birth_date || '',
      birth_place: details.birth_place || '',
      gender: details.gender || '',
      last_education: details.last_education || '',
      profile_photo_url: details.profile_photo_url || '',
      contact_email: details.contact_email || '',
      contact_phone: details.contact_phone || '',
      is_available: details.is_available ?? true,
    },
  });

  const isAvailable = watch('is_available');

  useEffect(() => {
    if (details) {
      reset({
        birth_date: details.birth_date || '',
        birth_place: details.birth_place || '',
        gender: details.gender || '',
        last_education: details.last_education || '',
        profile_photo_url: details.profile_photo_url || '',
        contact_email: details.contact_email || '',
        contact_phone: details.contact_phone || '',
        is_available: details.is_available ?? true,
      });
    }
  }, [details, reset]);

  const onSubmit = async (data) => {
    try {
      setSuccessMessage('');
      setErrorMessage('');
      await onSave(data);
      setSuccessMessage('Biodata, kontak, dan status ketersediaan kerja berhasil disimpan!');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (err) {
      setErrorMessage(err.message || 'Gagal menyimpan profil');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* ON / OFF Availability Status Banner */}
      <Card className={`border-2 transition-colors ${isAvailable ? 'border-emerald-300 bg-emerald-50/50' : 'border-slate-300 bg-slate-100/50'}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl text-white ${isAvailable ? 'bg-emerald-600' : 'bg-slate-500'}`}>
              <Power className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                Status Ketersediaan Kerja:
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                  {isAvailable ? 'ON (Siap Ambil Job)' : 'OFF (Sedang Libur / Tidak Tersedia)'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Ubah status ini ke ON ketika Anda siap bertugas atau OFF jika sedang berhalangan/libur. Admin dapat melihat status ketersediaan Anda di sistem.
              </p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer shrink-0">
            <input
              type="checkbox"
              checked={!!isAvailable}
              onChange={(e) => setValue('is_available', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>
      </Card>

      {/* Section 1: Data Diri */}
      <Card>
        <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Bagian 1: Data Diri</h3>
            <p className="text-xs text-slate-500">Lengkapi data identitas pribadi Anda</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Tanggal Lahir"
            type="date"
            icon={<Calendar className="w-4 h-4" />}
            error={errors.birth_date?.message}
            {...register('birth_date')}
          />

          <Input
            label="Tempat Lahir"
            placeholder="Contoh: Palembang"
            icon={<MapPin className="w-4 h-4" />}
            error={errors.birth_place?.message}
            {...register('birth_place')}
          />

          <Select
            label="Jenis Kelamin"
            icon={<User className="w-4 h-4" />}
            error={errors.gender?.message}
            options={[
              { value: '', label: '-- Pilih Jenis Kelamin --' },
              { value: 'male', label: 'Laki-laki' },
              { value: 'female', label: 'Perempuan' },
            ]}
            {...register('gender')}
          />

          <Select
            label="Pendidikan Terakhir"
            icon={<GraduationCap className="w-4 h-4" />}
            error={errors.last_education?.message}
            options={[
              { value: '', label: '-- Pilih Pendidikan --' },
              { value: 'SMA/SMK', label: 'SMA / SMK' },
              { value: 'D3', label: 'Diploma (D3)' },
              { value: 'S1', label: 'Sarjana (S1)' },
              { value: 'Lainnya', label: 'Lainnya' },
            ]}
            {...register('last_education')}
          />

          <div className="sm:col-span-2">
            <Input
              label="URL Foto Profil"
              placeholder="https://..."
              icon={<Image className="w-4 h-4" />}
              helperText="Tautan foto profil Anda (bisa dari Imgur / cloud storage)"
              error={errors.profile_photo_url?.message}
              {...register('profile_photo_url')}
            />
          </div>
        </div>
      </Card>

      {/* Section 2: Informasi Kontak */}
      <Card>
        <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100">
          <div className="p-2 rounded-lg bg-champagne-gold/10 text-amber-700">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">Bagian 2: Informasi Kontak Aktif</h3>
            <p className="text-xs text-slate-500">Kontak yang dapat dihubungi oleh Admin Wedding Organizer</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Nomor WhatsApp Aktif"
            placeholder="08123456789"
            icon={<Phone className="w-4 h-4" />}
            helperText="Diutamakan nomor yang terhubung ke WhatsApp"
            error={errors.contact_phone?.message}
            {...register('contact_phone')}
          />

          <Input
            label="Email Aktif untuk Dihubungi"
            placeholder="email.anda@gmail.com"
            type="email"
            icon={<Mail className="w-4 h-4" />}
            helperText="Email aktif Anda (bisa berbeda dari email login)"
            error={errors.contact_email?.message}
            {...register('contact_email')}
          />
        </div>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-end pt-2">
        <Button type="submit" size="lg" isLoading={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          Simpan Perubahan Biodata & Status
        </Button>
      </div>
    </form>
  );
};

export default WorkerProfileForm;
