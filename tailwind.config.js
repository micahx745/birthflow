/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "warm-white": "#FDFBF9",
        "soft-pink": "#F8D7DA",
        "soft-pink-dark": "#721C24",
        taupe: "#987987",
        "muted-blue": "#536B8E",
        "dark-gray": "#2D3748",
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      fontFamily: {
        gilda: ["var(--font-gilda)"],
        serif: ["system-serif", "serif"],
      },
      borderRadius: {
        stat: "16px",
      },
    },
  },
}

