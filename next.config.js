/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
	images: {
		domains: [
		  "i.dummyjson.com",
		]
	},
	async rewrites() {
		return [
			{
				source: '/api/products/:path*',
				destination: 'https://dummyjson.com/products/:path*',
			},
		];
	},
}

module.exports = nextConfig
