module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '.?(spec).ts$',
  coverageDirectory: './coverage/',
  coveragePathIgnorePatterns: [
    '.spec.ts',
  ],
  collectCoverageFrom : ['src/(network|helpers)/*.ts'],
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  verbose: true,
  globals: {
    'ts-jest': {
      tsConfig: './tsconfig.json',
    }
  },
}
