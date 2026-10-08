import { useEffect, useState } from "react";

const readMotionPreferences = () => ({
  isMobile: window.matchMedia("(max-width: 767px)").matches,
  prefersReducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
});

const HeroBackdrop = ({ scene }) => {
  const [preferences, setPreferences] = useState(() =>
    typeof window === "undefined"
      ? { isMobile: false, prefersReducedMotion: false }
      : readMotionPreferences()
  );
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreferences = () => {
      setPreferences({
        isMobile: mobileQuery.matches,
        prefersReducedMotion: motionQuery.matches,
      });
      setVideoReady(false);
    };

    mobileQuery.addEventListener("change", updatePreferences);
    motionQuery.addEventListener("change", updatePreferences);

    return () => {
      mobileQuery.removeEventListener("change", updatePreferences);
      motionQuery.removeEventListener("change", updatePreferences);
    };
  }, []);

  const showVideo = !preferences.isMobile && !preferences.prefersReducedMotion;

  return (
    <div className={`hero-backdrop hero-backdrop-${scene}`} aria-hidden="true">
      <div className="hero-aurora-fallback">
        <span className="hero-fallback-orb hero-fallback-orb-wine" />
        <span className="hero-fallback-orb hero-fallback-orb-blue" />
        {scene === "services-section" ? (
          <svg className="hero-fallback-network" viewBox="0 0 600 300" fill="none">
            <path d="M30 245C145 70 245 88 315 156S465 232 570 36" />
            <path d="M30 245C190 284 435 277 570 36" />
            <circle cx="30" cy="245" r="5" />
            <circle cx="315" cy="156" r="6" />
            <circle cx="570" cy="36" r="5" />
          </svg>
        ) : null}
      </div>
      {showVideo ? (
        <video
          className={`hero-background-video${videoReady ? " is-ready" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={`/media/hero/${scene}.jpg`}
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoReady(false)}
        >
          <source src={`/media/hero/${scene}.webm`} type="video/webm" />
          <source src={`/media/hero/${scene}.mp4`} type="video/mp4" />
        </video>
      ) : null}
      <div className="hero-backdrop-overlay" />
    </div>
  );
};

export default HeroBackdrop;
