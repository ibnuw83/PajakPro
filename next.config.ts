import type {NextConfig} from 'next';
import withPWAInit from '@ducanh2912/next-pwa';

const isDevelopment = process.env.NODE_ENV === 'development';

const withPWA = withPWAInit({
  dest: 'public',
  register: true,
  disable: isDevelopment,
});

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // This is required to allow the Next.js dev server to be accessed from the
    // Firebase Studio preview pane.
    allowedNextBundlerReactRoots: ['/home/user/studio'],
  },
};

export default withPWA(nextConfig);
