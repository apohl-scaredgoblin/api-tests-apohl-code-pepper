import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://restful-booker.herokuapp.com',
    env: {
      apiBaseUrl: 'https://restful-booker.herokuapp.com',
      apiUser: 'admin',
      apiPass: 'password123'
    }
  }
});
