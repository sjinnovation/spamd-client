module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '.?(spec).ts$',
  coverageDirectory: './coverage/',
  coveragePathIgnorePatterns: [
    '.spec.ts',
  ],
  collectCoverageFrom : ['src/**/*.ts'],
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
    }
  },
}
