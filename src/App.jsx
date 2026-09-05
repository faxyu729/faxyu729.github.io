import { useRef, useState } from "react";
import CursorGlow from "./components/CursorGlow";
import PortfolioNavigation from "./components/PortfolioNavigation";
import ResumeModal from "./components/ResumeModal";
import {
  MotionPreferenceProvider,
  useMotionPreference,
} from "./hooks/useMotionPreference";
import usePortfolioScrollAnimations from "./hooks/usePortfolioScrollAnimations";
import useScrambleText from "./hooks/useScrambleText";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import GrowthTimelineSection from "./sections/GrowthTimelineSection";
import HeroSection from "./sections/HeroSection";
import OriginSequenceSection from "./sections/OriginSequenceSection";
import WorksGallerySection from "./sections/WorksGallerySection";

function PortfolioPage() {
  const page = useRef(null);
  const coreSequence = useRef(null);
  const archiveSequence = useRef(null);
  const [resumeOpen, setResumeOpen] = useState(false);
  const { motionEnabled } = useMotionPreference();

  usePortfolioScrollAnimations(
    page,
    coreSequence,
    archiveSequence,
    motionEnabled,
  );
  useScrambleText(motionEnabled);

  return (
    <div
      ref={page}
      className={`portfolio ${motionEnabled ? "motion-on" : "motion-off"}`}
    >
      <PortfolioNavigation onOpenResume={() => setResumeOpen(true)} />
      <main id="main">
        <HeroSection sequenceRef={coreSequence} />
        <AboutSection onOpenResume={() => setResumeOpen(true)} />
        <GrowthTimelineSection />
        <OriginSequenceSection sequenceRef={archiveSequence} />
        <WorksGallerySection />
        <ContactSection />
      </main>
      <CursorGlow />
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <MotionPreferenceProvider>
      <PortfolioPage />
    </MotionPreferenceProvider>
  );
}
