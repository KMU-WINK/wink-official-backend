const type = ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'refactor', 'revert', 'style', 'test'];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'subject-case': [2, 'always', 'sentence-case'],
    'type-enum': [2, 'always', type],
  },
};
