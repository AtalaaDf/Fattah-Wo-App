import React from 'react';
import { useFeedback } from '../../features/feedback/hooks/useFeedback';
import FeedbackList from '../../features/feedback/components/FeedbackList';
import { MessageSquare } from 'lucide-react';

export const AdminFeedbackPage = () => {
  const { feedbacks, isLoading } = useFeedback();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
          <MessageSquare className="w-7 h-7 text-primary" />
          Feedback & Ulasan Client
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Daftar masukan dan rating kepuasan layanan dari para client Fattah Wedding Organizer.
        </p>
      </div>

      <FeedbackList feedbacks={feedbacks} isLoading={isLoading} />
    </div>
  );
};

export default AdminFeedbackPage;
