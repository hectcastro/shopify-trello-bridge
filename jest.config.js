module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverageFrom: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  }
};
