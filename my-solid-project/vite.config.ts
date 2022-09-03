import { defineConfig, loadEnv } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig(({ command, mode, ssrBuild }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {

    plugins: [solidPlugin()],
    server: {
      port: 3000,
    },

  };
});
