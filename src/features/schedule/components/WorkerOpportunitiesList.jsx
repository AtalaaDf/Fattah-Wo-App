import React, { useState } from 'react';
import { Calendar, MapPin, Users, CheckCircle, AlertTriangle, Briefcase } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Modal from '../../../components/ui/Modal';

export const WorkerOpportunitiesList = ({
  events = [],
  isLoading = false,
  onClaimEvent,
  isClaiming = false,
}) => {
  const [conflictModalMessage, setConflictModalMessage] = useState('');

  const handleClaim = async (reservationId) => {
    try {
      setConflictModalMessage('');
      await onClaimEvent({ reservationId });
    } catch (err) {
      const errMsg = err.message || '';
      if (errMsg.includes('schedule_conflict') || errMsg.includes('already assigned')) {
        setConflictModalMessage('Kamu sudah punya jadwal di tanggal ini! Pilih tanggal lain yang tidak bentrok.');
      } else if (errMsg.includes('event_full') || errMsg.includes('no slots')) {
        setConflictModalMessage('Slot kru untuk acara ini baru saja penuh.');
      } else {
        setConflictModalMessage(errMsg || 'Gagal mengambil job acara.');
      }
    }
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-44 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <Card className="py-12 text-center text-slate-500">
          <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <p className="font-semibold text-slate-700">Belum Ada Job Acara Tersedia</p>
          <p className="text-sm text-slate-400 mt-1">
            Semua acara saat ini kuota krunya sudah terpenuhi atau belum ada acara baru.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => {
            const isFull = event.slotsRemaining <= 0;

            return (
              <Card key={event.id} className="flex flex-col justify-between p-5">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary font-bold text-xs">
                      {event.reservation_type?.toUpperCase()}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        isFull ? 'bg-slate-100 text-slate-500' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {isFull ? 'Slot Penuh' : `Sisa ${event.slotsRemaining} Slot Kru`}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base">{event.full_name}</h3>

                  <div className="mt-3 space-y-1 text-xs text-slate-600">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary shrink-0" />
                      <strong className="text-slate-800">
                        {new Date(event.event_date).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </strong>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{event.location || 'Lokasi N/A'}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>
                        Dibutuhkan {event.workers_needed} Kru ({event.activeWorkersCount} sudah terisi)
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  {event.isAlreadyAssigned ? (
                    <div className="w-full py-2 text-center text-xs font-semibold text-emerald-700 bg-emerald-50 rounded-lg flex items-center justify-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      Sudah Kamu Ambil
                    </div>
                  ) : (
                    <Button
                      disabled={isFull || isClaiming}
                      onClick={() => handleClaim(event.id)}
                      className="w-full text-xs"
                      isLoading={isClaiming}
                    >
                      Ambil Job Ini
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Warning Conflict Modal */}
      <Modal
        isOpen={!!conflictModalMessage}
        onClose={() => setConflictModalMessage('')}
        title="Peringatan Jadwal Bentrok"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <p className="text-sm font-medium text-slate-800">{conflictModalMessage}</p>

          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <Button onClick={() => setConflictModalMessage('')}>Mengerti</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WorkerOpportunitiesList;
