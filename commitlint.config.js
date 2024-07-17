const type = ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'refactor', 'revert', 'style', 'test'];

module.exports = {
  rules: {
    'type-enum': [2, 'always', type],
  },
};
