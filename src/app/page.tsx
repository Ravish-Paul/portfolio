import Navbar from "@/components/Navbar";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import LoadingScreen from "@/components/LoadingScreen";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Expertise from "@/components/sections/Expertise";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import GithubSection from "@/components/sections/GithubSection";
import Journey from "@/components/sections/Journey";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Skills />
        <GithubSection />
        <Journey />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
