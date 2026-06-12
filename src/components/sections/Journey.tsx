"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { timeline } from "@/lib/data";

export default function Journey() {
  return (
    <section id="journey" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="06_journey"
          title="AI Journey"
          subtitle="How my expertise progressed from foundational machine learning to production AI agents."
        />

        <div className="relative">
          <div
            className="absolute left-[15px] sm:left-[19px] top-2 bottom-2 w-px bg-[var(--border)]"
            aria-hidden="true"
          />
          <ol className="space-y-8">
            {timeline.map((step, i) => (
              <motion.li
                key={step.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative flex gap-5 sm:gap-6 pl-0"
              >
                <div className="relative z-10 flex-shrink-0 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full glass text-[var(--accent)] font-mono text-xs">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="rounded-xl glass px-4 py-3 sm:px-5 sm:py-4 flex-1">
                  <h3 className="font-display font-semibold text-base sm:text-lg mb-1">{step.label}</h3>
                  <p className="text-sm text-[var(--text-dim)] leading-relaxed">{step.desc}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
