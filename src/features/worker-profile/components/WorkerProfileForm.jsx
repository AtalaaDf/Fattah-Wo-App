import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { workerProfileSchema } from '../schemas/profileSchema';
import Card from '../../../components/ui/Card';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { User, Calendar, MapPin, GraduationCap, Phone, Mail, Image as ImageIcon, Save, CheckCircle, AlertCircle, Power, FileImage, X } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import { uploadAvatar } from '../../../lib/supabase/storage';

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

  const { user } = useAuthStore();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [filePreview, setFilePreview] = React.useState(details.profile_photo_url || null);
  const fileInputRef = React.useRef(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const isAvailable = watch('is_available');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setFilePreview(reader.result);
    reader.readAsDataURL(file);
  };

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
      
      let finalPhotoUrl = data.profile_photo_url;
      
      // Upload new file if selected
      if (selectedFile) {
        setIsUploading(true);
        try {
          finalPhotoUrl = await uploadAvatar(user.id, selectedFile);
          data.profile_photo_url = finalPhotoUrl;
        } finally {
          setIsUploading(false);
        }
      }

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

          <div className="sm:col-span-2 space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Foto Profil Karyawan / Worker</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            {!filePreview ? (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center gap-2 text-slate-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors cursor-pointer"
              >
                <FileImage className="w-8 h-8" />
                <span className="text-xs font-medium">Tap untuk pilih foto profil</span>
                <span className="text-[11px] text-slate-400">JPG, PNG maks 2MB (disarankan rasio 1:1)</span>
              </button>
            ) : (
              <div className="border border-slate-200 rounded-xl p-3 flex items-center gap-4 bg-slate-50">
                <img src={filePreview} alt="preview" className="w-16 h-16 object-cover rounded-full border-2 border-white shadow-sm shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 truncate">
                    {selectedFile ? selectedFile.name : 'Foto Profil Saat Ini'}
                  </p>
                  {selectedFile && (
                    <p className="text-[11px] text-slate-400">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] font-bold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg border border-primary/20 transition-colors"
                  >
                    Ganti Foto
                  </button>
                  {selectedFile && (
                    <button
                      type="button"
                      onClick={() => { setSelectedFile(null); setFilePreview(details.profile_photo_url || null); }}
                      className="text-[11px] font-bold text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 transition-colors"
                    >
                      Batal Pilih
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {/* Hidden input to keep react-hook-form happy with the current URL */}
            <input type="hidden" {...register('profile_photo_url')} />
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
        <Button type="submit" size="lg" isLoading={isSaving || isUploading}>
          <Save className="w-4 h-4 mr-2" />
          {isUploading ? 'Mengunggah...' : 'Simpan Perubahan Biodata & Status'}
        </Button>
      </div>
    </form>
  );
};

export default WorkerProfileForm;
