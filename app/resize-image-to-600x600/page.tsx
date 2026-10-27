import type { Metadata } from 'next';
import LandingPageLayout from '../LandingPage';

export const metadata: Metadata = {
  title: 'Resize Image to 600×600 px — Free Online Tool',
  description:
    'Resize any image to exactly 600×600 pixels for free. Perfect for passport photos, profile pictures, and product thumbnails. Browser-based — your files stay private.',
};

export default function Page() {
  return (
    <LandingPageLayout
      title="Resize Image to 600×600"
      h1="Resize Image to 600×600 px"
      intro="600×600 pixels is a standard square format used for passport photos, government ID uploads, and profile pictures on many platforms. Resize your image to exactly 600×600 in seconds."
      content={[
        '600×600 pixels is a square aspect ratio (1:1). Many government portal requirements for passport-style photos specify this exact dimension, particularly in South Asia, Southeast Asia, and the Middle East where online application systems often list 600×600 as the required upload size.',
        'When you resize a non-square image to 600×600, you have two options: scale it to fit (which adds whitespace on the sides or top and bottom) or scale to fill (which crops part of the image). PixelMint resizes to fit by default when aspect ratio is unlocked — the output will be 600×600 even if the source image was rectangular.',
        'After resizing, you can also compress the image in the same session by switching to the Compress tab. Most 600×600 JPEG images for form uploads are expected to be under 100 KB or 200 KB.',
        'For passport-style photos, make sure the face is centered and well-lit before resizing. PixelMint does not crop or position the subject — it only changes the image dimensions. A good source photo taken close-up will produce better results than cropping a wide-angle image.',
      ]}
      relatedLinks={[
        { href: '/resize-image-to-1080x1080', label: 'Resize to 1080×1080' },
        { href: '/compress-image-to-100kb', label: 'Compress to 100 KB' },
        { href: '/resize-image-for-online-forms', label: 'Resize for Forms' },
        { href: '/compress-image-to-50kb', label: 'Compress to 50 KB' },
        { href: '/image-size-vs-quality', label: 'Quality vs File Size' },
      ]}
    />
  );
}
