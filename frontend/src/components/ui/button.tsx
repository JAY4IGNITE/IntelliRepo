import * as React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        default: 'bg-surface-200 text-foreground border border-surface-300 hover:bg-surface-300 dark:bg-surface-800 dark:border-surface-700 dark:hover:bg-surface-700',
        primary: 'bg-primary-600 text-white hover:bg-primary-500',
        secondary: 'bg-surface-200 text-foreground border border-surface-300 hover:bg-surface-300 dark:bg-surface-800 dark:text-foreground dark:border-surface-700 dark:hover:bg-surface-700',
        destructive: 'bg-red-600 text-white hover:bg-red-500',
        outline: 'border border-surface-300 text-foreground bg-transparent hover:bg-surface-100 dark:border-surface-700 dark:hover:bg-surface-900',
        ghost: 'text-foreground hover:text-white hover:bg-surface-900/40',
        link: 'text-primary-600 hover:text-primary-500 bg-transparent underline-offset-4 hover:underline dark:text-primary-300 dark:hover:text-primary-200',
      },
      size: {
        default: 'h-11 px-5',
        sm: 'h-9 px-3 text-sm',
        lg: 'h-12 px-6 text-base',
        'icon-sm': 'h-9 w-9 p-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'ref' | 'children'>,
  VariantProps<typeof buttonVariants> {
  children?: React.ReactNode
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, variant, size, loading, disabled, ...props }, ref) => (
    <motion.button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      whileHover={disabled || loading ? undefined : { y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      {...props}
    >
      {loading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </motion.button>
  ),
)
Button.displayName = 'Button'

export { Button, buttonVariants }
export default Button
