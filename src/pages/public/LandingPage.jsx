import React from 'react'
import { Link } from 'react-router-dom'

export const LandingPage = () => {
  return (
    <div id="home" className="py-20 px-6 max-w-container mx-auto text-center space-y-8">
      <div className="max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-primary leading-tight">
          Your Dream, Expertly Crafted.
        </h1>
        <p className="text-slate-muted text-base md:text-lg">
          Transforming your vision into a flawless reality. WeddingPro offers premier organizational services for couples who demand perfection and sophisticated design on their special day.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          to="/register"
          className="px-6 py-3 bg-champagne-gold text-white font-semibold rounded-md shadow-sm hover:opacity-90 transition-opacity"
        >
          Buat Reservasi Sekarang
        </Link>
        <Link
          to="/login"
          className="px-6 py-3 bg-primary text-white font-semibold rounded-md shadow-sm hover:opacity-90 transition-opacity"
        >
          Login Akun
        </Link>
      </div>

      <div className="pt-16 border-t border-outline-variant grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        <div id="about" className="p-6 bg-white border border-outline-variant rounded-lg">
          <h3 className="font-heading font-semibold text-lg text-primary mb-2">Manajemen Worker</h3>
          <p className="text-sm text-slate-muted">Sistem klaim jadwal terstruktur tanpa risikonya bentrok tanggal bagi kru.</p>
        </div>
        <div id="contact" className="p-6 bg-white border border-outline-variant rounded-lg">
          <h3 className="font-heading font-semibold text-lg text-primary mb-2">Paket & Bundle</h3>
          <p className="text-sm text-slate-muted">Pilihan paket pernikahan fleksibel sesuai kebutuhan calon pengantin.</p>
        </div>
        <div id="faq" className="p-6 bg-white border border-outline-variant rounded-lg">
          <h3 className="font-heading font-semibold text-lg text-primary mb-2">Transparansi Layanan</h3>
          <p className="text-sm text-slate-muted">Pantau status reservasi & pembayaran secara real-time dari portal client.</p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
