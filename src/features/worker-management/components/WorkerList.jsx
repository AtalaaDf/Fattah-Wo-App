import React from 'react';
import { UserCheck, UserX, Eye, UserPlus, Search, Power } from 'lucide-react';
import StatusChip from '../../../components/ui/StatusChip';
import Button from '../../../components/ui/Button';
import Card from '../../../components/ui/Card';
import { SkeletonCard } from '../../../components/ui/Skeleton';

export const WorkerList = ({
  workers = [],
  isLoading = false,
  onOpenAddModal,
  onOpenDetailModal,
  onToggleStatus,
  isToggling = false,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [availabilityFilter, setAvailabilityFilter] = React.useState('all');

  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      worker.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && worker.is_active) ||
      (statusFilter === 'inactive' && !worker.is_active);

    const details = worker.worker_details || {};
    const isAvailable = details.is_available ?? true;
    const matchesAvailability =
      availabilityFilter === 'all' ||
      (availabilityFilter === 'on' && isAvailable) ||
      (availabilityFilter === 'off' && !isAvailable);

    return matchesSearch && matchesStatus && matchesAvailability;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar & Search Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama atau username worker..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
          >
            <option value="all">Semua Status Akun</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
          </select>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
          >
            <option value="all">Semua Status Kerja</option>
            <option value="on">Status ON (Available)</option>
            <option value="off">Status OFF (Unavailable)</option>
          </select>
        </div>

        <Button onClick={onOpenAddModal} className="w-full sm:w-auto shrink-0">
          <UserPlus className="w-4 h-4 mr-2" />
          Tambah Worker Baru
        </Button>
      </div>

      {/* Skeleton Loading */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredWorkers.length === 0 ? (
        /* Empty State */
        <Card className="py-12 text-center text-slate-500">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <UserX className="w-6 h-6" />
          </div>
          <p className="font-semibold text-slate-700">Tidak ada worker ditemukan</p>
          <p className="text-sm mt-1 text-slate-400">
            {searchTerm ? 'Coba kata kunci pencarian nama lain.' : 'Belum ada worker terdaftar.'}
          </p>
        </Card>
      ) : (
        /* Worker Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredWorkers.map((worker) => {
            const hasDetails = worker.worker_details && Object.keys(worker.worker_details).length > 0;
            const details = worker.worker_details || {};
            const isAvailable = details.is_available ?? true;

            return (
              <Card key={worker.id} hover className="flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-base border border-primary/20 uppercase overflow-hidden shrink-0">
                        {details.profile_photo_url ? (
                          <img src={details.profile_photo_url} alt={worker.full_name} className="w-full h-full object-cover" />
                        ) : (
                          worker.full_name?.charAt(0) || 'W'
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 leading-tight">{worker.full_name}</h4>
                        <p className="text-xs text-slate-500 font-mono mt-0.5">@{worker.username}</p>
                      </div>
                    </div>

                    <StatusChip status={worker.is_active ? 'active' : 'inactive'} />
                  </div>

                  {/* Worker ON / OFF Availability Status Badge */}
                  <div className="mt-2 mb-3 flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                      <Power className="w-3.5 h-3.5" />
                      Status Kerja:
                    </span>
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${
                      isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {isAvailable ? '🟢 ON (Available)' : '🔴 OFF (Unavailable)'}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    <p className="flex justify-between">
                      <span className="text-slate-400">Kontak WA:</span>
                      <span className="font-medium text-slate-800">{details.contact_phone || worker.phone || '-'}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-400">Email:</span>
                      <span className="font-medium text-slate-800">{details.contact_email || worker.email || '-'}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-400">Biodata Lengkap:</span>
                      <span className={`font-medium ${hasDetails ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {hasDetails ? 'Sudah Diisi' : 'Belum Diisi'}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => onOpenDetailModal(worker)}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1.5" />
                    Detail
                  </Button>

                  <Button
                    variant={worker.is_active ? 'ghost' : 'secondary'}
                    size="sm"
                    className={`text-xs ${worker.is_active ? 'text-rose-600 hover:bg-rose-50 hover:text-rose-700' : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'}`}
                    disabled={isToggling}
                    onClick={() => onToggleStatus(worker.id, !worker.is_active)}
                  >
                    {worker.is_active ? (
                      <>
                        <UserX className="w-3.5 h-3.5 mr-1" />
                        Nonaktifkan
                      </>
                    ) : (
                      <>
                        <UserCheck className="w-3.5 h-3.5 mr-1" />
                        Aktifkan
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WorkerList;
