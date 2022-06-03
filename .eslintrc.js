module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: ["error", "double"],

    indent: ["error", 2],

    "linebreak-style": ["error", "windows"],
  },
  ignorePatterns: ["node_modules", "build"],
};
