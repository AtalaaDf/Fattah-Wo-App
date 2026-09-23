import React from 'react'
import Button from '../../../../../components/ui/Button'

export const BundleFormActions = ({ onClose, isSubmitting }) => (
  <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
    <Button type="button" variant="outline" onClick={onClose}>
      Batal
    </Button>
    <Button type="submit" isLoading={isSubmitting}>
      Simpan Bundle
    </Button>
  </div>
)

export default BundleFormActions
