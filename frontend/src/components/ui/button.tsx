import React from 'react'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon-sm' | 'icon'
}

export const buttonVariants = () => ({})

export function Button({ className = '', children, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
