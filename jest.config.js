/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    html: '<div id="component"></div>'
  }
};
  
module.exports = config;