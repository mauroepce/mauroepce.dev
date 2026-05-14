import IntroGate from "@/components/layout/IntroGate";
import NavBar from "@/components/layout/NavBar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SignalSection from "@/components/sections/SignalSection";
import ContactSection from "@/components/sections/ContactSection";
import SigilA from "@/components/sigils/SigilA";
import { getSignalEntries } from "@/lib/signal";

export default function Home() {
  const signalEntries = getSignalEntries();

  return (
    <IntroGate>
      <NavBar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SignalSection entries={signalEntries} />
        <ContactSection />
      </main>
      <footer className="border-t border-border/40 py-6 px-8 md:px-16 lg:px-24 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SigilA size={16} className="text-foreground/25" />
          <span className="text-xs font-mono text-foreground/18 tracking-widest">
            mauroepce
          </span>
        </div>
        <span className="text-xs font-mono text-foreground/18 tracking-widest">
          © 2026
        </span>
      </footer>
    </IntroGate>
  );
}
