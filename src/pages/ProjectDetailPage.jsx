import { useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { projects } from "../constants";

const tagColors = [
  "bg-blue-500/15 text-blue-300 border-blue-500/30",
  "bg-purple-500/15 text-purple-300 border-purple-500/30",
  "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
  "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "bg-rose-500/15 text-rose-300 border-rose-500/30",
];

const categoryColors = [
  { bg: "from-blue-500/20 to-blue-600/10", border: "border-blue-500/30", label: "text-blue-400", tag: "bg-blue-500/15 text-blue-300 border-blue-500/25" },
  { bg: "from-purple-500/20 to-purple-600/10", border: "border-purple-500/30", label: "text-purple-400", tag: "bg-purple-500/15 text-purple-300 border-purple-500/25" },
  { bg: "from-cyan-500/20 to-cyan-600/10", border: "border-cyan-500/30", label: "text-cyan-400", tag: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25" },
  { bg: "from-emerald-500/20 to-emerald-600/10", border: "border-emerald-500/30", label: "text-emerald-400", tag: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25" },
  { bg: "from-amber-500/20 to-amber-600/10", border: "border-amber-500/30", label: "text-amber-400", tag: "bg-amber-500/15 text-amber-300 border-amber-500/25" },
  { bg: "from-rose-500/20 to-rose-600/10", border: "border-rose-500/30", label: "text-rose-400", tag: "bg-rose-500/15 text-rose-300 border-rose-500/25" },
];

const typeBadge = {
  personal: { label: "Personal Project", color: "bg-blue-500/15 text-blue-400 border-blue-500/30" },
  company: { label: "Company Project", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" },
  client: { label: "Client Project", color: "bg-amber-500/15 text-amber-400 border-amber-500/30" },
};

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const BackArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const project = projects.find((p) => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          delay: 0.3,
        }
      );
    });

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <p className="text-white/50 mb-8">The project you&apos;re looking for doesn&apos;t exist.</p>
          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            ← Back to Projects
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
          <span className="group-hover:-translate-x-0.5 transition-transform duration-300">
            <BackArrow />
          </span>
          <span className="font-medium">Back to Home</span>
        </Link>
        <span className="text-white/20">/</span>
        <Link
          to="/projects"
          onClick={() => window.scrollTo(0, 0)}
          className="hover:text-white transition-colors duration-300 font-medium cursor-pointer py-1 px-2 rounded-lg hover:bg-white/5"
        >
          Back to Projects
        </Link>
      </div>

      <div ref={heroRef} className="max-w-6xl mx-auto px-5 md:px-10">
        {/* Hero Section */}
        {project.heroFit === "portrait" ? (
          <div className="mb-10">
            <div className="mx-auto w-[220px] sm:w-[260px] md:w-[300px] aspect-[349/715] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain bg-black"
              />
            </div>
            <div className="text-center mt-6">
              <div className="flex flex-wrap items-center justify-center gap-3 mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badge.color}`}>
                  {badge.label}
                </span>
                {project.demoUrl && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    Live
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl xl:text-5xl font-bold text-white leading-tight">
                {project.title}
              </h1>
            </div>
          </div>
        ) : (
          <div className="relative rounded-2xl overflow-hidden border border-white/10 mb-10">
            <div className="relative aspect-video max-h-[400px] md:max-h-[480px]">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${badge.color}`}>
                  {badge.label}
                </span>
                {project.demoUrl && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                    </span>
                    Live
                  </span>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl xl:text-5xl font-bold text-white leading-tight">
                {project.title}
              </h1>
            </div>
          </div>
        )}

        {/* Content */}
        <div ref={contentRef} className="space-y-10">
          {/* Description + Links Row */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                {project.details?.overview || project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full border ${tagColors[i % tagColors.length]}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-col gap-3 lg:min-w-[220px]">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-white hover:bg-white/10 hover:border-white/25 transition-all duration-300 text-sm font-medium"
                >
                  <GithubIcon />
                  View Source Code
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold hover:opacity-90 transition-all duration-300"
                >
                  <ExternalLinkIcon />
                  Live Demo
                </a>
              )}
            </div>
          </div>

          {/* Screenshots */}
          {project.screenshots && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center text-blue-400">
                  📱
                </span>
                Screenshots
              </h2>
              <div className="flex flex-nowrap gap-4 overflow-x-auto justify-center sm:justify-start pb-1">
                {project.screenshots.map((src, i) => (
                  <div
                    key={src}
                    className="shrink-0 rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden"
                  >
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
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center text-blue-400">
                  ⚡
                </span>
                Key Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.details.highlights.map((highlight, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all duration-300"
                  >
                    <span className="mt-0.5 text-emerald-400 shrink-0">
                      <CheckIcon />
                    </span>
                    <span className="text-white/70 text-sm leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture Highlights (Logistics-specific) */}
          {project.details?.architectureHighlights && (
            <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center text-amber-400">
                  🏗️
                </span>
                Architecture Highlights
              </h2>
              <div className="space-y-3">
                {project.details.architectureHighlights.map((highlight, i) => {
                  const [title, ...rest] = highlight.split(": ");
                  const desc = rest.join(": ");
                  return (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-white/[0.03] border border-amber-500/10"
                    >
                      <span className="text-amber-400 font-semibold text-sm">{title}</span>
                      {desc && <span className="text-white/60 text-sm">: {desc}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tech Stack by Category */}
          {project.details?.techCategories && (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center text-cyan-400">
                  🛠️
                </span>
                Tech Stack
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(project.details.techCategories).map(([category, techs], i) => {
                  const color = categoryColors[i % categoryColors.length];
                  return (
                    <div
                      key={category}
                      className={`rounded-xl border ${color.border} bg-gradient-to-br ${color.bg} p-5`}
                    >
                      <h3 className={`text-sm font-bold uppercase tracking-wider mb-3 ${color.label}`}>
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {techs.map((tech) => (
                          <span
                            key={tech}
                            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${color.tag}`}
                          >
                            {tech}
                          </span>
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

export default ProjectDetailPage;
