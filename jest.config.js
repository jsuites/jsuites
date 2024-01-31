/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    html: '<div id="component"></div>'
  },
  setupFiles: ["jest-canvas-mock"],
};

module.exports = config;