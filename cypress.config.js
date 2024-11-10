const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Set the `specPattern` to your custom folder and filename pattern
    specPattern: 'test/test_suite/**/*.cy.js', // Finds all `.cy.js` files in `test/test_suite/`
    supportFile: false, // Optional: Set to `false` if you don’t want the default support file
  },
});
