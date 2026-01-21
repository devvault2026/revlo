/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary Colors - Red, Blue, Purple
                primary: {
                    purple: '#8B5CF6',
                    red: '#EF4444',
                    blue: '#3B82F6',
                },
                purple: {
                    50: '#FAF5FF',
                    100: '#F3E8FF',
                    200: '#E9D5FF',
                    300: '#D8B4FE',
                    400: '#C084FC',
                    500: '#A78BFA',
                    600: '#8B5CF6',
                    700: '#7C3AED',
                    800: '#6D28D9',
                    900: '#5B21B6',
                },
                red: {
                    50: '#FEF2F2',
                    100: '#FEE2E2',
                    200: '#FECACA',
                    300: '#FCA5A5',
                    400: '#F87171',
                    500: '#EF4444',
                    600: '#DC2626',
                    700: '#B91C1C',
                    800: '#991B1B',
                    900: '#7F1D1D',
                },
                blue: {
                    50: '#EFF6FF',
                    100: '#DBEAFE',
                    200: '#BFDBFE',
                    300: '#93C5FD',
                    400: '#60A5FA',
                    500: '#3B82F6',
                    600: '#2563EB',
                    700: '#1D4ED8',
                    800: '#1E40AF',
                    900: '#1E3A8A',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'gradient-purple': 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
                'gradient-red': 'linear-gradient(135deg, #EF4444 0%, #F87171 100%)',
                'gradient-blue': 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)',
                'gradient-rainbow': 'linear-gradient(135deg, #EF4444 0%, #8B5CF6 50%, #3B82F6 100%)',
                'gradient-rainbow-alt': 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 50%, #EF4444 100%)',
            },
            boxShadow: {
                'purple': '0 8px 32px rgba(139, 92, 246, 0.25)',
                'red': '0 8px 32px rgba(239, 68, 68, 0.25)',
                'blue': '0 8px 32px rgba(59, 130, 246, 0.25)',
                'glow-purple': '0 0 40px rgba(139, 92, 246, 0.4)',
                'glow-red': '0 0 40px rgba(239, 68, 68, 0.4)',
                'glow-blue': '0 0 40px rgba(59, 130, 246, 0.4)',
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'gradient': 'gradient 8s ease infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                gradient: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
        },
    },
    plugins: [],
}
