import type { Metadata } from 'next';
import LandingPageLayout from '../LandingPage';

export const metadata: Metadata = {
  title: 'Resize Image to 1080×1080 px — Free Online Tool',
  description:
    'Resize your image to 1080×1080 pixels for Instagram, LinkedIn, and social media profiles. Free, private, no sign-up — all in your browser.',
};

export default function Page() {
  return (
    <LandingPageLayout
      title="Resize Image to 1080×1080"
      h1="Resize Image to 1080×1080 px"
      intro="1080×1080 pixels is the standard square post size for Instagram, LinkedIn profile images, WhatsApp profile pictures, and many social media platforms. Resize your photo to exactly 1080×1080 here."
      content={[
        '1080×1080 is the optimal square resolution for Instagram posts and profile images. Uploading at this size ensures your image displays at full quality without platform-side upscaling (which can cause softness) or heavy downscaling (which wastes bandwidth).',
        'LinkedIn recommends a minimum of 400×400 pixels for profile photos, but uploading at 1080×1080 gives the platform more headroom to crop and display your photo well across different devices and screen sizes.',
        'When your source image is not square — for example, a landscape photo from your camera — resizing it to 1080×1080 will change its aspect ratio unless you first crop it to a square. PixelMint resizes the full image dimensions you specify; it does not auto-crop. For best social media results, crop your photo to a square shape before resizing.',
        'A 1080×1080 JPEG image at 80–85% quality is typically 150–400 KB in size, which is well within the limits of most social media upload systems. If the platform has a file size restriction, use PixelMint\'s Compress tab after resizing.',
      ]}
      relatedLinks={[
        { href: '/resize-image-to-600x600', label: 'Resize to 600×600' },
        { href: '/compress-image-to-200kb', label: 'Compress to 200 KB' },
        { href: '/convert-image-to-webp', label: 'Convert to WebP' },
        { href: '/compress-jpg', label: 'Compress JPG' },
        { href: '/image-size-vs-quality', label: 'Quality vs File Size' },
      ]}
    />
  );
}
