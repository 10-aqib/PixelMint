import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://pixelmint.tools'),
  title: {
    default: 'PixelMint — Compress, Resize & Convert Images Online',
    template: '%s | PixelMint',
  },
  description:
    'Free online image tool. Compress images to a target file size, resize to exact pixel dimensions, and convert between JPG, PNG, and WebP — all in your browser. No sign-up required.',
  keywords: [
    'compress image online',
    'compress image to 50KB',
    'compress image to 100KB',
    'image compressor',
    'resize image online',
    'image size reducer',
    'JPG compressor',
    'convert image to WebP',
    'resize image to 600x600',
    'compress photo for upload',
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: 'PixelMint — Make Every Pixel Count.',
    description:
      'Compress, resize, and convert images in your browser. Free, private, no sign-up.',
    type: 'website',
    url: 'https://pixelmint.tools',
    siteName: 'PixelMint',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PixelMint — Make Every Pixel Count.',
    description: 'Compress, resize, and convert images free in your browser.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
