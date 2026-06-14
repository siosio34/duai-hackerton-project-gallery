import { Nav } from "@/components/Nav";
import { Masthead } from "@/components/Masthead";
import { Gallery } from "@/components/Gallery";
import { Footer } from "@/components/Footer";
import { projects, getCategories } from "@/lib/projects";

export default function HomePage() {
  const years = projects.map((p) => p.year);
  const span = `${Math.min(...years)}-${Math.max(...years)}`;
  const disciplines = new Set(projects.map((p) => p.category)).size;

  return (
    <main className="min-h-[100dvh]">
      <Nav />
      <Masthead
        count={projects.length}
        years={span}
        disciplines={disciplines}
      />
      <Gallery projects={projects} categories={getCategories()} />
      <Footer />
    </main>
  );
}
