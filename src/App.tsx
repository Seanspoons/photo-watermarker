import { useEffect, useMemo, useState } from 'react';
import { CollageMaker } from './components/collage/CollageMaker';
import { WatermarkTool } from './components/watermark/WatermarkTool';

type AppRoute = '/' | '/watermarker' | '/collage' | '/resize' | '/compress' | '/border';

interface ToolCard {
  path: AppRoute;
  name: string;
  description: string;
  blurb: string;
  status: 'live' | 'soon';
  icon: 'watermarker' | 'collage' | 'resize' | 'compress' | 'border';
}

const TOOL_CARDS: ToolCard[] = [
  {
    path: '/watermarker',
    name: 'Photo Watermarker',
    description: 'Add a text or logo watermark to a photo.',
    blurb: 'Great for artists, creators, and proof images.',
    status: 'live',
    icon: 'watermarker'
  },
  {
    path: '/collage',
    name: 'Collage Maker',
    description: 'Combine multiple photos into one image.',
    blurb: 'Arrange, resize, and save a clean collage.',
    status: 'live',
    icon: 'collage'
  },
  {
    path: '/resize',
    name: 'Photo Resizer',
    description: 'Resize photos for sharing and social posts.',
    blurb: 'Useful for Instagram, websites, and email.',
    status: 'soon',
    icon: 'resize'
  },
  {
    path: '/compress',
    name: 'Image Compressor',
    description: 'Make image files smaller without extra hassle.',
    blurb: 'Helpful when photos are too large to send or upload.',
    status: 'soon',
    icon: 'compress'
  },
  {
    path: '/border',
    name: 'Border Maker',
    description: 'Add padding or a simple border around a photo.',
    blurb: 'Useful for product shots and social posts.',
    status: 'soon',
    icon: 'border'
  }
];

function normalizeRoute(pathname: string): AppRoute {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  if (cleanPath === '/watermarker' || cleanPath === '/collage') {
    return cleanPath;
  }

  if (cleanPath === '/resize' || cleanPath === '/compress' || cleanPath === '/border') {
    return cleanPath;
  }

  return '/';
}

function resolveRouteFromLocation(locationLike: Pick<Location, 'pathname' | 'search'>): AppRoute {
  const redirectedPath = new URLSearchParams(locationLike.search).get('p');
  return normalizeRoute(redirectedPath || locationLike.pathname);
}

