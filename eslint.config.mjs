import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Custom rules
  {
    rules: {
      // Permitir setState en useEffect (patrón válido para detectar montaje)
      "react-hooks/set-state-in-effect": "off",
      // Permitir <img> en casos específicos (admin, etc)
      "@next/next/no-img-element": "warn",
      // Relajar regla de any para casos edge
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]);

export default eslintConfig;
