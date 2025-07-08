import { Suspense, lazy } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BackToTop from "./components/BackToTop";
import ScrollProgress from "./components/ScrollProgress";
import Footer from "./components/Footer";

const Projects = lazy(() => import("./pages/Projects"));
const Skills = lazy(() => import("./pages/Skills"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));

import { Helmet } from "react-helmet-async";
import Spinner from "./components/Spinner";

const App = () => (
 <div className="overflow-x-hidden">
    <Helmet>
      <title>Ashutosh | Frontend Developer Portfolio</title>
      <meta
        name="description"
        content="Ashutosh's portfolio showcasing modern React projects, skills, and web development journey."
      />
      <meta
        name="keywords"
        content="Ashutosh, React developer, frontend developer, web portfolio, JavaScript, BCA student"
      />
      <link rel="canonical" href="https://portfolio-ashutoshh.netlify.app/" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Ashutosh | Web Developer Portfolio" />
      <meta
        property="og:description"
        content="Explore Ashutosh's React projects, tech stack, and skills in this sleek web portfolio."
      />
      <meta
        property="og:image"
        content="https://portfolio-ashutoshh.netlify.app/preview.png"
      />
      <meta
        property="og:url"
        content="https://portfolio-ashutoshh.netlify.app/"
      />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Ashutosh | Web Developer Portfolio" />
      <meta
        name="twitter:description"
        content="Explore Ashutosh's work as a frontend developer with React, Firebase, and Tailwind CSS."
      />
      <meta
        name="twitter:image"
        content="https://portfolio-ashutoshh.netlify.app/preview.png"
      />
    </Helmet>

    {/* Page Structure */}
    <Navbar />
    <ScrollProgress />
    <Hero />
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      }
    >
      <Projects />
      <Skills />
      <About />
      <Contact />
    </Suspense>
    <Footer />
    <BackToTop />
  </div>
);

export default App;
