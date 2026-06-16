import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ProjectDetail } from "@/components/ProjectDetail";
import { projects, getProject } from "@/lib/projects";

export function generateStaticParams() {
  // Placeholder (WIP) projects have no detail page.
  return projects.filter((p) => !p.placeholder).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.placeholder) return { title: "Not found" };
  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || project.placeholder) notFound();

  // "Next project" cycles through real (non-placeholder) entries only.
  const visible = projects.filter((p) => !p.placeholder);
  const vIndex = visible.findIndex((p) => p.slug === slug);
  const next = visible[(vIndex + 1) % visible.length];

  return (
    <main className="min-h-[100dvh]">
      <Nav />
      <ProjectDetail project={project} next={next} />
      <Footer />
    </main>
  );
}
