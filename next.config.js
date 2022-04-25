/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	pageExtensions: ['jsx', 'js', 'tsx', 'ts'],
	typescript: {
		
		tsconfigPath: './tsconfig.json',

	},
	images: { 
		domains: ['images.unsplash.com'],
	
	}
};

module.exports = nextConfig;
