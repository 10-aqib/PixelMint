import ImageTool from './tool';

/* ─── Static data ─────────────────────────────────────────── */

const presets = [
  {
    id: 'passport',
    label: 'Passport Photo',
    sub: '600 × 600 px · Max 100 KB',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <circle cx="12" cy="10" r="3"/>
        <path d="M6 21v-1a6 6 0 0 1 12 0v1"/>
      </svg>
    ),
    config: { mode: 'compress' as const, targetSize: '100', sizeUnit: 'KB' as const, resizeW: 600, resizeH: 600 },
  },
  {
    id: 'profile',
    label: 'Profile Picture',
    sub: '400 × 400 px · Max 100 KB',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="8" r="4"/>
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
    config: { mode: 'compress' as const, targetSize: '100', sizeUnit: 'KB' as const, resizeW: 400, resizeH: 400 },
  },
  {
    id: 'signature',
    label: 'Signature',
    sub: '300 × 150 px · Max 50 KB',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 17c3-3 6-6 9-6s3 3 6 0"/>
        <path d="M3 20h18"/>
      </svg>
    ),
    config: { mode: 'compress' as const, targetSize: '50', sizeUnit: 'KB' as const, resizeW: 300, resizeH: 150 },
  },
  {
    id: 'more',
    label: 'More Presets',
    sub: 'Browse all sizes',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
      </svg>
    ),
    config: null,
  },
];

const benefits = [
  {
    id: 'private',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: '100% Private',
    copy: 'Your files never leave your device.',
  },
  {
    id: 'fast',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: 'Fast & Easy',
    copy: 'Get results in seconds, no sign-up needed.',
  },
  {
    id: 'quality',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'High Quality',
    copy: 'Smart compression keeps your images clean.',
  },
  {
    id: 'everywhere',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
        <line x1="12" y1="18" x2="12.01" y2="18"/>
      </svg>
    ),
    title: 'Works Everywhere',
    copy: 'Desktop, tablet and mobile.',
  },
];

const guides = [
  {
    id: 'compress-50kb',
    title: 'How to Compress Images to 50KB',
    href: '/compress-image-to-50kb',
    imgAlt: 'A compressed image showing small file size',
    color: '#d1e8d4',
  },
  {
    id: 'best-sizes',
    title: 'Best Image Sizes for Online Forms',
    href: '/resize-image-for-online-forms',
    imgAlt: 'Online form showing image upload field',
    color: '#dce8f7',
  },
  {
    id: 'quality-vs-size',
    title: 'Image Quality vs File Size: What to Know',
    href: '/image-size-vs-quality',
    imgAlt: 'Side by side comparison of image quality levels',
    color: '#f5e8d0',
  },
];

/* ─── Page ────────────────────────────────────────────────── */

