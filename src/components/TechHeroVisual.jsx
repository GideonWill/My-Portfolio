const TechHeroVisual = ({ variant }) => (
  <div
    className={`portfolio-hero-art portfolio-hero-art-${variant}`}
    aria-hidden="true"
  >
    <svg viewBox="0 0 420 330" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="282" cy="148" r="122" className="hero-art-orbit" />
      <circle cx="282" cy="148" r="91" className="hero-art-orbit hero-art-orbit-inner" />
      <path d="M95 262C152 236 192 252 236 225C280 198 305 209 365 157" className="hero-art-path" />
      <circle cx="95" cy="262" r="6" className="hero-art-node" />
      <circle cx="236" cy="225" r="6" className="hero-art-node" />
      <circle cx="365" cy="157" r="6" className="hero-art-node" />
      <rect x="77" y="54" width="253" height="190" rx="18" className="hero-art-window" />
      <path d="M77 83H330" className="hero-art-divider" />
      <circle cx="98" cy="69" r="4" className="hero-art-dot" />
      <circle cx="112" cy="69" r="4" className="hero-art-dot hero-art-dot-muted" />
      <circle cx="126" cy="69" r="4" className="hero-art-dot hero-art-dot-muted" />
      <rect x="101" y="103" width="91" height="116" rx="10" className="hero-art-panel" />
      <rect x="113" y="116" width="66" height="8" rx="4" className="hero-art-line" />
      <rect x="113" y="132" width="45" height="6" rx="3" className="hero-art-line hero-art-line-muted" />
      <rect x="113" y="145" width="56" height="6" rx="3" className="hero-art-line hero-art-line-muted" />
      <rect x="113" y="170" width="64" height="34" rx="7" className="hero-art-chart-bg" />
      <path d="M120 194L132 183L142 188L154 176L169 180" className="hero-art-chart" />
      <rect x="207" y="103" width="103" height="49" rx="10" className="hero-art-panel hero-art-panel-accent" />
      <circle cx="226" cy="127" r="9" className="hero-art-icon" />
      <rect x="242" y="119" width="53" height="6" rx="3" className="hero-art-line" />
      <rect x="242" y="131" width="37" height="5" rx="2.5" className="hero-art-line hero-art-line-muted" />
      <rect x="207" y="163" width="103" height="56" rx="10" className="hero-art-panel" />
      <rect x="220" y="176" width="76" height="6" rx="3" className="hero-art-line hero-art-line-muted" />
      <rect x="220" y="190" width="58" height="6" rx="3" className="hero-art-line" />
      <rect x="220" y="204" width="67" height="5" rx="2.5" className="hero-art-line hero-art-line-muted" />
      <rect x="326" y="246" width="32" height="32" rx="9" className="hero-art-floating" />
      <path d="M336 262H348M342 256V268" className="hero-art-plus" />
    </svg>
  </div>
);

export default TechHeroVisual;
