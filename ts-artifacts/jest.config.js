module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/tests/e2e/', '<rootDir>/tests/smoke/'],
  rootDir: 'src',
};
