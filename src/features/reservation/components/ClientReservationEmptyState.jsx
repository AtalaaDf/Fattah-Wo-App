import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import Card from '../../../components/ui/Card';

export const ClientReservationEmptyState = () => {
  const navigate = useNavigate();

  return (
    <Card className="py-16 text-center flex flex-col items-center justify-center">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
        Belum Ada Reservasi Aktif
      </p>
      <h3 className="text-xl font-bold text-slate-800 max-w-md">
        Wujudkan Pernikahan & Acara Impian Anda Bersama Fattah Wedding Organizer
      </h3>
      <p className="text-sm text-slate-500 max-w-md mt-2 mb-8">
        Klik tombol tambah di bawah ini untuk membuat pesanan reservasi acara baru.
      </p>

      {/* Large Round '+' Button */}
      <button
        onClick={() => navigate('/client/reservation/new')}
        className="group relative w-20 h-20 rounded-full bg-primary hover:bg-primary-container text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95"
        title="Buat Reservasi Baru"
      >
        <Plus className="w-10 h-10 transition-transform group-hover:rotate-90" />
      </button>

      <span className="text-xs font-semibold text-primary mt-3">Buat Reservasi Baru</span>
    </Card>
  );
};

export default ClientReservationEmptyState;
