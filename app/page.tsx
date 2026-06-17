import { Nav } from "@/components/Nav";
import { Masthead } from "@/components/Masthead";
import { Gallery } from "@/components/Gallery";
import { projects } from "@/lib/projects";

export default function HomePage() {
  const years = projects.map((p) => p.year);
  const minY = Math.min(...years);
  const maxY = Math.max(...years);
  const span = minY === maxY ? `${minY}` : `${minY}-${maxY}`;
  const projectCount = projects.filter(
    (p) => (p.section ?? "projects") === "projects",
  ).length;
  const automationCount = projects.filter(
    (p) => p.section === "automation",
  ).length;
  const skillCount = projects.filter((p) => p.section === "skills").length;

  return (
    <main className="min-h-[100dvh] pb-24 sm:pb-32">
      <Nav />
      <Masthead
        projects={projectCount}
        automation={automationCount}
        skills={skillCount}
        years={span}
      />
      <Gallery projects={projects} />
    </main>
  );
}
