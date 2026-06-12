"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  index,
  title,
  subtitle,
  className,
}: {
  index: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn("mb-12", className)}
    >
      <div className="font-mono text-sm text-[var(--accent)] mb-2">{"// " + index}</div>
      <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-[var(--text-dim)] leading-relaxed">{subtitle}</p>}
    </motion.div>
  );
}
