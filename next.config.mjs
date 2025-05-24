/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build configuration
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image optimization - disabled for Netlify compatibility
  images: {
    unoptimized: true,
    domains: ['my.spline.design', 'prod.spline.design'],
  },

  // Transpile packages for better compatibility
  transpilePackages: ['framer-motion'],

  // Output configuration for Netlify
  output: 'standalone',

  // Trailing slash configuration
  trailingSlash: false,

  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Framer Motion optimization
    config.module.rules.push({
      test: /framer-motion/,
      sideEffects: false
    })

    // Audio file handling
    config.module.rules.push({
      test: /\.(mp3|wav|m4a)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/audio/[name].[hash][ext]'
      }
    })

    // Font file handling
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/fonts/[name].[hash][ext]'
      }
    })

    return config
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Experimental features for better performance
  experimental: {
    scrollRestoration: true,
  },

  // Compression
  compress: true,

  // Power by header
  poweredByHeader: false,
}

export default nextConfig
