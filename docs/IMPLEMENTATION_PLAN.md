# PixelMint — Implementation Plan

## Phase 0: Repository Inspection & Reference Image Analysis

### Stack
- Next.js 15.5.6 (App Router), React 19, TypeScript 5.8, Vanilla CSS
- No test framework installed — will add Vitest + Playwright in Phase 10

### Existing Files
```
app/globals.css      — all styles (~16.7 KB flat file)
app/layout.tsx       — root layout + metadata
app/page.tsx         — homepage (server component)
app/tool.tsx         — image processing (client component)
app/robots.ts
app/sitemap.ts
```

### Baseline Build Status
- Build FAILS: onClick handler passed from Server Component in page.tsx (Next.js prerender error)
- CSS warning: autoprefixer flex-end

### Key Gaps vs Reference
1. No Convert tab (only Compress + Resize exist)
2. Navigation wrong: should be Tools | Guides | About
3. Tab style: reference uses filled pill (green bg), existing uses underline
4. Tool card lacks inner heading ("Image Compression" etc.)
5. Result layout: should be two-column Original/Compressed with image previews
6. No preset system (Passport Photo, Profile Picture, Signature)
7. No landing pages (10 required)
8. No "Why Choose PixelMint?" benefit section
9. No "Guides" article section
10. No bottom CTA section
11. No test suite

### Color Corrections Needed
- Current: yellow-green --green:#c9f36b (for accents)
- Reference: deep forest green for buttons and active tabs
- Keep existing design tokens but adjust green values

### Build Fix Required
- Move onClick from server component (page.tsx) to a client wrapper
