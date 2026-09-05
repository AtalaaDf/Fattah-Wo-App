import React from 'react'

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white border border-outline-variant rounded-lg p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`mb-4 space-y-1 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`font-heading text-lg font-bold text-primary ${className}`} {...props}>
      {children}
    </h3>
  )
}

export const CardDescription = ({ children, className = '', ...props }) => {
  return (
    <p className={`text-xs text-slate-muted font-sans ${className}`} {...props}>
      {children}
    </p>
  )
}

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`mt-6 pt-4 border-t border-outline-variant flex items-center justify-between ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Card
