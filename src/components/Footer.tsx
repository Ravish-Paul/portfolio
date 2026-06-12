import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-[var(--text-dim)]">
        <div>
          © {new Date().getFullYear()} {profile.name}.
        </div>
        <div className="flex items-center gap-2">
          <span className="terminal-dot bg-[var(--accent)] pulse-dot" />
          system: operational
        </div>
      </div>
    </footer>
  );
}
