import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

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
    description: "A community-driven platform for artists and art enthusiasts.",
    techStack: ["React", "Firebase", "Tailwind CSS"],
    githubLink: "https://github.com/GideonWill/Mosaic-Grove.git",
    demoLink: "https://mosaicgrove-demo.com",
    image: "/images/mosaic.jpg",
    color: "bg-purple-50 dark:bg-purple-900/20",
    category: "Web Development",
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
    demoLink: "https://rakofoods-demo.com",
    image: "/images/rako.jpg",
    color: "bg-orange-50 dark:bg-orange-900/20",
    category: "Web Development",
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
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold 
          ${
            isUiDesign ? "bg-purple-500 text-white" : "bg-blue-500 text-white"
          }`}
        >
          {project.category}
        </span>
        {project.featured && (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-white">
            Featured
          </span>
        )}
      </div>

      <div
        className={`relative overflow-hidden ${isUiDesign ? "h-80" : "h-64"}`}
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4 mt-6">
          {project.githubLink &&
            project.title !== "User Profile and Setting Screens UI" &&
            project.title !== "Smoothie App UI" && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <FaGithub size={16} />
                <span>Code</span>
              </a>
            )}
          {isUiDesign && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 text-white rounded-md transition-colors bg-purple-500 hover:bg-purple-600 font-semibold"
            >
              <FaExternalLinkAlt size={14} />
              <span>View Interactive Prototype</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url("/images/project.jpg")' }}
        ></div>
        <div className="max-w-7xl mx-auto relative z-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-8"
          >
            My Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-3xl"
          >
            Explore my portfolio of web applications, mobile UI designs, and
            development projects that showcase my skills in both design and
            implementation.
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("all")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                  : "bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              All Projects
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("Web Development")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "Web Development"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Web Development
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter("UI Design")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === "UI Design"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              UI Design
            </motion.button>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No projects found in this category.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 bg-white dark:bg-gray-900 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Interested in working together?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
          >
            I'm always open to discussing new projects, creative ideas or
            opportunities to be part of your vision.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            href="/contact"
            className="inline-block py-4 px-8 bg-blue-600 text-white font-semibold rounded-md text-lg hover:bg-blue-500 transition-colors"
          >
            Let's Connect
          </motion.a>
        </div>
      </section>
    </div>
  );
};

export default Projects;
