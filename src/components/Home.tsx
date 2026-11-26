import type { Project } from "@/lib/content";
import {
  MarqueeBand,
  NordMotionRoot,
} from "@/components/home/MotionPrimitives";
import HomeHero from "@/components/home/HomeHero";
import ProjectsSection from "@/components/home/ProjectsSection";
import ServicesSection from "@/components/home/ServicesSection";
import ValuePropSection from "@/components/home/ValuePropSection";
import ProcessSection from "@/components/home/ProcessSection";
import AboutSection from "@/components/home/AboutSection";
import FaqSection from "@/components/home/FaqSection";
import FinalCtaSection from "@/components/home/FinalCtaSection";

export function Home({
  hasProjects,
  projects = [],
}: {
  name: string;
  hasProjects: boolean;
  projects?: Project[];
}) {
  return (
    <NordMotionRoot>
      <HomeHero hasProjects={hasProjects} />
      <MarqueeBand />
      <ProjectsSection projects={projects} />
      <ServicesSection />
      <ValuePropSection />
      <ProcessSection />
      <AboutSection />
      <FaqSection />
      <FinalCtaSection />
    </NordMotionRoot>
  );
}
