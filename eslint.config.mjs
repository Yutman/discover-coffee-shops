import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-config-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], // Target specific file types
    languageOptions: {
      parser: tsParser, // Use TypeScript parser for TS/JS files
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true, // Enable JSX if using React
        },
      },
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: pluginReact,
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Recommended JS rules
      ...tseslint.configs.recommended.rules, // TypeScript-specific rules
      ...pluginReact.configs.recommended.rules, // React-specific rules
      "prettier/prettier": "error", // Report Prettier formatting issues
    },
  },
];
