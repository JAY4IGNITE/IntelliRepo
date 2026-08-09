import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const UiInput = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && <label className="block text-sm font-medium text-muted-foreground">{label}</label>}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-xl border bg-card text-foreground px-3.5 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:bg-surface-900 dark:border-surface-700',
            error ? 'border-red-500/60 focus:border-red-500/80' : 'border-surface-300 focus:border-primary-500 dark:border-surface-700',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    )
  },
)

UiInput.displayName = 'UiInput'

export default UiInput

