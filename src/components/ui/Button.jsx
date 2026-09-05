import React from 'react'
import { Loader2 } from 'lucide-react'

export const Button = React.forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      leftIcon = null,
      rightIcon = null,
      className = '',
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-sans font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none'

    const variants = {
      primary:
        'bg-primary text-white hover:bg-primary-container focus:ring-primary shadow-sm active:scale-[0.99]',
      secondary:
        'bg-white text-primary border border-primary hover:bg-surface-container-low focus:ring-primary active:scale-[0.99]',
      accent:
        'bg-champagne-gold text-white hover:opacity-90 focus:ring-champagne-gold shadow-sm active:scale-[0.99]',
      destructive:
        'bg-white text-error border border-error hover:bg-error-container/20 focus:ring-error active:scale-[0.99]',
      ghost:
        'bg-transparent text-on-surface hover:bg-surface-container-low focus:ring-primary',
      outline:
        'bg-transparent text-on-surface border border-outline-variant hover:bg-surface-container-low focus:ring-primary',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-xs rounded-sm gap-1.5 h-8',
      md: 'px-4 py-2 text-sm rounded-md gap-2 h-10',
      lg: 'px-6 py-3 text-base rounded-lg gap-2.5 h-12',
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${variants[variant] || variants.primary} ${
          sizes[size] || sizes.md
        } ${className}`}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
