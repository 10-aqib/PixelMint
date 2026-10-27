import type { Metadata } from 'next';
import LandingPageLayout from '../LandingPage';

export const metadata: Metadata = {
  title: 'Image Quality vs File Size — What to Know',
  description:
    'Understand the relationship between image quality and file size. Learn how JPEG, PNG, and WebP compression work, and how to choose the right settings for your needs.',
};

export default function Page() {
  return (
    <LandingPageLayout
      title="Image Quality vs File Size"
      h1="Image Quality vs File Size: What to Know"
      intro="Every time you save or compress an image, you make a trade-off between visual quality and file size. Understanding how this works helps you make smarter choices for your photos and web images."
      content={[
        'File size and image quality are inversely related in lossy formats like JPEG and WebP. The more you compress an image, the smaller the file becomes — but also the more visual detail is removed. Finding the right balance depends on how the image will be used and how closely viewers will inspect it.',
        'JPEG compression works by dividing the image into 8×8 pixel blocks and discarding detail that the human visual system is less likely to notice, particularly fine color transitions. At high quality settings (85–95%), the result is nearly indistinguishable from the original. At low quality settings (20–40%), block-like artifacts become visible, especially in areas with sharp edges or fine text.',
        'PNG is a lossless format — it compresses the file without removing any visual information. The result is always an exact copy of the original, just stored more efficiently. This makes PNG ideal for screenshots, logos, and graphics with text or flat areas of color. However, lossless compression is less effective on photographs, which is why PNG photographs are much larger than equivalent JPEG versions.',
        'WebP is a newer format that supports both lossy and lossless compression. Its lossy mode is generally 25–35% more efficient than JPEG at equivalent visual quality. Its lossless mode is typically 26% smaller than PNG. For most web use cases, WebP is the best choice.',
        'When choosing settings in PixelMint, a quality of 75–85% for JPEG or WebP produces excellent results for photographs viewed on screen. For images that need to be very small (under 50 KB), quality may need to drop to 40–60%, which can introduce visible compression artifacts on complex images. You can preview the compressed version in PixelMint\'s result panel before downloading.',
      ]}
      relatedLinks={[
        { href: '/compress-jpg', label: 'Compress JPG' },
        { href: '/convert-image-to-webp', label: 'Convert to WebP' },
        { href: '/compress-image-to-50kb', label: 'Compress to 50 KB' },
        { href: '/compress-image-to-100kb', label: 'Compress to 100 KB' },
        { href: '/resize-image-for-online-forms', label: 'Resize for Forms' },
      ]}
    />
  );
}
