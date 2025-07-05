import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BackToTop from "./components/BackToTop";
import ScrollProgress from "./components/ScrollProgress";

const App = () => (
  <div>
    <Navbar />
    <ScrollProgress />
    <Hero />
    <Projects />
    <Skills />
    <About />
    <Contact />
    <Footer />
    <BackToTop />
  </div>
);

export default App;
