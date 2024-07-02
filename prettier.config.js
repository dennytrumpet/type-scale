// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Config} */
const config = {
  trailingComma: "none",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  arrowParens: "avoid",
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["classNames", "tv", "clsx", "cva", "tw", "twMerge"]
};

module.exports = config;
