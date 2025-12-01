import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaEye } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

const projects = [
  // Graphic Design Projects
  {
    title: "Goldbites Cakes Flyer",
    description:
      "Professional flyer design for Goldbites Cakes showcasing their delicious cake offerings with modern typography and clean layout.",
    techStack: ["Adobe Illustrator", "Adobe Photoshop", "Canva", "Typography", "Brand Design"],
    image: "/images/Goldbites Cakes Flyer.jpg",
    color: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
    category: "Graphic Design",
    featured: true,
    showPreview: false
  },
  {
    title: "Hair Haven Salon Flyer",
    description:
      "Eye-catching flyer design for Hair Haven Salon featuring their hair services and styling expertise.",
    techStack: ["Adobe Illustrator", "Adobe Photoshop", "Canva", "Print Design", "Event Branding"],
    image: "/images/Hair Haven Salon Flyer.jpg",
    color: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
    category: "Graphic Design",
    featured: true,
    showPreview: false
  },
  {
    title: "Levi Innovations Business Flyer",
    description:
      "Professional business flyer design for Levi Innovations with elegant typography and brand consistency.",
    techStack: ["Adobe Illustrator", "Canva", "Typography", "Brand Identity", "Print Design"],
    image: "/images/Levi Innovations Business Flyer.jpg",
    color: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    category: "Graphic Design",
    showPreview: false
  },
  {
    title: "Luminous Sanitation Services",
    description:
      "Creative flyer design for Luminous Sanitation Services showcasing their cleaning and sanitation expertise.",
    techStack: ["Adobe Illustrator", "Canva", "Logo Design", "Brand Identity", "Vector Graphics"],
    image: "/images/Luminous Sanitation Services.jpg",
    color: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
    category: "Graphic Design",
    featured: true,
    showPreview: false
  },
  {
    title: "Luxe NYC Fashion Flyer",
    description:
      "Compelling fashion flyer design for Luxe NYC that captures the essence of luxury fashion and attracts customers.",
    techStack: ["Adobe Photoshop", "Adobe Illustrator", "Canva", "Typography", "Book Design"],
    image: "/images/Luxe NYC Fashion Flyer.jpg",
    color: "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20",
    category: "Graphic Design",
    featured: true,
    showPreview: false
  },
  {
    title: "Mother's Day Celebration Flyer",
    description:
      "Heartwarming flyer design for Mother's Day celebration event with beautiful typography and warm colors.",
    techStack: ["Adobe Creative Suite", "Canva", "Print Design", "Marketing", "Brand Design"],
    image: "/images/Mother's Day Celebration Flyer.jpg",
    color: "bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20",
    category: "Graphic Design",
    showPreview: false
  },
  {
    title: "Rossy Father's Day Flyer",
    description:
      "Special flyer design for Rossy Father's Day celebration with masculine colors and elegant design elements.",
    techStack: ["Adobe Illustrator", "Canva", "Typography", "Event Design", "Print Design"],
    image: "/images/Rossy Father's Day Flyer.jpg",
    color: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
    category: "Graphic Design",
    featured: true,
    showPreview: false
  },
  {
    title: "Rossy Graduation Flyer",
    description:
      "Celebratory graduation flyer design for Rossy with academic colors and achievement-focused messaging.",
    techStack: ["Adobe Photoshop", "Canva", "Typography", "Event Branding", "Print Design"],
    image: "/images/Rossy Graduation Flyer.jpg",
    color: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
    category: "Graphic Design",
    featured: true,
    showPreview: false
  },
  {
    title: "Tiny Trends Children's Store",
    description:
      "Playful flyer design for Tiny Trends children's store with vibrant colors and child-friendly design elements.",
    techStack: ["Adobe Illustrator", "Canva", "Color Theory", "Children's Design", "Brand Identity"],
    image: "/images/Tiny Trends Children's Store.jpg",
    color: "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20",
    category: "Graphic Design",
    showPreview: false
  },
  {
    title: "Web Design Services Flyer",
    description:
      "Professional flyer design for web design services showcasing technical expertise and modern design approach.",
    techStack: ["Adobe Creative Suite", "Canva", "Web Design", "Marketing", "Brand Design"],
    image: "/images/Web Design Services Flyer.jpg",
    color: "bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20",
    category: "Graphic Design",
    featured: true,
    showPreview: false
  },
  {
    title: "Green Sphere Environmental Flyer",
    description:
      "Eco-friendly flyer design for Green Sphere environmental services with nature-inspired colors and messaging.",
    techStack: ["Adobe Illustrator", "Canva", "Environmental Design", "Typography", "Brand Identity"],
    image: "/images/Green Sphere Environmental Flyer.jpg",
    color: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    category: "Graphic Design",
    showPreview: false
  },
  {
    title: "Authentic Smock Fashion Flyer",
    description:
      "Cultural fashion flyer design for Authentic Smock showcasing traditional Ghanaian clothing with modern appeal.",
    techStack: ["Adobe Photoshop", "Canva", "Cultural Design", "Fashion Branding", "Typography"],
    image: "/images/Authentic Smock Fashion Flyer.jpg",
    color: "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20",
    category: "Graphic Design",
    featured: true,
    showPreview: false
  },
  {
    title: "ADAS Hub Technology Flyer",
    description:
      "Modern technology flyer design for ADAS Hub featuring their advanced driver assistance systems and tech solutions.",
    techStack: ["Adobe Illustrator", "Canva", "Technology Design", "Brand Identity", "Vector Graphics"],
    image: "/images/ADAS Hub Technology Flyer.jpg",
    color: "bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20",
    category: "Graphic Design",
    showPreview: false
  },
  {
    title: "Luminous Letterhead Design",
    description:
      "Professional letterhead design for Luminous Sanitation Services with clean typography and brand consistency.",
    techStack: ["Adobe Illustrator", "Canva", "Print Design", "Brand Identity", "Typography"],
    image: "/images/Letterhead Luminous.jpg",
    color: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
    category: "Graphic Design",
    featured: true,
    showPreview: false
  },
  {
    title: "Luminous Complementary Card",
    description:
      "Elegant complementary business card design for Luminous Sanitation Services with professional layout.",
    techStack: ["Adobe Illustrator", "Canva", "Print Design", "Brand Identity", "Typography"],
    image: "/images/Luminuos Complementary Card.jpg",
    color: "bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20",
    category: "Graphic Design",
    featured: true,
    showPreview: false
  },
  {
    title: "Honey Product Design",
    description:
      "Natural honey product packaging design with organic elements and premium visual appeal.",
    techStack: ["Adobe Illustrator", "Canva", "Product Design", "Packaging", "Brand Identity"],
    image: "/images/Honey.jpg",
    color: "bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
    category: "Graphic Design",
    featured: true,
    showPreview: false
  },
  {
    title: "Pepper Spice Design",
    description:
      "Spicy pepper product design with vibrant colors and bold typography for food packaging.",
    techStack: ["Adobe Illustrator", "Canva", "Food Design", "Packaging", "Typography"],
    image: "/images/Pepper.jpg",
    color: "bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20",
    category: "Graphic Design",
    featured: true,
    showPreview: false
  },
  {
    title: "Rice Product Design",
    description:
      "Premium rice product packaging design with clean, elegant layout and natural color scheme.",
    techStack: ["Adobe Illustrator", "Canva", "Food Design", "Packaging", "Brand Identity"],
    image: "/images/Rice.jpg",
    color: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    category: "Graphic Design",
    featured: true,
    showPreview: false
  },
  {
    title: "Interior & Exterior Design",
    description:
      "Comprehensive interior and exterior design showcase featuring modern architectural concepts.",
    techStack: ["Adobe Photoshop", "Canva", "Architecture", "3D Design", "Visualization"],
    image: "/images/Int and Ext deco.jpg",
    color: "bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20",
    category: "Graphic Design",
    featured: true,
    showPreview: false
  },
  // Logo Design Projects
  {
    title: "NOVÉRA ESTATES Logo",
    description:
      "Luxurious real estate company logo featuring a sophisticated 3D golden 'N' symbol with elegant typography.",
    techStack: ["Adobe Illustrator", "Canva", "3D Design", "Typography", "Brand Identity"],
    image: "/images/Novera.jpg",
    color: "bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
    category: "Logo Design",
    featured: true,
    showPreview: false
  },
  {
    title: "Green Sphere Logo",
    description:
      "Environmental services logo featuring a vibrant 3D green sphere with nature-inspired leaf elements.",
    techStack: ["Adobe Illustrator", "Canva", "3D Design", "Environmental Branding", "Vector Graphics"],
    image: "/images/Greensphere Logo.jpg",
    color: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20",
    category: "Logo Design",
    featured: true,
    showPreview: false
  },
  {
    title: "iOWNA HOMES Logo",
    description:
      "Real estate company logo with stylized building silhouettes and modern typography design.",
    techStack: ["Adobe Illustrator", "Architectural Design", "Typography", "Brand Identity"],
    image: "/images/iowna.jpg",
    color: "bg-gradient-to-br from-brown-50 to-amber-50 dark:from-brown-900/20 dark:to-amber-900/20",
    category: "Logo Design",
    featured: true,
    showPreview: false
  },
  {
    title: "ELIANNA HOMES Logo",
    description:
      "Premium real estate logo with integrated house icon and E4H monogram in metallic silver and blue.",
    techStack: ["Adobe Illustrator", "Canva", "3D Design", "Luxury Branding", "Typography"],
    image: "/images/Elianna Homes.jpg",
    color: "bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900/20 dark:to-blue-900/20",
    category: "Logo Design",
    featured: true,
    showPreview: false
  },
  {
    title: "GIANTALL CONSTRUCTION Logo",
    description:
      "Construction company logo featuring a professional construction worker silhouette with clean typography.",
    techStack: ["Adobe Illustrator", "Industrial Design", "Typography", "Brand Identity"],
    image: "/images/giantall construction company ltd.jpg",
    color: "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20",
    category: "Logo Design",
    showPreview: false
  },
  {
    title: "MY PERSONAL SHOPPER Logo",
    description:
      "Personal shopping service logo with stylized hand holding shopping bag and integrated IV letters.",
    techStack: ["Adobe Illustrator", "Service Branding", "Typography", "Vector Graphics"],
    image: "/images/MyPersonalShopper.jpg",
    color: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
    category: "Logo Design",
    featured: true,
    showPreview: false
  },
  {
    title: "ROMAB AgriConsult Logo",
    description:
      "Agricultural consulting logo featuring a stylized tree with green leaves and professional typography.",
    techStack: ["Adobe Illustrator", "Agricultural Branding", "Nature Design", "Typography"],
    image: "/images/RomabAgriConsult.jpg",
    color: "bg-gradient-to-br from-green-50 to-lime-50 dark:from-green-900/20 dark:to-lime-900/20",
    category: "Logo Design",
    showPreview: false
  },
  {
    title: "MJAP Logo",
    description:
      "Elegant metallic logo design with stylized MJAP letters featuring 3D embossed effect and luxury aesthetic.",
    techStack: ["Adobe Illustrator", "Canva", "3D Design", "Metallic Effects", "Typography"],
    image: "/images/Mjap.jpg",
    color: "bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20",
    category: "Logo Design",
    featured: true,
    showPreview: false
  },
  {
    title: "Ephytech Logo",
    description:
      "Modern technology company logo featuring sleek typography and contemporary design elements.",
    techStack: ["Adobe Illustrator", "Canva", "Technology Branding", "Typography", "Vector Graphics"],
    image: "/images/Ephytech logo.png",
    color: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
    category: "Logo Design",
    featured: true,
    showPreview: false
  },
  {
    title: "Goldbites Logo",
    description:
      "Delicious bakery logo design featuring golden elements and appetizing visual appeal.",
    techStack: ["Adobe Illustrator", "Canva", "Food Branding", "Typography", "Vector Graphics"],
    image: "/images/Goldbites Logo.png",
    color: "bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
    category: "Logo Design",
    featured: true,
    showPreview: false
  },
  // Web Development Projects
  {
    title: "Demargo Interior Contractors",
    description:
      "Professional interior decor company website showcasing elegant design solutions and comprehensive interior decoration services.",
    techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    demoLink: "https://demargointerior.com",
    image: "/images/demargo.jpg",
    color: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
    category: "Web Development",
    featured: true,
    hasLiveDemo: true,
  },
  {
    title: "AMB360 Cleaning Agency",
    description:
      "Modern cleaning services agency website offering professional cleaning solutions with a clean, user-friendly interface.",
    techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    demoLink: "https://amb360cleaning.com",
    image: "/images/amb360.jpg",
    color: "bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20",
    category: "Web Development",
    featured: true,
    hasLiveDemo: true,
  },
  {
    title: "Our Help Paige Foundation",
    description:
      "Nonprofit foundation website dedicated to supporting individuals with disabilities and promoting accessibility and inclusion in the community.",
    techStack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    demoLink: "https://ourhelppaige.org",
    image: "/images/ourhelppaige-logo.png",
    color: "bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20",
    category: "Web Development",
    featured: true,
    hasLiveDemo: true,
  },
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
    showPreview: false
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
    showPreview: false
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
    title: "UI/UX Design Portfolio",
    description:
      "Comprehensive collection of modern UI/UX designs showcasing various mobile and web interfaces.",
    techStack: ["Figma", "Adobe XD", "UI/UX", "Prototyping"],
    image: "/images/uiux.png",
    color: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
    category: "UI Design",
    featured: true,
    showPreview: false,
    hidden: true
  },
  {
    title: "Smoothie App UI",
    description:
      "Fresh and vibrant mobile app interface for a smoothie ordering application with modern design elements.",
    techStack: ["Figma", "UI/UX", "Mobile App", "Food Tech"],
    image: "/images/smoothie.jpg",
    color: "bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
    category: "UI Design",
    featured: true,
    showPreview: false,
    hidden: true
  },
  {
    title: "Modern Dashboard UI",
    description:
      "Clean and professional dashboard interface design with intuitive navigation and data visualization.",
    techStack: ["Figma", "UI/UX", "Dashboard Design", "Data Visualization"],
    image: "/images/t6.jpg",
    color: "bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
    category: "UI Design",
    featured: true,
    showPreview: false,
    hidden: true
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
    title: "Contact Management System",
    description:
      "Modern contact management application with advanced search and organization features.",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    image: "/images/contact.jpg",
    color: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
    category: "Web Development",
    featured: true,
    showPreview: false,
    hidden: true
  },
  {
    title: "Digital Portfolio Platform",
    description:
      "Professional portfolio platform with modern design and responsive layout for showcasing creative work.",
    techStack: ["React", "Tailwind CSS", "Vite", "JavaScript"],
    image: "/images/dv.jpg",
    color: "bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
    category: "Web Development",
    featured: true,
    showPreview: false,
    hidden: true
  },
  {
    title: "Corporate Website",
    description:
      "Professional corporate website with modern design and responsive layout for business presentation.",
    techStack: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    image: "/images/co.jpg",
    color: "bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20",
    category: "Web Development",
    featured: true,
    showPreview: false,
    hidden: true
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
    featured: true
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
  {
    title: "Plex Travel & Cargo",
    description:
      "A comprehensive travel and cargo management system with booking capabilities and real-time tracking.",
    techStack: ["React", "Node.js", "Tailwind CSS", "Express"],
    githubLink: "https://github.com/GideonWill/Travel-and-Tour-.git",
    demoLink: "https://plextravelandcargo.netlify.app/",
    image: "/images/t6.jpg",
    color: "bg-cyan-50 dark:bg-cyan-900/20",
    category: "Web Development",
    hasLiveDemo: true,
  },
];

