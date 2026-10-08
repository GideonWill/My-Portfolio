import { motion } from "framer-motion";
import { FaArrowRight, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import HeroBackdrop from "../components/HeroBackdrop";

const featuredProjects = [
  {
    title: "Prive Ghana",
    type: "Digital experience",
    description:
      "A refined online experience built to introduce Prive Ghana and its services.",
    image: "/images/prive.jpeg",
    imageFit: "contain",
    href: "https://priveghana.com",
    showVisitLink: true,
  },
  {
    title: "ENA Ointing Ltd",
    type: "Web development",
    description:
      "A technology company website presenting custom software, web and mobile apps, cloud, and AI solutions.",
    image: "/images/enaointingltd-hero.jpg",
    href: "https://www.enaointingltd.com/",
    showVisitLink: true,
  },
  {
    title: "Demargo Interior Contractors",
    type: "Web development",
    description:
      "A polished company website showcasing interior design services and completed work.",
    image: "/images/Demargo Logo.jpg",
    imageFit: "contain",
    href: "https://demargointerior.com",
  },
  {
    title: "AMB360 Cleaning Agency",
    type: "Web development",
    description:
      "A clear, responsive service experience for a professional cleaning company.",
    image: "/images/amb360 logo.png",
    imageFit: "contain",
    href: "https://amb360cleaning.com",
  },
  {
    title: "Rossy's Enterprise Gifts & More",
    type: "E-commerce",
    description:
      "An online storefront for thoughtful gifts and more, designed to make browsing and shopping easy.",
    image: "/images/rossys logo.png",
    imageFit: "contain",
    imageBackground: "#fff",
    href: "https://rossy-s-enterprise.vercel.app/",
    showVisitLink: true,
  },
];

const capabilities = [
  "Product thinking",
  "UI/UX design",
  "Frontend engineering",
  "React",
  "JavaScript",
  "Node.js",
  "PHP",
  "C#",
];

const reveal = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const Home = () => (
  <div className="portfolio-home">
    <section className="portfolio-hero">
      <HeroBackdrop scene="home-hero" />
      <div className="portfolio-shell portfolio-hero-layout">
        <motion.div
          className="portfolio-hero-copy"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.p className="portfolio-eyebrow" variants={reveal}>
            <span className="portfolio-status-dot" />
            Product designer &amp; software developer
          </motion.p>
          <motion.h1 variants={reveal}>
            I build digital products with <em>clarity</em> and purpose.
          </motion.h1>
          <motion.p className="portfolio-hero-description" variants={reveal}>
            I’m Gideon William Ogunu — a UI/UX designer and developer creating
            thoughtful interfaces and reliable web experiences for people and
            businesses.
          </motion.p>
          <motion.div className="portfolio-actions" variants={reveal}>
            <Link to="/projects" className="portfolio-button portfolio-button-primary">
              Explore my work <FaArrowRight aria-hidden="true" />
            </Link>
            <Link to="/contact" className="portfolio-text-link">
              Get in touch <FaArrowRight aria-hidden="true" />
            </Link>
          </motion.div>
          <motion.div className="portfolio-socials" variants={reveal}>
            <a
              href="https://github.com/GideonWill"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Gideon on GitHub"
            >
              <FaGithub aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/gideon-ogunu-795b1224a"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Gideon on LinkedIn"
            >
              <FaLinkedin aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="portfolio-portrait-wrap"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="portfolio-portrait-glow" />
          <img
            className="portfolio-portrait"
            src="/images/Goldenboy.png"
            alt="Gideon William Ogunu"
            fetchpriority="high"
          />
          <p className="portfolio-portrait-name">
            Gideon William <em>Ogunu</em>
          </p>
        </motion.div>
      </div>
      <span className="portfolio-hero-watermark" aria-hidden="true">
        GWO
      </span>
    </section>

    <section className="portfolio-intro-section">
      <motion.div
        className="portfolio-shell portfolio-intro"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={reveal}
      >
        <div className="portfolio-intro-visual">
          <img
            src="/images/website%20laptop.png"
            alt="Laptop and mobile devices displaying a professional website"
            loading="lazy"
          />
        </div>
        <div className="portfolio-intro-copy">
          <p className="portfolio-eyebrow">A considered approach</p>
          <h2>
            Good technology should feel <em>effortless.</em>
          </h2>
          <p>
            From the first sketch to the finished product, I bring design and
            engineering together to make digital experiences useful, intuitive,
            and ready to grow.
          </p>
        </div>
      </motion.div>
    </section>

    <section className="portfolio-projects-section">
      <div className="portfolio-shell">
        <motion.div
          className="portfolio-section-heading"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
        >
          <div>
            <p className="portfolio-eyebrow">Selected work</p>
            <h2>Built for the real world.</h2>
          </div>
          <Link to="/projects" className="portfolio-text-link">
            All projects <FaArrowRight aria-hidden="true" />
          </Link>
        </motion.div>

        <div className="portfolio-project-grid">
          {featuredProjects.map((project, index) => (
            <motion.article
              className="portfolio-project-card"
              key={project.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                ...reveal,
                visible: {
                  ...reveal.visible,
                  transition: {
                    ...reveal.visible.transition,
                    delay: index * 0.08,
                  },
                },
              }}
              whileHover={{ y: -5 }}
            >
              <a
                className={`portfolio-project-image${project.image ? "" : " portfolio-project-image-brand"}`}
                href={project.href}
                target={project.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  project.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={`View ${project.title}`}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    className={project.imageFit === "contain" ? "portfolio-project-image-contain" : ""}
                    style={project.imageBackground ? { backgroundColor: project.imageBackground } : undefined}
                  />
                ) : (
                  <span className="portfolio-project-brand">
                    <strong>PRIVE</strong>
                    <span>GHANA / DIGITAL EXPERIENCE</span>
                  </span>
                )}
                <span className="portfolio-image-arrow">
                  <FaArrowRight aria-hidden="true" />
                </span>
              </a>
              <div className="portfolio-project-copy">
                <p className="portfolio-eyebrow">{project.type}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.showVisitLink ? (
                  <a
                    className="portfolio-project-visit"
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit live site <FaArrowRight aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>

    <section className="portfolio-contact-section">
      <motion.div
        className="portfolio-shell portfolio-contact-card"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={reveal}
      >
        <div>
          <p className="portfolio-eyebrow">Have a good one in mind?</p>
          <h2>Let’s make it happen.</h2>
        </div>
        <Link to="/contact" className="portfolio-button portfolio-button-light">
          Start a conversation <FaArrowRight aria-hidden="true" />
        </Link>
      </motion.div>
    </section>
  </div>
);

export default Home;
