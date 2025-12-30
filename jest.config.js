module.exports = {
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['text', 'lcov', 'html'],
    testMatch: ['**/tests/**/*.test.js', '**/tests/**/*.spec.js'],
    collectCoverageFrom: [
        'server/**/*.js',
        'public/**/*.js',
        '!server/node_modules/**',
        '!coverage/**'
    ],
    setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
    testTimeout: 10000,
    verbose: true
};
