import { useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const ProjectCard = ({ project, index, cardRef }) => {
  const badge = typeBadge[project.type] || typeBadge.personal;
  return (
    <Link
      to={`/projects/${project.id}`}
      ref={cardRef}
      id={project.id}
      className="group flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-400 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden w-full" style={{ height: "180px" }}>
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top transition-transform duration-600 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <span className="absolute top-3 left-3 text-white/25 text-[10px] font-mono font-bold tracking-widest">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className={`absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}>
          {badge.label}
        </span>
        {project.demoUrl && (
          <span className="absolute bottom-3 left-3 flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            Live
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2.5 p-4 flex-1">
        <h3 className="font-semibold text-white text-sm md:text-base leading-snug line-clamp-2 group-hover:text-white/90 transition-colors">
          {project.title}
        </h3>
        <p className="text-white/40 text-xs leading-relaxed line-clamp-2 flex-1">{project.description}</p>

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

        <div className="flex items-center justify-between pt-3 mt-1 border-t border-white/6">
          {project.githubUrl && (
            <span className="flex items-center gap-1.5 text-xs text-white/30">
              <GithubIcon /> Code
            </span>
          )}
          <span className="flex items-center gap-0.5 text-xs text-white/25 group-hover:text-white/55 transition-colors ml-auto">
            Details <ChevronRight />
          </span>
        </div>
      </div>
    </Link>
  );
};

const PREVIEW_COUNT = 3;

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardRefs = useRef([]);

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

  const previewProjects = projects.slice(0, PREVIEW_COUNT);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="projects-section relative overflow-hidden isolation-isolate flex items-center"
    >
      {/* Animated background — same style as Social Links */}
      <div className="projects-bg" aria-hidden="true">
        <div className="projects-grid-bg" />
        <div className="projects-orb projects-orb-1" />
        <div className="projects-orb projects-orb-2" />
        <div className="projects-orb projects-orb-3" />
      </div>

      <div className="relative z-10 w-full px-5 md:px-10 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div ref={titleRef} className="mb-10 md:mb-12">
            <p className="text-white/35 text-xs uppercase tracking-[0.18em] font-medium mb-3">Selected Work</p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-white">
                Projects I&apos;ve{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Built</span>
              </h2>
              <p className="text-white/30 text-sm max-w-xs sm:text-right">
                Client work, company projects & personal builds.
              </p>
            </div>
            <div className="mt-5 h-px bg-gradient-to-r from-blue-500/50 via-purple-500/25 to-transparent" />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {previewProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                cardRef={(el) => (cardRefs.current[index] = el)}
              />
            ))}
          </div>

          {/* View All */}
          <div className="mt-10 flex justify-center">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl border border-white/12 bg-white/[0.04] text-white/70 text-sm font-medium hover:bg-white/[0.08] hover:border-white/22 hover:text-white transition-all duration-300"
            >
              View All Projects
              <span className="group-hover:translate-x-0.5 transition-transform duration-300"><ChevronRight /></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
