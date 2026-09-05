import React, { useState } from 'react';
import { useWorkerManagement } from '../../features/worker-management/hooks/useWorkerManagement';
import WorkerList from '../../features/worker-management/components/WorkerList';
import AddWorkerModal from '../../features/worker-management/components/AddWorkerModal';
import WorkerDetailModal from '../../features/worker-management/components/WorkerDetailModal';
import { Users } from 'lucide-react';

export const AdminWorkerPage = () => {
  const { workers, isLoading, addWorker, isAdding, toggleStatus, isToggling } = useWorkerManagement();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedWorkerForDetail, setSelectedWorkerForDetail] = useState(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-7 h-7 text-primary" />
            Manajemen Worker
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola akun kru wedding organizer, buat kredensial login baru, dan atur status keaktifan worker.
          </p>
        </div>
      </div>

      {/* Main List */}
      <WorkerList
        workers={workers}
        isLoading={isLoading}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenDetailModal={(worker) => setSelectedWorkerForDetail(worker)}
        onToggleStatus={(workerId, isActive) => toggleStatus({ workerId, isActive })}
        isToggling={isToggling}
      />

      {/* Add Worker Modal */}
      <AddWorkerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddWorker={addWorker}
        isSubmitting={isAdding}
      />

      {/* Worker Detail Modal */}
      <WorkerDetailModal
        isOpen={!!selectedWorkerForDetail}
        onClose={() => setSelectedWorkerForDetail(null)}
        worker={selectedWorkerForDetail}
      />
    </div>
  );
};

export default AdminWorkerPage;
