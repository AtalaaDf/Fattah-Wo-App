import React from 'react';
import { useSchedule } from '../../features/schedule/hooks/useSchedule';
import WorkerOpportunitiesList from '../../features/schedule/components/WorkerOpportunitiesList';
import { Briefcase } from 'lucide-react';

export const WorkerListPage = () => {
  const { availableEvents, isAvailableLoading, claimEvent, isClaiming } = useSchedule();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="w-7 h-7 text-primary" />
          Available Opportunities
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Pilih dan ambil (klaim) jadwal job acara yang membutuhkan kru tambahan. Sistem otomatis memproteksi bentrok jadwal (1 worker 1 event per tanggal).
        </p>
      </div>

      <WorkerOpportunitiesList
        events={availableEvents}
        isLoading={isAvailableLoading}
        onClaimEvent={claimEvent}
        isClaiming={isClaiming}
      />
    </div>
  );
};

export default WorkerListPage;
