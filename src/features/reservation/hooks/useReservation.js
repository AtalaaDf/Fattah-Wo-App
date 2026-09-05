import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClientReservation, getClientReservations, getReservationById } from '../../../lib/supabase/queries/reservations';
import { useAuthStore } from '../../../store/useAuthStore';

export function useReservation(reservationId = null) {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const clientReservationsQuery = useQuery({
    queryKey: ['clientReservations', user?.id],
    queryFn: () => getClientReservations(user?.id),
    enabled: !!user?.id,
  });

  const singleReservationQuery = useQuery({
    queryKey: ['reservation', reservationId],
    queryFn: () => getReservationById(reservationId),
    enabled: !!reservationId,
  });

  const createMutation = useMutation({
    mutationFn: (formData) => createClientReservation(formData, user?.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientReservations'] });
      queryClient.invalidateQueries({ queryKey: ['adminSchedule'] });
    },
  });

  return {
    reservations: clientReservationsQuery.data || [],
    isLoading: clientReservationsQuery.isLoading,

    currentReservation: singleReservationQuery.data,
    isSingleLoading: singleReservationQuery.isLoading,

    createReservation: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
  };
}
