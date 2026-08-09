import { type ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  icon: ReactNode
  trend?: string
  color?: 'primary' | 'green' | 'amber' | 'red'
}

const colorMap = {
  primary: 'from-primary-500/20 to-primary-600/5 border-primary-500/20 text-primary-400',
  green: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20 text-emerald-400',
  amber: 'from-amber-500/20 to-amber-600/5 border-amber-500/20 text-amber-400',
  red: 'from-red-500/20 to-red-600/5 border-red-500/20 text-red-400',
}

export function StatCard({ label, value, icon, trend, color = 'primary' }: StatCardProps) {
  return (
    <div className={`rounded-xl border bg-gradient-to-br p-5 ${colorMap[color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-surface-400 mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && <p className="text-xs text-surface-500 mt-1">{trend}</p>}
        </div>
        <div className="p-2.5 rounded-lg bg-surface-800/50">{icon}</div>
      </div>
    </div>
  )
}
