import { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { liveProjects } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const tagColors = [
  "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "bg-purple-500/15 text-purple-300 border-purple-500/30",
  "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "bg-amber-500/15 text-amber-300 border-amber-500/30",
];

const typeBadge = {
  personal: { label: "Personal", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  company: { label: "Company", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  client: { label: "Client", color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
};

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const AdminIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const AndroidIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.523 15.341a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm-11 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zM3.513 9.81l-1.8-3.117a.5.5 0 0 1 .866-.5l1.823 3.155A10.9 10.9 0 0 1 12 7.5c2.91 0 5.547 1.135 7.597 2.99l1.824-3.156a.5.5 0 0 1 .866.5L20.487 10.8C22.6 12.64 24 15.257 24 18.22c0 .166-.006.33-.017.493H.017A8.57 8.57 0 0 1 0 18.22c0-2.963 1.4-5.58 3.513-7.41z"/>
  </svg>
);

const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
);

const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
  </svg>
);

const BackArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
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

const LiveBadge = () => (
  <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2.5 py-0.5 w-fit">
    <span className="relative flex h-1.5 w-1.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
    </span>
    <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-widest">Live</span>
  </div>
);

const LiveProjectCard = ({ project, index, cardRef }) => {
  const badge = typeBadge[project.type] || typeBadge.personal;
  return (
    <Link
      to={`/live/${project.id}`}
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden border border-white/5 bg-black-100 transition-all duration-500 hover:border-emerald-500/30 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(16,185,129,0.12)] block"
    >
      {/* Screenshot */}
      <div className="relative overflow-hidden w-full aspect-video max-h-[200px] md:max-h-[240px]">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black-100/90 via-black-100/10 to-transparent" />

        {/* Live badge */}
        <div className="absolute top-4 left-4"><LiveBadge /></div>

        {/* Type badge */}
        <div className="absolute top-4 right-4">
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}>{badge.label}</span>
        </div>

        {/* Hover CTA */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-white text-sm font-semibold">
            View Details <ArrowUpRight />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <div>
          <p className="text-xs text-white/30 uppercase tracking-widest mb-1">{project.tagline}</p>
          <h3 className="text-lg font-bold text-white group-hover:text-white/90 transition-colors">{project.title}</h3>
          <p className="mt-1.5 text-white/50 text-sm leading-relaxed line-clamp-2">{project.description}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span key={tag} className={`text-xs font-medium px-2 py-0.5 rounded-full border ${tagColors[i % tagColors.length]}`}>
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full border border-white/10 text-white/30">+{project.tags.length - 4}</span>
          )}
        </div>

        {/* Quick links preview */}
        <div className="flex flex-wrap gap-2 mt-1 pt-3 border-t border-white/5">
          {project.links.slice(0, 3).map((link) => (
            <span
              key={link.label}
              onClick={(e) => {
                e.preventDefault();
                window.open(link.url, "_blank", "noopener,noreferrer");
              }}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/5 hover:border-white/15 cursor-pointer"
            >
              <span className="text-white/30">{getIcon(link.icon)}</span>
              {link.label}
              <ExternalIcon />
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

const LiveProjectsPage = () => {
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            delay: 0.05 * index,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top bottom-=60" },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0a0a0c] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Back nav */}
        <div className="mb-8">
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300"><BackArrow /></span>
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div ref={titleRef} className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Live in Production</span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold text-white">
              Projects You Can Visit{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                Right Now
              </span>
            </h1>
            <p className="text-white/40 text-sm md:text-base max-w-sm md:text-right">
              Real products, real users — click any card to explore.
            </p>
          </div>
          <div className="h-px bg-gradient-to-r from-emerald-500/50 via-cyan-500/30 to-transparent" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liveProjects.map((project, index) => (
            <LiveProjectCard
              key={project.id}
              project={project}
              index={index}
              cardRef={(el) => (cardRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveProjectsPage;
