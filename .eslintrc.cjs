const config = {
	extends: [
		'next/core-web-vitals',
		'plugin:@tanstack/eslint-plugin-query/recommended',
		'prettier',
	],

	overrides: [
		{
			files: ['**/*.test.tsx'],
			extends: ['plugin:playwright/recommended'],
		},
	],
};

module.exports = config;
