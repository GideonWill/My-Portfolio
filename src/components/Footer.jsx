import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";

const Footer = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      setIsScrolled(scrollPosition >= pageHeight - 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className={`relative transition-all duration-300 ${
        isScrolled ? "bg-blue-600" : "bg-white dark:bg-gray-800"
      }`}
    >
      {/* Wave Separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform -translate-y-[99%]">
        <svg
          className="relative block w-[calc(100%+1.3px)] h-[50px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className={`transition-all duration-300 ${
              isScrolled ? "fill-blue-600" : "fill-white dark:fill-gray-800"
            }`}
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3
              className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isScrolled ? "text-white" : "text-gray-900 dark:text-white"
              }`}
            >
              About Me
            </h3>
            <p
              className={`mb-4 transition-colors duration-300 ${
                isScrolled
                  ? "text-white/90"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              I'm a passionate UI/UX designer and developer dedicated to
              creating beautiful and functional digital experiences.
            </p>
          </motion.div>

          {/* Contact Information Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3
              className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isScrolled ? "text-white" : "text-gray-900 dark:text-white"
              }`}
            >
              Contact Information
            </h3>
            <div className="space-y-3">
              {/* Phone */}
              <div className="flex items-center">
                <FaPhone
                  className={`mr-3 ${
                    isScrolled
                      ? "text-white/90"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                />
                <p
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? "text-white/90"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  +233 592678531
                </p>
              </div>

              {/* WhatsApp */}
              <div className="flex items-center">
                <FaWhatsapp
                  className={`mr-3 ${
                    isScrolled
                      ? "text-white/90"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                />
                <a
                  href="https://wa.me/233277811521"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? "text-white/90 hover:text-white"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  +233 277811521
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <FaEnvelope
                  className={`mr-3 ${
                    isScrolled
                      ? "text-white/90"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                />
                <a
                  href="mailto:gideonogunu@gmail.com"
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? "text-white/90 hover:text-white"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  gideonogunu@gmail.com
                </a>
              </div>

              {/* Location */}
              <div className="flex items-center">
                <FaMapMarkerAlt
                  className={`mr-3 ${
                    isScrolled
                      ? "text-white/90"
                      : "text-blue-600 dark:text-blue-400"
                  }`}
                />
                <p
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? "text-white/90"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  Accra, Ghana
                </p>
              </div>

              {/* Social Media */}
              <div className="flex items-center pt-3 space-x-4">
                <motion.a
                  href="https://www.linkedin.com/in/gideon-ogunu-795b1224a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? "text-white/90 hover:text-white"
                      : "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaLinkedin size={22} />
                </motion.a>
                <motion.a
                  href="https://github.com/GideonWill"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? "text-white/90 hover:text-white"
                      : "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaGithub size={22} />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/golden.boy.124571"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? "text-white/90 hover:text-white"
                      : "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaFacebook size={22} />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/khlyve__/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors duration-300 ${
                    isScrolled
                      ? "text-white/90 hover:text-white"
                      : "text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaInstagram size={22} />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`pt-8 border-t transition-colors duration-300 ${
            isScrolled
              ? "border-white/20"
              : "border-gray-200 dark:border-gray-700"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1">
              <p
                className={`transition-colors duration-300 ${
                  isScrolled
                    ? "text-white/90"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                © {currentYear} Made with
              </p>
              <FaHeart className="text-red-500 mx-1" />
              <p
                className={`transition-colors duration-300 ${
                  isScrolled
                    ? "text-white/90"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                by Gideon William Ogunu
              </p>
            </div>

            <div className="flex space-x-6">
              <motion.a
                href="https://github.com/GideonWill"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  isScrolled
                    ? "text-white/90 hover:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/gideon-ogunu-795b1224a"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  isScrolled
                    ? "text-white/90 hover:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/khlyve__/"
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors duration-300 ${
                  isScrolled
                    ? "text-white/90 hover:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaInstagram size={24} />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
