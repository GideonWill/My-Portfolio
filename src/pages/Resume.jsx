import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaDownload,
  FaGraduationCap,
  FaBriefcase,
  FaCode,
  FaPalette,
  FaCertificate,
  FaCheckCircle,
  FaLaptopCode,
  FaServer,
  FaGithub,
  FaUserTie,
  FaArrowUp,
  FaStar,
} from "react-icons/fa";

const Resume = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeTab, setActiveTab] = useState("all");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const tabs = [
    { id: "all", label: "All" },
    { id: "summary", label: "Summary" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
  ];

  // Education data
  const education = [
    {
      id: 1,
      degree: "Bachelor's Degree in Information Technology",
      institution: "Pentecost University",
      location: "Accra, Ghana",
      duration: "Graduated: December 2024",
      description:
        "Comprehensive curriculum covering software development, web technologies, networking, and IT systems design with focus on modern development frameworks and methodologies.",
    },
  ];

  // Summary content
  const summary =
    "Passionate Frontend Developer with experience in UI/UX design, React, and TypeScript. Successfully developed and contributed to multiple projects, including eCommerce, agriculture, and healthcare websites. Strong foundation in Linux/Unix environments, open-source contributions, and automation scripting.";

  // Work experience data
  const experience = [
    {
      id: 1,
      role: "UI Designer",
      company: "KinFlip",
      location: "Accra, Ghana",
      duration: "Jun 2023 – Aug 2023",
      description:
        "Designed and implemented user interfaces for a transportation booking system.",
      achievements: [
        "Designed user-friendly interfaces for a transportation booking system",
        "Collaborated with front-end developers to implement UI components",
        "Conducted user testing to refine UX design",
      ],
    },
    {
      id: 2,
      role: "Intern Software Developer",
      company: "Orcons Company Ltd",
      location: "Accra, Ghana",
      duration: "Jan 2021 – June 2023",
      description:
        "Contributed to the development of educational software solutions and school management systems.",
      achievements: [
        "Developed a school management system with user authentication and role-based access control",
        "Created responsive UI designs for educational software solutions",
        "Worked closely with backend developers to integrate front-end features",
      ],
    },
  ];

  // Project data
  const projects = [
    {
      id: 1,
      title: "Rako Foods Website",
      description:
        "Developed a modern, responsive website for a local food and catering service featuring a clean design and mobile-first approach.",
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "React Icons"],
      highlights: [
        "Implemented a responsive layout that works seamlessly across all devices",
        "Created detailed service pages for different catering options and events",
      ],
      link: "https://github.com/GideonWill/RakoFoods.git",
    },
    {
      id: 2,
      title: "Let's Buy (E-commerce Website)",
      description:
        "Developed a fully responsive eCommerce platform with user authentication, product filtering, and a seamless checkout experience.",
      techStack: [
        "React.js",
        "TypeScript",
        "Tailwind CSS",
        "Firebase",
        "Stripe API",
      ],
      highlights: [
        "Implemented dynamic UI components for a smooth user experience",
        "Integrated secure payment processing with Stripe",
      ],
    },
    {
      id: 3,
      title: "Mosaic Grove (Agricultural Website)",
      description:
        "Designed and developed a website to connect farmers with buyers and provide agricultural insights.",
      techStack: ["React.js", "TypeScript", "Node.js", "PostgreSQL"],
      highlights: [
        "Designed a user-friendly interface for farm management and product listing",
        "Implemented a real-time chat system for buyer-seller communication",
      ],
      link: "https://github.com/GideonWill/MosaicGrove",
      liveDemo: "https://mosaicgrov.netlify.app/",
    },
    {
      id: 4,
      title: "User Profile and Setting Screens UI",
      description:
        "Designed a modern user profile interface with clean aesthetics and intuitive navigation for profile management.",
      techStack: ["Figma", "UI/UX Design", "Prototyping", "User Research"],
      highlights: [
        "Created a visually appealing profile layout with card-based design",
        "Designed responsive components that adapt to different screen sizes",
      ],
    },
    {
      id: 5,
      title: "Smoothie App UI",
      description:
        "Crafted a colorful and engaging mobile app interface for a smoothie ordering service with focus on product presentation.",
      techStack: ["Figma", "UI/UX Design", "Mobile Design", "Color Theory"],
      highlights: [
        "Developed an intuitive product browsing and ordering flow",
        "Created custom illustrations and animations for enhanced user engagement",
      ],
    },
  ];

  // Linux/Unix projects
  const linuxProjects = [
    {
      id: 1,
      title: "Server Setup & Deployment",
      description:
        "Configured and deployed a React-based web application on a Linux server using Nginx as a reverse proxy. Managed server security and performance optimizations.",
    },
    {
      id: 2,
      title: "Shell Scripting for Automation",
      description:
        "Developed Bash scripts to automate system updates, backups, and log management on a Unix-based system.",
    },
  ];

  // Open Source Contributions
  const openSourceContributions = [
    {
      id: 1,
      title: "React UI Component Library Contribution",
      description:
        "Contributed improvements and bug fixes to an open-source React UI framework, focusing on accessibility and UI responsiveness.",
    },
    {
      id: 2,
      title: "Documentation & Code Contributions",
      description:
        "Provided code fixes and improved documentation for an open-source TypeScript-based project, enhancing developer experience.",
    },
  ];

  // Skills data
  const skills = {
    frontend: [
      "React.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Design",
    ],
    design: [
      "UI/UX Design",
      "Figma",
      "Adobe XD",
      "Wireframing",
      "Prototyping",
      "User Research",
    ],
    backend: ["PHP", "Node.js", "REST APIs", "Firebase"],
    devOps: [
      "Git & GitHub",
      "Linux/Unix",
      "Bash Scripting",
      "Docker",
      "Nginx",
      "Server Deployment",
    ],
  };

  // Certificates data
  const certificates = [
    {
      id: 1,
      name: "Hennge Challenge Completion",
      issuer: "Hennge",
      year: "2023",
      credential: "Computer Engineering (Frontend) Pathway",
    },
  ];

  // Add skill levels data
  const skillLevels = {
    "React.js": 90,
    TypeScript: 85,
    JavaScript: 95,
    HTML5: 95,
    CSS3: 90,
    "Tailwind CSS": 85,
    "UI/UX Design": 80,
    Figma: 85,
    "Node.js": 75,
    "Git & GitHub": 80,
  };

  // Filter content based on active tab
  const renderContent = () => {
    // Summary Section
    if (activeTab === "all" || activeTab === "summary") {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`${
            activeTab !== "summary" && activeTab !== "all" ? "hidden" : ""
          }`}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FaUserTie className="mr-2 text-blue-600 dark:text-blue-400" />
            Professional Summary
          </h2>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {summary}
            </p>
          </div>
        </motion.div>
      );
    }

    // Experience Section
    if (activeTab === "all" || activeTab === "experience") {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`${
            activeTab !== "experience" && activeTab !== "all"
              ? "hidden"
              : "mt-12"
          }`}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FaBriefcase className="mr-2 text-blue-600 dark:text-blue-400" />
            Work Experience
          </h2>
          <div className="space-y-8">
            {experience.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {exp.role}
                </h3>
                <div className="flex flex-wrap justify-between mb-2">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {exp.company}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {exp.duration}
                  </span>
                </div>
                <span className="block text-gray-500 dark:text-gray-500 text-sm mb-3">
                  {exp.location}
                </span>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {exp.description}
                </p>
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Key Responsibilities:
                  </h4>
                  <ul className="space-y-1">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <FaCheckCircle
                          className="text-green-500 dark:text-green-400 mt-1 mr-2 flex-shrink-0"
                          size={14}
                        />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {achievement}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    }

    // Project Section
    if (activeTab === "all" || activeTab === "projects") {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`${
            activeTab !== "projects" && activeTab !== "all" ? "hidden" : "mt-12"
          }`}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FaLaptopCode className="mr-2 text-blue-600 dark:text-blue-400" />
            Project Experience
          </h2>

          <div className="space-y-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-indigo-500 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.liveDemo && (
                      <a
                        href={project.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors text-sm font-medium flex items-center"
                      >
                        <FaLaptopCode className="mr-1" /> Live Demo
                      </a>
                    )}
                    {project.link && project.link !== null && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors text-sm font-medium flex items-center"
                      >
                        <FaGithub className="mr-1" /> View Source
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {project.description}
                </p>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Technologies:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Highlights:
                  </h4>
                  <ul className="space-y-1">
                    {project.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start">
                        <FaCheckCircle
                          className="text-indigo-500 dark:text-indigo-400 mt-1 mr-2 flex-shrink-0"
                          size={14}
                        />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {highlight}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Linux/Unix Projects */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaServer className="mr-2 text-blue-600 dark:text-blue-400" />
              Linux/Unix Projects
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {linuxProjects.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-amber-500 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
                >
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {project.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Open Source Contributions */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaGithub className="mr-2 text-blue-600 dark:text-blue-400" />
              Open Source Contributions
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {openSourceContributions.map((contribution) => (
                <motion.div
                  key={contribution.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
                >
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {contribution.title}
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    {contribution.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      );
    }

    // Skills Section
    if (activeTab === "all" || activeTab === "skills") {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`${
            activeTab !== "skills" && activeTab !== "all" ? "hidden" : "mt-12"
          }`}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FaCode className="mr-2 text-blue-600 dark:text-blue-400" />
            Technical Skills
          </h2>

          {/* Skill Expertise Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <FaStar className="mr-2 text-yellow-500" /> Skill Proficiency
            </h3>
            <div className="space-y-4">
              {Object.entries(skillLevels).map(([skill, level], idx) => (
                <motion.div
                  key={idx}
                  className="space-y-1"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="text-gray-800 dark:text-gray-200 font-medium">
                      {skill}
                    </h4>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {level}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${getBarColor(level)}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                    ></motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FaCode className="mr-2 text-blue-500" /> Frontend Development
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {skills.frontend.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors cursor-default transform hover:scale-105 transition-transform duration-200"
                  >
                    <FaCheckCircle
                      className="text-blue-500 dark:text-blue-400 mr-2"
                      size={14}
                    />
                    <span className="text-gray-800 dark:text-gray-200 text-sm">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FaPalette className="mr-2 text-purple-500" /> UI/UX Design
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {skills.design.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors cursor-default transform hover:scale-105 transition-transform duration-200"
                  >
                    <FaCheckCircle
                      className="text-purple-500 dark:text-purple-400 mr-2"
                      size={14}
                    />
                    <span className="text-gray-800 dark:text-gray-200 text-sm">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FaCode className="mr-2 text-green-500" /> Backend Technologies
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {skills.backend.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors cursor-default transform hover:scale-105 transition-transform duration-200"
                  >
                    <FaCheckCircle
                      className="text-green-500 dark:text-green-400 mr-2"
                      size={14}
                    />
                    <span className="text-gray-800 dark:text-gray-200 text-sm">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <FaServer className="mr-2 text-amber-500" /> DevOps & Tools
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {skills.devOps.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors cursor-default transform hover:scale-105 transition-transform duration-200"
                  >
                    <FaCheckCircle
                      className="text-amber-500 dark:text-amber-400 mr-2"
                      size={14}
                    />
                    <span className="text-gray-800 dark:text-gray-200 text-sm">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      );
    }

    // Education and Certificates
    if (activeTab === "all" || activeTab === "education") {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`${
            activeTab !== "education" && activeTab !== "all"
              ? "hidden"
              : "mt-12"
          }`}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FaGraduationCap className="mr-2 text-blue-600 dark:text-blue-400" />
            Education
          </h2>
          <div className="space-y-8">
            {education.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500 hover:shadow-xl transition-all hover:border-l-8 duration-300 group"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {edu.degree}
                </h3>
                <div className="flex flex-wrap justify-between mb-2">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    {edu.institution}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {edu.duration}
                  </span>
                </div>
                <span className="block text-gray-500 dark:text-gray-500 text-sm mb-3">
                  {edu.location}
                </span>
                <p className="text-gray-700 dark:text-gray-300">
                  {edu.description}
                </p>
              </motion.div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6 flex items-center">
            <FaCertificate className="mr-2 text-blue-600 dark:text-blue-400" />
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group hover:border-blue-300 dark:hover:border-blue-500"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {cert.name}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400">
                      {cert.issuer}
                    </p>
                  </div>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-2.5 py-0.5 rounded">
                    {cert.year}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {cert.credential}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 z-10"></div>
        <div className="absolute inset-0 bg-[url('/images/gid.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="max-w-7xl mx-auto relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              My Resume
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-2"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Frontend Developer & UI/UX Designer
            </motion.p>
            <motion.p
              className="text-lg text-white/80 max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              Ablekuma, Accra, Ghana | gideonogunu@gmail.com | 0277811521 /
              0592678531
            </motion.p>
            <motion.a
              href="/GIDEON WILLIAM OGUNU-CV.pdf"
              download
              className="relative inline-flex group items-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-semibold transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
              <FaDownload className="mr-2 relative z-10" />
              <span className="relative z-10">Download Full CV</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Resume Content Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto pb-4 mb-8 scrollbar-hide space-x-2">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 transform transition-transform duration-200"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Resume Content based on active tab */}
          {renderContent()}

          {/* Scroll to top button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
                aria-label="Scroll to top"
              >
                <FaArrowUp size={20} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

// Helper function to get color for progress bars
const getBarColor = (level) => {
  if (level >= 90) return "bg-green-500 dark:bg-green-600";
  if (level >= 80) return "bg-blue-500 dark:bg-blue-600";
  if (level >= 70) return "bg-purple-500 dark:bg-purple-600";
  if (level >= 60) return "bg-yellow-500 dark:bg-yellow-600";
  return "bg-red-500 dark:bg-red-600";
};

export default Resume;
