import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        borderFlash: {
          '0%, 100%': { borderColor: 'rgb(107, 114, 128)' },
          '50%': { borderColor: 'rgb(239, 68, 68)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'border-flash': 'borderFlash 2s infinite',
        slideUp: 'slideUp 0.5s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config;