export default function Home() {
  return (
    <main>
      {/* ── Header ─────────────────────────────────────────── */}
      <header className="topbar">
        <a className="brand" href="/" aria-label="PixelMint home">
          <span className="brand-mark" aria-hidden="true">
            <LogoIcon />
          </span>
          <span className="brand-name">PixelMint</span>
        </a>

        <nav aria-label="Site navigation">
          <a href="#tool">Tools</a>
          <a href="#guides">Guides</a>
          <a href="#about">About</a>
        </nav>

        <a className="nav-cta" href="#tool">
          Try it free
        </a>
      </header>

      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="hero" id="top" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <h1 id="hero-heading">
            Resize, Compress &amp; Prepare Images for Any Upload
          </h1>
          <p className="hero-description">
            Fast. Easy. No sign-up required.
          </p>

          <div className="hero-features">
            <div className="hero-feat">
              <CompressIcon />
              <span>Compressed by size</span>
            </div>
            <div className="hero-feat">
              <ResizeIcon />
              <span>Resize to exact dimensions</span>
            </div>
            <div className="hero-feat">
              <ConvertIcon />
              <span>Convert format</span>
            </div>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <HeroMockup />
        </div>
      </section>

      {/* ── Tool ───────────────────────────────────────────── */}
      <section className="tool-section" id="tool" aria-labelledby="tool-heading">
        <h2 id="tool-heading" className="sr-only">Image Tool</h2>
        <ImageTool presets={presets.filter((p) => p.config !== null)} />
      </section>

      {/* ── Presets ────────────────────────────────────────── */}
      <section className="presets-section" aria-labelledby="presets-heading">
        <div className="section-inner">
          <h2 id="presets-heading">Designed for Real-World Use</h2>
          <p>Quick presets for common upload requirements.</p>
          <div className="preset-grid" role="list">
            {presets.map((p) => (
              <a
                key={p.id}
                href={p.config ? '#tool' : '#tool'}
                className="preset-card"
                aria-label={`${p.label}: ${p.sub}`}
                role="listitem"
              >
                <span className="preset-icon">{p.icon}</span>
                <b>{p.label}</b>
                <small>{p.sub}</small>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefits ───────────────────────────────────────── */}
      <section className="benefits-section" id="about" aria-labelledby="benefits-heading">
        <div className="section-inner">
          <h2 id="benefits-heading">Why Choose PixelMint?</h2>
          <div className="benefits-grid" role="list">
            {benefits.map((b) => (
              <div className="benefit-card" key={b.id} role="listitem">
                <span className="benefit-icon">{b.icon}</span>
                <b>{b.title}</b>
                <p>{b.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Guides ─────────────────────────────────────────── */}
      <section className="guides-section" id="guides" aria-labelledby="guides-heading">
        <div className="section-inner">
          <h2 id="guides-heading">Learn More with Our Guides</h2>
          <p>Helpful articles to get the best results.</p>
          <div className="guides-grid">
            {guides.map((g) => (
              <a key={g.id} href={g.href} className="guide-card">
                <div
                  className="guide-thumb"
                  style={{ background: g.color }}
                  role="img"
                  aria-label={g.imgAlt}
                />
                <div className="guide-body">
                  <b>{g.title}</b>
                  <span className="guide-link">Read more →</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ─────────────────────────────────────── */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <div className="cta-logo" aria-hidden="true">
          <span className="brand-mark brand-mark-lg">
            <LogoIcon />
          </span>
          <span className="brand-name">PixelMint</span>
        </div>
        <h2 id="cta-heading">
          Resize, Compress &amp; Prepare Images for Any Upload
        </h2>
        <p>Simple tools. Better images.</p>
        <a className="cta-button" href="#tool">
          Get Started Free
        </a>
        <small>No sign-up. No limits. Just results.</small>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer>
        <div className="footer-inner">
          <a className="brand footer-brand" href="/" aria-label="PixelMint home">
            <span className="brand-mark" aria-hidden="true">
              <LogoIcon />
            </span>
            <span className="brand-name">PixelMint</span>
          </a>
          <p className="footer-tagline">Make Every Pixel Count.</p>
          <nav className="footer-nav" aria-label="Footer navigation">
            <div className="footer-nav-group">
              <b>Tools</b>
              <a href="/compress-image-to-50kb">Compress to 50 KB</a>
              <a href="/compress-image-to-100kb">Compress to 100 KB</a>
              <a href="/resize-image-to-600x600">Resize to 600×600</a>
              <a href="/resize-image-to-1080x1080">Resize to 1080×1080</a>
              <a href="/convert-image-to-webp">Convert to WebP</a>
            </div>
            <div className="footer-nav-group">
              <b>Guides</b>
              <a href="/compress-image-to-20kb">Compress to 20 KB</a>
              <a href="/compress-image-to-200kb">Compress to 200 KB</a>
              <a href="/resize-image-for-online-forms">Resize for Forms</a>
              <a href="/image-size-vs-quality">Quality vs File Size</a>
              <a href="/compress-jpg">Compress JPG</a>
            </div>
          </nav>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} PixelMint. All rights reserved.</span>
            <span className="footer-privacy">
              Processing happens locally in your browser. Your images are never uploaded.
            </span>
          </div>
        </div>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'PixelMint',
            url: 'https://pixelmint.tools',
            description:
              'A fast, professional online tool for compressing, resizing, and converting images in your browser. Make Every Pixel Count.',
            applicationCategory: 'MultimediaApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
          }),
        }}
      />
    </main>
  );
}

/* ─── Inline SVG components ────────────────────────────────── */

function LogoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1.5"/>
      <rect x="13" y="3" width="8" height="8" rx="1.5"/>
      <rect x="3" y="13" width="8" height="8" rx="1.5"/>
      <rect x="13" y="13" width="8" height="8" rx="1.5"/>
    </svg>
  );
}

function CompressIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  );
}

function ResizeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="15 3 21 3 21 9"/>
      <polyline points="9 21 3 21 3 15"/>
      <line x1="21" y1="3" x2="14" y2="10"/>
      <line x1="3" y1="21" x2="10" y2="14"/>
    </svg>
  );
}

function ConvertIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="17 1 21 5 17 9"/>
      <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
      <polyline points="7 23 3 19 7 15"/>
      <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
    </svg>
  );
}

function HeroMockup() {
  return (
    <div className="mockup-wrap">
      <div className="mockup-card">
        <div className="mockup-header">
          <div className="mockup-tabs">
            <span className="mockup-tab active">Compress</span>
            <span className="mockup-tab">Resize</span>
            <span className="mockup-tab">Convert</span>
          </div>
        </div>
        <div className="mockup-body">
          <div className="mockup-preview">
            <div className="mockup-img" aria-hidden="true" />
            <div className="mockup-img-label">landscape.jpg</div>
          </div>
          <div className="mockup-controls">
            <div className="mockup-label">Target size</div>
            <div className="mockup-input-row">
              <div className="mockup-input">50</div>
              <div className="mockup-select">KB ▾</div>
            </div>
            <div className="mockup-label" style={{ marginTop: 10 }}>Quality</div>
            <div className="mockup-slider">
              <div className="mockup-track">
                <div className="mockup-fill" />
              </div>
            </div>
            <div className="mockup-btn">Compress Image</div>
          </div>
        </div>
      </div>
      <div className="mockup-badge">Works great on mobile too!</div>
    </div>
  );
}
