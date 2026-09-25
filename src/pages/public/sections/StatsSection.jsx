import React from 'react';
import { motion } from 'framer-motion';
import { LANDING_STATS } from '../landingData';
import { CREW_CLOUDS, STATS_PHOTOS, HOVER_ZOOM } from '../landingImages';
import { fadeInUp, stagger } from './animations';

export const StatsSection = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={stagger}
      className="w-full overflow-hidden 2xl:overflow-visible"
    >
      <div className="flex items-center justify-between w-full">
        {/* Left crew cutouts — Nopal (back/top) + Ana (front/bottom, overlaps) */}
        <motion.div variants={fadeInUp} className="hidden xl:block w-[26rem] shrink-0 relative" style={{ height: '480px' }}>
          {/* Kak Nopal — behind, top-left */}
          <div className="absolute -top-40 left-4 w-64 z-0">
            <img
              src={STATS_PHOTOS.left.back.src}
              alt={STATS_PHOTOS.left.back.alt}
              className={`w-full h-auto object-contain drop-shadow-xl ${HOVER_ZOOM}`}
            />
          </div>
          {/* Kak Ana — in front, bottom, overlapping Nopal */}
          <div className="absolute bottom-0 w-[22rem] z-10">
            <img
              src={STATS_PHOTOS.left.front.src}
              alt={STATS_PHOTOS.left.front.alt}
              className={`w-full h-auto object-contain drop-shadow-2xl ${HOVER_ZOOM}`}
            />
            <img
              src={CREW_CLOUDS.ana}
              alt=""
              aria-hidden="true"
              className="absolute -bottom-28 left-1/2 z-30 w-72 -translate-x-1/2 pointer-events-none"
            />
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl z-20 px-6 mx-auto">
          {LANDING_STATS.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                variants={fadeInUp}
                className="flex flex-col items-center p-5 bg-white border border-slate-200 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/8 text-primary flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-extrabold text-primary font-heading">{s.value}</p>
                <p className="text-xs text-slate-500 font-semibold mt-0.5">{s.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Right crew cutouts — Redho (back/top) + Alip&Atala (front/bottom, overlaps) */}
        <motion.div variants={fadeInUp} className="hidden xl:block w-[26rem] shrink-0 relative" style={{ height: '480px' }}>
          {/* Kak Redho — behind, top-right */}
          <div className="absolute -top-36 right-16 w-64 z-0">
            <img
              src={STATS_PHOTOS.right.back.src}
              alt={STATS_PHOTOS.right.back.alt}
              className={`w-full h-auto object-contain drop-shadow-xl ${HOVER_ZOOM}`}
            />
          </div>
          {/* Kak Alip & Atala — in front, bottom, overlapping Redho */}
          <div className="absolute bottom-0 right-4 w-[22rem] z-10">
            <img
              src={STATS_PHOTOS.right.front.src}
              alt={STATS_PHOTOS.right.front.alt}
              className={`w-full h-auto object-contain drop-shadow-2xl ${HOVER_ZOOM}`}
            />
            <img
              src={CREW_CLOUDS.alipAtala}
              alt=""
              aria-hidden="true"
              className="absolute -bottom-28 left-7/12 z-30 w-96 -translate-x-1/2 scale-x-[-1] pointer-events-none"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default StatsSection;
