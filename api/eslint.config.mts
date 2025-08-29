import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: [
      "ts/recommended",
      "plugin:import/recommended",
      "plugin:import/typescript",
    ],
    rules: {
      "no-local": "off",
      "import/extensions": "off",
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: false,
          project: "./tsconfig.json",
        },
      },
    },
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
]);
