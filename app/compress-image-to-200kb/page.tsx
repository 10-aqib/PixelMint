import type { Metadata } from 'next';
import LandingPageLayout from '../LandingPage';

export const metadata: Metadata = {
  title: 'Compress Image to 200KB — Free Online Tool',
  description:
    'Reduce image file size to under 200 KB online. Great for web images, email attachments, and social media. Free, browser-based, no account needed.',
};

export default function Page() {
  return (
    <LandingPageLayout
      title="Compress Image to 200KB"
      h1="Compress Image to 200KB"
      intro="200 KB is a practical limit for many website images, email attachments, and social profile banners. PixelMint compresses your image to fit under 200 KB with the best quality the format allows."
      content={[
        '200 KB gives compression algorithms enough room to preserve good visual quality in most photographs. At this target, JPEG images can retain sharp detail even at full screen viewing size, making it a sensible limit for website thumbnails, blog feature images, and social media posts.',
        'PixelMint\'s compression uses progressive quality reduction. It starts at high quality and reduces in binary-search steps until the output fits inside 200 KB, then reports the actual result — not an estimate.',
        'WebP is often 25–35% smaller than JPEG at equivalent visual quality, so if your target platform supports WebP (most modern browsers and websites do), choosing WebP as the output format in PixelMint can let you achieve a smaller file size with less quality loss.',
        'For photographs from modern smartphones — which often exceed 4 MB — a 200 KB target is easily achievable with JPEG at medium-high quality, usually without any visible degradation at normal viewing sizes.',
      ]}
      relatedLinks={[
        { href: '/compress-image-to-100kb', label: 'Compress to 100 KB' },
        { href: '/compress-jpg', label: 'Compress JPG' },
        { href: '/convert-image-to-webp', label: 'Convert to WebP' },
        { href: '/image-size-vs-quality', label: 'Quality vs File Size' },
        { href: '/resize-image-to-1080x1080', label: 'Resize to 1080×1080' },
      ]}
    />
  );
}
