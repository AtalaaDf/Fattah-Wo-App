import React from 'react'
import logoImg from '../../assets/logo/logo.png'

/**
 * Reusable Logo component for Fattah Wedding Organizer
 * @param {Object} props
 * @param {'full' | 'icon'} [props.variant='full'] - Display full logo or compact icon
 * @param {'light' | 'dark'} [props.theme='dark'] - Color theme context
 * @param {string} [props.className] - Additional CSS classes
 */
export const Logo = ({ variant = 'full', theme = 'dark', className = '' }) => {
  const sizeClasses = variant === 'icon' ? 'h-9 w-auto max-w-[120px]' : 'h-12 w-auto max-w-[220px]'

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={logoImg}
        alt="Fattah Wedding Organizer"
        className={`${sizeClasses} object-contain drop-shadow-sm transition-transform hover:scale-[1.02]`}
      />
    </div>
  )
}

export default Logo
