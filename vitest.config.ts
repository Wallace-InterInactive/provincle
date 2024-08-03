import { configDefaults, defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "./src/utils/i18n.ts"],
    coverage: {
      exclude: [...configDefaults.exclude, "./src/utils/i18n.ts"],
    },
  },
});
