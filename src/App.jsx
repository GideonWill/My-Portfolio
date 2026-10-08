import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import { MotionConfig, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import ScrollToTop from "./components/ScrollToTop";
import MotionEffects from "./components/MotionEffects";
import { loadRoute } from "./routeLoaders";

const Home = lazy(() => loadRoute("/"));
const About = lazy(() => loadRoute("/about"));
const Projects = lazy(() => loadRoute("/projects"));
const Resume = lazy(() => loadRoute("/resume"));
const Contact = lazy(() => loadRoute("/contact"));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.12, ease: "easeOut" }}
    >
      <Suspense fallback={<div className="route-loading" aria-label="Loading page" />}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </motion.div>
  );
};

// Custom hook to handle orientation changes
const useOrientationChange = () => {
  const [orientation, setOrientation] = useState({
    type: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height;
      
      setOrientation({
        type: isLandscape ? 'landscape' : 'portrait',
        width,
        height
      });
    };

    // Use more efficient event listeners with passive option
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    // Initial call
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  return orientation;
};

function App() {
  const orientation = useOrientationChange();
  
  // Add class to body based on orientation
  useEffect(() => {
    document.body.classList.remove('landscape', 'portrait');
    document.body.classList.add(orientation.type);
    
    // Fix iOS Safari viewport height issues with debouncing
    const setVhProperty = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // Initial set
    setVhProperty();
    
    // Debounced resize handler
    let resizeTimeout;
    const handleResizeWithDebounce = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setVhProperty, 100);
    };
    
    window.addEventListener('resize', handleResizeWithDebounce, { passive: true });
    
    return () => {
      window.removeEventListener('resize', handleResizeWithDebounce);
      clearTimeout(resizeTimeout);
    };
  }, [orientation.type]);

  return (
    <Router>
      <MotionConfig reducedMotion="user">
        <div className={`bg-gray-50 dark:bg-gray-900 mobile-scroll mobile-text-rendering ${orientation.type}`}>
          <MotionEffects />
          <Navbar />
          <main>
            <AnimatedRoutes />
          </main>
          <Footer />
          <Chatbot />
          <ScrollToTop />
        </div>
      </MotionConfig>
    </Router>
  );
}

export default App;