const ProjectCard = ({ project, index, onImageClick }) => {
  const isUiDesign = project.category === "UI Design";
  const isGraphicDesign = project.category === "Graphic Design";
  const isLogoDesign = project.category === "Logo Design";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`rounded-lg shadow-lg overflow-hidden border-2 border-yellow-400 dark:border-yellow-500 ${project.color} ${project.featured ? "ring-2 ring-amber-400 dark:ring-amber-300" : ""
        }`}
    >
      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 flex flex-col gap-1 sm:gap-2">
        <span
          className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold 
          ${isGraphicDesign
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              : isLogoDesign
                ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                : isUiDesign
                  ? "bg-purple-500 text-white"
                  : "bg-blue-500 text-white"
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
        className={`relative overflow-hidden cursor-pointer border-2 border-yellow-400 dark:border-yellow-500 touch-target ${isGraphicDesign
          ? "h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80"
          : isLogoDesign
            ? "h-40 xs:h-48 sm:h-56 md:h-64"
            : isUiDesign
              ? "h-48 xs:h-56 sm:h-64 md:h-72 lg:h-80"
              : "h-40 xs:h-48 sm:h-56 md:h-64"
          }`}
        onClick={() => onImageClick && onImageClick(project)}
      >
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full ${isGraphicDesign || isUiDesign || isLogoDesign
            ? "object-contain bg-white dark:bg-gray-800 p-2"
            : "object-cover"
            } transform transition-transform duration-500 hover:scale-105`}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.src = '/images/front book cover.jpg';
            e.target.alt = 'Flyer design placeholder';
          }}
        />

        {/* Hover overlay with popup button */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-white text-shadow">
            {project.title}
          </h3>
          <p className="text-sm text-gray-200 mb-3">
            {project.description}
          </p>
          {(isGraphicDesign || isUiDesign || isLogoDesign) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onImageClick && onImageClick(project);
              }}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium rounded-lg hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              <FaEye className="mr-2" size={14} />
              View Full Size
            </button>
          )}
        </div>
      </div>

      <div className="p-3 sm:p-4 md:p-6">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2 leading-tight">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 sm:px-3 bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 rounded-full text-xs sm:text-sm font-medium border border-yellow-400 dark:border-yellow-500"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-3 sm:mt-4 md:mt-6">
          {project.githubLink &&
            project.title !== "User Profile and Setting Screens UI" &&
            project.title !== "Smoothie App UI" &&
            !isGraphicDesign && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors text-xs sm:text-sm border border-yellow-400 dark:border-yellow-500 touch-target"
                style={{ minHeight: "40px" }}
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
              className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 text-white rounded-md transition-colors bg-green-600 hover:bg-green-700 font-semibold text-xs sm:text-sm border border-yellow-400 dark:border-yellow-500 touch-target"
              style={{ minHeight: "40px" }}
            >
              <FaExternalLinkAlt size={12} />
              <span>Live Demo</span>
            </a>
          )}
          {!project.hasLiveDemo && project.showPreview !== false && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 text-white rounded-md transition-colors text-xs sm:text-sm border border-yellow-400 dark:border-yellow-500 touch-target ${isGraphicDesign
                ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                : "bg-blue-600 hover:bg-blue-500"
                }`}
              style={{ minHeight: "40px" }}
            >
              <FaExternalLinkAlt size={12} />
              <span>{isGraphicDesign ? "View Design" : "Preview"}</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const visibleProjects = projects.filter((p) => !p.hidden);

