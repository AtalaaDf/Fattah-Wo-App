import React from 'react';
import { useReservation } from '../../features/reservation/hooks/useReservation';
import ClientScheduleList from '../../features/reservation/components/ClientScheduleList';
import { CalendarCheck } from 'lucide-react';

export const ClientSchedulePage = () => {
  const { reservations, isLoading } = useReservation();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
          <CalendarCheck className="w-7 h-7 text-primary" />
          Jadwal & Status Acara Saya
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Pantau status penugasan staf kru dan berikan ulasan setelah acara selesai.
        </p>
      </div>

      <ClientScheduleList reservations={reservations} isLoading={isLoading} />
    </div>
  );
};

export default ClientSchedulePage;
