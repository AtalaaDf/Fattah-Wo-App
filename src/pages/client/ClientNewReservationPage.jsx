import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReservation } from '../../features/reservation/hooks/useReservation';
import { useBundles } from '../../features/bundle/hooks/useBundles';
import { useAuthStore } from '../../store/useAuthStore';
import ReservationForm from '../../features/reservation/components/ReservationForm';
import { PlusCircle } from 'lucide-react';

export const ClientNewReservationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedBundle = location.state?.selectedBundle || null;

  const { createReservation, isCreating } = useReservation();
  const { bundles } = useBundles({ activeOnly: true });
  const user = useAuthStore((state) => state.user);

  const handleSubmit = async (formData) => {
    const newReservation = await createReservation(formData);
    if (newReservation?.id) {
      navigate(`/client/payment/${newReservation.id}`);
    } else {
      navigate('/client/reservation');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
          <PlusCircle className="w-7 h-7 text-primary" />
          Form Reservasi Acara Baru
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Isi detail tanggal, lokasi, dan pilihan paket acara Anda di bawah ini.
        </p>
      </div>

      <ReservationForm
        bundles={bundles}
        selectedBundle={selectedBundle}
        onSubmitReservation={handleSubmit}
        isSubmitting={isCreating}
        currentUser={user}
      />
    </div>
  );
};

export default ClientNewReservationPage;
