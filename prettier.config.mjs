export default {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'auto',
  printWidth: 100,
  quoteProps: 'as-needed',
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrderParserPlugins: ['typescript', 'decorators-legacy'],
  importOrder: [
    // Nest
    '^@nestjs',

    // Domain
    '^@wink/auth',
    '^@wink/member',
    '^@wink/activity',

    // Common
    '^@wink/(app|config|filter|interceptor|mongo|redis|s3)',

    // Utils
    '^@wink/(event|logger|mail|swagger|validation)',

    // Test
    '^@wink/test-mock',

    // Other
    '^[./]',

    // Libraries
    '<THIRD_PARTY_MODULES>',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
