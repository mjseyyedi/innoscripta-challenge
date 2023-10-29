/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    modularizeImports: {
        '@mui/icons-material': {
            transform: '@mui/icons-material/{{member}}',
        },
    },
    compiler: {
        styledComponents: true,
    }
}

module.exports = nextConfig
