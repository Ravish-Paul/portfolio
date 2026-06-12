"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/icons/Brands";
import { profile, typingTexts } from "@/lib/data";

function useTyping(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const speed = deleting ? 40 : 70;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setDeleting(true), 1400);
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        } else {
          setDeleting(false);
          setIndex((i) => i + 1);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

export default function Hero() {
  const typed = useTyping(typingTexts);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-24 pb-16"
    >
      {/* Background grid + gradient orbs */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      <div
        className="float-slow absolute -top-32 right-[5%] h-[420px] w-[420px] rounded-full opacity-30 blur-[100px]"
        style={{ background: "var(--accent)" }}
        aria-hidden="true"
      />
      <div
        className="float-slow absolute top-1/3 -left-32 h-[380px] w-[380px] rounded-full opacity-20 blur-[100px]"
        style={{ background: "var(--accent-2)", animationDelay: "2s" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl w-full px-4 sm:px-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        {/* Left: text content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 font-mono text-xs text-[var(--accent)] mb-6">
            <span className="terminal-dot pulse-dot bg-[var(--accent)]" />
            status: available for opportunities
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight">
            Building Intelligent{" "}
            <span className="text-gradient">AI Systems</span> for Real-World
            Applications
          </h1>

          <p className="mt-6 max-w-xl text-base sm:text-lg text-[var(--text-dim)] leading-relaxed">
            {profile.tagline}
          </p>

          <div className="mt-5 flex items-center gap-2 font-mono text-sm text-[var(--text-dim)]">
            <Terminal className="h-4 w-4 text-[var(--accent)]" />
            <span>{">"} {typed}</span>
            <span className="caret text-[var(--accent)]">|</span>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-3 font-medium text-[#00150F] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg glass px-5 py-3 font-medium hover:border-[var(--accent)]/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--border)] px-5 py-3 font-medium text-[var(--text-dim)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Right: profile / system card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="relative"
        >
          <div className="glass glow-border rounded-2xl p-5 font-mono text-xs sm:text-sm">
            <div className="flex items-center gap-2 border-b border-[var(--border)] pb-3 mb-4">
              <span className="terminal-dot bg-[#FF5F56]" />
              <span className="terminal-dot bg-[#FFBD2E]" />
              <span className="terminal-dot bg-[#27C93F]" />
              <span className="ml-2 text-[var(--text-dim)]">ravish_paul.config</span>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed text-[var(--text-dim)]">
{`{
  "name": "`}<span className="text-[var(--text)]">Ravish Paul</span>{`",
  "role": "`}<span className="text-[var(--accent)]">AI Engineer</span>{`",
  "focus": [
    `}<span className="text-[var(--accent-2)]">Machine Learning</span>{`,
    `}<span className="text-[var(--accent-2)]">Deep Learning</span>{`,
    `}<span className="text-[var(--accent-2)]">NLP</span>{`,
    `}<span className="text-[var(--accent-2)]">RAG</span>{`,
    `}<span className="text-[var(--accent-2)]">AI Agents</span>{`,
    `}<span className="text-[var(--accent-2)]">LLMs</span>{`
  ],
  "status": "`}<span className="text-[var(--accent)]">building production AI</span>{`"
}`}
            </pre>
          </div>

          <div className="absolute -bottom-5 -right-5 glass rounded-xl px-4 py-3 font-mono text-xs hidden sm:block">
            <div className="text-[var(--text-dim)]">uptime</div>
            <div className="text-[var(--accent)] font-semibold text-lg">99.98%</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
