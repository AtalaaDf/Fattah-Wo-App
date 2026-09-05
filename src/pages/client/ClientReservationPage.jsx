import React from 'react';
import { useReservation } from '../../features/reservation/hooks/useReservation';
import ClientReservationList from '../../features/reservation/components/ClientReservationList';
import { Calendar } from 'lucide-react';

export const ClientReservationPage = () => {
  const { reservations, isLoading } = useReservation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-7 h-7 text-primary" />
          Reservasi Saya
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Daftar pesanan acara pernikahan Anda di Fattah Wedding Organizer.
        </p>
      </div>

      <ClientReservationList reservations={reservations} isLoading={isLoading} />
    </div>
  );
};

export default ClientReservationPage;