const Projects = () => {
  const [filter, setFilter] = useState("Graphic Design");
  const filters = ["Graphic Design", "Logo Design", "Web Development", "UI Design"];
  const [filteredProjects, setFilteredProjects] = useState(visibleProjects);
  const categoriesRef = useRef(null);
  const [startX, setStartX] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [likedProjects, setLikedProjects] = useState(new Set());

  useEffect(() => {
    setFilteredProjects(
      visibleProjects.filter((project) => project.category === filter)
    );
  }, [filter]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Modal functions
  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const toggleLike = (projectId) => {
    setLikedProjects(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(projectId)) {
        newLiked.delete(projectId);
      } else {
        newLiked.add(projectId);
      }
      return newLiked;
    });
  };

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
      <div className="relative bg-black h-64 sm:h-80 md:h-96 flex items-center justify-center overflow-hidden pt-safe mobile-container">
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
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 leading-tight mobile-text-rendering"
          >
            My Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mobile-text-rendering"
          >
            A showcase of my work across web development and UI/UX design. Browse
            through the projects to see my technical skills and creative
            approach.
          </motion.p>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-8 sm:py-12 bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 dark:from-pink-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 mobile-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mobile-spacing">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Design Portfolio Statistics
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              A comprehensive overview of my creative work
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "Flyers Designed", value: "18+", color: "from-purple-400 to-pink-500" },
              { label: "Logos Created", value: "11+", color: "from-orange-400 to-red-500" },
              { label: "Web Projects", value: "13+", color: "from-blue-400 to-cyan-500" },
              { label: "UI Designs", value: "8+", color: "from-indigo-400 to-purple-500" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-yellow-400 dark:border-yellow-500"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <span className="text-lg sm:text-2xl font-bold text-white">{stat.value}</span>
                </div>
                <h3 className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 leading-tight">{stat.label}</h3>
              </motion.div>
            ))}
          </div>
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
          <div className="inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg border-2 border-yellow-400 dark:border-yellow-500">
            {filters.map((category, index) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-2.5 text-xs sm:text-sm font-medium rounded-md transition-all duration-300 ${filter === category
                  ? category === "Graphic Design"
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                    : category === "Logo Design"
                      ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                      : category === "UI Design"
                        ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg"
                        : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                onClick={() => {
                  setFilter(category);
                  setCurrentCategoryIndex(index);
                }}
              >
                {category}
              </motion.button>
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
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400">
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
                <ProjectCard project={project} index={index} onImageClick={openModal} />
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Behance-style Detailed Project View */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 bg-gray-900 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Left side - Profile and Title */}
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">GK</span>
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {selectedProject.title}
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {selectedProject.category} • Portfolio Project
                    </p>
                  </div>
                </div>

                {/* Right side - Actions */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={closeModal}
                    className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <FaTimes size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {/* Main Image/Content Area */}
              <div className="lg:col-span-2">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="aspect-[4/3] sm:aspect-[3/2] bg-gray-100 dark:bg-gray-700 flex items-center justify-center p-4 sm:p-6 md:p-8">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        e.target.src = '/images/front book cover.jpg';
                        e.target.alt = 'Design placeholder';
                      }}
                    />
                  </div>
                </div>

                {/* Project Description */}
                <div className="mt-4 sm:mt-6 md:mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    About This Project
                  </h2>
                  <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Project Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">1</div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Project</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedProject.techStack.length}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Technologies</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">2024</div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Year</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {selectedProject.category === "Graphic Design" ? "Design" :
                          selectedProject.category === "Logo Design" ? "Branding" :
                            selectedProject.category === "UI Design" ? "Interface" : "Development"}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Category</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-4 sm:space-y-6">
                {/* Project Info */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    Project Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Category</label>
                      <div className={`mt-1 px-3 py-1 rounded-full text-sm font-medium inline-block ${selectedProject.category === "Graphic Design"
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                        : selectedProject.category === "Logo Design"
                          ? "bg-gradient-to-r from-orange-500 to-red-500 text-white"
                          : selectedProject.category === "UI Design"
                            ? "bg-purple-500 text-white"
                            : "bg-blue-500 text-white"
                        }`}>
                        {selectedProject.category}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Client</label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">Portfolio Showcase</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Year</label>
                      <p className="mt-1 text-sm text-gray-900 dark:text-white">2024</p>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Actions
                  </h3>
                  <div className="space-y-3">
                    {selectedProject.githubLink && (
                      <a
                        href={selectedProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                      >
                        <FaGithub size={16} />
                        <span>View Code</span>
                      </a>
                    )}
                    {selectedProject.demoLink && (
                      <a
                        href={selectedProject.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full flex items-center justify-center space-x-2 px-4 py-2 text-white rounded-md transition-colors ${selectedProject.category === "Graphic Design"
                          ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                          : selectedProject.category === "Logo Design"
                            ? "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                            : "bg-blue-600 hover:bg-blue-500"
                          }`}
                      >
                        <FaExternalLinkAlt size={14} />
                        <span>{selectedProject.category === "Graphic Design" || selectedProject.category === "Logo Design" ? "View Design" : "Live Demo"}</span>
                      </a>
                    )}
                    <button
                      onClick={() => toggleLike(selectedProject.title)}
                      className={`w-full flex items-center justify-center space-x-2 px-4 py-2 border rounded-md transition-colors ${likedProjects.has(selectedProject.title)
                        ? "border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20"
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                        }`}
                    >
                      <svg className={`w-4 h-4 ${likedProjects.has(selectedProject.title) ? "fill-current" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{likedProjects.has(selectedProject.title) ? "Liked" : "Like Project"}</span>
                    </button>
                  </div>
                </div>

                {/* More Like This */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    More Like This
                  </h3>
                  <div className="space-y-3">
                    {visibleProjects.filter(p => p.category === selectedProject.category && p.title !== selectedProject.title).slice(0, 3).map((project) => (
                      <div
                        key={project.title}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors border border-yellow-400 dark:border-yellow-500"
                        onClick={() => {
                          closeModal();
                          openModal(project);
                        }}
                      >
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-12 h-12 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.src = '/images/front book cover.jpg';
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {project.title}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {project.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
