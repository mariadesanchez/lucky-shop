/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        metadata: {
            metadataBase: "https://new-lucky-shop.vercel.app", // Cambia esto por tu URL base
        },
        remotePatterns: [{
            protocol: 'https',
            hostname: 'res.cloudinary.com'
        }]
    }
}

module.exports = nextConfig;