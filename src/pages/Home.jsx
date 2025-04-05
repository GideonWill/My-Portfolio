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
} from "react-icons/fa";
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

  // Parallax effect refs
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const y1 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  // Testimonial slider
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      name: "Jane Doe",
      role: "Project Manager",
      text: "Gideon delivered exceptional results for our UI redesign project. His attention to detail and creativity exceeded our expectations.",
    },
    {
      name: "John Smith",
      role: "Startup Founder",
      text: "Working with Gideon was a pleasure. He understood our vision and transformed it into a beautiful and functional design.",
    },
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      text: "Gideon's work on our web application significantly improved user engagement and conversion rates.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

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
    { name: "UI/UX Design", icon: "🎨" },
    { name: "React", icon: "⚛️" },
    { name: "JavaScript", icon: "📜" },
    { name: "PHP", icon: "🐘" },
    { name: "C#", icon: "🔵" },
    { name: "Node.js", icon: "🟢" },
  ];

  // Featured projects
  const featuredProjects = [
    {
      title: "Hop and Shop",
      description: "A modern e-commerce platform with advanced features.",
      image: "/images/hopandshop.jpg",
      color: "from-red-500 to-purple-500",
    },
    {
      title: "Mother and Child Hospital",
      description: "Healthcare management system for mother and child care.",
      image: "/images/mch.jpg",
      color: "from-green-500 to-blue-500",
    },
    {
      title: "Jopee Travel & Tours",
      description: "Transportation booking system with intuitive UI.",
      image: "/images/jopee.jpg",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center min-h-screen pt-16 pb-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
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
            className="relative mt-20"
          >
            <div className="w-80 h-80 mx-auto mb-12 relative">
              <div className="w-full h-full relative group">
                <img
                  src="/profile.jpg"
                  alt="Gideon William Ogunu"
                  className="w-full h-full rounded-full object-cover border-4 border-blue-600 dark:border-blue-400 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{
                    objectPosition: "center 20%",
                  }}
                />
                <div className="absolute inset-0 rounded-full shadow-inner"></div>
              </div>

              {/* Simple pulsing border */}
              <div className="absolute inset-0 border-4 border-blue-400 rounded-full opacity-0 animate-pulse group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Hi, I'm Gideon William Ogunu
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl text-gray-600 dark:text-gray-300 mb-12 h-12"
          >
            <span className="text-blue-600 dark:text-blue-400">{text}</span>
            <span className="animate-blink">|</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center space-x-8 mb-16"
          >
            <a
              href="https://github.com/GideonWill"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-110 transition-all duration-300"
            >
              <FaGithub size={32} />
            </a>
            <a
              href="https://www.linkedin.com/in/gideon-ogunu-795b1224a"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transform hover:scale-110 transition-all duration-300"
            >
              <FaLinkedin size={32} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              View My Work
              <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>

        {/* Simple static scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-60 hover:opacity-90 transition-opacity duration-300 cursor-pointer"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Scroll
            </span>
            <FaArrowRight className="text-gray-500 dark:text-gray-400 transform rotate-90" />
          </div>
        </div>
      </section>

      {/* Writing Animation Section */}
      <AnimatedWritingSection />

      {/* Featured Projects Showcase */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured{" "}
              <span className="text-blue-600 dark:text-blue-400">Projects</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Take a look at some of my recent work that showcases my skills and
              expertise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="rounded-xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700 group relative"
              >
                {/* Animated background gradient - no longer overlays the image */}
                <motion.div
                  className="absolute inset-0 z-0 opacity-0"
                  animate={{
                    background: [
                      `linear-gradient(120deg, ${
                        project.color.split(" ")[1]
                      } 0%, ${project.color.split(" ")[3]} 100%)`,
                      `linear-gradient(220deg, ${
                        project.color.split(" ")[1]
                      } 0%, ${project.color.split(" ")[3]} 100%)`,
                      `linear-gradient(120deg, ${
                        project.color.split(" ")[1]
                      } 0%, ${project.color.split(" ")[3]} 100%)`,
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                {/* Only bottom title bar for text visibility */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 transition-all duration-300"
                  style={{
                    height: "30%",
                    bottom: 0,
                    top: "auto",
                  }}
                ></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                  <h3 className="text-xl font-bold text-white mb-2 text-shadow drop-shadow-lg">
                    {project.title}
                  </h3>
                  <Link
                    to="/projects"
                    className="text-white font-medium inline-flex items-center bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-full transition-colors duration-300 shadow-md w-fit text-sm"
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

          <div className="text-center mt-12">
            <Link
              to="/projects"
              className="inline-flex items-center px-5 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300"
            >
              View All Projects
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Preview Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              What I Do
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              I create beautiful and functional digital experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
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
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center cursor-pointer"
              >
                <motion.span
                  className="text-4xl mb-4 block"
                  whileHover={{
                    rotate: [0, -10, 10, -10, 10, 0],
                    transition: {
                      duration: 0.5,
                      ease: "easeInOut",
                    },
                  }}
                >
                  {skill.icon}
                </motion.span>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {skill.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What People Say
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Feedback from clients and collaborators
            </p>
          </motion.div>

          <div className="relative h-80 max-w-4xl mx-auto">
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
                      className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl"
                    >
                      <FaQuoteLeft className="text-gray-300 dark:text-gray-600 text-4xl mb-6" />
                      <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl italic mb-8">
                        "{testimonial.text}"
                      </p>
                      <div>
                        <h4 className="text-gray-900 dark:text-white font-bold">
                          {testimonial.name}
                        </h4>
                        <p className="text-gray-500 dark:text-gray-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>

            {/* Slider indicators */}
            <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial
                      ? "bg-blue-600 w-6"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
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
