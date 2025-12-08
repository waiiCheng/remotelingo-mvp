/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Explicitly list all color classes used in COMPANY_COLORS array
    'bg-blue-600',
    'bg-emerald-500',
    'bg-purple-600',
    'bg-orange-500',
    'bg-red-500',
    'bg-slate-800',
    'bg-teal-500',
    'bg-indigo-600',
    'bg-pink-600',
    'bg-yellow-600',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
    },
  },
  plugins: [],
}
