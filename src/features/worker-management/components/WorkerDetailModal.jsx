import React from 'react';
import Modal from '../../../components/ui/Modal';
import StatusChip from '../../../components/ui/StatusChip';
import Button from '../../../components/ui/Button';
import { User, Phone, Mail, Calendar, MapPin, GraduationCap, Clock } from 'lucide-react';

export const WorkerDetailModal = ({ isOpen, onClose, worker }) => {
  if (!worker) return null;

  const details = worker.worker_details || {};
  const hasDetails = details && Object.keys(details).length > 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detail Biodata Worker" maxWidth="max-w-lg">
      <div className="space-y-6">
        {/* Header Profile Info */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div className="w-16 h-16 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xl border border-primary/20 uppercase overflow-hidden shrink-0">
            {details.profile_photo_url ? (
              <img src={details.profile_photo_url} alt={worker.full_name} className="w-full h-full object-cover" />
            ) : (
              worker.full_name?.charAt(0) || 'W'
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">{worker.full_name}</h3>
            <p className="text-sm text-slate-500 font-mono">@{worker.username}</p>
            <div className="mt-1.5 flex items-center gap-2">
              <StatusChip status={worker.is_active ? 'active' : 'inactive'} />
              <span className="text-xs text-slate-400">
                Terdaftar: {new Date(worker.created_at).toLocaleDateString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Informasi Biodata</h4>
          {hasDetails ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-100 bg-white">
                <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Tanggal Lahir</p>
                  <p className="font-medium text-slate-800">{details.birth_date || '-'}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-100 bg-white">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Tempat Lahir</p>
                  <p className="font-medium text-slate-800">{details.birth_place || '-'}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-100 bg-white">
                <User className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Jenis Kelamin</p>
                  <p className="font-medium text-slate-800">
                    {details.gender === 'male' ? 'Laki-laki' : details.gender === 'female' ? 'Perempuan' : '-'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-100 bg-white">
                <GraduationCap className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Pendidikan Terakhir</p>
                  <p className="font-medium text-slate-800">{details.last_education || '-'}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-100 bg-white sm:col-span-2">
                <Phone className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Nomor WhatsApp Aktif</p>
                  <p className="font-medium text-slate-800">{details.contact_phone || worker.phone || '-'}</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-100 bg-white sm:col-span-2">
                <Mail className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs text-slate-400">Email Hubungi Aktif</p>
                  <p className="font-medium text-slate-800">{details.contact_email || worker.email || '-'}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 text-center rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs">
              <Clock className="w-5 h-5 mx-auto mb-1 text-amber-600" />
              Worker ini belum mengisi form biodata & kontak lengkap setelah login pertama.
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="flex justify-end pt-3 border-t border-slate-100">
          <Button variant="outline" onClick={onClose}>
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default WorkerDetailModal;
