/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['image.tmdb.org', 'gravatar.com'],
    },
}

module.exports = nextConfig;
