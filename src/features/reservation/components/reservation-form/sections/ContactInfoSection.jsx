import React from 'react'
import Card from '../../../../../components/ui/Card'
import Input from '../../../../../components/ui/Input'
import { User, Phone, Mail } from 'lucide-react'

export const ContactInfoSection = ({ register, errors }) => (
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
)

export default ContactInfoSection
