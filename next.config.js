/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URI: process.env.MONGODB_URI,
    },
    experimental: {
        instrumentationHook: true
    },
    reactStrictMode: true,
}

module.exports = nextConfig