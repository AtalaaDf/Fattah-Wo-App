import React from 'react';
import { motion } from 'framer-motion';
import { LANDING_FEATURES } from '../landingData';
import { CREW_CLOUDS, FEATURES_PHOTOS, HOVER_ZOOM } from '../landingImages';
import { fadeInUp, stagger } from './animations';

export const FeaturesSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="bg-slate-50 py-16 border-y border-slate-200 w-full overflow-hidden 2xl:overflow-visible"
    >
      <motion.div variants={fadeInUp} className="max-w-2xl mx-auto text-center mb-10 space-y-2 px-6">
        <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
          Keunggulan Kami
        </span>
        <h2 className="text-3xl font-heading font-bold text-slate-900">
          Kenapa Pilih Fattah WO?
        </h2>
      </motion.div>

      <div className="flex items-center justify-between w-full">
        {/* Left crew cutout */}
        <motion.div variants={fadeInUp} className="hidden lg:block w-[20rem] shrink-0 rounded-2xl relative">
          <img
            src={FEATURES_PHOTOS.left.src}
            alt={FEATURES_PHOTOS.left.alt}
            className={`w-full h-auto object-contain drop-shadow-xl ${HOVER_ZOOM}`}
          />
          <img
            src={CREW_CLOUDS.aqilNala}
            alt=""
            aria-hidden="true"
            className="absolute -bottom-20 left-1/2 z-30 w-96 -translate-x-1/2 pointer-events-none"
          />
        </motion.div>

        {/* Feature cards */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 px-6 mx-auto">
          {LANDING_FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={fadeInUp}
                className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 space-y-3"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${f.iconBg}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Right crew cutout */}
        <motion.div variants={fadeInUp} className="hidden xl:block w-[20rem] shrink-0 rounded-2xl relative">
          <img
            src={FEATURES_PHOTOS.right.src}
            alt={FEATURES_PHOTOS.right.alt}
            className={`w-full h-auto object-contain drop-shadow-xl ${HOVER_ZOOM}`}
          />
          <img
            src={CREW_CLOUDS.rasya}
            alt=""
            aria-hidden="true"
            className="absolute -bottom-28 left-1/2 z-30 w-72 -translate-x-1/2 pointer-events-none"
          />
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FeaturesSection;
