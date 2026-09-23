import React from 'react'
import { AlertCircle, CheckCircle } from 'lucide-react'

export const ProfileFeedbackSection = ({ successMessage, errorMessage }) => (
  <>
    {successMessage && (
      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
        <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
        <span>{successMessage}</span>
      </div>
    )}

    {errorMessage && (
      <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-2">
        <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
        <span>{errorMessage}</span>
      </div>
    )}
  </>
)

export default ProfileFeedbackSection
