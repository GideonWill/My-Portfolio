import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

const projects = [
  {
    title: "Let's Buy",
    description:
      "A modern e-commerce platform with advanced search and filtering capabilities.",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    githubLink: "https://github.com/GideonWill/LetsBuy",
    demoLink: "https://letsbuy-demo.com",
    image: "/images/let'sbuy.jpg",
    color: "bg-blue-50 dark:bg-blue-900/20",
    category: "Web Development",
  },
  {
    title: "Hop and Shop",
    description:
      "A modern e-commerce website with product browsing, shopping cart, and checkout features.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
    githubLink: "https://github.com/GhOsCoDeR/HopAndShop_main.git",
    demoLink: "https://hopandshop-demo.com",
    image: "/images/hopandshop.jpg",
    color: "bg-red-50 dark:bg-red-900/20",
    category: "Web Development",
  },
  {
    title: "Mosaic Grove",
    description:
      "A community-driven platform for sustainable agriculture and empowering communities in Ghana.",
    techStack: ["React", "Firebase", "Tailwind CSS"],
    githubLink: "https://github.com/GideonWill/Mosaic-Grove.git",
    demoLink: "https://mosaicgrove.netlify.app/",
    image: "/images/mosaic.jpg",
    color: "bg-purple-50 dark:bg-purple-900/20",
    category: "Web Development",
    hasLiveDemo: true,
  },
  {
    title: "Jopee Travel & Tours UI",
    description: "User Interface of an Online Transportation Booking System.",
    techStack: ["Figma", "UI/UX", "Mobile App"],
    githubLink: "https://github.com/GideonWill/jopee-main.git",
    demoLink:
      "https://www.figma.com/design/FsS5t1BzVmUXiloU6pmzyG/Jopee-Booking-system-(Copy)?node-id=0-1&t=U2xMSeVwpwf0MhbJ-1",
    image: "/images/jopee.jpg",
    color: "bg-teal-50 dark:bg-teal-900/20",
    category: "UI Design",
    featured: true,
  },
  {
    title: "User Profile and Setting Screens UI",
    description:
      "Intuitive user-friendly interface for an Interior Decoration app.",
    techStack: ["Figma", "UI/UX", "Mobile App"],
    githubLink: "https://github.com/GideonWill/profile-ui",
    demoLink:
      "https://www.figma.com/design/04MHAFSA79Z9LxJs1RXnDJ/User-profile-%26-Settings-screen?node-id=0-1&t=VnmqFtv1vTLevqpn-1",
    image: "/images/userprofile.jpg",
    color: "bg-indigo-50 dark:bg-indigo-900/20",
    category: "UI Design",
    featured: true,
  },
  {
    title: "Mother and Child Hospital",
    description:
      "A healthcare management system for mother and child care facilities.",
    techStack: ["PHP", "MySQL", "JavaScript"],
    githubLink: "https://github.com/GideonWill/MCH.git",
    demoLink: "https://hospital-demo.com",
    image: "/images/mch.jpg",
    color: "bg-green-50 dark:bg-green-900/20",
    category: "Web Development",
  },
  {
    title: "Smoothie App UI",
    description:
      "A user interface for a smoothie ordering and delivery application.",
    techStack: ["Figma", "UI/UX", "Mobile App"],
    githubLink: "https://github.com/GideonWill/smoothie-app",
    demoLink:
      "https://www.figma.com/design/ec0cIDGJJrXw0KfgQCCEPZ/Smoothies?t=VnmqFtv1vTLevqpn-1",
    image: "/images/smoothie.jpg",
    color: "bg-pink-50 dark:bg-pink-900/20",
    category: "UI Design",
    featured: true,
  },
  {
    title: "Hot Gobe App UI",
    description:
      "Food service application focusing on beans-based cuisine delivery with intuitive ordering and tracking interface.",
    techStack: ["Figma", "UI/UX", "Mobile App", "Food Delivery"],
    githubLink: "https://github.com/GideonWill/hot-gob3",
    demoLink:
      "https://www.figma.com/design/nQpIDtKOBZ71syiV0jU0Tv/Hot-Gob3?t=U2xMSeVwpwf0MhbJ-1",
    image: "/images/gob3.jpg",
    color: "bg-amber-50 dark:bg-amber-900/20",
    category: "UI Design",
    featured: true,
  },
  {
    title: "RAKO FOODS",
    description: "A food delivery and restaurant management platform.",
    techStack: ["React", "Node.js", "PostgreSQL"],
    githubLink: "https://github.com/GideonWill/rakofoods",
    demoLink: "https://rakofoods.netlify.app/",
    image: "/images/rako.jpg",
    color: "bg-orange-50 dark:bg-orange-900/20",
    category: "Web Development",
    hasLiveDemo: true,
  },
];

