const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://pokeapi.co/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    urlApi: 'https://pokeapi.co/api/v2/pokemon',
  },
});
