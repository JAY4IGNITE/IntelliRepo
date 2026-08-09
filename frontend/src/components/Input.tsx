import UiInput from './ui/input'
import { type InputHTMLAttributes } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }

export const Input = (props: InputProps) => {
  return <UiInput {...(props as any)} />
}

export default Input
