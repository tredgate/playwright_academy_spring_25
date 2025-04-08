//eslint.config.mjs
// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
      "**/playwright-report/**",
      "**/tests-examples/**",
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.strict, // ? Striktní pravidla, doporučujeme používat obzvláště pro nováčky v TypeScriptu
  prettierConfig // ? Přidává pravidla pro Prettier, aby nedocházelo k rozporům mezi pravidly ESLint a formátováním Prettier
);
