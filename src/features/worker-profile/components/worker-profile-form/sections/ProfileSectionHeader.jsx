import React from 'react'

export const ProfileSectionHeader = ({ icon, title, subtitle, accentClassName }) => (
  <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-slate-100">
    <div className={`p-2 rounded-lg ${accentClassName}`}>
      {icon}
    </div>
    <div>
      <h3 className="font-bold text-slate-900 text-base">{title}</h3>
      {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
    </div>
  </div>
)

export default ProfileSectionHeader
