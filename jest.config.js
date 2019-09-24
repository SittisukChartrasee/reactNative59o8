const {defaults} = require('jest-config');
module.exports = {
  // ...
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  coverageReporters: [
    "text",
    "json",
    "lcov",
    "html"
  ],
  coverageThreshold: {
    "global": {
      "branches": 10,
      "functions": 10,
      "lines": 10,
      "statements": 10
    }
  },
  verbose: true,
  notify: true,
  preset: "react-native",
  // ...
};