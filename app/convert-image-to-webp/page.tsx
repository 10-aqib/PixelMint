import type { Metadata } from 'next';
import LandingPageLayout from '../LandingPage';

export const metadata: Metadata = {
  title: 'Convert Image to WebP — Free Online Converter',
  description:
    'Convert JPG and PNG images to WebP format online for free. WebP offers 25–35% smaller file sizes with equivalent quality. Browser-based — no file uploads.',
};

export default function Page() {
  return (
    <LandingPageLayout
      title="Convert Image to WebP"
      h1="Convert Image to WebP"
      intro="WebP is a modern image format developed by Google that produces files 25–35% smaller than JPEG and PNG at equivalent visual quality. Convert your image to WebP to speed up your website or reduce storage."
      content={[
        'WebP has become the recommended format for web images because it supports both lossy and lossless compression, transparency (like PNG), and animation (like GIF), all with better compression efficiency than older formats.',
        'Converting to WebP is straightforward with PixelMint. Choose the Convert tab, upload your image, select WebP as the output format, and click Convert Image. If your image has transparency (PNG with a transparent background), enable the Keep Transparency option to preserve the alpha channel.',
        'Browser support for WebP is excellent — all major browsers, including Chrome, Firefox, Edge, and Safari (since version 14), support it. If you are building a website and need to support very old browsers, you can provide a WebP version alongside a JPEG fallback using the HTML <picture> element.',
        'WebP images are not suitable for all use cases. Some older image editing tools, operating systems, and printing workflows do not support WebP natively. For photos you intend to print or edit in traditional software, JPEG or PNG remains the safer choice.',
      ]}
      relatedLinks={[
        { href: '/compress-jpg', label: 'Compress JPG' },
        { href: '/compress-image-to-100kb', label: 'Compress to 100 KB' },
        { href: '/image-size-vs-quality', label: 'Quality vs File Size' },
        { href: '/resize-image-to-1080x1080', label: 'Resize to 1080×1080' },
        { href: '/compress-image-to-200kb', label: 'Compress to 200 KB' },
      ]}
    />
  );
}
