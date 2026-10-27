import type { Metadata } from 'next';
import LandingPageLayout from '../LandingPage';

export const metadata: Metadata = {
  title: 'Compress Image to 100KB — Free Online Tool',
  description:
    'Compress your image to under 100 KB in seconds. Works for JPG, PNG and WebP. No sign-up, no file uploads — all processing happens in your browser.',
};

export default function Page() {
  return (
    <LandingPageLayout
      title="Compress Image to 100KB"
      h1="Compress Image to 100KB"
      intro="100 KB is a common file-size ceiling for profile photos on professional platforms, LinkedIn, passport photos, and many corporate HR systems. Compress any image to 100 KB or less right here."
      content={[
        '100 KB allows a noticeably higher quality result than 50 KB, making it ideal for profile photos that need to look sharp on screen while still meeting the upload requirement.',
        'PixelMint handles the compression automatically using a binary-search quality strategy. It tries different JPEG or WebP quality levels and measures the actual file size of each attempt, homing in on the highest quality that fits inside 100 KB.',
        'The resulting file size shown in PixelMint is the actual size of the file you will download — not an approximation. If the badge shows "Target achieved," the file is genuinely under 100 KB.',
        'If your image cannot reach 100 KB even at the lowest quality — which can happen with very large, complex images — PixelMint will tell you and suggest reducing the image dimensions. Try setting the dimensions to 800×600 or similar in the Resize tab, then run the compression again.',
      ]}
      relatedLinks={[
        { href: '/compress-image-to-50kb', label: 'Compress to 50 KB' },
        { href: '/compress-image-to-200kb', label: 'Compress to 200 KB' },
        { href: '/compress-jpg', label: 'Compress JPG' },
        { href: '/resize-image-to-600x600', label: 'Resize to 600×600' },
        { href: '/image-size-vs-quality', label: 'Quality vs File Size' },
      ]}
    />
  );
}
