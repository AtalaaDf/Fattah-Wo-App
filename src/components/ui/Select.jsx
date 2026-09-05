import React from 'react'

export const Select = React.forwardRef(
  (
    {
      label,
      options = [],
      error,
      helperText,
      placeholder = 'Pilih opsi...',
      className = '',
      id,
      required = false,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold font-sans uppercase tracking-wider text-on-surface-variant"
          >
            {label} {required && <span className="text-error">*</span>}
          </label>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full font-sans text-sm text-on-surface bg-white border rounded-md px-3 py-2 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-surface-container-low disabled:cursor-not-allowed ${
            error ? 'border-error focus:ring-error' : 'border-outline-variant'
          } ${className}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error ? (
          <p className="text-xs text-error font-sans font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-muted font-sans">{helperText}</p>
        ) : null}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
