import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bundleSchema } from '../schemas/bundleSchema';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Layers, Plus, Trash2, Tag, Check, X, Image as ImageIcon } from 'lucide-react';

export const BundleFormModal = ({ isOpen, onClose, onSave, bundleToEdit, isSubmitting }) => {
  const [features, setFeatures] = useState([]);
  const [newFeatureLabel, setNewFeatureLabel] = useState('');
  const [newFeatureIncluded, setNewFeatureIncluded] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bundleSchema),
    defaultValues: {
      name: '',
      category: 'wedding',
      price: 0,
      description: '',
      image_url: '',
      is_popular: false,
      is_active: true,
      display_order: 0,
    },
  });

  useEffect(() => {
    if (bundleToEdit) {
      reset({
        name: bundleToEdit.name || '',
        category: bundleToEdit.category || 'wedding',
        price: bundleToEdit.price || 0,
        description: bundleToEdit.description || '',
        image_url: bundleToEdit.image_url || '',
        is_popular: bundleToEdit.is_popular || false,
        is_active: bundleToEdit.is_active ?? true,
        display_order: bundleToEdit.display_order || 0,
      });
      setFeatures(bundleToEdit.bundle_features || []);
    } else {
      reset({
        name: '',
        category: 'wedding',
        price: 0,
        description: '',
        image_url: '',
        is_popular: false,
        is_active: true,
        display_order: 0,
      });
      setFeatures([]);
    }
  }, [bundleToEdit, reset, isOpen]);

  const handleAddFeature = () => {
    if (!newFeatureLabel.trim()) return;
    setFeatures((prev) => [
      ...prev,
      { id: Date.now().toString(), label: newFeatureLabel.trim(), is_included: newFeatureIncluded },
    ]);
    setNewFeatureLabel('');
    setNewFeatureIncluded(true);
  };

  const handleRemoveFeature = (index) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleToggleFeatureIncluded = (index) => {
    setFeatures((prev) =>
      prev.map((f, i) => (i === index ? { ...f, is_included: !f.is_included } : f))
    );
  };

  const onSubmit = async (data) => {
    await onSave({ bundleData: data, features, bundleId: bundleToEdit?.id });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={bundleToEdit ? 'Edit Bundle Paket' : 'Tambah Bundle Paket Baru'}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Input
              label="Nama Bundle"
              placeholder="Contoh: Paket Signature Wedding Platinum"
              icon={<Tag className="w-4 h-4" />}
              error={errors.name?.message}
              {...register('name')}
            />
          </div>

          <Select
            label="Kategori"
            icon={<Layers className="w-4 h-4" />}
            error={errors.category?.message}
            options={[
              { value: 'wedding', label: 'Wedding' },
              { value: 'birthday', label: 'Birthday' },
              { value: 'cultural', label: 'Cultural' },
              { value: 'corporate', label: 'Corporate' },
            ]}
            {...register('category')}
          />

          <Input
            label="Harga (Rp)"
            type="number"
            placeholder="0"
            error={errors.price?.message}
            {...register('price')}
          />

          <div className="sm:col-span-2">
            <Input
              label="URL Gambar Cover Paket"
              placeholder="https://..."
              icon={<ImageIcon className="w-4 h-4" />}
              helperText="Tautan gambar paket untuk carousel & card"
              error={errors.image_url?.message}
              {...register('image_url')}
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Deskripsi Singkat</label>
            <textarea
              rows={2}
              placeholder="Jelaskan mengenai paket ini..."
              className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              {...register('description')}
            />
          </div>

          <div className="flex items-center gap-4 sm:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                className="w-4 h-4 rounded text-primary focus:ring-primary/20"
                {...register('is_popular')}
              />
              Tandai sebagai "Terpopuler"
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                className="w-4 h-4 rounded text-primary focus:ring-primary/20"
                {...register('is_active')}
              />
              Status Aktif
            </label>
          </div>
        </div>

        {/* Dynamic Features List Checklist */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
            Daftar Fitur / Fasilitas Paket
          </label>

          {/* Feature List Items */}
          <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs"
              >
                <div className="flex items-center gap-2 flex-1">
                  <button
                    type="button"
                    onClick={() => handleToggleFeatureIncluded(idx)}
                    className={`p-1 rounded ${
                      feat.is_included ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {feat.is_included ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                  </button>
                  <span className={feat.is_included ? 'font-medium text-slate-800' : 'text-slate-400 line-through'}>
                    {feat.label}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFeature(idx)}
                  className="text-rose-500 hover:text-rose-700 p-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Add New Feature Row */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="text"
              placeholder="Tambah fasilitas paket..."
              value={newFeatureLabel}
              onChange={(e) => setNewFeatureLabel(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddFeature();
                }
              }}
            />
            <button
              type="button"
              onClick={() => setNewFeatureIncluded(!newFeatureIncluded)}
              className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border flex items-center gap-1 ${
                newFeatureIncluded ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}
            >
              {newFeatureIncluded ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
              {newFeatureIncluded ? 'Termasuk' : 'Tidak'}
            </button>
            <Button type="button" size="sm" variant="outline" onClick={handleAddFeature}>
              <Plus className="w-3.5 h-3.5 mr-1" />
              Tambah
            </Button>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            Simpan Bundle
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BundleFormModal;
