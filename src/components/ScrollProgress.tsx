"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100]"
      aria-hidden="true"
    >
      <div className="h-full w-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]" />
    </motion.div>
  );
}
