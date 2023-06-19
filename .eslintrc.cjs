module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "react-app",
    "plugin:react/recommended"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react-refresh', "unused-imports"],
  rules: {
    'react-refresh/only-export-components': 'warn',
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-empty-function": "off",
    "no-empty": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "warn",
    "@typescript-eslint/no-non-null-assertion": "off",
    "semi": [
      1,
      "always"
    ],
    "react/jsx-curly-spacing": [
      1,
      "always"
    ],
    "no-use-before-define": [
      0,
      {
        "functions": false
      }
    ],
    "react/jsx-indent": [
      1,
      2
    ],
    "space-in-parens": [
      1,
      "never"
    ],
    "no-const-assign": [
      2
    ],
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "warn"
  },
}
