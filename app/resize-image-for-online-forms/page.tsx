import type { Metadata } from 'next';
import LandingPageLayout from '../LandingPage';

export const metadata: Metadata = {
  title: 'Resize Image for Online Forms — Free Tool',
  description:
    'Resize and compress your photo to meet online form upload requirements. Common sizes: 200×200, 400×400, 600×600 px. Under 50 KB, 100 KB, or 200 KB. Free, private, no sign-up.',
};

export default function Page() {
  return (
    <LandingPageLayout
      title="Resize Image for Online Forms"
      h1="Resize Image for Online Forms"
      intro="Government portals, job applications, university admissions, and bank forms often have strict image requirements — specific pixel dimensions and maximum file sizes. This guide explains common requirements and how to meet them with PixelMint."
      content={[
        'Online forms commonly require a photo that is both a certain size in pixels and under a maximum file size in kilobytes. These two requirements are separate: a 600×600 pixel image can be anywhere from 20 KB to several megabytes depending on compression.',
        'Common dimension requirements include 200×200, 300×400, 400×400, 600×600, and 413×531 (the standard passport photo proportions in some countries). Common file size limits are 20 KB, 50 KB, 100 KB, and 200 KB.',
        'The safest approach is to handle dimensions and file size separately. First, use PixelMint\'s Resize tab to set the exact pixel dimensions the form requires. Then, use the Compress tab to reduce the file size to meet the limit. You can switch between tabs without losing your uploaded image.',
        'For photo identity documents, ensure the image is taken with a plain, light-colored background, the face is clearly visible, and the photo is recent. PixelMint handles the technical formatting — it does not evaluate whether the photo content meets identity requirements.',
        'If the form rejects your upload even after following the size and dimension requirements, check whether it specifies a minimum dimension (forms sometimes set both minimum and maximum), a specific aspect ratio, or a required color space (RGB rather than CMYK for web forms).',
      ]}
      relatedLinks={[
        { href: '/compress-image-to-20kb', label: 'Compress to 20 KB' },
        { href: '/compress-image-to-50kb', label: 'Compress to 50 KB' },
        { href: '/compress-image-to-100kb', label: 'Compress to 100 KB' },
        { href: '/resize-image-to-600x600', label: 'Resize to 600×600' },
        { href: '/image-size-vs-quality', label: 'Quality vs File Size' },
      ]}
    />
  );
}
