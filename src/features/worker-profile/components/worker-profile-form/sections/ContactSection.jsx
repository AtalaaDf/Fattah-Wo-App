import React from 'react'
import { Mail, Phone } from 'lucide-react'
import Card from '../../../../../components/ui/Card'
import Input from '../../../../../components/ui/Input'
import ProfileSectionHeader from './ProfileSectionHeader'

export const ContactSection = ({ register, errors }) => (
  <Card>
    <ProfileSectionHeader
      icon={<Phone className="w-5 h-5 text-amber-700" />}
      title="Bagian 2: Informasi Kontak Aktif"
      subtitle="Kontak yang dapat dihubungi oleh Admin Wedding Organizer"
      accentClassName="bg-champagne-gold/10 text-amber-700"
    />

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
)

export default ContactSection
