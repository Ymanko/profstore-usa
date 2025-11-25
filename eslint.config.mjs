import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
    ...compat.extends("next/core-web-vitals", "next/typescript"),

    {
        ignores: [
            "node_modules/**",
            ".next/**",
            "out/**",
            "build/**",
            "next-env.d.ts",
            "eslint.config.mjs",
            "postcss.config.mjs",
        ],
    },

    // TypeScript rules
    {
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            parserOptions: {
                project: "./tsconfig.json",
                ecmaVersion: "latest",
                sourceType: "module",
                ecmaFeatures: { jsx: true },
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/triple-slash-reference": "off",
        },
    },

    // React, hooks, JSX accessibility и import
    {
        files: ["**/*.{ts,tsx,js,jsx}"],
        plugins: {
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
            "jsx-a11y": jsxA11y,
            import: importPlugin,
        },
        settings: {
            react: { version: "detect" },
            "import/resolver": {
                node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
            },
        },
        rules: {
            /* React */
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
            "react/self-closing-comp": "warn",

            /* React Hooks */
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",

            /* Imports */
            "import/no-unresolved": "error",

            /* Accessibility */
            "jsx-a11y/alt-text": "warn",
            "jsx-a11y/anchor-is-valid": "warn",

            /* General */
            "no-console": ["error", { allow: ["warn", "error"] }],
            "no-debugger": "error",
            eqeqeq: ["error", "always"],
            curly: ["error", "all"],

            /* Function style */
            "func-style": ["error", "expression", { allowArrowFunctions: true }],
        },
    },

    // Prettier
    prettier,
];

export default eslintConfig;