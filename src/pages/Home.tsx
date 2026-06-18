import React from "react";
import Navigation from "@/components/portfolio/Navigation";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Skills from "@/components/portfolio/Skills";
import Experience from "@/components/portfolio/Experience";
import Projects from "@/components/portfolio/Projects";
import Achievements from "@/components/portfolio/Achievements";
import ResumeSection from "@/components/portfolio/ResumeSection";
import Contact from "@/components/portfolio/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Achievements />
        <ResumeSection />
        <Contact />
      </main>
    </div>
  );
}
