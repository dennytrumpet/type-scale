import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--base-family)"],
        display: ["var(--display-family)"],
        code: ["var(--code-family)"]
      },
      fontSize: {
        base: ["var(--fluid-base)", "var(--leading-base)"],
        lg: ["var(--fluid-lg)", "var(--leading-display)"],
        xl: ["var(--fluid-xl)", "var(--leading-display)"],
        "2xl": ["var(--fluid-2xl)", "var(--leading-display)"],
        "3xl": ["var(--fluid-3xl)", "var(--leading-display)"],
        "4xl": ["var(--fluid-4xl)", "var(--leading-display)"],
        "5xl": ["var(--fluid-5xl)", "var(--leading-display)"],
        sm: ["var(--fluid-sm)", "var(--leading-base)"],
        xs: ["var(--fluid-xs)", "var(--leading-base)"]
      },
      lineHeight: {
        base: "var(--leading-base)",
        display: "var(--leading-display)"
      }
    }
  },
  plugins: [
    require("tailwindcss-react-aria-components"),
    require("tailwindcss-animate")
  ]
};
export default config;
