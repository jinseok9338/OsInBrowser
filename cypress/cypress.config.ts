import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 4000,
  pageLoadTimeout: 30000,
  e2e: {
    // e2e options here
    supportFile: false,
  },
});
