import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist', // Changes the build output directory to `./dist/`.
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
