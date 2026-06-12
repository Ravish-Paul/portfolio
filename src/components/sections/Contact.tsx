"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons/Brands";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/lib/data";

const socials = [
  { href: `mailto:${profile.email}`, label: profile.email, icon: Mail },
  { href: profile.github, label: "github.com/Ravish-Paul", icon: GithubIcon },
  { href: profile.linkedin, label: "linkedin.com/in/ravish-paul", icon: LinkedinIcon },
  { href: profile.x, label: "x.com/PaulkrScratch", icon: XIcon },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="07_contact"
          title="Let's Build Something"
          subtitle="Open to AI Engineer, Machine Learning Engineer, and LLM Engineer roles. Reach out — I usually respond within a day."
        />

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-3"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-xl glass px-4 py-4 transition-colors hover:border-[var(--accent)]/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
                  <s.icon className="h-4 w-4" />
                </div>
                <span className="font-mono text-sm text-[var(--text-dim)] group-hover:text-[var(--text)] transition-colors break-all">
                  {s.label}
                </span>
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-2xl glass p-6 sm:p-8"
          >
            {submitted ? (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center text-center gap-3">
                <CheckCircle2 className="h-10 w-10 text-[var(--accent)]" />
                <h3 className="font-display text-xl font-semibold">Message sent</h3>
                <p className="text-sm text-[var(--text-dim)] max-w-sm">
                  Thanks for reaching out. I&apos;ll get back to you at the email you provided.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-xs text-[var(--text-dim)]">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-xs text-[var(--text-dim)]">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="subject" className="font-mono text-xs text-[var(--text-dim)]">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors"
                    placeholder="Role / opportunity / project"
                  />
                </div>
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="message" className="font-mono text-xs text-[var(--text-dim)]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-4 py-2.5 text-sm outline-none focus:border-[var(--accent)] transition-colors resize-none"
                    placeholder="Tell me about the opportunity or project..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-6 py-3 text-sm font-medium text-[#00150F] transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
