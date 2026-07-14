import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import reactRefresh from "eslint-plugin-react-refresh";

const [nextBase, nextTypeScriptBase, ...nextRest] = nextVitals;

export default defineConfig([
  {
    ...nextBase,
    plugins: {
      ...nextBase.plugins,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...nextBase.rules,
      "sort-keys": "off",
      "prefer-const": "warn",
      curly: ["error", "all"],
      eqeqeq: "warn",
      "react/display-name": "off",
      "react/jsx-boolean": "off",
      "react/jsx-curly-brace-presence": "error",
      "react/jsx-filename-extension": [
        "error",
        { extensions: [".js", ".tsx"] },
      ],
      "react/jsx-one-expression-per-line": "off",
      "react/no-unescaped-entities": "off",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "import/order": [
        "warn",
        {
          "newlines-between": "always",
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            { pattern: "react*", group: "external", position: "before" },
          ],
        },
      ],
      "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
      "import/no-duplicates": "error",
      "import/prefer-default-export": "off",
      "import/extensions": [
        "error",
        "ignorePackages",
        { js: "never", jsx: "never", ts: "never", tsx: "never" },
      ],
      "import/no-extraneous-dependencies": "off",
    },
  },
  {
    ...nextTypeScriptBase,
    rules: {
      ...nextTypeScriptBase.rules,
      "@typescript-eslint/consistent-type-imports": "warn",
    },
  },
  ...nextRest,
  ...nextTypeScript,
  prettierRecommended,
  {
    settings: {
      react: { version: "detect" },
    },
  },
  globalIgnores([
    ".next/**",
    ".yarn/**",
    "node_modules/**",
    "next-env.d.ts",
    "coverage/**",
  ]),
]);
