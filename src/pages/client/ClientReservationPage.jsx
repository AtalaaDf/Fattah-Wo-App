import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReservation } from '../../features/reservation/hooks/useReservation';
import ClientReservationList from '../../features/reservation/components/ClientReservationList';
import { Calendar, Plus } from 'lucide-react';
import Button from '../../components/ui/Button';

export const ClientReservationPage = () => {
  const navigate = useNavigate();
  const { reservations, isLoading } = useReservation();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
            <Calendar className="w-7 h-7 text-primary" />
            Reservasi Saya
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Daftar pesanan acara pernikahan Anda di Fattah Wedding Organizer.
          </p>
        </div>

        <Button
          onClick={() => navigate('/client/reservation/new')}
          className="shadow-sm font-semibold flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Buat Reservasi Baru
        </Button>
      </div>

      <ClientReservationList reservations={reservations} isLoading={isLoading} />
    </div>
  );
};

export default ClientReservationPage;
