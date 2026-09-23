import React from 'react'
import { Send } from 'lucide-react'
import Button from '../../../../../components/ui/Button'

export const ReservationSubmitSection = ({ isSubmitting }) => (
  <div className="flex justify-end pt-2">
    <Button
      type="submit"
      size="lg"
      isLoading={isSubmitting}
      leftIcon={<Send className="w-4 h-4" />}
      className="w-full sm:w-auto flex-row whitespace-nowrap"
    >
      Kirim Reservasi Sekarang
    </Button>
  </div>
)

export default ReservationSubmitSection
