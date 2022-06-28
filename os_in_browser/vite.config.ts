import solidPlugin from "vite-plugin-solid";

import { defineConfig, ConfigEnv } from "vite";

export default defineConfig((_configEnv: ConfigEnv) => {
  return {
    plugins: [solidPlugin()],
    build: {
      target: "esnext",
      polyfillDynamicImport: false,
    },
    server: {
      port: 3000,
      strictPort: true,
      hmr: {
        port: 3000,
      },
    },
    base: "./",
  };
});
