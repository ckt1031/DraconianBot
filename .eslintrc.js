module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  ignorePatterns: ["index.js"],
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
  },
};
