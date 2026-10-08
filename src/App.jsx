import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import ScrollToTop from '@/components/ScrollToTop';
import IntroOverlay from '@/components/IntroOverlay';
import { SWAG_ENABLED, WHO_WE_HELP_ENABLED } from './content/features';

// Page imports
import Home from './pages/Home';

// Every page but the homepage is its own chunk, fetched the first time it is
// opened, so the homepage ships only the code it needs.
const About = lazy(() => import('./pages/About'));
const FAQ = lazy(() => import('./pages/FAQ'));
const Subscribe = lazy(() => import('./pages/Subscribe'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const NotFound = lazy(() => import('./pages/NotFound'));

// The Swag store is switched off in src/content/features.js. It is loaded
// lazily so that, while it is off, none of its code (or its Shopify links)
// is downloaded by visitors.
const Swag = SWAG_ENABLED ? lazy(() => import('./pages/Swag')) : null;
// Same for Who We Help, switched off in the same file.
const WhoWeHelp = WHO_WE_HELP_ENABLED ? lazy(() => import('./pages/WhoWeHelp')) : null;

function App() {
  return (
    <Router>
      {/* Resets scroll to the top on every forward navigation (and scrolls to
          #anchors such as /subscribe#notify). It existed since the original
          export but was never mounted, so a new page kept the previous
          page's scroll position. Back/forward keeps the browser's own
          scroll restoration. */}
      <ScrollToTop />
      {/* The homepage intro. It decides for itself whether to play (once per
          tab, homepage only, switch in src/content/features.js). */}
      <IntroOverlay />
      <PageTransition>
        <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {WhoWeHelp && (
            <Route path="/who-we-help" element={<Suspense fallback={null}><WhoWeHelp /></Suspense>} />
          )}
          <Route path="/faq" element={<FAQ />} />
          {Swag && (
            <Route path="/swag" element={<Suspense fallback={null}><Swag /></Suspense>} />
          )}
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </PageTransition>
    </Router>
  );
}

export default App
