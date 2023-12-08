import hwyConfig from '@nix6839/prettier-config';

/** @satisfies {import('prettier').Config} */
const config = {
	...hwyConfig,
	plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
