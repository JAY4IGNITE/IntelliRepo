/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './index.html',
        './src/**/*.{ts,tsx,js,jsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: 'var(--color-primary-50)',
                    100: 'var(--color-primary-100)',
                    200: 'var(--color-primary-200)',
                    300: 'var(--color-primary-300)',
                    400: 'var(--color-primary-400)',
                    500: 'var(--color-primary-500)',
                    600: 'var(--color-primary-600)',
                    700: 'var(--color-primary-700)',
                    800: 'var(--color-primary-800)',
                    900: 'var(--color-primary-900)',
                },
                surface: {
                    50: 'var(--color-surface-50)',
                    100: 'var(--color-surface-100)',
                    200: 'var(--color-surface-200)',
                    300: 'var(--color-surface-300)',
                    400: 'var(--color-surface-400)',
                    500: 'var(--color-surface-500)',
                    600: 'var(--color-surface-600)',
                    700: 'var(--color-surface-700)',
                    800: 'var(--color-surface-800)',
                    900: 'var(--color-surface-900)',
                    950: 'var(--color-surface-950)',
                },
            },
            borderRadius: {
                lg: '0.75rem',
            },
            boxShadow: {
                smd: '0 6px 18px rgba(2,6,23,0.6)',
            },
        },
    },
    plugins: [],
}