const ProjectCard = ({ project, index }) => {
  const isUiDesign = project.category === "UI Design";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-lg shadow-lg overflow-hidden ${project.color} ${
        project.featured ? "ring-2 ring-amber-400 dark:ring-amber-300" : ""
      }`}
    >
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 flex flex-col gap-1 sm:gap-2">
        <span
          className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold 
          ${
            isUiDesign ? "bg-purple-500 text-white" : "bg-blue-500 text-white"
          }`}
        >
          {project.category}
        </span>
        {project.featured && (
          <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold bg-amber-500 text-white">
            Featured
          </span>
        )}
      </div>

      <div
        className={`relative overflow-hidden ${isUiDesign ? "h-56 sm:h-64 md:h-80" : "h-48 sm:h-56 md:h-64"}`}
      >
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full ${
            isUiDesign
              ? "object-contain bg-gray-100 dark:bg-gray-800"
              : "object-cover"
          } transform transition-transform duration-500 hover:scale-105`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
          <h3 className="text-xl font-bold text-white">{project.title}</h3>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 sm:px-3 bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4 mt-4 sm:mt-6">
          {project.githubLink &&
            project.title !== "User Profile and Setting Screens UI" &&
            project.title !== "Smoothie App UI" && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-xs sm:text-sm"
              >
                <FaGithub size={14} />
                <span>Code</span>
              </a>
            )}
          {project.hasLiveDemo && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 text-white rounded-md transition-colors bg-green-600 hover:bg-green-700 font-semibold text-xs sm:text-sm"
            >
              <FaExternalLinkAlt size={12} />
              <span>Live Demo</span>
            </a>
          )}
          {!project.hasLiveDemo && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors text-xs sm:text-sm"
            >
              <FaExternalLinkAlt size={12} />
              <span>Preview</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Web Development", "UI Design"];
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const categoriesRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  useEffect(() => {
    if (filter === "All") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.category === filter)
      );
    }
  }, [filter]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle touch swipe for category switching
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;
    
    // If swipe is significant enough (more than 50px)
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        // Swipe left - go to next category
        const nextIndex = Math.min(currentCategoryIndex + 1, filters.length - 1);
        setCurrentCategoryIndex(nextIndex);
        setFilter(filters[nextIndex]);
      } else {
        // Swipe right - go to previous category
        const prevIndex = Math.max(currentCategoryIndex - 1, 0);
        setCurrentCategoryIndex(prevIndex);
        setFilter(filters[prevIndex]);
      }
    }
  };
  
  // Handle swipe on project cards
  const handleCardSwipe = (info, project, index) => {
    // If swipe is significant enough
    if (Math.abs(info.offset.x) > 50) {
      // Could implement project navigation, details expansion, etc.
      console.log(`Swiped on project: ${project.title}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-black h-64 sm:h-80 md:h-96 flex items-center justify-center overflow-hidden pt-safe">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/project-hero.jpg"
            alt="Projects"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-0"></div>
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6"
          >
            My Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto"
          >
            A showcase of my work across web development and UI/UX design. Browse
            through the projects to see my technical skills and creative
            approach.
          </motion.p>
        </div>
      </div>

      {/* Projects Section with Filter */}
      <div className="py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Category Filter */}
        <div 
          ref={categoriesRef}
          className="mb-8 sm:mb-12 flex justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {filters.map((category, index) => (
              <button
                key={category}
                className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm font-medium rounded-md transition-all ${
                  filter === category
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => {
                  setFilter(category);
                  setCurrentCategoryIndex(index);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mobile swipe instruction - only shown on small screens */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden text-center mb-6 text-xs text-gray-500 dark:text-gray-400"
        >
          <p>Swipe left/right to change categories</p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 col-span-full"
            >
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400">
                No projects found in this category.
              </p>
            </motion.div>
          ) : (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="touch-pan-y"
                whileTap={{ scale: 0.98 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
