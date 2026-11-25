import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from 'react-icons/fi'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
}

interface ToastContextType {
  toasts: Toast[]
  toast: {
    success: (title: string, description?: string, duration?: number) => void
    error: (title: string, description?: string, duration?: number) => void
    info: (title: string, description?: string, duration?: number) => void
    warning: (title: string, description?: string, duration?: number) => void
  }
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

const toastStyles: Record<
  ToastType,
  {
    border: string
    bg: string
    text: string
    icon: React.ReactElement
  }
> = {
  success: {
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10 dark:bg-emerald-950/40',
    text: 'text-emerald-500 dark:text-emerald-400',
    icon: <FiCheckCircle className="w-5 h-5 shrink-0 text-emerald-500" />,
  },
  error: {
    border: 'border-rose-500/30',
    bg: 'bg-rose-500/10 dark:bg-rose-950/40',
    text: 'text-rose-500 dark:text-rose-400',
    icon: <FiAlertCircle className="w-5 h-5 shrink-0 text-rose-500" />,
  },
  warning: {
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10 dark:bg-amber-950/40',
    text: 'text-amber-500 dark:text-amber-400',
    icon: <FiAlertTriangle className="w-5 h-5 shrink-0 text-amber-500" />,
  },
  info: {
    border: 'border-primary-500/30',
    bg: 'bg-primary-500/10 dark:bg-primary-950/40',
    text: 'text-primary-500 dark:text-primary-400',
    icon: <FiInfo className="w-5 h-5 shrink-0 text-primary-500" />,
  },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const addToast = useCallback(
    (type: ToastType, title: string, description?: string, duration = 4000) => {
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
      const newToast: Toast = { id, type, title, description, duration }

      setToasts((prev) => [...prev, newToast])

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id)
        }, duration)
      }
    },
    [dismiss],
  )

  const toastMethods = {
    success: useCallback(
      (title: string, description?: string, duration?: number) =>
        addToast('success', title, description, duration),
      [addToast],
    ),
    error: useCallback(
      (title: string, description?: string, duration?: number) =>
        addToast('error', title, description, duration),
      [addToast],
    ),
    info: useCallback(
      (title: string, description?: string, duration?: number) =>
        addToast('info', title, description, duration),
      [addToast],
    ),
    warning: useCallback(
      (title: string, description?: string, duration?: number) =>
        addToast('warning', title, description, duration),
      [addToast],
    ),
  }

  return (
    <ToastContext.Provider value={{ toasts, toast: toastMethods, dismiss }}>
      {children}
      {/* Toast Container Viewport */}
      <div
        aria-live="polite"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
      >
        <AnimatePresence>
          {toasts.map((t) => {
            const style = toastStyles[t.type]
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9, transition: { duration: 0.15 } }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`pointer-events-auto rounded-2xl border p-4 shadow-xl backdrop-blur-md bg-card/95 dark:bg-surface-900/95 ${style.border} flex items-start gap-3`}
              >
                {style.icon}
                <div className="flex-1 min-w-0 pr-1">
                  <p className="text-sm font-semibold text-foreground dark:text-white leading-snug">
                    {t.title}
                  </p>
                  {t.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {t.description}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => dismiss(t.id)}
                  aria-label="Dismiss notification"
                  className="p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-200/50 dark:hover:bg-surface-800/50 transition-colors shrink-0"
                >
                  <FiX className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