function navigateTo(path: AppRoute) {
  if (window.location.pathname === path) {
    return;
  }

  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

function ToolIcon({ kind }: { kind: ToolCard['icon'] }) {
  return (
    <span className={`suite-tool-icon suite-tool-icon-${kind}`} aria-hidden="true">
      <svg viewBox="0 0 72 72" className="suite-tool-icon-svg" focusable="false">
        {kind === 'watermarker' ? (
          <>
            <rect x="14" y="14" width="44" height="44" rx="14" className="icon-surface" />
            <rect x="30" y="39" width="20" height="9" rx="4.5" className="icon-accent-fill" />
            <path d="M24 34l7-15 7 15" className="icon-accent-stroke" />
            <path d="M27 28h8" className="icon-accent-stroke" />
          </>
        ) : null}
        {kind === 'collage' ? (
          <>
            <rect x="13" y="13" width="20" height="20" rx="8" className="icon-surface" />
            <rect x="39" y="13" width="20" height="20" rx="8" className="icon-surface" />
            <rect x="13" y="39" width="20" height="20" rx="8" className="icon-surface" />
            <rect x="39" y="39" width="20" height="20" rx="8" className="icon-accent-soft-fill" />
            <path d="M46 49l4-5 4 5 3-3" className="icon-accent-stroke" />
          </>
        ) : null}
        {kind === 'resize' ? (
          <>
            <rect x="18" y="18" width="36" height="36" rx="12" className="icon-surface" />
            <path d="M28 28h-7v7" className="icon-accent-stroke" />
            <path d="M44 44h7v-7" className="icon-accent-stroke" />
            <path d="M21 35V21h14" className="icon-accent-stroke" />
            <path d="M51 37v14H37" className="icon-accent-stroke" />
          </>
        ) : null}
        {kind === 'compress' ? (
          <>
            <rect x="18" y="18" width="36" height="36" rx="12" className="icon-surface" />
            <path d="M28 24v24" className="icon-accent-stroke" />
            <path d="M44 24v24" className="icon-accent-stroke" />
            <path d="M24 28l4-4 4 4" className="icon-accent-stroke" />
            <path d="M40 44l4 4 4-4" className="icon-accent-stroke" />
          </>
        ) : null}
        {kind === 'border' ? (
          <>
            <rect x="12" y="12" width="48" height="48" rx="16" className="icon-accent-soft-fill" />
            <rect x="20" y="20" width="32" height="32" rx="10" className="icon-surface-strong" />
            <rect x="25" y="25" width="22" height="22" rx="7" className="icon-accent-outline" />
          </>
        ) : null}
      </svg>
    </span>
  );
}

function RouteIntro({
  route,
  onNavigate
}: {
  route: AppRoute;
  onNavigate: (path: AppRoute) => void;
}) {
  const logoUrl = `${import.meta.env.BASE_URL}icon.svg`;
  const isHome = route === '/';
  const activeLabel =
    route === '/watermarker'
      ? 'Photo Watermarker'
      : route === '/collage'
        ? 'Collage Maker'
        : 'Coming Soon';

  return (
    <section className="site-intro panel">
      <div className="site-intro-copy">
        <div className="brand-mark" aria-hidden="true">
          <img src={logoUrl} alt="" />
        </div>
        <div>
          <p className="eyebrow">Simple Photo Tools</p>
          <h1>{isHome ? 'Simple photo tools that stay on your device.' : activeLabel}</h1>
          <p className="hero-copy">
            {isHome
              ? 'Pick the tool you need, make your edits in the browser, and save the result without uploading anything to our server.'
              : 'Part of Simple Photo Tools: private photo tools that run right in your browser.'}
          </p>
        </div>
      </div>
      <div className="tool-switcher tool-switcher-suite" role="navigation" aria-label="Simple Photo Tools">
        <button
          type="button"
          className={`tool-switch-button ${route === '/' ? 'is-active' : ''}`}
          onClick={() => onNavigate('/')}
        >
          Home
        </button>
        <button
          type="button"
          className={`tool-switch-button ${route === '/watermarker' ? 'is-active' : ''}`}
          onClick={() => onNavigate('/watermarker')}
        >
          Watermarker
        </button>
        <button
          type="button"
          className={`tool-switch-button ${route === '/collage' ? 'is-active' : ''}`}
          onClick={() => onNavigate('/collage')}
        >
          Collage Maker
        </button>
      </div>
    </section>
  );
}

function HomePage({ onNavigate }: { onNavigate: (path: AppRoute) => void }) {
  return (
    <section className="suite-grid">
      {TOOL_CARDS.map((tool) => (
        <article key={tool.path} className="panel suite-card">
          <div className="suite-card-header">
            <div className="suite-card-title">
              <ToolIcon kind={tool.icon} />
              <h2>{tool.name}</h2>
            </div>
            {tool.status === 'soon' ? <span className="suite-status-note">Coming soon</span> : null}
          </div>
          <p className="suite-card-copy">{tool.description}</p>
          <p className="suite-card-blurb">{tool.blurb}</p>
          <button
            type="button"
            className={tool.status === 'live' ? 'primary-button' : 'secondary-button'}
            onClick={() => onNavigate(tool.path)}
          >
            {tool.status === 'live' ? 'Open tool' : 'Coming soon'}
          </button>
        </article>
      ))}
    </section>
  );
}

function ComingSoonPage({
  toolName,
  onNavigate
}: {
  toolName: string;
  onNavigate: (path: AppRoute) => void;
}) {
  return (
    <section className="panel coming-soon-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Coming Soon</p>
          <h2>{toolName}</h2>
        </div>
      </div>
      <p className="hero-copy">
        This tool is planned for Simple Photo Tools, but it is not ready yet.
      </p>
      <div className="coming-soon-actions">
        <button type="button" className="primary-button" onClick={() => onNavigate('/watermarker')}>
          Open Watermarker
        </button>
        <button type="button" className="secondary-button" onClick={() => onNavigate('/collage')}>
          Open Collage Maker
        </button>
      </div>
    </section>
  );
}

export default function App() {
  const logoUrl = `${import.meta.env.BASE_URL}icon.svg`;
  const [route, setRoute] = useState<AppRoute>(() => resolveRouteFromLocation(window.location));

  useEffect(() => {
    const redirectedPath = new URLSearchParams(window.location.search).get('p');
    if (redirectedPath) {
      const normalizedPath = normalizeRoute(redirectedPath);
      window.history.replaceState({}, '', normalizedPath);
      setRoute(normalizedPath);
    }

    const handleLocationChange = () => {
      setRoute(resolveRouteFromLocation(window.location));
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const routeContent = useMemo(() => {
    switch (route) {
      case '/watermarker':
        return <WatermarkTool />;
      case '/collage':
        return <CollageMaker />;
      case '/resize':
        return <ComingSoonPage toolName="Photo Resizer" onNavigate={navigateTo} />;
      case '/compress':
        return <ComingSoonPage toolName="Image Compressor" onNavigate={navigateTo} />;
      case '/border':
        return <ComingSoonPage toolName="Border Maker" onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  }, [route]);

  return (
    <div className="app-shell">
      <main className="app">
        <RouteIntro route={route} onNavigate={navigateTo} />
        {routeContent}
      </main>

      <footer className="site-footer">
        <div className="site-footer-card">
          <div className="site-footer-brand">
            <img src={logoUrl} alt="" aria-hidden="true" />
            <div>
              <p className="site-footer-title">Simple Photo Tools</p>
              <p className="site-footer-copy">
                Free photo tools that run in your browser, with no accounts and no uploads to our
                server.
              </p>
            </div>
          </div>
          <p className="site-footer-meta">
            © 2026 Simple Photo Tools. Watermarks, collages, and future tools stay on your device.
          </p>
        </div>
      </footer>
    </div>
  );
}
