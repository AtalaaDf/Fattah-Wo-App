import React from 'react';
import { Star, MessageSquare, User } from 'lucide-react';
import Card from '../../../components/ui/Card';

export const FeedbackList = ({ feedbacks = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-slate-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <Card className="py-12 text-center text-slate-500">
        <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="font-semibold text-slate-700">Belum Ada Feedback dari Client</p>
        <p className="text-sm text-slate-400 mt-1">Ulasan dan masukan dari client akan muncul di sini.</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {feedbacks.map((fb) => {
        const client = fb.profiles || {};
        const reservation = fb.reservations || {};

        return (
          <Card key={fb.id} className="p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm border border-primary/20 shrink-0">
                  {client.full_name?.charAt(0) || 'C'}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{client.full_name || 'Client'}</h4>
                  <p className="text-[11px] text-slate-400">
                    {new Date(fb.created_at).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                    {reservation.ref_code && ` • Ref: ${reservation.ref_code}`}
                  </p>
                </div>
              </div>

              {/* Star Rating Display */}
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= (fb.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-sm text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 mt-2">
              "{fb.message}"
            </p>
          </Card>
        );
      })}
    </div>
  );
};

export default FeedbackList;
