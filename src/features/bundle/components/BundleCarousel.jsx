import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, ArrowRight, Tag } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';

export const BundleCarousel = ({ bundles = [], onSelectBundle, showSelectButton = false }) => {
  // Max 5 active bundles for carousel as per AGENT.md requirements
  const activeBundles = bundles
    .filter((b) => b.is_active)
    .slice(0, 5);

  if (activeBundles.length === 0) {
    return (
      <div className="py-8 text-center text-slate-400 text-sm">
        Belum ada paket unggulan yang ditampilkan.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {activeBundles.map((bundle, idx) => {
        const features = bundle.bundle_features || [];

        return (
          <motion.div
            key={bundle.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
          >
            <Card
              hover
              className={`h-full flex flex-col justify-between relative overflow-hidden border ${
                bundle.is_popular ? 'border-amber-300 ring-2 ring-amber-300/30' : 'border-slate-200'
              }`}
            >
              {bundle.is_popular && (
                <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 uppercase tracking-wider shadow-xs z-10">
                  <Sparkles className="w-3 h-3" />
                  Terpopuler
                </div>
              )}

              <div>
                <div className="h-44 -mx-6 -mt-6 mb-4 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  {bundle.image_url ? (
                    <img
                      src={bundle.image_url}
                      alt={bundle.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="text-center p-4 text-slate-400">
                      <Tag className="w-8 h-8 mx-auto mb-1 opacity-50" />
                      <span className="text-xs">Foto Paket</span>
                    </div>
                  )}
                  <div className="absolute bottom-2 left-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-900/75 text-white backdrop-blur-xs">
                      {bundle.category}
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-lg text-slate-900 leading-snug">{bundle.name}</h3>
                <p className="text-xl font-extrabold text-primary mt-1">
                  Rp {Number(bundle.price).toLocaleString('id-ID')}
                </p>

                {bundle.description && (
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2">{bundle.description}</p>
                )}

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Layanan Termasuk:</p>
                  {features.slice(0, 5).map((feat) => (
                    <div key={feat.id} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{feat.label}</span>
                    </div>
                  ))}
                  {features.length > 5 && (
                    <p className="text-[11px] text-slate-400 italic">+ {features.length - 5} layanan lainnya</p>
                  )}
                </div>
              </div>

              {showSelectButton && onSelectBundle && (
                <div className="mt-6 pt-3 border-t border-slate-100">
                  <Button
                    onClick={() => onSelectBundle(bundle)}
                    className="w-full"
                    variant={bundle.is_popular ? 'primary' : 'outline'}
                  >
                    Pilih Paket Ini
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BundleCarousel;
