import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import HeroBackdrop from "./HeroBackdrop";

const MotionLink = motion.create(Link);

const contentVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
};

const CinematicHero = ({
  scene,
  eyebrow,
  title,
  description,
  metadata,
  ctaLabel,
  to,
  href,
  download = false,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const initial = prefersReducedMotion ? false : "hidden";

  return (
    <section
      className={`cinematic-hero cinematic-hero-${scene}`}
      aria-labelledby={`${scene}-title`}
    >
      <HeroBackdrop scene={scene} />
      <motion.div
        className="cinematic-hero-copy portfolio-shell"
        initial={initial}
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: prefersReducedMotion ? 0 : 0.14 } },
        }}
      >
        <motion.p className="portfolio-eyebrow cinematic-hero-eyebrow" variants={contentVariants}>
          {eyebrow}
        </motion.p>
        <motion.h1
          id={`${scene}-title`}
          className="cinematic-hero-title"
          variants={contentVariants}
        >
          {title}
        </motion.h1>
        <motion.p className="cinematic-hero-description" variants={contentVariants}>
          {description}
        </motion.p>
        {metadata ? (
          <motion.p className="cinematic-hero-metadata" variants={contentVariants}>
            {metadata}
          </motion.p>
        ) : null}
        <motion.div variants={contentVariants}>
          {to ? (
            <MotionLink
              to={to}
              className="cinematic-hero-cta"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.025, y: -3 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              <span>{ctaLabel}</span>
              <FaArrowRight aria-hidden="true" />
            </MotionLink>
          ) : (
            <motion.a
              href={href}
              download={download || undefined}
              className="cinematic-hero-cta"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.025, y: -3 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              {download ? <FaDownload aria-hidden="true" /> : null}
              <span>{ctaLabel}</span>
              {!download ? <FaArrowRight aria-hidden="true" /> : null}
            </motion.a>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CinematicHero;
