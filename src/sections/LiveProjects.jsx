import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { liveProjects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const HOMEPAGE_LIVE_IDS = ["logistics-platform", "kmpleet", "plutorides"];

const tagColors = [
  "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "bg-purple-500/15 text-purple-300 border-purple-500/30",
  "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "bg-amber-500/15 text-amber-300 border-amber-500/30",
];

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const AdminIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);
const AndroidIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.523 15.341a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm-11 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zM3.513 9.81l-1.8-3.117a.5.5 0 0 1 .866-.5l1.823 3.155A10.9 10.9 0 0 1 12 7.5c2.91 0 5.547 1.135 7.597 2.99l1.824-3.156a.5.5 0 0 1 .866.5L20.487 10.8C22.6 12.64 24 15.257 24 18.22c0 .166-.006.33-.017.493H.017A8.57 8.57 0 0 1 0 18.22c0-2.963 1.4-5.58 3.513-7.41z"/>
  </svg>
);
const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);
const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
);
const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const getIcon = (type) => {
  switch (type) {
    case "admin": return <AdminIcon />;
    case "android": return <AndroidIcon />;
    case "apple": return <AppleIcon />;
    default: return <GlobeIcon />;
  }
};

const LiveCard = ({ project, cardRef }) => (
  <Link
    to={`/live/${project.id}`}
    ref={cardRef}
    className="group flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-emerald-500/25 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(16,185,129,0.1)]"
  >
    {/* Screenshot */}
    <div className="relative overflow-hidden w-full" style={{ height: "180px" }}>
      <img
        src={project.image}
        alt={project.title}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover object-top transition-transform duration-600 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
      {/* Live badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 rounded-full px-2.5 py-1">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
        </span>
        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Live</span>
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-col gap-2.5 p-4 flex-1">
      <div>
        <p className="text-[10px] text-white/25 uppercase tracking-widest mb-1 truncate">{project.tagline}</p>
        <h3 className="text-sm md:text-base font-semibold text-white group-hover:text-white/90 leading-snug line-clamp-1 transition-colors">
          {project.title}
        </h3>
        <p className="mt-1.5 text-white/40 text-xs leading-relaxed line-clamp-2">{project.description}</p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {project.tags.slice(0, 3).map((tag, i) => (
          <span key={tag} className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${tagColors[i % tagColors.length]}`}>
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className="text-[10px] text-white/25 px-2 py-0.5 rounded-full border border-white/8">
            +{project.tags.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 mt-1 pt-3 border-t border-white/6 flex-wrap">
        {project.links.slice(0, 2).map((link) => (
          <span
            key={link.label}
            onClick={(e) => {
              e.preventDefault();
              window.open(link.url, "_blank", "noopener,noreferrer");
            }}
            className="flex items-center gap-1 text-[10px] text-white/35 hover:text-white/65 transition-colors cursor-pointer px-2 py-1 rounded-lg bg-white/[0.04] border border-white/6 hover:border-white/15"
          >
            <span className="text-white/20">{getIcon(link.icon)}</span>
            {link.label}
            <ExternalIcon />
          </span>
        ))}
        <span className="flex items-center gap-0.5 text-[11px] text-white/20 group-hover:text-emerald-400/60 transition-colors ml-auto">
          Details <ChevronRight />
        </span>
      </div>
    </div>
  </Link>
);

const LiveProjects = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  const previewProjects = liveProjects.filter((p) => HOMEPAGE_LIVE_IDS.includes(p.id));

  useGSAP(() => {
    gsap.fromTo(titleRef.current, { y: 24, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.9, ease: "power2.out",
      scrollTrigger: { trigger: titleRef.current, start: "top bottom-=80" },
    });
    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(card, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.7, delay: 0.1 * index, ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top bottom-=60" },
      });
    });
  }, []);

  return (
    <section
      id="live-projects"
      ref={sectionRef}
      className="live-section relative overflow-hidden isolation-isolate flex items-center"
    >
      {/* Animated background — same style as Social Links, emerald-tinted orbs */}
      <div className="live-bg" aria-hidden="true">
        <div className="live-grid-bg" />
        <div className="live-orb live-orb-1" />
        <div className="live-orb live-orb-2" />
        <div className="live-orb live-orb-3" />
      </div>

      <div className="relative z-10 w-full px-5 md:px-10 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={titleRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 md:mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-[0.15em]">Live in Production</span>
              </div>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white">
                Visit Them{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Right Now
                </span>
              </h2>
              <p className="mt-2 text-white/30 text-sm max-w-sm">
                Real products running in production — click any card to explore.
              </p>
            </div>
            <Link
              to="/live"
              className="group self-start sm:self-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] text-emerald-400/80 text-sm font-medium hover:bg-emerald-500/[0.12] hover:border-emerald-500/35 hover:text-emerald-400 transition-all duration-300 whitespace-nowrap"
            >
              View All Live Projects
              <span className="group-hover:translate-x-0.5 transition-transform duration-300"><ChevronRight /></span>
            </Link>
          </div>

          {/* Divider */}
          <div className="mb-8 h-px bg-gradient-to-r from-emerald-500/40 via-cyan-500/15 to-transparent" />

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {previewProjects.map((project, index) => (
              <LiveCard
                key={project.id}
                project={project}
                cardRef={(el) => (cardRefs.current[index] = el)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveProjects;
