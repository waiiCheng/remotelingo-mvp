/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Company logo colors - ensure these are always included
    'bg-blue-500',
    'bg-blue-600',
    'bg-green-500',
    'bg-emerald-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-purple-600',
    'bg-orange-500',
    'bg-indigo-500',
    'bg-indigo-600',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-lime-500',
    'bg-pink-500',
    'bg-pink-600',
    'bg-slate-800',
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
