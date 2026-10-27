import type { Metadata } from 'next';
import LandingPageLayout from '../LandingPage';

export const metadata: Metadata = {
  title: 'Compress JPG Online — Free JPG Compressor',
  description:
    'Compress JPEG images online for free. Reduce JPG file size without losing quality. Works in your browser — private, fast, no sign-up required.',
};

export default function Page() {
  return (
    <LandingPageLayout
      title="Compress JPG"
      h1="Compress JPG Images Online"
      intro="JPEG is the most common image format on the web. PixelMint's JPG compressor reduces your JPEG file size by adjusting the encoding quality — smaller file, same picture, no server upload."
      content={[
        'JPEG (also called JPG) uses lossy compression, which means it trades a small amount of image detail for significant file size savings. This makes JPEG ideal for photographs, where the human eye rarely notices the minor quality reduction at moderate compression levels.',
        'PixelMint compresses JPEG images by re-encoding them at a carefully chosen quality level. When you set a target file size, the tool runs multiple encoding passes — each time adjusting quality up or down — until it finds the highest quality that fits within your limit.',
        'A common question is whether compressing a JPEG again reduces quality further. The answer is yes — every time a lossy format like JPEG is re-encoded, some quality is lost. For best results, always compress from the original high-quality version of your photo, not from a previously compressed copy.',
        'If you do not need a specific file size limit, use the quality slider in PixelMint\'s Compress tab to find a balance that looks good to you. Quality settings between 70% and 85% typically produce JPEG images that look sharp on screen while being two to five times smaller than the originals.',
      ]}
      relatedLinks={[
        { href: '/compress-image-to-50kb', label: 'Compress to 50 KB' },
        { href: '/compress-image-to-100kb', label: 'Compress to 100 KB' },
        { href: '/convert-image-to-webp', label: 'Convert to WebP' },
        { href: '/image-size-vs-quality', label: 'Quality vs File Size' },
        { href: '/resize-image-for-online-forms', label: 'Resize for Forms' },
      ]}
    />
  );
}
