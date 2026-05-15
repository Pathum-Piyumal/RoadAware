/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        admin: {
          bg: 'var(--admin-bg)',
          sidebar: 'var(--admin-sidebar)',
          card: 'var(--admin-card)',
          border: 'var(--admin-border)',
          text: 'var(--admin-text)',
          'text-muted': 'var(--admin-text-muted)',
          'sidebar-active': 'var(--admin-sidebar-active)',
          'input-bg': 'var(--admin-input-bg)',
          primary: '#3B82F6',
          danger: '#EF4444',
          warning: '#F59E0B',
          success: '#10B981',
        }
      }
    },
  },
  plugins: [],
}
