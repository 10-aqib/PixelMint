import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PixelMint — Make Every Pixel Count',
    short_name: 'PixelMint',
    description: 'Compress, resize, and convert images online with privacy.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8f9fa',
    theme_color: '#1a7a4a',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
