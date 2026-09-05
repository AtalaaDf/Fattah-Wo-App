import React, { useState } from 'react';
import { Plus, Edit2, Trash2, CheckCircle2, XCircle, Sparkles, Tag, Layers } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export const AdminBundleList = ({
  bundles = [],
  isLoading = false,
  onOpenCreateModal,
  onOpenEditModal,
  onDeleteBundle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Semua Kategori' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'birthday', label: 'Birthday' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'corporate', label: 'Corporate' },
  ];

  const filteredBundles = bundles.filter(
    (b) => selectedCategory === 'all' || b.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Category Tabs & Header Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-primary text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <Button onClick={onOpenCreateModal} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Bundle Paket Baru
        </Button>
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filteredBundles.length === 0 ? (
        <Card className="py-12 text-center text-slate-500">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <Layers className="w-6 h-6" />
          </div>
          <p className="font-semibold text-slate-700">Belum ada bundle untuk kategori ini</p>
          <p className="text-sm mt-1 text-slate-400">Klik "Tambah Bundle Paket Baru" untuk membuat paket baru.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBundles.map((bundle) => {
            const features = bundle.bundle_features || [];

            return (
              <Card
                key={bundle.id}
                className={`relative flex flex-col justify-between overflow-hidden border ${
                  bundle.is_popular ? 'border-amber-300 ring-2 ring-amber-300/30' : 'border-slate-200'
                }`}
              >
                {/* Popular Badge */}
                {bundle.is_popular && (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider shadow-xs z-10">
                    <Sparkles className="w-3 h-3" />
                    Terpopuler
                  </div>
                )}

                <div>
                  {/* Image Placeholder or Image */}
                  <div className="h-40 -mx-6 -mt-6 mb-4 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                    {bundle.image_url ? (
                      <img
                        src={bundle.image_url}
                        alt={bundle.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-4 text-slate-400">
                        <Tag className="w-8 h-8 mx-auto mb-1 opacity-50" />
                        <span className="text-xs">Foto Paket</span>
                      </div>
                    )}
                    <div className="absolute bottom-2 left-3">
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-md bg-slate-900/75 text-white backdrop-blur-xs">
                        {bundle.category}
                      </span>
                    </div>
                  </div>

                  {/* Title & Price */}
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-slate-900 leading-snug">{bundle.name}</h3>
                    <p className="text-xl font-extrabold text-primary">
                      Rp {Number(bundle.price).toLocaleString('id-ID')}
                    </p>
                  </div>

                  {bundle.description && (
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2">{bundle.description}</p>
                  )}

                  {/* Features List Checklist */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Fitur Paket:</p>
                    {features.length === 0 ? (
                      <p className="text-xs text-slate-400 italic">Belum ada fitur ditambahkan</p>
                    ) : (
                      features.map((feat) => (
                        <div key={feat.id} className="flex items-center gap-2 text-xs">
                          {feat.is_included ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-slate-300 shrink-0" />
                          )}
                          <span className={feat.is_included ? 'text-slate-700' : 'text-slate-400 line-through'}>
                            {feat.label}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="flex items-center gap-2 mt-6 pt-3 border-t border-slate-100">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => onOpenEditModal(bundle)}
                  >
                    <Edit2 className="w-3.5 h-3.5 mr-1.5" />
                    Edit Bundle
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-rose-600 hover:bg-rose-50"
                    onClick={() => {
                      if (window.confirm(`Hapus bundle "${bundle.name}"?`)) {
                        onDeleteBundle(bundle.id);
                      }
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
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

export default AdminBundleList;
