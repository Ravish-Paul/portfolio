import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="03_projects"
          title="Featured Projects"
          subtitle="Production-grade AI systems — from multi-agent research assistants to autonomous browser agents and RAG-powered applications."
        />

        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
