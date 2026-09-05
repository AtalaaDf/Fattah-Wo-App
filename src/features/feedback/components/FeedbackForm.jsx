import React, { useState } from 'react';
import { Star, Send, MessageCircle } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

/**
 * FeedbackForm — Form client untuk memberikan rating bintang dan ulasan teks
 * setelah acara reservasi mereka selesai.
 *
 * Props:
 * - reservationId: string
 * - onSubmit: (data: { reservationId, rating, message }) => Promise<void>
 * - isSubmitting: boolean
 * - existingFeedback: object | null (jika sudah pernah submit)
 */
export const FeedbackForm = ({ reservationId, onSubmit, isSubmitting = false, existingFeedback = null }) => {
  const [rating, setRating] = useState(existingFeedback?.rating ?? 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState(existingFeedback?.message ?? '');
  const [submitted, setSubmitted] = useState(!!existingFeedback);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) return;
    await onSubmit({ reservationId, rating, message });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="p-6 text-center space-y-3">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <Star className="w-7 h-7 fill-emerald-500 text-emerald-500" />
        </div>
        <h3 className="font-bold text-slate-900 text-lg">Terima Kasih atas Ulasan Anda!</h3>
        <p className="text-sm text-slate-500">
          Masukan Anda sangat berarti untuk meningkatkan layanan Fattah Wedding Organizer.
        </p>
        {/* Display submitted values */}
        <div className="flex justify-center gap-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
              }`}
            />
          ))}
        </div>
        {message && (
          <p className="text-xs text-slate-600 bg-slate-50 rounded-lg p-3 mt-2 text-left italic">
            "{message}"
          </p>
        )}
      </Card>
    );
  }

  return (
    <Card className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
          <MessageCircle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Beri Penilaian & Ulasan</h3>
          <p className="text-xs text-slate-400">Bagaimana pengalaman acara Anda bersama kami?</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Star Rating */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-slate-700">
            Rating Keseluruhan <span className="text-red-400">*</span>
          </label>
          <div
            className="flex gap-2"
            onMouseLeave={() => setHoverRating(0)}
          >
            {[1, 2, 3, 4, 5].map((star) => {
              const isActive = star <= (hoverRating || rating);
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                  aria-label={`Beri rating ${star} bintang`}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      isActive
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-200 hover:text-amber-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>
          {rating === 0 && (
            <p className="text-[11px] text-slate-400">Pilih rating untuk melanjutkan</p>
          )}
          {rating > 0 && (
            <p className="text-[11px] text-amber-600 font-medium">
              {rating === 1 && 'Sangat Buruk'}
              {rating === 2 && 'Kurang Memuaskan'}
              {rating === 3 && 'Cukup Baik'}
              {rating === 4 && 'Baik & Memuaskan'}
              {rating === 5 && 'Luar Biasa! ⭐'}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label htmlFor="feedback-message" className="block text-xs font-semibold text-slate-700">
            Pesan Ulasan <span className="text-slate-400 font-normal">(opsional)</span>
          </label>
          <textarea
            id="feedback-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            maxLength={500}
            placeholder="Ceritakan pengalaman Anda — pelayanan tim, kualitas acara, dll."
            className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-900 
                       placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/30 
                       focus:border-primary resize-none transition-colors"
          />
          <p className="text-[11px] text-slate-400 text-right">{message.length}/500</p>
        </div>

        <Button
          type="submit"
          disabled={rating === 0 || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Mengirim Ulasan...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Kirim Ulasan
            </span>
          )}
        </Button>
      </form>
    </Card>
  );
};

export default FeedbackForm;
