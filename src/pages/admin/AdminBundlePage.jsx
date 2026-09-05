import React, { useState } from 'react';
import { useBundles } from '../../features/bundle/hooks/useBundles';
import AdminBundleList from '../../features/bundle/components/AdminBundleList';
import BundleFormModal from '../../features/bundle/components/BundleFormModal';
import { Package } from 'lucide-react';

export const AdminBundlePage = () => {
  const { bundles, isLoading, createBundle, isCreating, updateBundle, isUpdating, deleteBundle } = useBundles();

  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedBundleForEdit, setSelectedBundleForEdit] = useState(null);

  const handleSaveBundle = async ({ bundleData, features, bundleId }) => {
    if (bundleId) {
      await updateBundle({ bundleId, bundleData, features });
    } else {
      await createBundle({ bundleData, features });
    }
  };

  const handleOpenCreate = () => {
    setSelectedBundleForEdit(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (bundle) => {
    setSelectedBundleForEdit(bundle);
    setIsFormModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-7 h-7 text-primary" />
            Kelola Bundle Paket
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Atur pilihan paket layanan, harga, fitur checklist, dan aktifkan untuk ditampilkan di landing page.
          </p>
        </div>
      </div>

      {/* Main List */}
      <AdminBundleList
        bundles={bundles}
        isLoading={isLoading}
        onOpenCreateModal={handleOpenCreate}
        onOpenEditModal={handleOpenEdit}
        onDeleteBundle={deleteBundle}
      />

      {/* Form Modal */}
      <BundleFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSave={handleSaveBundle}
        bundleToEdit={selectedBundleForEdit}
        isSubmitting={isCreating || isUpdating}
      />
    </div>
  );
};

export default AdminBundlePage;
