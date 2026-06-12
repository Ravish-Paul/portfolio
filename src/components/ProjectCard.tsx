"use client";

import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/icons/Brands";
import { type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

const statusColor: Record<Project["status"], string> = {
  Flagship: "bg-[var(--accent)]",
  Production: "bg-[var(--accent-2)]",
  Live: "bg-[var(--accent)]",
};

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative rounded-2xl glass overflow-hidden group"
    >
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left: details */}
        <div className="p-6 sm:p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <span className={cn("h-2 w-2 rounded-full pulse-dot", statusColor[project.status])} />
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)]">
              {project.category}
            </span>
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-semibold mb-3 tracking-tight">
            {project.title}
          </h3>

          <p className="text-[var(--text-dim)] leading-relaxed mb-5">{project.description}</p>

          <div className="mb-5">
            <div className="font-mono text-xs text-[var(--text-dim)] mb-2">key_features:</div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-[var(--text)]">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-[var(--accent)] flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <span
                key={t}
                className="rounded-md border border-[var(--border)] px-2.5 py-1 font-mono text-xs text-[var(--text-dim)]"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-wrap gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[#00150F] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm font-medium text-[var(--text)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <GithubIcon className="h-4 w-4" />
              View Code
            </a>
          </div>
        </div>

        {/* Right: architecture / workflow diagram */}
        <div className="relative border-t lg:border-t-0 lg:border-l border-[var(--border)] bg-[var(--bg-elev)]/50 p-6 sm:p-8 flex flex-col">
          <div className="font-mono text-xs text-[var(--text-dim)] mb-4">{"// architecture_workflow"}</div>
          <div className="flex flex-col gap-2 flex-1 justify-center">
            {project.workflow.map((step, i) => (
              <div key={step} className="flex flex-col items-stretch">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-sm font-mono text-[var(--text)] text-center leading-snug">
                  {step}
                </div>
                {i < project.workflow.length - 1 && (
                  <div className="flex justify-center py-1">
                    <ArrowRight className="h-3.5 w-3.5 rotate-90 text-[var(--accent)]" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="absolute top-4 right-4 font-mono text-[10px] text-[var(--text-dim)]">
            project_{String(index + 1).padStart(2, "0")}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
