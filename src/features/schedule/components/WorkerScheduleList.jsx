import React from 'react';
import { Calendar, MapPin, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export const WorkerScheduleList = ({
  schedules = [],
  isLoading = false,
  onRequestCancel,
  isRequestingCancel = false,
}) => {
  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-36 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : schedules.length === 0 ? (
        <Card className="py-12 text-center text-slate-500">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-semibold text-slate-700">Belum Ada Jadwal Job yang Diambil</p>
          <p className="text-sm text-slate-400 mt-1">
            Lihat menu "Available Opportunities" untuk mengambil tugas acara.
          </p>
        </Card>
      ) : (
        <div className="space-y-4">
          {schedules.map((item) => {
            const event = item.reservations || {};
            const isCancelRequested = item.status === 'cancel_requested';

            return (
              <Card key={item.id} className="p-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {event.ref_code}
                      </span>
                      {isCancelRequested ? (
                        <span className="text-xs font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">
                          Menunggu Persetujuan Pembatalan
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Terdaftar Sebagai Kru
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-lg text-slate-900">{event.full_name}</h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                      <span className="flex items-center gap-1 font-semibold text-slate-800">
                        <Calendar className="w-4 h-4 text-primary" />
                        {new Date(event.event_date).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {event.start_time || '08:00'} - {event.end_time || 'Selesai'}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        {event.location || 'Lokasi N/A'}
                      </span>
                    </div>
                  </div>

                  {!isCancelRequested && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs text-rose-600 hover:bg-rose-50 border border-rose-200 shrink-0"
                      disabled={isRequestingCancel}
                      onClick={() => {
                        if (
                          window.confirm(
                            'Apakah Anda yakin ingin mengajukan pembatalan job ini ke Admin?'
                          )
                        ) {
                          onRequestCancel(item.id);
                        }
                      }}
                    >
                      <AlertCircle className="w-3.5 h-3.5 mr-1" />
                      Ajukan Pembatalan ke Admin
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WorkerScheduleList;
