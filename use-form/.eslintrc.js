// eslint-disable-next-line no-undef
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react-hooks/recommended",
  ],
  settings: {
    "import/resolver": "typescript",
  },
  rules: {
    "import/order": ["warn", { "newlines-between": "always" }],
  },
};
