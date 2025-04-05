import { useState, useEffect } from "react";
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg"
          : hasDarkHeroSection
          ? "bg-black/30 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <NavLink
              to="/"
              className="flex items-center hover:opacity-80 transition-opacity py-2"
            >
              <img
                src="/GWO.png"
                alt="GWO Logo"
                className="h-16 w-auto md:h-20 lg:h-24"
              />
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3 py-2 font-medium ${
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
                className={`ml-4 px-6 py-2.5 font-semibold text-sm leading-tight tracking-wide uppercase transition-all duration-300 inline-flex items-center justify-center ${
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
          <div className="md:hidden flex items-center space-x-3">
            {/* Mobile Let's Talk Button */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className={`px-4 py-1.5 text-sm font-semibold uppercase leading-tight tracking-wide transition-all inline-flex items-center justify-center ${
                  isContactPage && !isScrolled
                    ? "bg-blue-500 text-white hover:bg-blue-400"
                    : hasDarkHeroSection && !isScrolled
                    ? "bg-blue-600 text-white hover:bg-blue-500"
                    : "bg-blue-600 text-white hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500"
                }`}
                style={{ borderRadius: "0px" }}
              >
                Let's Talk
              </Link>
            </motion.div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded transition-colors ${
                hasDarkHeroSection && !isScrolled
                  ? "bg-gray-800/40 text-white hover:bg-gray-800/60"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              }`}
              aria-label="Toggle navigation menu"
            >
              <svg
                className="h-6 w-6"
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
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            {/* Contact in mobile menu */}
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Contact
            </NavLink>
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md"
            >
              <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
              <span>{darkMode ? "🌞" : "🌙"}</span>
            </button>
            {/* Mobile Let's Talk big button */}
            <Link
              to="/contact"
              className="block mt-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold uppercase text-center py-3 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Let's Talk
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
