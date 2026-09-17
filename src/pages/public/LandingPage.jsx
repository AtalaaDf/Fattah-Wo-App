import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBundles } from '../../features/bundle/hooks/useBundles';
import BundleCarousel from '../../features/bundle/components/BundleCarousel';
import Logo from '../../components/common/Logo';
import Button from '../../components/ui/Button';
import { Sparkles, ChevronDown, MessageSquare, ArrowRight } from 'lucide-react';
import { LANDING_FEATURES, LANDING_STATS, LANDING_FAQS } from './landingData';

// Reusable fade-in-up animation variant
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export const LandingPage = ({ heroImageUrl }) => {
  const navigate = useNavigate();
  const { bundles, isLoading } = useBundles({ activeOnly: true });
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  return (
    <div className="space-y-20 pb-20">
      {/* ── HERO SECTION ── */}
      <section id="home" className="relative pt-16 pb-24 px-6 text-center overflow-hidden">
        {/* Gradient background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-amber-400/8 blur-3xl" />
        </div>

        {heroImageUrl && (
          <div className="absolute inset-0 z-0 opacity-10">
            <img src={heroImageUrl} alt="Hero Background" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex justify-center"
          >
            <Logo size="lg" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5"
          >
            <div className="inline-flex items-center gap-2 bg-primary/8 border border-primary/15 text-primary text-xs font-bold px-4 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Wedding Organizer Profesional
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-slate-900 leading-tight">
              Your Dream,{' '}
              <span className="text-primary relative">
                Expertly Crafted.
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
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
              <Button size="lg" className="shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-shadow">
                Buat Reservasi Sekarang
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Masuk ke Akun
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
        className="max-w-5xl mx-auto px-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
      </motion.section>

      {/* ── BUNDLE / PAKET SECTION ── */}
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

      {/* ── FEATURE HIGHLIGHTS ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="bg-slate-50 py-16 px-6 border-y border-slate-200"
      >
        <motion.div variants={fadeInUp} className="max-w-2xl mx-auto text-center mb-10 space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            Keunggulan Kami
          </span>
          <h2 className="text-3xl font-heading font-bold text-slate-900">
            Kenapa Pilih Fattah WO?
          </h2>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
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
      </motion.section>

      {/* ── FAQ SECTION ── */}
      <motion.section
        id="faq"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="max-w-3xl mx-auto px-6 space-y-6"
      >
        <motion.div variants={fadeInUp} className="text-center space-y-2">
          <h2 className="text-2xl font-heading font-bold text-slate-900">Pertanyaan Umum (FAQ)</h2>
          <p className="text-xs text-slate-500">Informasi penting seputar reservasi dan layanan Fattah WO</p>
        </motion.div>

        <div className="space-y-3">
          {LANDING_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-shadow hover:shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-sm text-slate-900 flex justify-between items-center hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 ml-3 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="px-4 pb-4 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 leading-relaxed pt-3"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ── CONTACT / CTA SECTION ── */}
      <motion.section
        id="contact"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
        className="max-w-4xl mx-auto px-6 text-center"
      >
        <div className="relative p-10 rounded-3xl bg-gradient-to-br from-[#104358] to-[#1a6080] text-white space-y-5 shadow-2xl overflow-hidden">
          {/* Decorative orb */}
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 space-y-5">
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
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                Hubungi via WhatsApp
              </a>
              <Link to="/register">
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-bold text-sm rounded-xl border border-white/20 transition-colors">
                  Buat Reservasi
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;
