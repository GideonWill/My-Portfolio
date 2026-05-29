import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaArrowRight,
  FaQuoteLeft,
  FaEye,
  FaTimes,
  FaExpand,
} from "react-icons/fa";
import {
  RectangleGroupIcon,
  PhotoIcon,
  SparklesIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ServerIcon,
  HashtagIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// Simplified Background Pattern Component instead of animated particles
const LightPatternBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0 opacity-20 pointer-events-none">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
      <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-blue-400/20"></div>
      <div className="absolute bottom-10 left-10 w-60 h-60 rounded-full bg-purple-400/20"></div>
    </div>
  );
};

const Home = () => {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["UI/UX Designer", "Frontend Developer"];
  const period = 2000;
  const [selectedFlyer, setSelectedFlyer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Parallax effect refs
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  // Testimonial slider
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const testimonialRef = useRef(null);
  const testimonials = [
    {
      name: "Kojo Annan",
      role: "Tech Entrepreneur",
      text: "Gideon delivered exceptional results for our UI redesign project. His attention to detail and creativity exceeded our expectations.",
    },
    {
      name: "Akosua Mensah",
      role: "Startup Founder",
      text: "Working with Gideon was a pleasure. He understood our vision and transformed it into a beautiful and functional design.",
    },
    {
      name: "Yaw Osei-Owusu",
      role: "Marketing Director",
      text: "Gideon's work on our web application significantly improved user engagement and conversion rates.",
    },
  ];

  useEffect(() => {
    let testimonialInterval;
    
    // Only auto-rotate testimonials if not actively swiping
    if (!isSwiping) {
      testimonialInterval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    
    return () => {
      if (testimonialInterval) clearInterval(testimonialInterval);
    };
  }, [testimonials.length, isSwiping]);

  // Handle touch swipe for testimonials with improved detection
  const handleTestimonialTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setIsSwiping(true);
    
    // Pause auto-rotation when user starts interacting
    const testimonialElement = testimonialRef.current;
    if (testimonialElement) {
      testimonialElement.style.transition = 'none';
    }
  };
  
  const handleTestimonialTouchMove = (e) => {
    if (!testimonialRef.current || !isSwiping) return;
    
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = startX - currentX;
    const diffY = startY - currentY;
    
    // Only prevent default if it's clearly a horizontal swipe (more horizontal than vertical movement)
    // This allows vertical scrolling to work normally
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 20) {
      e.preventDefault();
    }
  };

  const handleTestimonialTouchEnd = (e) => {
    setIsSwiping(false);
    
    // Restore transition
    const testimonialElement = testimonialRef.current;
    if (testimonialElement) {
      testimonialElement.style.transition = 'transform 0.3s ease';
    }
    
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    const screenWidth = window.innerWidth;
    
    // Use percentage of screen width for better cross-device compatibility
    // Swipe needs to be at least 10% of screen width to trigger change
    if (Math.abs(diffX) > screenWidth * 0.1) {
      if (diffX > 0) {
        // Swipe left - go to next testimonial
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      } else {
        // Swipe right - go to previous testimonial
        setCurrentTestimonial((prev) => 
          prev === 0 ? testimonials.length - 1 : prev - 1
        );
      }
    }
  };

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const skills = [
    { name: "UI/UX Design", icon: RectangleGroupIcon },
    { name: "Graphic Design", icon: PhotoIcon },
    { name: "Logo Design", icon: SparklesIcon },
    { name: "React", icon: CodeBracketIcon },
    { name: "JavaScript", icon: DocumentTextIcon },
    { name: "PHP", icon: ServerIcon },
    { name: "C#", icon: HashtagIcon },
    { name: "Node.js", icon: BoltIcon },
  ];

  // Featured flyer designs
  const featuredFlyers = [
    {
      id: 1,
      title: "Luminous Sanitation Company",
      description: "Professional cleaning services flyer with modern design",
      thumbnail: "/images/Luminous Sanitation Services.jpg",
      fullImage: "/images/Luminous Sanitation Services.jpg",
      category: "Corporate Flyer",
      client: "Luminous Sanitation Company Ltd",
      services: ["Post construction cleaning", "Commercial & office cleaning", "Residential cleaning", "Carpet cleaning"],
      colors: ["#1e40af", "#3b82f6", "#ffffff"]
    },
    {
      id: 2,
      title: "LUXE.NYC Shopper",
      description: "Personal shopping service flyer with luxury aesthetic",
      thumbnail: "/images/Luxe NYC Fashion Flyer.jpg",
      fullImage: "/images/Luxe NYC Fashion Flyer.jpg",
      category: "Service Flyer",
      client: "LUXE.NYC",
      services: ["Personal shopping", "Designer brands", "Fashion accessories", "24/7 service"],
      colors: ["#1e40af", "#f97316", "#ffffff"]
    },
    {
      id: 3,
      title: "GoldBites Cakes",
      description: "Fresh juice, cakes & pastries promotional flyer",
      thumbnail: "/images/Goldbites Cakes Flyer.jpg",
      fullImage: "/images/Goldbites Cakes Flyer.jpg",
      category: "Food Flyer",
      client: "GoldBites Cakes",
      services: ["Wedding cakes", "Birthday cakes", "Cupcakes", "Doughnuts", "Pastries", "Fresh juice"],
      colors: ["#92400e", "#fbbf24", "#ffffff"]
    },
    {
      id: 4,
      title: "Hair Haven by Jaity",
      description: "Hair services and wig collection flyer",
      thumbnail: "/images/Hair Haven Salon Flyer.jpg",
      fullImage: "/images/Hair Haven Salon Flyer.jpg",
      category: "Beauty Flyer",
      client: "Hair Haven by Jaity",
      services: ["Wig services", "Hair extensions", "Deep wave", "Body wave", "Frontal & Closures"],
      colors: ["#ec4899", "#8b5cf6", "#ffffff"]
    }
  ];

  // Featured projects
  const featuredProjects = [
    {
      title: "Jopee Travel & Tours",
      description: "Transportation booking system with intuitive UI.",
      image: "/images/jopee.jpg",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Demargo Interior Contractors",
      description: "Interior decor company website with elegant visuals and clear service presentation.",
      image: "/images/demargo.jpg",
      color: "from-amber-500 to-orange-500",
    },
    {
      title: "AMB360 Cleaning Agency",
      description: "Cleaning service website with modern layout and service highlights.",
      image: "/images/amb360.jpg",
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "RAKO FOODS",
      description: "Food delivery and restaurant management platform with intuitive ordering flow.",
      image: "/images/rako.jpg",
      color: "from-orange-500 to-red-500",
    },
  ];

  // Modal viewer functions
  const openModal = (flyer) => {
    setSelectedFlyer(flyer);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedFlyer(null);
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };


  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center min-h-screen pt-safe pb-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 mobile-container"
      >
        {/* Static pattern background instead of particles */}
        <LightPatternBackground />

        {/* Simplified Parallax Layer */}
        <motion.div
          style={{ y: y1, opacity }}
          className="absolute top-0 left-0 w-full h-full z-0"
        >
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-400 dark:bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-10 right-20 w-80 h-80 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        </motion.div>

        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mt-16 sm:mt-20 md:mt-24"
          >
            <div className="w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 mx-auto mb-4 sm:mb-6 md:mb-8 lg:mb-12 relative mobile-image">
              <div className="w-full h-full relative group">
                <img
                  src="/profile.jpg"
                  alt="Gideon William Ogunu"
                  className="w-full h-full rounded-full object-cover border-3 sm:border-4 border-blue-600 dark:border-blue-400 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{
                    objectPosition: "center 20%",
                  }}
                />
                <div className="absolute inset-0 rounded-full shadow-inner"></div>
              </div>

              {/* Simple pulsing border */}
              <div className="absolute inset-0 border-3 sm:border-4 border-blue-400 rounded-full opacity-0 animate-pulse group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 md:mb-6 px-2 leading-tight mobile-text-rendering"
          >
            Hi, I'm Gideon William Ogunu
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 md:mb-8 lg:mb-12 h-6 xs:h-7 sm:h-8 md:h-10 lg:h-12 mobile-text-rendering"
          >
            <span className="text-blue-600 dark:text-blue-400">{text}</span>
            <span className="animate-blink">|</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-4 sm:space-x-6 md:space-x-8 mb-4 sm:mb-6 md:mb-8 lg:mb-16"
          >
            <a
              href="https://github.com/GideonWill"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-110 transition-all duration-300 touch-target p-2"
              style={{ minHeight: "44px", minWidth: "44px" }}
            >
              <FaGithub size={20} className="sm:text-2xl md:text-3xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/gideon-ogunu-795b1224a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-110 transition-all duration-300 touch-target p-2"
              style={{ minHeight: "44px", minWidth: "44px" }}
            >
              <FaLinkedin size={20} className="sm:text-2xl md:text-3xl" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 text-sm sm:text-base touch-target mobile-focus"
              style={{ minHeight: "44px" }}
            >
              View My Work
              <FaArrowRight className="ml-2" size={16} />
            </Link>
          </motion.div>
        </div>

        {/* Simple static scroll indicator */}
        <div
          className="absolute bottom-8 md:bottom-10 left-1/2 transform -translate-x-1/2 opacity-60 hover:opacity-90 transition-opacity duration-300 cursor-pointer"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <div className="flex flex-col items-center">
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
              Scroll
            </span>
            <FaArrowRight className="text-gray-500 dark:text-gray-400 transform rotate-90" />
          </div>
        </div>
      </section>

      {/* Writing Animation Section */}
      <AnimatedWritingSection />

      {/* Featured Projects Showcase */}
      <section className="py-8 sm:py-12 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 mobile-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-spacing">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
              Featured{" "}
              <span className="text-blue-600 dark:text-blue-400">Projects</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
              Take a look at some of my recent work that showcases my skills and
              expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 group relative mobile-card"
              >
                <div className="image-wrapper aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-500 mobile-image"
                  />
                  {/* Bottom title gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 transition-all duration-300" style={{ height: "40%", bottom: 0, top: "auto" }}></div>
                </div>
                
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 z-20">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 text-shadow">
                    {project.title}
                  </h3>
                  <Link
                    to="/projects"
                    className="text-white font-medium inline-flex items-center bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-full transition-colors duration-300 shadow-md w-fit text-xs sm:text-sm"
                  >
                    <span>View Project</span>
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.3 }}
                      className="ml-2"
                    >
                      <FaArrowRight size={12} />
                    </motion.span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center px-4 sm:px-5 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300 text-sm sm:text-base"
            >
              View All Projects
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Graphic Design Showcase */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
              Creative{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Design Works
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
              Explore my graphic design portfolio featuring logos, flyers, banners, and more creative solutions
            </p>
          </motion.div>


          {/* Featured Design Works Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Featured Design Works
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {[
                {
                  title: "Event Banner",
                  image: "/images/Rossy Graduation Flyer.jpg",
                  type: "Banner Design"
                },
                {
                  title: "Business Letterhead",
                  image: "/images/Letterhead Luminous.jpg",
                  type: "Corporate Design"
                },
                {
                  title: "Marketing Collateral",
                  image: "/images/Luminuos Complementary Card.jpg",
                  type: "Print Design"
                },
                {
                  title: "Logo Design",
                  image: "/images/Novera.jpg",
                  type: "Logo Design"
                }
              ].map((work, index) => (
                <motion.div
                  key={work.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  className="group relative overflow-hidden rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Hover content */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h4 className="text-white font-bold text-sm mb-1">
                        {work.title}
                      </h4>
                      <p className="text-gray-200 text-xs">
                        {work.type}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <div className="text-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link
                to="/projects"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="relative z-10">View All Design Works</span>
                <motion.div
                  className="ml-3 relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FaArrowRight />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Flyer Gallery */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
              Featured{" "}
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Flyer Designs
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
              Hover over the designs to view crystal clear details of my professional flyer work
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {featuredFlyers.map((flyer, index) => (
              <motion.div
                key={flyer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-white dark:bg-gray-800">
                  <img
                    src={flyer.thumbnail}
                    alt={flyer.title}
                    className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.src = '/images/front book cover.jpg';
                      e.target.alt = 'Flyer design placeholder';
                    }}
                  />
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
                    <div className="text-white">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-shadow">
                        {flyer.title}
                      </h3>
                      <p className="text-sm text-gray-200 mb-3">
                        {flyer.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        <span className="px-2 py-1 bg-pink-500 text-white text-xs font-medium rounded-full">
                          {flyer.category}
                        </span>
                      </div>
                      <button
                        onClick={() => openModal(flyer)}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                      >
                        <FaEye className="mr-2" size={14} />
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Color palette indicator */}
                  <div className="absolute top-4 right-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {flyer.colors.map((color, colorIndex) => (
                      <div
                        key={colorIndex}
                        className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Card content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {flyer.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {flyer.client}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {flyer.category}
                    </span>
                    <button
                      onClick={() => openModal(flyer)}
                      className="text-pink-500 hover:text-pink-600 transition-colors duration-200"
                    >
                      <FaExpand size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <span className="relative z-10">View All Flyer Designs</span>
                <motion.div
                  className="ml-3 relative z-10"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <FaArrowRight />
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Preview Section */}
      <section className="py-8 sm:py-10 md:py-16 bg-gray-50 dark:bg-gray-800 mobile-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-spacing">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
              What I Do
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
              I create beautiful and functional digital experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  },
                }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-700 p-3 sm:p-4 md:p-6 rounded-lg shadow-md text-center flex flex-col items-center justify-center touch-target"
                style={{ minHeight: "80px" }}
              >
                <div className="mb-2 md:mb-4">
                  <skill.icon className="w-10 h-10 mx-auto text-indigo-500" aria-hidden="true" />
                </div>
                <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-800 dark:text-gray-100 leading-tight">
                  {skill.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-8 sm:py-12 md:py-20 bg-white dark:bg-gray-900 mobile-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-spacing">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 md:mb-4">
              What People Say
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
              Feedback from clients and collaborators
            </p>
          </motion.div>

          <div 
            className="relative h-64 sm:h-72 md:h-80 max-w-4xl mx-auto no-select optimize-mobile"
            ref={testimonialRef}
            onTouchStart={handleTestimonialTouchStart}
            onTouchMove={handleTestimonialTouchMove}
            onTouchEnd={handleTestimonialTouchEnd}
          >
            {/* Mobile swipe instruction - only shown on small screens */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="md:hidden text-center mb-4 text-xs text-gray-500 dark:text-gray-400 absolute -top-8 left-0 right-0"
            >
              <p>Swipe to see more testimonials</p>
            </motion.div>
            
            <AnimatePresence mode="wait">
              {testimonials.map(
                (testimonial, index) =>
                  index === currentTestimonial && (
                    <motion.div
                      key={testimonial.name}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl optimize-mobile"
                    >
                      <FaQuoteLeft className="text-gray-300 dark:text-gray-600 text-2xl md:text-4xl mb-4 md:mb-6" />
                      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg italic mb-4 md:mb-8">
                        "{testimonial.text}"
                      </p>
                      <div>
                        <h4 className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>

            {/* Slider indicators */}
            <div className="absolute -bottom-8 md:-bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 touch-target ${
                    index === currentTestimonial
                      ? "bg-blue-600 w-4 md:w-6"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Floating Action Button removed per request */}

      {/* Modal Viewer */}
      <AnimatePresence>
        {isModalOpen && selectedFlyer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[90vh] w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedFlyer.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {selectedFlyer.client} • {selectedFlyer.category}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex flex-col lg:flex-row max-h-[calc(90vh-80px)]">
                {/* Image Section */}
                <div className="flex-1 p-4 sm:p-6">
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={selectedFlyer.fullImage}
                      alt={selectedFlyer.title}
                      className="w-full h-auto max-h-[60vh] object-contain bg-gray-100 dark:bg-gray-700"
                      onError={(e) => {
                        e.target.src = '/images/front book cover.jpg';
                        e.target.alt = 'Flyer design placeholder';
                      }}
                    />
                  </div>
                </div>

                {/* Details Section */}
                <div className="w-full lg:w-80 p-4 sm:p-6 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Description
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {selectedFlyer.description}
                      </p>
                    </div>

                    {/* Services */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Services Featured
                      </h4>
                      <ul className="space-y-1">
                        {selectedFlyer.services.map((service, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></div>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Color Palette */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Color Palette
                      </h4>
                      <div className="flex space-x-2">
                        {selectedFlyer.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-lg border-2 border-gray-300 dark:border-gray-600 shadow-sm"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Design Details */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        Design Details
                      </h4>
                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex justify-between">
                          <span>Category:</span>
                          <span className="font-medium">{selectedFlyer.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Client:</span>
                          <span className="font-medium">{selectedFlyer.client}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Type:</span>
                          <span className="font-medium">Promotional Flyer</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons removed per request */}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Animated Writing Section Component
const AnimatedWritingSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const text = "You're at the best place";
  const characters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: -20,
      y: 10,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-24 w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={container}
          className="overflow-hidden"
        >
          <motion.h2
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 w-full"
            style={{
              fontFamily: "'Custom Font', cursive",
              letterSpacing: "0.03em",
              color: "#2563eb", // blue-600 color
              lineHeight: "1.2",
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            {characters.map((character, index) => (
              <motion.span
                key={index}
                variants={child}
                style={{ display: "inline-block" }}
              >
                {character === " " ? "\u00A0" : character}
              </motion.span>
            ))}
          </motion.h2>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
