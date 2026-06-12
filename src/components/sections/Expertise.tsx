"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  Layers,
  MessageSquareText,
  Sparkles,
  Search,
  Bot,
  ScanEye,
  Terminal,
  Database,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { expertise } from "@/lib/data";

const icons: Record<string, LucideIcon> = {
  BrainCircuit,
  Layers,
  MessageSquareText,
  Sparkles,
  Search,
  Bot,
  ScanEye,
  Terminal,
  Database,
};

export default function Expertise() {
  return (
    <section id="expertise" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="02_expertise"
          title="Areas of Expertise"
          subtitle="Core technical domains I work in across the AI engineering stack."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {expertise.map((item, i) => {
            const Icon = icons[item.icon];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                className="group relative rounded-2xl glass p-6 transition-all hover:-translate-y-1 hover:border-[var(--accent)]/40"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] transition-transform group-hover:scale-110">
                  {Icon && <Icon className="h-5 w-5" />}
                </div>
                <h3 className="font-display text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-dim)] leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
