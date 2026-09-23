import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { reservationSchema } from '../../schemas/reservationSchema'
import SelectedBundleSection from './sections/SelectedBundleSection'
import ContactInfoSection from './sections/ContactInfoSection'
import EventDetailSection from './sections/EventDetailSection'
import ReservationSubmitSection from './sections/ReservationSubmitSection'

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
  })

  useEffect(() => {
    if (selectedBundle) {
      setValue('bundle_id', selectedBundle.id)
      if (selectedBundle.category) {
        setValue('reservation_type', selectedBundle.category)
      }
    }
  }, [selectedBundle, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmitReservation)} className="space-y-6 max-w-3xl mx-auto">
      <SelectedBundleSection selectedBundle={selectedBundle} />
      <ContactInfoSection register={register} errors={errors} />
      <EventDetailSection register={register} errors={errors} bundles={bundles} />
      <ReservationSubmitSection isSubmitting={isSubmitting} />
    </form>
  )
}

export default ReservationForm
