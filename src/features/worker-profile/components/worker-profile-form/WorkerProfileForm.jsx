import React, { useEffect, useRef, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { workerProfileSchema } from '../../schemas/profileSchema'
import { useAuthStore } from '../../../../store/useAuthStore'
import { uploadAvatar } from '../../../../lib/supabase/storage'
import ProfileFeedbackSection from './sections/ProfileFeedbackSection'
import AvailabilityStatusSection from './sections/AvailabilityStatusSection'
import PersonalDataSection from './sections/PersonalDataSection'
import ContactSection from './sections/ContactSection'
import SaveProfileSection from './sections/SaveProfileSection'

export const WorkerProfileForm = ({ details = {}, onSave, isSaving }) => {
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(details.profile_photo_url || null)
  const fileInputRef = useRef(null)
  const [isUploading, setIsUploading] = useState(false)
  const { user } = useAuthStore()

  const {
    register,
    handleSubmit,
    reset,
    control,
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
  })

  const isAvailable = useWatch({ control, name: 'is_available' })

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onloadend = () => setFilePreview(reader.result)
    reader.readAsDataURL(file)
  }

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
      })
    }
  }, [details, reset])

  const onSubmit = async (data) => {
    try {
      setSuccessMessage('')
      setErrorMessage('')

      let finalPhotoUrl = data.profile_photo_url

      if (selectedFile) {
        setIsUploading(true)
        try {
          finalPhotoUrl = await uploadAvatar(user.id, selectedFile)
          data.profile_photo_url = finalPhotoUrl
        } finally {
          setIsUploading(false)
        }
      }

      await onSave(data)
      setSuccessMessage('Biodata, kontak, dan status ketersediaan kerja berhasil disimpan!')
      setTimeout(() => setSuccessMessage(''), 4000)
    } catch (error) {
      setErrorMessage(error.message || 'Gagal menyimpan profil')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <ProfileFeedbackSection successMessage={successMessage} errorMessage={errorMessage} />
      <AvailabilityStatusSection
        isAvailable={isAvailable}
        onToggleAvailability={(checked) => setValue('is_available', checked)}
      />
      <PersonalDataSection
        register={register}
        errors={errors}
        filePreview={filePreview}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setFilePreview={setFilePreview}
        details={details}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />
      <ContactSection register={register} errors={errors} />
      <SaveProfileSection isSaving={isSaving} isUploading={isUploading} />
    </form>
  )
}

export default WorkerProfileForm
