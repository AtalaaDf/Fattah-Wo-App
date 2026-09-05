import React from 'react';
import { useSchedule } from '../../features/schedule/hooks/useSchedule';
import { useWorkerManagement } from '../../features/worker-management/hooks/useWorkerManagement';
import AdminScheduleMaster from '../../features/schedule/components/AdminScheduleMaster';
import { Calendar } from 'lucide-react';

export const AdminSchedulePage = () => {
  const { adminEvents, isAdminLoading, assignWorker, removeWorker, isAssigning, isRemoving } = useSchedule();
  const { workers } = useWorkerManagement();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-7 h-7 text-primary" />
          Schedule Master Admin
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Pantau seluruh event acara pernikahan, kelola alokasi penugasan staf kru, dan hubungi client via WhatsApp.
        </p>
      </div>

      <AdminScheduleMaster
        events={adminEvents}
        workersList={workers}
        isLoading={isAdminLoading}
        onAssignWorker={assignWorker}
        onRemoveWorker={removeWorker}
        isAssigning={isAssigning}
        isRemoving={isRemoving}
      />
    </div>
  );
};

export default AdminSchedulePage;
