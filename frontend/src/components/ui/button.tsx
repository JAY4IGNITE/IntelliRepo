import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: string
  size?: string
  loading?: boolean
}

export const buttonVariants = () => ({})

export function Button({ className = '', children, variant, size, loading, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${className}`}
      {...props}
    >
      {loading && <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />}
      {children}
    </button>
  )
}

export default Button
