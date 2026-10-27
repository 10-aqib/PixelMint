# PixelMint

A fast, professional online tool for compressing, resizing, and converting images with complete privacy. Built with Next.js, React, and TypeScript. All image operations run 100% locally in your browser.

**Tagline:** Make Every Pixel Count.

## Run locally

Requirements: Node.js 20.9 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build for production

```bash
npm run build
npm start
```

## Current MVP features

- Browser-local image processing. Images are not uploaded to an application server.
- Maximum file-size target in KB or MB (JPG/WebP quality search; PNG is lossless and may not reach the target).
- Resize to pixel dimensions with optional aspect-ratio preservation.
- JPG, PNG, and WebP export.
- Preview, output-size report, download, drag-and-drop, mobile-responsive interface.
- SEO metadata, robots.txt, and sitemap route.

## Before production

- Replace `https://pixelmint.tools` in metadata, `app/robots.ts`, and `app/sitemap.ts` with the verified production domain.
- Add a real privacy page and terms page before applying to advertising networks.
- Add automated unit/e2e tests and test across current Chrome, Firefox, Safari, and mobile browsers.
- Consider dedicated SEO landing pages only after checking actual search demand and writing genuinely useful page-specific guidance.
- Exact file size is a maximum target, not a guarantee for every image. Some formats and image dimensions cannot be compressed below a given limit without changing dimensions or quality substantially.
