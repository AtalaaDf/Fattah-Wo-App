import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { bundleSchema } from '../../schemas/bundleSchema'
import Modal from '../../../../components/ui/Modal'
import { uploadBundleImage } from '../../../../lib/supabase/storage'
import BundleDetailsSection from './sections/BundleDetailsSection'
import BundleImageSection from './sections/BundleImageSection'
import BundleMetaSection from './sections/BundleMetaSection'
import BundleFeaturesSection from './sections/BundleFeaturesSection'
import BundleFormActions from './sections/BundleFormActions'

export const BundleFormModal = ({ isOpen, onClose, onSave, bundleToEdit, isSubmitting }) => {
  const [features, setFeatures] = useState([])
  const [newFeatureLabel, setNewFeatureLabel] = useState('')
  const [newFeatureIncluded, setNewFeatureIncluded] = useState(true)
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const fileInputRef = useRef(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bundleSchema),
    defaultValues: {
      name: '',
      category: 'wedding',
      price: 0,
      description: '',
      image_url: '',
      is_popular: false,
      is_active: true,
      display_order: 0,
    },
  })

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setFilePreview(reader.result)
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    setSelectedFile(null)
    if (bundleToEdit) {
      reset({
        name: bundleToEdit.name || '',
        category: bundleToEdit.category || 'wedding',
        price: bundleToEdit.price || 0,
        description: bundleToEdit.description || '',
        image_url: bundleToEdit.image_url || '',
        is_popular: bundleToEdit.is_popular || false,
        is_active: bundleToEdit.is_active ?? true,
        display_order: bundleToEdit.display_order || 0,
      })
      setFeatures(bundleToEdit.bundle_features || [])
      setFilePreview(bundleToEdit.image_url || null)
    } else {
      reset({
        name: '',
        category: 'wedding',
        price: 0,
        description: '',
        image_url: '',
        is_popular: false,
        is_active: true,
        display_order: 0,
      })
      setFeatures([])
      setFilePreview(null)
    }
  }, [bundleToEdit, reset, isOpen])

  const handleAddFeature = () => {
    if (!newFeatureLabel.trim()) return
    setFeatures((previousFeatures) => [
      ...previousFeatures,
      { id: Date.now().toString(), label: newFeatureLabel.trim(), is_included: newFeatureIncluded },
    ])
    setNewFeatureLabel('')
    setNewFeatureIncluded(true)
  }

  const handleRemoveFeature = (index) => {
    setFeatures((previousFeatures) => previousFeatures.filter((_, featureIndex) => featureIndex !== index))
  }

  const handleToggleFeatureIncluded = (index) => {
    setFeatures((previousFeatures) => previousFeatures.map((feature, featureIndex) => (
      featureIndex === index ? { ...feature, is_included: !feature.is_included } : feature
    )))
  }

  const onSubmit = async (data) => {
    if (selectedFile) {
      const bundleFolder = bundleToEdit?.id || `bundle_${Date.now()}`
      data.image_url = await uploadBundleImage(bundleFolder, selectedFile)
    }

    await onSave({ bundleData: data, features, bundleId: bundleToEdit?.id })
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={bundleToEdit ? 'Edit Bundle Paket' : 'Tambah Bundle Paket Baru'}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <BundleDetailsSection register={register} errors={errors} />
        <BundleImageSection
          filePreview={filePreview}
          selectedFile={selectedFile}
          fileInputRef={fileInputRef}
          onChooseFile={handleFileChange}
          onReplace={() => fileInputRef.current?.click()}
        />
        <BundleMetaSection register={register} />
        <BundleFeaturesSection
          features={features}
          onToggleIncluded={handleToggleFeatureIncluded}
          onRemoveFeature={handleRemoveFeature}
          newFeatureLabel={newFeatureLabel}
          setNewFeatureLabel={setNewFeatureLabel}
          newFeatureIncluded={newFeatureIncluded}
          setNewFeatureIncluded={setNewFeatureIncluded}
          onAddFeature={handleAddFeature}
        />
        <BundleFormActions onClose={onClose} isSubmitting={isSubmitting} />
      </form>
    </Modal>
  )
}

export default BundleFormModal
