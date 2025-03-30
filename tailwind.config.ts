import type { Config } from "tailwindcss";

export default {
  // mui 공식 문서 설정에 따라 적용한 설정이나 적용 시, 오히려 tailwind 적용 안됨
  // https://arc.net/l/quote/wkkkpzvm
  // corePlugins: {
  //   preflight: false,
  // },
  // important: '#__next',
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50:  '#e6f2ff',  // hsl(210, 100%, 95%)
          100: '#d6ebff',  // hsl(210, 100%, 92%)
          200: '#99ccff',  // hsl(210, 100%, 80%)
          300: '#4da6ff',  // hsl(210, 100%, 65%)
          400: '#0778f7',  // hsl(210, 98%, 48%)  (약: (7, 120, 247))
          500: '#026bd4',  // hsl(210, 98%, 42%)  (약: (2, 107, 212))
          600: '#1c8cff',  // hsl(210, 98%, 55%)  (약: (28, 140, 253))
          700: '#0059b2',  // hsl(210, 100%, 35%)  (약: (0, 89, 178))
          800: '#002958',  // hsl(210, 100%, 16%)  (약: (0, 41, 82))
          900: '#00356b',  // hsl(210, 100%, 21%)  (약: (0, 54, 107))
          950: '#001e3d',  // 추정: hsl(210, 100%, 12%) (약: (0, 30, 61))
        } 
      },
    },
  },
  plugins: [],
} satisfies Config;
