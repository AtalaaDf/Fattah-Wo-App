import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBundles } from '../../features/bundle/hooks/useBundles';
import BundleCarousel from '../../features/bundle/components/BundleCarousel';
import { Sparkles } from 'lucide-react';

export const ClientBundlePage = () => {
  const navigate = useNavigate();
  const { bundles, isLoading } = useBundles({ activeOnly: true });

  const handleSelectBundle = (bundle) => {
    navigate('/client/reservation/new', { state: { selectedBundle: bundle } });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-primary" />
          Browse Bundle Paket Layanan
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Pilih paket impian pernikahan Anda dari Fattah Wedding Organizer dan langsung buat reservasi.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-72 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <BundleCarousel
          bundles={bundles}
          onSelectBundle={handleSelectBundle}
          showSelectButton
        />
      )}
    </div>
  );
};

export default ClientBundlePage;
