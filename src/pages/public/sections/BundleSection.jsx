import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBundles } from '../../../features/bundle/hooks/useBundles';
import BundleCarousel from '../../../features/bundle/components/BundleCarousel';
import { fadeInUp, stagger } from './animations';

export const BundleSection = () => {
  const navigate = useNavigate();
  const { bundles, isLoading } = useBundles({ activeOnly: true });

  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={stagger}
      className="max-w-6xl mx-auto px-6 space-y-8"
    >
      <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
          Pilihan Paket Terbaik
        </span>
        <h2 className="text-3xl font-heading font-bold text-slate-900">
          Paket Layanan Fattah WO
        </h2>
        <p className="text-sm text-slate-500">
          Jelajahi paket pesta pernikahan dan acara keluarga pilihan dengan fasilitas lengkap.
        </p>
      </motion.div>

      <motion.div variants={fadeInUp}>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-72 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <BundleCarousel
            bundles={bundles}
            onSelectBundle={(bundle) =>
              navigate('/register', { state: { selectedBundle: bundle } })
            }
            showSelectButton
          />
        )}
      </motion.div>
    </motion.section>
  );
};

export default BundleSection;
