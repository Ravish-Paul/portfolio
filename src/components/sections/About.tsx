"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading index="01_about" title="About Me" />

        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5 text-[var(--text-dim)] leading-relaxed text-base sm:text-lg"
          >
            <p>
              I&apos;m an AI Engineer driven by a deep curiosity for how intelligent systems
              learn, reason, and make decisions. My work centers on turning research-grade AI
              concepts into{" "}
              <span className="text-[var(--text)]">reliable, production-ready applications</span>{" "}
              that solve real problems for real users.
            </p>
            <p>
              I specialize in building{" "}
              <span className="text-[var(--accent)]">LLM-powered applications</span> — from
              retrieval-augmented generation pipelines that ground model outputs in trusted data,
              to autonomous AI agents that plan and execute multi-step tasks without human
              intervention.
            </p>
            <p>
              My foundation in{" "}
              <span className="text-[var(--text)]">Machine Learning and Deep Learning</span> gives
              me the depth to go beyond API calls — understanding model architectures, training
              dynamics, and evaluation methodology so the systems I build are not just demos, but
              dependable infrastructure.
            </p>
            <p>
              Whether it&apos;s a multi-agent research system, a browser automation agent, or a
              RAG-based document assistant, my focus stays the same:{" "}
              <span className="text-[var(--text)]">
                ship AI that works in production, not just in notebooks.
              </span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass rounded-2xl p-6 font-mono text-sm"
          >
            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3 mb-4 text-[var(--text-dim)]">
              <span className="terminal-dot bg-[#FF5F56]" />
              <span className="terminal-dot bg-[#FFBD2E]" />
              <span className="terminal-dot bg-[#27C93F]" />
              <span className="ml-2">profile.summary()</span>
            </div>
            <div className="space-y-3 text-[var(--text-dim)]">
              <div className="flex justify-between border-b border-[var(--border)]/60 pb-2">
                <span>focus_areas</span>
                <span className="text-[var(--text)] text-right">ML, DL, NLP, RAG, Agents, LLMs</span>
              </div>
              <div className="flex justify-between border-b border-[var(--border)]/60 pb-2">
                <span>core_languages</span>
                <span className="text-[var(--text)]">Python, SQL</span>
              </div>
              <div className="flex justify-between border-b border-[var(--border)]/60 pb-2">
                <span>frameworks</span>
                <span className="text-[var(--text)] text-right">PyTorch, TensorFlow, LangChain</span>
              </div>
              <div className="flex justify-between border-b border-[var(--border)]/60 pb-2">
                <span>specialization</span>
                <span className="text-[var(--accent)]">Production AI Systems</span>
              </div>
              <div className="flex justify-between">
                <span>mission</span>
                <span className="text-[var(--text)] text-right">Solve real problems with AI</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
