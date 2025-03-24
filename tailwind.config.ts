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
      },
    },
  },
  plugins: [],
} satisfies Config;
