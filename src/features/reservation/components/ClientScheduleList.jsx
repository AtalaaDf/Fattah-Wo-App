import React from 'react';
import { Calendar, MapPin, UserCircle, MessageCircle, AlertCircle } from 'lucide-react';
import Card from '../../../components/ui/Card';
import StatusChip from '../../../components/ui/StatusChip';
import FeedbackForm from '../../feedback/components/FeedbackForm';
import { useFeedback } from '../../feedback/hooks/useFeedback';

export const ClientScheduleList = ({ reservations = [], isLoading = false }) => {
  const { submitFeedback, isSubmitting } = useFeedback();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-44 bg-slate-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <Card className="py-12 text-center text-slate-500">
        <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <p className="font-semibold text-slate-700">Belum Ada Jadwal Acara</p>
        <p className="text-sm text-slate-400 mt-1">
          Anda belum memiliki reservasi yang disetujui.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {reservations.map((item) => {
        const bundle = item.bundles || {};
        const workers = (item.event_workers || []).filter(ew => ew.status === 'assigned');
        const isCompleted = item.status === 'completed';

        return (
          <Card key={item.id} className="p-0 overflow-hidden">
            {/* Header / Info Acara */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                      {item.ref_code}
                    </span>
                    <StatusChip status={item.status} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.full_name}</h3>
                  <p className="text-xs text-slate-500 font-semibold">
                    {bundle.name ? `Paket: ${bundle.name}` : `Kategori: ${item.reservation_type}`}
                  </p>
                </div>

                <div className="text-left md:text-right text-sm text-slate-600">
                  <div className="font-bold text-slate-900 flex items-center md:justify-end gap-1.5 mb-1">
                    <Calendar className="w-4 h-4 text-primary" />
                    {new Date(item.event_date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </div>
                  <p className="flex items-center md:justify-end gap-1 text-xs">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {item.location || 'Lokasi Belum Ditentukan'}
                  </p>
                </div>
              </div>
            </div>

            {/* Daftar Kru Bertugas */}
            <div className="p-5">
              <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center gap-2">
                <UserCircle className="w-4 h-4 text-primary" />
                Tim Kru Bertugas ({workers.length}/{item.workers_needed} Orang)
              </h4>
              
              {workers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {workers.map((ew) => {
                    const profile = ew.profiles;
                    if (!profile) return null;
                    const details = Array.isArray(profile.worker_details) ? profile.worker_details[0] || {} : profile.worker_details || {};
                    const phone = details.contact_phone || profile.phone || '';
                    const cleanPhone = phone.replace(/\D/g, '');
                    const waUrl = cleanPhone ? `https://wa.me/${cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone}` : null;
                    const photoUrl = details.profile_photo_url || profile.avatar_url;

                    return (
                      <div key={ew.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-white shadow-2xs hover:border-slate-200 transition-colors">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0 uppercase overflow-hidden border border-primary/20">
                            {photoUrl ? (
                              <img src={photoUrl} alt={profile.full_name} className="w-full h-full object-cover" />
                            ) : (
                              profile.full_name?.charAt(0) || 'W'
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-slate-900 truncate">
                              {profile.full_name}
                            </p>
                            <p className="text-xs text-primary font-medium truncate">
                              {ew.role_needed || 'Kru Acara'}
                            </p>
                          </div>
                        </div>

                        {waUrl && (
                          <a
                            href={waUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors shrink-0"
                            title={`Hubungi ${profile.full_name} via WhatsApp`}
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-start gap-2 p-3.5 bg-amber-50/80 text-amber-800 text-xs rounded-xl border border-amber-200/60">
                  <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <p className="font-semibold">Tim Kru Sedang Disiapkan</p>
                    <p className="text-amber-700 mt-0.5">
                      Tim manajemen Fattah WO sedang menyusun kru terbaik untuk acara Anda. Penugasan staf akan langsung muncul di halaman ini.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Feedback Form (Hanya jika acara selesai) */}
            {isCompleted && (
              <div className="border-t border-slate-100 bg-slate-50/80 p-5">
                <FeedbackForm 
                  reservationId={item.id} 
                  onSubmit={submitFeedback}
                  isSubmitting={isSubmitting}
                />
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default ClientScheduleList;
