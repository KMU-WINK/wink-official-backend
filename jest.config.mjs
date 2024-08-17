export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'test',
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    // Comon
    '^@wink/app$': '<rootDir>/../src/common/app',
    '^@wink/config$': '<rootDir>/../src/common/config',
    '^@wink/filter$': '<rootDir>/../src/common/http/filter',
    '^@wink/interceptor$': '<rootDir>/../src/common/http/interceptor',
    '^@wink/mongo$': '<rootDir>/../src/common/database/mongo',
    '^@wink/redis$': '<rootDir>/../src/common/database/redis',
    '^@wink/s3$': '<rootDir>/../src/common/s3',

    // Utils
    '^@wink/event$': '<rootDir>/../src/common/util/event',
    '^@wink/logger$': '<rootDir>/../src/common/util/logger',
    '^@wink/mail$': '<rootDir>/../src/common/util/mail',
    '^@wink/swagger$': '<rootDir>/../src/common/util/swagger',
    '^@wink/validation$': '<rootDir>/../src/common/util/validation',

    // Domain
    '^@wink/auth/(.*)$': '<rootDir>/../src/domain/auth/$1',
    '^@wink/member/(.*)$': '<rootDir>/../src/domain/member/$1',
    '^@wink/activity/(.*)$': '<rootDir>/../src/domain/activity/$1',

    // Test
    '^@wink/test-mock$': '<rootDir>/mock',
  },
};
