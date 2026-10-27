import type { Metadata } from 'next';
import LandingPageLayout from '../LandingPage';

export const metadata: Metadata = {
  title: 'Compress Image to 50KB — Free Online Tool',
  description:
    'Compress your photo or image to under 50 KB instantly in your browser. No upload, no account. Perfect for job applications, profile photos, and online forms.',
};

export default function Page() {
  return (
    <LandingPageLayout
      title="Compress Image to 50KB"
      h1="Compress Image to 50KB"
      intro="50 KB is one of the most common file-size limits for profile photos, job application uploads, and identity documents on government websites. PixelMint compresses your image to meet the limit automatically."
      content={[
        '50 KB is a very common file-size requirement for online forms — bank portals, university admissions, professional registrations, and company HR systems often refuse uploads larger than this.',
        'PixelMint\'s smart compression searches for the highest possible quality that still fits inside 50 KB. You just set the target, choose your image, and click Compress. The algorithm runs 12 iterations of binary search to find the optimal balance between file size and visual quality.',
        'For most standard photographs taken on a phone, compressing to 50 KB while keeping reasonable dimensions (such as 400×400 to 800×800 pixels) is achievable with JPEG or WebP encoding. If your image is very large, consider resizing it to smaller dimensions first — a 4000×3000 pixel photo contains much more data than a form needs.',
        'PNG images use lossless encoding that cannot be compressed to a precise file size the way JPEG can. If your source image is a PNG and you need it under 50 KB, use PixelMint\'s Convert tab to change it to JPEG first.',
      ]}
      relatedLinks={[
        { href: '/compress-image-to-20kb', label: 'Compress to 20 KB' },
        { href: '/compress-image-to-100kb', label: 'Compress to 100 KB' },
        { href: '/compress-jpg', label: 'Compress JPG' },
        { href: '/resize-image-for-online-forms', label: 'Resize for Forms' },
        { href: '/image-size-vs-quality', label: 'Quality vs File Size' },
      ]}
    />
  );
}
