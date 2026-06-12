"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { GithubIcon } from "@/components/icons/Brands";
import { useTheme } from "./ThemeProvider";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";

const links = [
  { href: "/resume", label: "Resume" },
  { href: "/#about", label: "About" },
  { href: "/#expertise", label: "Expertise" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#github", label: "GitHub" },
  { href: "/#journey", label: "Journey" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <div
        className={cn(
          "mx-auto max-w-6xl px-4 sm:px-6 transition-all duration-300",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between rounded-xl px-4 py-2.5 transition-all duration-300",
            scrolled ? "glass" : "bg-transparent"
          )}
        >
          <a href="#hero" className="font-display font-semibold text-base tracking-tight">
            <span className="text-[var(--accent)] font-mono">~/</span>
            {profile.name}
          </a>

          <nav className="hidden lg:flex items-center gap-6 font-mono text-[13px] text-[var(--text-dim)]">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-[var(--accent)] transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-dim)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
              aria-label="GitHub profile"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-dim)] hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-dim)] lg:hidden hover:text-[var(--accent)] hover:border-[var(--accent)]/40 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-2 glass rounded-xl p-4 flex flex-col gap-3 font-mono text-sm text-[var(--text-dim)]"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="hover:text-[var(--accent)] transition-colors py-1"
              >
                {l.label}
              </a>
            ))}
          </motion.nav>
        )}
      </div>
    </header>
  );
}
