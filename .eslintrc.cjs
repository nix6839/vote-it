const config = {
  extends: ['next/core-web-vitals', 'prettier'],

  overrides: [
    {
      files: ['**/*.test.{ts,tsx}'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};

module.exports = config;
