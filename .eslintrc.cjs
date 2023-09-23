const config = {
  extends: ['next/core-web-vitals', 'prettier'],

  overrides: [
    {
      files: ['**/*.test.{ts,tsx}', './tests/setup-vitest.ts'],
      extends: ['plugin:vitest/recommended', 'plugin:testing-library/react'],
    },
  ],
};

module.exports = config;
