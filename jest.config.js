/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    html: '<div id="component"></div>'
  },
  setupFiles: ["jest-canvas-mock"],
  // Transform ES6 modules in src/ directory
  transform: {
    '^.+\\.js$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', {
          targets: { node: 'current' },
          modules: 'commonjs'
        }]
      ]
    }]
  },
  // Don't ignore src directory - ensure it gets transformed
  transformIgnorePatterns: [
    'node_modules/(?!(@babel)/)',
    'dist/'
  ],
};

module.exports = config;