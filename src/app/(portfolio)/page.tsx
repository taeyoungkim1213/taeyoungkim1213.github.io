import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6">
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <footer className="py-10 text-center text-[#8b949e] text-xs border-t border-[#30363d]">
        김태영 © 2026 — taeyoungkim1213.github.io
      </footer>
    </div>
  );
}
