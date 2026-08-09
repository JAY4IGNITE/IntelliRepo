import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-surface-300">{label}</label>
        )}
        <input
          ref={ref}
          className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-800 border text-white placeholder-surface-500 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/50 ${
            error ? 'border-red-500/50' : 'border-surface-700 focus:border-primary-500'
          } ${className}`}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    )
  },
)

Input.displayName = 'Input'
