module.exports = {
  extends: ['react-app'],
  plugins: ['import'],
  overrides: [
    {
      files: ['src/**/*.{js,jsx}'],
      rules: {
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
            pathGroups: [
              {
                pattern: 'react',
                group: 'external',
                position: 'before',
              },
            ],
            alphabetize: {
              order: 'asc',
            },
            pathGroupsExcludedImportTypes: ['react'],
            'newlines-between': 'always',
          },
        ],
        'import/no-duplicates': ['error', { considerQueryString: true }],
      },
    },
  ],
};
