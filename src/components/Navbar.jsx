import { useState, useEffect, useRef } from "react";
import { NavLink, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return savedMode === "true";
    }
    // If no saved preference, check system preference
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";
  const isProjectsPage = location.pathname === "/projects";
  const isContactPage = location.pathname === "/contact";
  const isResumePage = location.pathname === "/resume";
  const hasDarkHeroSection =
    isAboutPage || isProjectsPage || isContactPage || isResumePage;
  
  // Mobile menu swipe gesture
  const [startX, setStartX] = useState(0);
  const mobileMenuRef = useRef(null);

  // Initialize dark mode on first load
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle resize for dynamic layout adjustments with debounce
  useEffect(() => {
    let resizeTimeout;
    
    const handleResize = () => {
      // Close mobile menu if screen width becomes larger than mobile breakpoint
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    
    const debouncedHandleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', debouncedHandleResize, { passive: true });
    
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      clearTimeout(resizeTimeout);
    };
  }, [isOpen]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  
  // Handle mobile menu swipe with improved detection
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    const screenWidth = window.innerWidth;
    
    // Use percentage of screen width for better cross-device compatibility
    // If swiped left with enough distance (more than 15% of screen width)
    if (diffX > screenWidth * 0.15) {
      setIsOpen(false);
    }
  };

  const handleTouchMove = (e) => {
    // Prevent page scrolling when swiping the menu
    if (isOpen) {
      e.preventDefault();
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
    { name: "Resume", path: "/resume" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-safe pl-safe pr-safe mobile-nav ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg"
          : hasDarkHeroSection
          ? "bg-black/30 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex items-center hover:opacity-80 transition-opacity py-2"
            >
              <img
                src="/GWO.png"
                alt="GWO Logo"
                className="h-10 w-auto md:h-16 lg:h-20"
              />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-2 lg:px-3 py-2 text-fluid-base font-medium ${
                    hasDarkHeroSection && !isScrolled
                      ? "text-white hover:text-blue-300 dark:text-white dark:hover:text-blue-300 text-shadow"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  } transition-colors ${
                    isActive
                      ? hasDarkHeroSection && !isScrolled
                        ? "text-blue-300 dark:text-blue-300"
                        : "text-blue-600 dark:text-blue-400"
                      : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="underline"
                        className={`absolute left-0 right-0 bottom-0 h-0.5 ${
                          hasDarkHeroSection && !isScrolled
                            ? "bg-blue-300 dark:bg-blue-300"
                            : "bg-blue-600 dark:bg-blue-400"
                        }`}
                        initial={false}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}

            {/* Let's Talk Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/contact"
                className={`ml-2 lg:ml-4 px-4 lg:px-6 py-2 lg:py-2.5 font-semibold text-sm leading-tight tracking-wide uppercase transition-all duration-300 inline-flex items-center justify-center ${
                  isContactPage && !isScrolled
                    ? "bg-blue-500 text-white shadow-lg hover:bg-blue-400"
                    : hasDarkHeroSection && !isScrolled
                    ? "bg-blue-600 text-white hover:bg-blue-500 shadow-md hover:shadow-lg"
                    : "bg-blue-600 text-white hover:bg-blue-500 shadow-md hover:shadow-lg dark:bg-blue-600 dark:hover:bg-blue-500"
                }`}
                style={{ borderRadius: "0px" }}
              >
                Let's Talk
              </Link>
            </motion.div>

            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                hasDarkHeroSection && !isScrolled
                  ? "bg-gray-800/40 text-white hover:bg-gray-800/60"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              aria-label={
                darkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {darkMode ? "🌞" : "🌙"}
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Let's Talk Button */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className={`px-3 py-2 text-xs font-semibold uppercase leading-tight tracking-wide transition-all inline-flex items-center justify-center touch-target ${
                  isContactPage && !isScrolled
                    ? "bg-blue-500 text-white hover:bg-blue-400"
                    : hasDarkHeroSection && !isScrolled
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-blue-600 text-white hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500"
                }`}
                style={{ borderRadius: "0px", minHeight: "44px" }}
              >
                Let's Talk
              </Link>
            </motion.div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-3 rounded transition-colors touch-target ${
                hasDarkHeroSection && !isScrolled
                  ? "bg-gray-800/40 text-white hover:bg-gray-800/60"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
              aria-label="Toggle navigation menu"
              style={{ minHeight: "44px", minWidth: "44px" }}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg"
          ref={mobileMenuRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
        >
          {/* Mobile swipe instruction */}
          <div className="text-center py-3 text-xs text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
            <p>Swipe left to close menu</p>
          </div>
          
          <div className="px-4 pt-4 pb-6 space-y-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg text-base font-medium transition-colors touch-target ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`
                }
                onClick={() => setIsOpen(false)}
                style={{ minHeight: "48px" }}
              >
                {link.name}
              </NavLink>
            ))}
            {/* Contact in mobile menu */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg text-base font-medium transition-colors touch-target ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
              style={{ minHeight: "48px" }}
            >
              Contact
            </NavLink>
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg touch-target"
              style={{ minHeight: "48px" }}
            >
              <span>Toggle {darkMode ? "Light" : "Dark"} Mode</span>
              <span className="text-lg">{darkMode ? "🌞" : "🌙"}</span>
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
