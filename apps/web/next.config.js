/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Fortell Next at disse pakkene skal transpiles som om de var dine egne
    transpilePackages: [
        '@mui/x-data-grid',
        '@mui/x-date-pickers',
        '@mui/x-charts',
        // om du bruker Pro‑versjoner:
        '@mui/x-data-grid-pro',
        '@mui/x-data-grid-generator',
    ],
};

module.exports = nextConfig;
