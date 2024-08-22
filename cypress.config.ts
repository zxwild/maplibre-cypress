import { defineConfig } from 'cypress';
import { config } from './cypress/config.ts';

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${config.port}`,
    setupNodeEvents() {
      // implement node event listeners here
    },
  },
});
