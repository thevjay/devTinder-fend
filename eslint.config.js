module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,  // ✅ Add this for Jest
    vitest: true // ✅ Add this for Vitest
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module"
  },
  rules: {}
};
