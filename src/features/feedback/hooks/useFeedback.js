import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getFeedbacks, createFeedback } from '../../../lib/supabase/queries/feedback';
import { useAuthStore } from '../../../store/useAuthStore';

export function useFeedback() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  const feedbackQuery = useQuery({
    queryKey: ['feedbacks'],
    queryFn: getFeedbacks,
    enabled: user?.role === 'admin',
  });

  const submitFeedbackMutation = useMutation({
    mutationFn: ({ reservationId, message, rating }) =>
      createFeedback({ clientId: user?.id, reservationId, message, rating }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feedbacks'] });
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      toast.success('Ulasan berhasil dikirim. Terima kasih! 🎉');
    },
    onError: (err) => {
      toast.error(err.message || 'Gagal mengirim ulasan. Silakan coba lagi.');
    },
  });

  return {
    feedbacks: feedbackQuery.data || [],
    isLoading: feedbackQuery.isLoading,

    submitFeedback: submitFeedbackMutation.mutateAsync,
    isSubmitting: submitFeedbackMutation.isPending,
  };
}
