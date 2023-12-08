import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
	corePlugins: {
		preflight: false,
	},
	darkMode: 'class',
	plugins: [],
};
export default config;
