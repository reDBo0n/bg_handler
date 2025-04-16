import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
	dest:		'public',
	register:	true,
	skipWaiting:true
});

const nextConfig: NextConfig = {
	output:	"export",
	images: {
		unoptimized: true,
	},
	basePath:	"/bg_handler"
};

export default nextConfig;
module.exports = withPWA(nextConfig);