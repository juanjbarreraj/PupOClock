import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';
import { SWAG_ENABLED } from './content/features';

// Page imports
import Home from './pages/Home';
import About from './pages/About';
import WhoWeHelp from './pages/WhoWeHelp';
import FAQ from './pages/FAQ';
import Subscribe from './pages/Subscribe';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

// The Swag store is switched off in src/content/features.js. It is loaded
// lazily so that, while it is off, none of its code (or its Shopify links)
// is downloaded by visitors.
const Swag = SWAG_ENABLED ? lazy(() => import('./pages/Swag')) : null;

function App() {
  return (
    <Router>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/who-we-help" element={<WhoWeHelp />} />
          <Route path="/faq" element={<FAQ />} />
          {Swag && (
            <Route path="/swag" element={<Suspense fallback={null}><Swag /></Suspense>} />
          )}
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </Router>
  );
}

export default App
