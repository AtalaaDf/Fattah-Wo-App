import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import Logo from '../../../components/common/Logo';
import Button from '../../../components/ui/Button';
import { HERO_BG } from '../landingImages';

export const HeroSection = () => {
  return (
    <section id="home" className="relative overflow-hidden">
      {/* Full-layer background image */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BG}
          alt="Fattah Wedding Organizer Team"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 pt-20 pb-28 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center"
          >
            <Logo size="lg" theme="dark" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Wedding Organizer Profesional
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-white leading-tight drop-shadow-lg">
              Your Dream,{' '}
              <span className="text-champagne-gold">
                Expertly Crafted.
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Platform manajemen acara & jasa wedding organizer profesional. Mewujudkan pernikahan impian Anda dengan koordinasi tim kru yang terstruktur dan terpercaya.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/register">
              <Button size="lg" className="shadow-xl shadow-primary/30 hover:shadow-primary/40 transition-shadow">
                <span className="flex items-center gap-2">
                  Buat Reservasi Sekarang
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                Masuk ke Akun
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
