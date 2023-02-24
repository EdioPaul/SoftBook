module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  collectCoverageFrom: ['src/**/*.{js}'],
  coverageProvider: "v8",
  coverageReporters: ['text', 'html'],
  roots: [
    "<rootDir>"
  ],
  testEnvironment: "jest-environment-node",
  testMatch: [
    "**/**/*.spec.js"],
};
