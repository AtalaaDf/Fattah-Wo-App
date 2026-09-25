
import {
  Calendar, ShieldCheck, Heart,
  Star, Users, CheckCircle2, Clock,
} from 'lucide-react';

//Feature Highlights
export const LANDING_FEATURES = [
  {
    icon: Calendar,
    iconBg: 'bg-primary/10 text-primary',
    title: 'Reservasi Mudah & Cepat',
    desc: 'Buat reservasi acara impian Anda dalam hitungan menit — pilih paket, tentukan tanggal & lokasi, lalu tim kami siap menangani sisanya.',
  },
  {
    icon: ShieldCheck,
    iconBg: 'bg-amber-500/10 text-amber-700',
    title: 'Transparansi Pembayaran',
    desc: 'Pilih bayar sekarang (DP/Full) atau jadwalkan penundaan sesuai kesepakatan. Semua proses transparan dan terdokumentasi.',
  },
  {
    icon: Heart,
    iconBg: 'bg-rose-500/10 text-rose-600',
    title: 'Layanan Terpercaya',
    desc: 'Tim kru profesional berpengalaman yang mendampingi Anda dari persiapan awal hingga acara usai dengan penuh dedikasi.',
  },
];

//Stats Strip
export const LANDING_STATS = [
  { icon: Star,         value: '4.9/5',   label: 'Rating Kepuasan' },
  { icon: Users,        value: '200+',    label: 'Klien Puas' },
  { icon: CheckCircle2, value: '200+',    label: 'Acara Sukses' },
  { icon: Clock,        value: '2 Tahun', label: 'Pengalaman' },
];

// FAQ Items
export const LANDING_FAQS = [
  {
    q: 'Bagaimana cara memilih paket wedding di Fattah Wedding Organizer?',
    a: 'Anda dapat melihat pilihan bundle paket aktif di section Paket Layanan di bawah, lalu klik "Pilih Paket Ini" atau langsung daftar untuk membuat reservasi baru.',
  },
  {
    q: 'Apakah saya bisa memantau persiapan acara setelah reservasi?',
    a: 'Ya! Setelah login ke akun Anda, halaman "Status Acara" menampilkan informasi lengkap termasuk tim kru yang sudah ditugaskan untuk acara Anda.',
  },
  {
    q: 'Apakah bisa melakukan penundaan pembayaran DP/Pelunasan?',
    a: 'Bisa! Setelah membuat reservasi, Anda dapat memilih opsi "Tunda Payment" untuk menentukan tanggal kesepakatan pembayaran bersama tim kami.',
  },
  {
    q: 'Bagaimana cara memberikan ulasan setelah acara selesai?',
    a: 'Setelah acara selesai dan status diperbarui oleh admin, formulir ulasan akan muncul otomatis di halaman "Status Acara" akun Anda.',
  },
];
