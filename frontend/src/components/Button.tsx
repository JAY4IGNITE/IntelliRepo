import UiButton from './ui/button'
import { type ReactNode } from 'react'

type ButtonProps = React.ComponentProps<typeof UiButton> & { children: ReactNode }

export function Button({ children, ...props }: ButtonProps) {
  return <UiButton {...(props as any)}>{children}</UiButton>
}

export default Button
