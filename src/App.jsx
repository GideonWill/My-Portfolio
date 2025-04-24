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
      
      // Force repaint on iOS Safari when orientation changes
      if ('visualViewport' in window) {
        window.visualViewport.addEventListener('resize', () => {
          document.body.style.display = 'none';
          setTimeout(() => {
            document.body.style.display = '';
          }, 10);
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if ('visualViewport' in window) {
        window.visualViewport.removeEventListener('resize', () => {});
      }
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
    
    // Fix iOS Safari viewport height issues
    const setVhProperty = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setVhProperty();
    window.addEventListener('resize', setVhProperty);
    
    return () => {
      window.removeEventListener('resize', setVhProperty);
    };
  }, [orientation.type]);

  return (
    <Router>
      <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${orientation.type}`}>
        <Navbar />
        <main>
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
