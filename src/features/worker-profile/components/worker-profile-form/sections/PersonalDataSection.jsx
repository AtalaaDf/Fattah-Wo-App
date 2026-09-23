import React from 'react'
import { Calendar, GraduationCap, MapPin, User } from 'lucide-react'
import Card from '../../../../../components/ui/Card'
import Input from '../../../../../components/ui/Input'
import Select from '../../../../../components/ui/Select'
import ProfileSectionHeader from './ProfileSectionHeader'
import ProfilePhotoSection from './ProfilePhotoSection'

export const PersonalDataSection = ({ register, errors, filePreview, selectedFile, setSelectedFile, setFilePreview, details, fileInputRef, handleFileChange }) => (
  <Card>
    <ProfileSectionHeader
      icon={<User className="w-5 h-5 text-primary" />}
      title="Bagian 1: Data Diri"
      subtitle="Lengkapi data identitas pribadi Anda"
      accentClassName="bg-primary/10 text-primary"
    />

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
      <ProfilePhotoSection
        filePreview={filePreview}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setFilePreview={setFilePreview}
        details={details}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
        register={register}
      />
    </div>
  </Card>
)

export default PersonalDataSection
