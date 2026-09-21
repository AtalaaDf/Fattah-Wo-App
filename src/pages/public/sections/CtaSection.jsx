import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight } from 'lucide-react';
import Logo from '../../../components/common/Logo';
import { CTA_PHOTO, HOVER_ZOOM } from '../landingImages';
import { fadeInUp } from './animations';

export const CtaSection = () => {
  return (
    <motion.section
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="max-w-4xl mx-auto px-6 text-center mt-32 relative"
    >
      {/* CTA crew cutout — standing on top-left of the card */}
      <motion.div variants={fadeInUp} className="absolute bottom-full left-12 lg:left-24 w-48 hidden md:block z-20">
        <img
          src={CTA_PHOTO.src}
          alt={CTA_PHOTO.alt}
          className={`w-full h-auto object-contain origin-bottom drop-shadow-xl ${HOVER_ZOOM}`}
        />
      </motion.div>

      <div className="relative p-10 rounded-3xl bg-gradient-to-br from-[#104358] to-[#1a6080] text-white space-y-5 shadow-2xl overflow-hidden">
        {/* Decorative orbs */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

        {/* CTA content */}
        <div className="relative z-10 flex flex-col items-center space-y-5">
          <Logo size="md" theme="dark" />
          <h3 className="text-2xl font-bold font-heading">
            Butuh Bantuan atau Konsultasi Acara?
          </h3>
          <p className="text-sm text-slate-200 max-w-lg mx-auto leading-relaxed">
            Tim Fattah Wedding Organizer siap membantu pertanyaan dan koordinasi jadwal acara Anda kapan saja.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Hubungi via WhatsApp
            </a>
            <Link to="/register">
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-bold text-sm rounded-xl border border-white/20 transition-colors">
                Buat Reservasi
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default CtaSection;
