import ImageTool from '@/app/tool';

interface LandingPageProps {
  title: string;
  h1: string;
  intro: string;
  content: string[];
  relatedLinks: { href: string; label: string }[];
  toolNote?: string;
}

export default function LandingPageLayout({
  title,
  h1,
  intro,
  content,
  relatedLinks,
}: LandingPageProps) {
  return (
    <main>
      {/* Header */}
      <header className="topbar">
        <a className="brand" href="/" aria-label="PixelMint home">
          <span className="brand-mark" aria-hidden="true">
            <LogoIcon />
          </span>
          <span className="brand-name">PixelMint</span>
        </a>
        <nav aria-label="Site navigation">
          <a href="/#tool">Tools</a>
          <a href="/#guides">Guides</a>
          <a href="/#about">About</a>
        </nav>
        <a className="nav-cta" href="/#tool">
          Try it free
        </a>
      </header>

      {/* Hero */}
      <div className="lp-hero">
        <p style={{ fontSize: 12, color: 'var(--c-green)', fontWeight: 600, marginBottom: 8 }}>
          ← <a href="/" style={{ color: 'inherit' }}>Back to PixelMint</a>
        </p>
        <h1>{h1}</h1>
        <p>{intro}</p>
        <a className="nav-cta" href="#tool" style={{ display: 'inline-flex', marginBottom: 0 }}>
          Use the Tool →
        </a>
      </div>

      {/* Tool */}
      <section className="tool-section" id="tool" aria-label={title}>
        <ImageTool />
      </section>

      {/* Content */}
      <div className="lp-content">
        {content.map((para, i) => (
          <p key={i}>{para}</p>
        ))}

        <div className="lp-related">
          <h2>Related Tools</h2>
          <div className="lp-related-links">
            {relatedLinks.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-inner">
          <div>
            <a className="brand footer-brand" href="/" aria-label="PixelMint home">
              <span className="brand-mark" aria-hidden="true">
                <LogoIcon />
              </span>
              <span className="brand-name">PixelMint</span>
            </a>
            <p className="footer-tagline">Make Every Pixel Count.</p>
          </div>
          <div className="footer-bottom" style={{ gridColumn: '1/-1' }}>
            <span>© {new Date().getFullYear()} PixelMint</span>
            <span className="footer-privacy">
              All image processing happens locally in your browser.
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function LogoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </svg>
  );
}
