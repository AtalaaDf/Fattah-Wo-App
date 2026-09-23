import React from 'react'
import { Save } from 'lucide-react'
import Button from '../../../../../components/ui/Button'

export const SaveProfileSection = ({ isSaving, isUploading }) => (
  <div className="flex justify-end pt-2">
    <Button
      type="submit"
      size="lg"
      isLoading={isSaving || isUploading}
      leftIcon={<Save className="w-4 h-4" />}
      className="flex-row whitespace-nowrap"
    >
      {isUploading ? 'Mengunggah...' : 'Simpan Perubahan Biodata & Status'}
    </Button>
  </div>
)

export default SaveProfileSection
