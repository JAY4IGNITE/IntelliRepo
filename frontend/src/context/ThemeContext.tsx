import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
    theme: Theme
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)
const storageKey = 'theme'

function getInitialTheme(): Theme {
    if (typeof window === 'undefined') {
        return 'light'
    }

    const storedTheme = window.localStorage.getItem(storageKey)
    if (storedTheme === 'dark' || storedTheme === 'light') {
        return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>(getInitialTheme)

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        window.localStorage.setItem(storageKey, theme)
    }, [theme])

    const setTheme = (nextTheme: Theme) => {
        setThemeState(nextTheme)
    }

    const toggleTheme = () => {
        setThemeState((current) => (current === 'dark' ? 'light' : 'dark'))
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}
