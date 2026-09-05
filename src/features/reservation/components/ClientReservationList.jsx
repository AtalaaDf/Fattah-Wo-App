import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, CreditCard, ArrowRight, Package } from 'lucide-react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import StatusChip from '../../../components/ui/StatusChip';
import ClientReservationEmptyState from './ClientReservationEmptyState';

export const ClientReservationList = ({ reservations = [], isLoading = false }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="h-44 bg-slate-100 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (reservations.length === 0) {
    return <ClientReservationEmptyState />;
  }

  return (
    <div className="space-y-4">
      {reservations.map((item) => {
        const bundle = item.bundles || {};

        return (
          <Card key={item.id} className="p-5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {item.ref_code}
                  </span>
                  <StatusChip status={item.status} />
                  <StatusChip status={item.payment_status} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.full_name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <Package className="w-3.5 h-3.5 text-slate-400" />
                  {bundle.name ? `Paket: ${bundle.name}` : `Kategori: ${item.reservation_type}`}
                </p>
              </div>

              <div className="text-left md:text-right">
                <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-primary" />
                  {new Date(item.event_date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </div>
                <p className="text-xs text-slate-500 flex items-center md:justify-end gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {item.location || 'Lokasi N/A'}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4">
              <div className="text-xs text-slate-500">
                Kru Dibutuhkan: <strong className="text-slate-800">{item.workers_needed} orang</strong>
              </div>

              <Button
                onClick={() => navigate(`/client/payment/${item.id}`)}
                size="sm"
                className="w-full sm:w-auto text-xs"
              >
                <CreditCard className="w-3.5 h-3.5 mr-1.5" />
                {item.payment_status === 'paid' ? 'Lihat Detail Pembayaran' : 'Proses Pembayaran'}
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ClientReservationList;
