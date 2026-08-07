import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";

// Eager load critical components
import Hero from "./sections/Hero";

// Lazy load all other sections
const FeatureCards = lazy(() => import("./sections/FeatureCards"));
const Experience = lazy(() => import("./sections/Experience"));
const ShowcaseSection = lazy(() => import("./sections/ShowcaseSection"));
const LiveProjects = lazy(() => import("./sections/LiveProjects"));
const LogoShowcase = lazy(() => import("./sections/LogoShowcase"));
const TechStack = lazy(() => import("./sections/TechStack"));
const Education = lazy(() => import("./sections/Education"));
const SocialLinks = lazy(() => import("./sections/SocialLinks"));
const Contact = lazy(() => import("./sections/Contact"));
const FAQ = lazy(() => import("./sections/FAQ"));
const Footer = lazy(() => import("./sections/Footer"));

// Lazy load pages
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const LiveProjectsPage = lazy(() => import("./pages/LiveProjectsPage"));
const LiveProjectDetailPage = lazy(() => import("./pages/LiveProjectDetailPage"));

// Simple loading component
const SectionLoader = () => (
  <div className="flex-center" style={{ minHeight: "50vh" }}>
    <div className="text-white-50 text-xl">Loading...</div>
  </div>
);

const HomePage = () => (
  <>
    {/* 1. Hero — first impression */}
    <Hero />

    {/* 2. What I Do — immediately answer "who is this?" */}
    <Suspense fallback={<SectionLoader />}>
      <FeatureCards />
    </Suspense>

    {/* 3. Experience — strongest credential up front */}
    <Suspense fallback={<SectionLoader />}>
      <Experience />
    </Suspense>

    {/* 4. Projects — "here's what I built" */}
    <Suspense fallback={<SectionLoader />}>
      <ShowcaseSection />
    </Suspense>

    {/* 5. Live Projects — "these are actually running in production" */}
    <Suspense fallback={<SectionLoader />}>
      <LiveProjects />
    </Suspense>

    {/* 6. Logo Showcase — social proof after seeing the work */}
    <Suspense fallback={<SectionLoader />}>
      <LogoShowcase />
    </Suspense>

    {/* 7. Tech Stack — skills that back up the work */}
    <Suspense fallback={<SectionLoader />}>
      <TechStack />
    </Suspense>

    {/* 8. Education — supporting credential */}
    <Suspense fallback={<SectionLoader />}>
      <Education />
    </Suspense>

    {/* 10. Links — dedicated social links section */}
    <Suspense fallback={<SectionLoader />}>
      <SocialLinks />
    </Suspense>

    {/* 11. FAQ — handle common questions */}
    <Suspense fallback={<SectionLoader />}>
      <FAQ />
    </Suspense>

    {/* 12. Contact + Footer — CTA */}
    <Suspense fallback={<SectionLoader />}>
      <Contact />
    </Suspense>

    <Suspense fallback={<SectionLoader />}>
      <Footer />
    </Suspense>
  </>
);

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/projects"
        element={
          <Suspense fallback={<SectionLoader />}>
            <ProjectsPage />
          </Suspense>
        }
      />
      <Route
        path="/projects/:id"
        element={
          <Suspense fallback={<SectionLoader />}>
            <ProjectDetailPage />
          </Suspense>
        }
      />
      <Route
        path="/live"
        element={
          <Suspense fallback={<SectionLoader />}>
            <LiveProjectsPage />
          </Suspense>
        }
      />
      <Route
        path="/live/:id"
        element={
          <Suspense fallback={<SectionLoader />}>
            <LiveProjectDetailPage />
          </Suspense>
        }
      />
    </Routes>
  </>
);

export default App;
