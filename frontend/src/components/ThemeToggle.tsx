import { FiMoon, FiSun } from 'react-icons/fi'
import { Switch } from './ui/switch'
import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-3 rounded-full border border-surface-800 bg-surface-900/80 px-3 py-2 text-sm text-surface-200 transition hover:border-primary-500/40 hover:bg-surface-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60"
        >
            <FiSun className={`h-4 w-4 ${theme === 'dark' ? 'text-surface-500' : 'text-amber-300'}`} />
            <span className="hidden sm:inline">{theme === 'dark' ? 'Switch to light' : 'Switch to dark'}</span>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            <FiMoon className={`h-4 w-4 ${theme === 'dark' ? 'text-sky-300' : 'text-surface-500'}`} />
        </button>
    )
}
