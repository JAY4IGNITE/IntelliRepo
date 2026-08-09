import { FiMoon, FiSun } from 'react-icons/fi'
import { Switch } from './ui/switch'
import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center gap-3 rounded-full border border-surface-200 bg-card px-3 py-2 text-sm text-foreground shadow-sm transition hover:border-primary-500/40 hover:bg-surface-100 dark:border-surface-700 dark:bg-surface-900 dark:hover:bg-surface-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/60"
        >
            <FiSun className={`h-4 w-4 ${theme === 'dark' ? 'text-amber-300' : 'text-primary-500'}`} />
            <span className="hidden sm:inline text-foreground dark:text-white">{theme === 'dark' ? 'Switch to light' : 'Switch to dark'}</span>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
            <FiMoon className={`h-4 w-4 ${theme === 'dark' ? 'text-sky-300' : 'text-muted-foreground'}`} />
        </button>
    )
}
