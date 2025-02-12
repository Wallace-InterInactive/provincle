import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";

export default tseslint.config(
  pluginJs.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        console: "readonly",
        document: "readonly",
        React: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
        window: "readonly",
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
  },
  {
    files: ["**/*.ts"],
  },
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      eqeqeq: "error",
      "no-const-assign": "error",
      "no-undef": "error",
      "no-var": "error",
      "no-eval": "error",
      "no-shadow-restricted-names": "error",
      "no-template-curly-in-string": "error",
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^_.*$",
          args: "none",
        },
      ],
      "prefer-const": "error",
      "use-isnan": "error",
    },
  },
  {
    ignores: [
      "node_modules",
      "eslint.config.js",
      "jest.config.js",
      "coverage",
      "dist",
      "postcss.config.js",
      "tailwind.config.js",
      "vitest.config.ts",
    ],
  },
);
