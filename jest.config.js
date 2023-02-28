export default {
  roots: ['<rootDir>'],
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  testEnvironment: 'jest-environment-node',
  testMatch: ['**/__tests__/**/*.spec.js?(x)']
}
