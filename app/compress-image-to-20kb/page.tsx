import type { Metadata } from 'next';
import LandingPageLayout from '../LandingPage';

export const metadata: Metadata = {
  title: 'Compress Image to 20KB — Free Online Tool',
  description:
    'Compress any image to under 20 KB in your browser. Perfect for profile pictures, application forms, and government portals that require very small file sizes. Free, private, no sign-up.',
};

export default function Page() {
  return (
    <LandingPageLayout
      title="Compress Image to 20KB"
      h1="Compress Image to 20KB"
      intro="Many government portals, job application forms, and competitive exam uploads require images smaller than 20 KB. PixelMint compresses your photo to meet that limit while keeping the best possible quality."
      content={[
        'Compressing an image to 20 KB is one of the most common challenges job seekers and students face online. Government job portals, university admissions, and competitive exams often mandate that uploaded photographs are smaller than 20 KB — sometimes as small as 10 KB.',
        'PixelMint uses a binary-search quality algorithm that tries progressively lower JPEG or WebP quality settings until your image fits the target. Because the entire process runs in your browser, your private photos are never uploaded to a server.',
        'To achieve 20 KB for a high-resolution photo, you may also need to reduce its pixel dimensions. Start by setting the target to 20 KB in PixelMint\'s Compress tab, and if the result doesn\'t meet the goal, switch to the Resize tab to reduce the image to around 200×200 or 400×400 pixels, then compress again.',
        'JPEG and WebP formats are best for hitting small targets. PNG files use lossless compression and cannot be reliably compressed to exact file sizes through quality adjustment alone — convert your PNG to JPG first if a small target is required.',
      ]}
      relatedLinks={[
        { href: '/compress-image-to-50kb', label: 'Compress to 50 KB' },
        { href: '/compress-image-to-100kb', label: 'Compress to 100 KB' },
        { href: '/compress-jpg', label: 'Compress JPG' },
        { href: '/resize-image-for-online-forms', label: 'Resize for Forms' },
        { href: '/image-size-vs-quality', label: 'Quality vs File Size' },
      ]}
    />
  );
}
