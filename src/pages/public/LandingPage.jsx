import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBundles } from '../../features/bundle/hooks/useBundles';
import BundleCarousel from '../../features/bundle/components/BundleCarousel';
import Logo from '../../components/common/Logo';
import Button from '../../components/ui/Button';
import { Sparkles, Calendar, CheckCircle2, ChevronDown, MessageSquare, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export const LandingPage = ({ heroImageUrl }) => {
  const navigate = useNavigate();
  const { bundles, isLoading } = useBundles({ activeOnly: true });

  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const faqs = [
    {
      q: 'Bagaimana cara memilih paket wedding di Fattah Wedding Organizer?',
      a: 'Anda dapat melihat pilihan bundle paket aktif di section About & Bundle di atas, lalu klik "Pilih Paket Ini" atau login untuk membuat reservasi baru.',
    },
    {
      q: 'Bagaimana sistem penugasan kru/worker bekerja?',
      a: 'Sistem kami menggunakan algoritma KRS-style claim di mana worker mengambil event sesuai jadwal kosong mereka dengan proteksi otomatis terhadap bentrok tanggal.',
    },
    {
      q: 'Apakah bisa melakukan penundaan pembayaran DP/Pelunasan?',
      a: 'Bisa! Setelah membuat reservasi, Anda dapat memilih opsi "Tunda Payment" untuk menentukan tanggal kesepakatan pelunasan bersama tim kami.',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section id="home" className="relative pt-12 pb-20 px-6 text-center overflow-hidden">
        {heroImageUrl && (
          <div className="absolute inset-0 z-0 opacity-15">
            <img src={heroImageUrl} alt="Hero Background" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="flex justify-center mb-2">
            <Logo size="lg" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-slate-900 leading-tight">
              Your Dream, <span className="text-primary">Expertly Crafted.</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Platform manajemen acara & jasa wedding organizer profesional. Mewujudkan pernikahan impian Anda dengan koordinasi tim kru yang terstruktur dan terpercaya.
            </p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link to="/register">
              <Button size="lg" className="shadow-lg shadow-primary/20">
                Buat Reservasi Sekarang
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Login Akun
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About & Bundle Carousel Section */}
      <section id="about" className="max-w-6xl mx-auto px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            Pilihan Paket Terbaik
          </span>
          <h2 className="text-3xl font-heading font-bold text-slate-900">
            Paket Layanan Fattah WO
          </h2>
          <p className="text-sm text-slate-500">
            Jelajahi paket pesta pernikahan dan acara keluarga pilihan dengan fasilitas lengkap.
          </p>
        </div>

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
      </section>

      {/* Feature Highlights */}
      <section className="bg-slate-50 py-16 px-6 border-y border-slate-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">KRS-Style Worker Claim</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Worker dapat memilih dan mengklaim jadwal tugas acara sesuai ketersediaan waktu mereka dengan sistem cegah bentrok otomatis.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Transparansi Payment</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kemudahan pembayaran langsung (Pay Now) atau opsi jadwal penundaan DP & pelunasan transparan.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 text-emerald-700 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg">Layanan Terpercaya</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tim WO berpengalaman yang siap mendampingi mulai dari persiapan hingga acara selesai.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="max-w-3xl mx-auto px-6 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-heading font-bold text-slate-900">Pertanyaan Umum (FAQ)</h2>
          <p className="text-xs text-slate-500">Informasi penting seputar reservasi dan penugasan tim WO</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-white transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-bold text-sm text-slate-900 flex justify-between items-center hover:bg-slate-50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${
                      isOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-4xl mx-auto px-6 text-center">
        <div className="p-8 rounded-2xl bg-primary text-white space-y-4 shadow-xl">
          <Logo size="md" />
          <h3 className="text-2xl font-bold font-heading">Butuh Bantuan atau Konsultasi Acara?</h3>
          <p className="text-xs text-slate-200 max-w-lg mx-auto">
            Tim Fattah Wedding Organizer siap membantu pertanyaan dan koordinasi jadwal acara Anda.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Hubungi Layanan WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
