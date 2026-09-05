import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addWorkerSchema } from '../schemas/workerSchema';
import Modal from '../../../components/ui/Modal';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { UserPlus, Lock, User, AtSign, AlertCircle } from 'lucide-react';

export const AddWorkerModal = ({ isOpen, onClose, onAddWorker, isSubmitting }) => {
  const [serverError, setServerError] = React.useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addWorkerSchema),
    defaultValues: {
      fullName: '',
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setServerError('');
      await onAddWorker(data);
      reset();
      onClose();
    } catch (err) {
      setServerError(err.message || 'Gagal menambahkan worker baru');
    }
  };

  const handleClose = () => {
    reset();
    setServerError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Tambah Akun Worker Baru" maxWidth="max-w-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {serverError && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{serverError}</span>
          </div>
        )}

        <Input
          label="Nama Lengkap Worker"
          placeholder="Contoh: Budi Santoso"
          icon={<User className="w-4 h-4" />}
          error={errors.fullName?.message}
          {...register('fullName')}
        />

        <Input
          label="Username"
          placeholder="Contoh: budi_santoso"
          icon={<AtSign className="w-4 h-4" />}
          helperText="Username digunakan untuk login worker (tanpa spasi)"
          error={errors.username?.message}
          {...register('username')}
        />

        <Input
          label="Password Temporary"
          type="password"
          placeholder="Minimal 6 karakter"
          icon={<Lock className="w-4 h-4" />}
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button type="button" variant="outline" onClick={handleClose}>
            Batal
          </Button>
          <Button type="submit" isLoading={isSubmitting}>
            <UserPlus className="w-4 h-4 mr-2" />
            Buat Akun Worker
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddWorkerModal;
