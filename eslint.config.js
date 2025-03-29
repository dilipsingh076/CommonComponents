import reactPlugin from "eslint-plugin-react";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [
      "src/utils/sound.js",
      "src/utils/soundManager.ts",
      "src/experimental/**",
      "src/components/experimental/**",
    ],
  },
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
    },
    rules: {
      "no-unused-vars": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/prop-types": "off",
      "no-unused-vars": "error",
      "@typescript-eslint/no-unused-vars": "error",
      eqeqeq: "error",
      "no-console": "warn",
      curly: "error",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      indent: ["error", 2],
      "no-var": "error",
      "prefer-const": "error",
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      //cls"@typescript-eslint/explicit-function-return-type": "error", // Require explicit return types
      "@typescript-eslint/explicit-module-boundary-types": "off", // Require explicit types in exported functions
      "@typescript-eslint/no-explicit-any": "error", // Disallow `any`
      "@typescript-eslint/no-inferrable-types": "warn", // Warn when unnecessary type declarations are used
    },
  },
];
