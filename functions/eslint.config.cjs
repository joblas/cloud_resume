const jsdoc = require("eslint-plugin-jsdoc");

module.exports = [
  {
    files: ["**/*.js"],
    plugins: {
      jsdoc: jsdoc
    },
    rules: {
      "jsdoc/require-description": "error",
      "jsdoc/check-values": "error",
      "prefer-arrow-callback": "error", // Moved from .eslintrc.js
      "quotes": ["error", "double", { "allowTemplateLiterals": true }], // Moved from .eslintrc.js
      "no-restricted-globals": ["error", "name", "length"] // Moved from .eslintrc.js
    },
    languageOptions: {
      ecmaVersion: 2018 // Moved from .eslintrc.js
    }
  },
  {
    files: ["**/*.spec.*"],
    env: {
      mocha: true
    },
    rules: {}
  }
];
