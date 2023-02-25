module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  roots: ['<rootDir>'],
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/**/*.spec.js']
}
