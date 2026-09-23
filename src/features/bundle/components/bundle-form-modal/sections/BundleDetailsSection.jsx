import React from 'react'
import { Layers, Tag } from 'lucide-react'
import Input from '../../../../../components/ui/Input'
import Select from '../../../../../components/ui/Select'

export const BundleDetailsSection = ({ register, errors }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div className="sm:col-span-2">
      <Input
        label="Nama Bundle"
        placeholder="Contoh: Paket Signature Wedding Platinum"
        icon={<Tag className="w-4 h-4" />}
        error={errors.name?.message}
        {...register('name')}
      />
    </div>

    <Select
      label="Kategori"
      icon={<Layers className="w-4 h-4" />}
      error={errors.category?.message}
      options={[
        { value: 'wedding', label: 'Wedding' },
        { value: 'birthday', label: 'Birthday' },
        { value: 'cultural', label: 'Cultural' },
        { value: 'corporate', label: 'Corporate' },
      ]}
      {...register('category')}
    />

    <Input
      label="Harga (Rp)"
      type="number"
      placeholder="0"
      error={errors.price?.message}
      {...register('price')}
    />
  </div>
)

export default BundleDetailsSection
