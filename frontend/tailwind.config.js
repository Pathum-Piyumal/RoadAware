/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        admin: {
          bg: '#0F172A',
          sidebar: '#111827',
          card: '#1E293B',
          primary: '#3B82F6',
          danger: '#EF4444',
          warning: '#F59E0B',
          success: '#10B981',
          text: '#F8FAFC',
        }
      }
    },
  },
  plugins: [],
}
