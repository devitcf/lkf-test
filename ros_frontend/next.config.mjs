/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/customers',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
