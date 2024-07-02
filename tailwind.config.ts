import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily:{
        body: ["var(--base-family)"],
        display: ["var(--display-family)"],
        code: ["var(--code-family)"]
      },
      fontSize: {
        base: ["var(--base-fluid)", "var(--leading-base)"],
        lg: ["var(--lg-fluid)", "var(--leading-display)"],
        xl: ["var(--xl-fluid)", "var(--leading-display)"],
        "2xl": ["var(--two-xl-fluid)", "var(--leading-display)"],
        "3xl": ["var(--three-xl-fluid)", "var(--leading-display)"],
        "4xl": ["var(--four-xl-fluid)", "var(--leading-display)"],
        "5xl": ["var(--five-xl-fluid)", "var(--leading-display)"],
        sm: ["var(--sm-fluid)", "var(--leading-base)"],
        xs: ["var(--xs-fluid)", "var(--leading-base)"]
      },
      lineHeight: {
        base: "var(--leading-base)",
        display: "var(--leading-display)"
      },
      spacing: {
        "base-0.5": "calc(var(--base-fluid) * 0.5)",
        "base-0.75": "calc(var(--base-fluid) * 0.75)",
        base: "var(--base-fluid)",
        "base-1.5": "calc(var(--base-fluid) * 1.5)",
        "base-2": "calc(var(--base-fluid) * 2)",
      }
    },
  },
  plugins: [],
};
export default config;
