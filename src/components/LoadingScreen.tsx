"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--bg)]"
          aria-hidden="true"
        >
          <div className="font-mono text-sm text-[var(--accent)] mb-4">
            <span>$ initializing_system</span>
            <span className="caret">_</span>
          </div>
          <div className="h-[2px] w-48 overflow-hidden rounded-full bg-[var(--border)]">
            <motion.div
              className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-2)]"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </div>
          <div className="mt-4 font-mono text-xs text-[var(--text-dim)]">Ravish Paul // AI Engineer</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
