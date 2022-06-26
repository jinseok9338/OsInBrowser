module.exports = {
  env: {
    browser: true,
    es2021: true,
  },

  parser: "@typescript-eslint/parser",
  plugins: ["solid"],
  extends: ["eslint:recommended", "plugin:solid/typescript", "airbnb-base"],
  rules: {
    quotes: ["double"],
  },
};
