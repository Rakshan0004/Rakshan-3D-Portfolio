import { useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { liveProjects } from "../constants";

const tagColors = [
  "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "bg-purple-500/15 text-purple-300 border-purple-500/30",
  "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "bg-amber-500/15 text-amber-300 border-amber-500/30",
];

const categoryColors = [
  { bg: "from-blue-500/20 to-blue-600/10", border: "border-blue-500/30", label: "text-blue-400", tag: "bg-blue-500/15 text-blue-300 border-blue-500/25" },
  { bg: "from-purple-500/20 to-purple-600/10", border: "border-purple-500/30", label: "text-purple-400", tag: "bg-purple-500/15 text-purple-300 border-purple-500/25" },
  { bg: "from-cyan-500/20 to-cyan-600/10", border: "border-cyan-500/30", label: "text-cyan-400", tag: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25" },
  { bg: "from-emerald-500/20 to-emerald-600/10", border: "border-emerald-500/30", label: "text-emerald-400", tag: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25" },
  { bg: "from-amber-500/20 to-amber-600/10", border: "border-amber-500/30", label: "text-amber-400", tag: "bg-amber-500/15 text-amber-300 border-amber-500/25" },
];

const typeBadge = {
  personal: { label: "Personal Project", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  company: { label: "Company Project", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  client: { label: "Client Project", color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
};

const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const AdminIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const AndroidIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.523 15.341a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zm-11 0a.5.5 0 1 0 1 0 .5.5 0 0 0-1 0zM3.513 9.81l-1.8-3.117a.5.5 0 0 1 .866-.5l1.823 3.155A10.9 10.9 0 0 1 12 7.5c2.91 0 5.547 1.135 7.597 2.99l1.824-3.156a.5.5 0 0 1 .866.5L20.487 10.8C22.6 12.64 24 15.257 24 18.22c0 .166-.006.33-.017.493H.017A8.57 8.57 0 0 1 0 18.22c0-2.963 1.4-5.58 3.513-7.41z"/>
  </svg>
);

const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
);

const BackArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
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
  <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 py-1 w-fit">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
    </span>
    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Live</span>
  </div>
);

const LiveProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const project = liveProjects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!project) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out", delay: 0.3 }
      );
    });
    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <button onClick={() => navigate("/live")} className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all">
            ← Back to Live Projects
          </button>
        </div>
      </div>
    );
  }

  const badge = typeBadge[project.type] || typeBadge.personal;

  return (
    <div className="min-h-screen bg-black pt-32 md:pt-36 pb-20 relative z-10">
      {/* Back Navigation */}
      <div className="max-w-6xl mx-auto px-5 md:px-10 mb-8 flex items-center gap-3 text-sm text-white/50 relative z-30">
        <Link
          to="/"
          onClick={() => window.scrollTo(0, 0)}
          className="inline-flex items-center gap-1.5 hover:text-white transition-colors duration-300 group cursor-pointer py-1 px-2 -ml-2 rounded-lg hover:bg-white/5"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform duration-300"><BackArrow /></span>
          <span className="font-medium">Back to Home</span>
        </Link>
        <span className="text-white/20">/</span>
        <Link
          to="/live"
          onClick={() => window.scrollTo(0, 0)}
          className="hover:text-white transition-colors duration-300 font-medium cursor-pointer py-1 px-2 rounded-lg hover:bg-white/5"
        >
          Back to Live Projects
        </Link>
      </div>

      <div ref={heroRef} className="max-w-6xl mx-auto px-5 md:px-10">
        {/* Hero */}
        {project.heroFit === "portrait" ? (
          <div className="mb-10">
            <div className="relative mx-auto w-[220px] sm:w-[260px] md:w-[300px] aspect-[349/715] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <img src={project.image} alt={project.title} className="w-full h-full object-contain bg-black" />
              <div className="absolute top-3 left-3"><LiveBadge /></div>
            </div>
            <div className="text-center mt-6">
              <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badge.color}`}>{badge.label}</span>
              </div>
              <p className="text-white/50 text-sm uppercase tracking-widest mb-1">{project.tagline}</p>
              <h1 className="text-2xl md:text-4xl xl:text-5xl font-bold text-white leading-tight">{project.title}</h1>
            </div>
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-10">
            <div className="relative aspect-video max-h-[400px] md:max-h-[480px]">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>
            <div className="absolute top-4 left-4"><LiveBadge /></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badge.color}`}>{badge.label}</span>
              </div>
              <p className="text-white/50 text-sm uppercase tracking-widest mb-1">{project.tagline}</p>
              <h1 className="text-2xl md:text-4xl xl:text-5xl font-bold text-white leading-tight">{project.title}</h1>
            </div>
          </div>
        )}

        {/* Content */}
        <div ref={contentRef} className="space-y-10">
          {/* Description + Live Links */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                {project.details?.overview || project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag, i) => (
                  <span key={tag} className={`text-xs font-medium px-3 py-1.5 rounded-full border ${tagColors[i % tagColors.length]}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Live Links */}
            <div className="flex flex-col gap-3 lg:min-w-[220px]">
              <p className="text-xs text-white/30 uppercase tracking-widest font-medium">Access</p>
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-300 text-sm text-white/80 hover:text-white group"
                >
                  <span className="text-white/50 group-hover:text-emerald-400 transition-colors">{getIcon(link.icon)}</span>
                  <span>{link.label}</span>
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-white/40"><ExternalIcon /></span>
                </a>
              ))}
              {/* If it also exists in projects, link there */}
              {project.projectRef && (
                <Link
                  to={`/projects/${project.projectRef}`}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/5 transition-all duration-300 text-sm text-white/40 hover:text-white/60 mt-2"
                >
                  View Full Project Details →
                </Link>
              )}
            </div>
          </div>

          {/* Screenshots */}
          {project.screenshots && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 flex items-center justify-center text-emerald-400">📱</span>
                Screenshots
              </h2>
              <div className="flex flex-nowrap gap-4 overflow-x-auto justify-center sm:justify-start pb-1">
                {project.screenshots.map((src, i) => (
                  <div key={src} className="shrink-0 rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden">
                    <img
                      src={src}
                      alt={`${project.title} screenshot ${i + 1}`}
                      loading="lazy"
                      decoding="async"
                      className="h-64 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Highlights */}
          {project.details?.highlights && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 flex items-center justify-center text-emerald-400">⚡</span>
                Key Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.details.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/20 transition-all duration-300">
                    <span className="mt-0.5 text-emerald-400 shrink-0"><CheckIcon /></span>
                    <span className="text-white/70 text-sm leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          {project.details?.techCategories && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center text-cyan-400">🛠️</span>
                Tech Stack
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(project.details.techCategories).map(([category, techs], i) => {
                  const color = categoryColors[i % categoryColors.length];
                  return (
                    <div key={category} className={`rounded-xl border ${color.border} bg-gradient-to-br ${color.bg} p-5`}>
                      <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 ${color.label}`}>{category}</h3>
                      <div className="flex flex-wrap gap-2">
                        {techs.map((tech) => (
                          <span key={tech} className={`text-xs font-medium px-2.5 py-1 rounded-full border ${color.tag}`}>{tech}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LiveProjectDetailPage;
