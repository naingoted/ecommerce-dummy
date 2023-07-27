/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
		  "i.dummyjson.com",
		]
	},
	async rewrites() {
		return [
			{
				source: '/api/v1/products/:path*',
				destination: 'https://dummyjson.com/products/:path*',
			},
		];
	},
}

module.exports = nextConfig
