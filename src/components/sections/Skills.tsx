"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { skills } from "@/lib/data";

export default function Skills() {
  const entries = Object.entries(skills);

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="04_skills"
          title="Technical Skills"
          subtitle="The languages, frameworks, and tools I use to design, train, and ship AI systems."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="rounded-2xl glass p-6"
            >
              <div className="font-mono text-xs text-[var(--accent)] mb-3">{category}</div>
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-[var(--border)] bg-[var(--bg-card)] px-3 py-1.5 text-sm text-[var(--text)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
