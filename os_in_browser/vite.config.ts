// vite.config.js
import solidPlugin from "vite-plugin-solid";

/**
 *  @type {import('vite').UserConfig}
 */
const config: import("vite").UserConfig = {
  plugins: [solidPlugin()],
};

export default config;
