import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageTransition from '@/components/PageTransition';

// Page imports
import Home from './pages/Home';
import About from './pages/About';
import WhoWeHelp from './pages/WhoWeHelp';
import FAQ from './pages/FAQ';
import Swag from './pages/Swag';
import Subscribe from './pages/Subscribe';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <PageTransition>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/who-we-help" element={<WhoWeHelp />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/swag" element={<Swag />} />
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
