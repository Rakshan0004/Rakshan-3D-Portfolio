import { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../constants";

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

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
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

const ProjectCard = ({ project, index, cardRef }) => {
  const badge = typeBadge[project.type] || typeBadge.personal;
  return (
    <Link
      to={`/projects/${project.id}`}
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden border border-white/5 bg-black-100 transition-all duration-500 hover:border-white/15 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] block"
    >
      {/* Image */}
      <div className="relative overflow-hidden w-full aspect-video max-h-[220px] md:max-h-[260px]">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black-100/90 via-black-100/10 to-transparent" />
        {/* Project number */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg px-3 py-1">
          <span className="text-white/50 text-xs font-mono font-bold tracking-widest">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        {/* Type badge */}
        <div className="absolute top-4 right-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${badge.color}`}>
            {badge.label}
          </span>
        </div>
        {/* Hover CTA overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-sm font-semibold">
            View Details <ArrowUpRight />
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col gap-3">
        <h3 className="font-bold text-white text-lg leading-snug group-hover:text-white/90 transition-colors">
          {project.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{project.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span
              key={tag}
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${tagColors[i % tagColors.length]}`}
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-white/10 text-white/40">
              +{project.tags.length - 4}
            </span>
          )}
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-white/5">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <span className="flex items-center gap-1 text-xs text-white/40 group-hover:text-white/60 transition-colors">
                <GithubIcon /> Code
              </span>
            )}
            {project.demoUrl && (
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                Live
              </span>
            )}
          </div>
          <span className="text-xs text-white/30 group-hover:text-white/50 transition-colors flex items-center gap-1">
            View Details <ArrowUpRight />
          </span>
        </div>
      </div>
    </Link>
  );
};

const ProjectsPage = () => {
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" }
      );

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
    <div className="min-h-screen bg-black pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        {/* Back nav */}
        <div className="mb-8">
          <Link
            to="/"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              <BackArrow />
            </span>
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>

        {/* Header */}
        <div ref={titleRef} className="mb-12">
          <p className="text-white/40 text-sm uppercase tracking-widest font-medium mb-3">
            Selected Work
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <h1 className="text-3xl md:text-5xl xl:text-6xl font-bold text-white">
              Projects I&apos;ve{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Built
              </span>
            </h1>
            <p className="text-white/40 text-sm md:text-base max-w-sm md:text-right">
              Click any card to see full details.
            </p>
          </div>
          <div className="h-px bg-gradient-to-r from-blue-500/50 via-purple-500/30 to-transparent" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
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

export default ProjectsPage;
