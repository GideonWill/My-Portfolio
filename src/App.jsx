import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Resume from "./pages/Resume";
import Footer from "./components/Footer";

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
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 mobile-scroll mobile-text-rendering ${orientation.type}`}>
        <Navbar />
        <main className="mobile-no-zoom">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
