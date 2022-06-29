// vite.config.js
import solidPlugin from "vite-plugin-solid";

/**
 *  @type {import('vite').UserConfig}
 */
const config: import("vite").UserConfig = {
  plugins: [solidPlugin()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
  },
};

export default config;
