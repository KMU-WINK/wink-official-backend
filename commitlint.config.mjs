const type = ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'refactor', 'revert', 'style', 'test'];

export default {
  rules: {
    'type-enum': [2, 'always', type],
    'type-empty': [2, 'never'],
    'type-case': [2, 'always', ['lower-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
  },
};
