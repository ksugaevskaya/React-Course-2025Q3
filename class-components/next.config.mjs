import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist', // Changes the build output directory to `./dist/`.
  images: {
    remotePatterns: [
      new URL('https://raw.githubusercontent.com/PokeAPI/sprites/**'),
    ],
  },
  pageExtensions: [
    'page.tsx',
    'page.ts',
    'page.jsx',
    'page.js',
    'api.ts',
    'api.js',
  ],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
