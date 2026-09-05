import React from 'react';
import { useWorkerProfile } from '../../features/worker-profile/hooks/useWorkerProfile';
import WorkerProfileForm from '../../features/worker-profile/components/WorkerProfileForm';
import { UserCheck } from 'lucide-react';

export const WorkerProfilePage = () => {
  const { details, isLoading, updateProfile, isUpdating } = useWorkerProfile();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
          <UserCheck className="w-7 h-7 text-primary" />
          Biodata & Profil Worker
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Lengkapi data diri dan nomor kontak aktif Anda agar Admin dapat memverifikasi dan menghubungi Anda untuk tugas acara.
        </p>
      </div>

      {isLoading ? (
        <div className="h-64 bg-slate-100 rounded-xl animate-pulse" />
      ) : (
        <WorkerProfileForm
          details={details}
          onSave={updateProfile}
          isSaving={isUpdating}
        />
      )}
    </div>
  );
};

export default WorkerProfilePage;
