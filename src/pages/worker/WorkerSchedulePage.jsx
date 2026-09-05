import React from 'react';
import { useSchedule } from '../../features/schedule/hooks/useSchedule';
import WorkerScheduleList from '../../features/schedule/components/WorkerScheduleList';
import { CalendarCheck } from 'lucide-react';

export const WorkerSchedulePage = () => {
  const { workerEvents, isWorkerLoading, requestCancel, isRequestingCancel } = useSchedule();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
          <CalendarCheck className="w-7 h-7 text-primary" />
          Jadwal Job Saya
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Daftar event acara pernikahan yang sudah berhasil Anda ambil dan terdaftar sebagai kru resmi.
        </p>
      </div>

      <WorkerScheduleList
        schedules={workerEvents}
        isLoading={isWorkerLoading}
        onRequestCancel={requestCancel}
        isRequestingCancel={isRequestingCancel}
      />
    </div>
  );
};

export default WorkerSchedulePage;
