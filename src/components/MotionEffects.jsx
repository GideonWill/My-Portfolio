import { useEffect, useRef } from "react";

const MotionEffects = () => {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!glow || !finePointer.matches || reducedMotion.matches) {
      return undefined;
    }

    let animationFrame = 0;
    const handlePointerMove = (event) => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        glow.style.setProperty("--cursor-x", `${event.clientX}px`);
        glow.style.setProperty("--cursor-y", `${event.clientY}px`);
        glow.style.opacity = "1";
      });
    };
    const hideGlow = () => {
      glow.style.opacity = "0";
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", hideGlow);
    finePointer.addEventListener("change", hideGlow);
    reducedMotion.addEventListener("change", hideGlow);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", hideGlow);
      finePointer.removeEventListener("change", hideGlow);
      reducedMotion.removeEventListener("change", hideGlow);
    };
  }, []);

  return <div ref={glowRef} className="motion-cursor-glow" aria-hidden="true" />;
};

export default MotionEffects;
