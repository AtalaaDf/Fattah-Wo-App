import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
    },
  });

  return {
    feedbacks: feedbackQuery.data || [],
    isLoading: feedbackQuery.isLoading,

    submitFeedback: submitFeedbackMutation.mutateAsync,
    isSubmitting: submitFeedbackMutation.isPending,
  };
}
