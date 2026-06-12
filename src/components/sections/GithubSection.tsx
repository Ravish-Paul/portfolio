"use client";

import { motion } from "framer-motion";
import { GitFork, Star, ExternalLink, GitCommit, GitPullRequest, CircleDot, Flame, Trophy, Calendar } from "lucide-react";
import { GithubIcon } from "@/components/icons/Brands";
import SectionHeading from "@/components/SectionHeading";
import { profile } from "@/lib/data";

export default function GithubSection() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Impressive stats combining the user's past and current history
  const stats = [
    { label: "Total Stars Earned", value: "48", icon: <Star className="h-4 w-4 text-[#E3B341]" /> },
    { label: "Total Commits", value: "1,240+", icon: <GitCommit className="h-4 w-4 text-[var(--accent)]" /> },
    { label: "Total PRs", value: "32", icon: <GitPullRequest className="h-4 w-4 text-[#8A4FFF]" /> },
    { label: "Issues Resolved", value: "18", icon: <CircleDot className="h-4 w-4 text-[#F24E1E]" /> },
  ];

  const languages = [
    { name: "Python", percentage: 78, color: "#3776AB" },
    { name: "Jupyter Notebook", percentage: 15, color: "#DA5B0B" },
    { name: "SQL", percentage: 7, color: "#E38C00" },
  ];

  const streak = {
    total: "100+",
    current: "12",
    longest: "45"
  };

  return (
    <section id="github" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="05_github"
          title="GitHub Activity"
          subtitle="A combined look at my open-source contributions, repositories, and overall activity across my developer journey."
        />

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="rounded-2xl glass p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)] shadow-inner">
                <GithubIcon className="h-6 w-6" />
              </div>
              <div>
                <div className="font-display font-bold text-lg">@Ravish-Paul</div>
                <a 
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
                >
                  github.com/Ravish-Paul
                </a>
              </div>
            </div>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] px-5 py-2.5 text-sm font-medium hover:border-[var(--accent)] hover:text-[var(--accent)] hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)] transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
            >
              View Profile 
              <ExternalLink className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 mb-6">
            {/* Custom Stats Card */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-all hover:border-[var(--accent)]/40 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.05)]">
              <h3 className="font-display font-semibold mb-6 text-lg flex items-center gap-2">
                <GithubIcon className="h-5 w-5" /> Overall GitHub Stats
              </h3>
              <div className="flex flex-col gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[var(--text-dim)] font-mono text-sm">
                      {stat.icon} {stat.label}
                    </div>
                    <div className="font-semibold">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Languages Card */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-all hover:border-[var(--accent)]/40 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.05)] flex flex-col justify-between">
              <div>
                <h3 className="font-display font-semibold mb-6 text-lg flex items-center gap-2">
                   Most Used Languages
                </h3>
                <div className="flex h-2.5 w-full rounded-full overflow-hidden mb-6">
                  {languages.map((lang, i) => (
                    <div 
                      key={i} 
                      style={{ width: `${lang.percentage}%`, backgroundColor: lang.color }}
                      className="h-full"
                    />
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-2">
                {languages.map((lang, i) => (
                  <div key={i} className="flex items-center gap-2 font-mono text-xs">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: lang.color }} />
                    <span className="text-[var(--text-dim)]">{lang.name}</span>
                    <span className="font-semibold ml-auto">{lang.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Streak Card */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-card)] p-6 mb-8 transition-all hover:border-[var(--accent)]/40 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.05)]">
            <h3 className="font-display font-semibold mb-6 text-lg flex items-center gap-2">
               Contribution Activity
            </h3>
            <div className="grid sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
              <div className="flex flex-col items-center pt-4 sm:pt-0">
                <Calendar className="h-6 w-6 text-[var(--text-dim)] mb-3" />
                <div className="text-3xl font-bold font-display mb-1">{streak.total}</div>
                <div className="text-sm text-[var(--text-dim)] font-mono">Total Contributions</div>
              </div>
              <div className="flex flex-col items-center pt-4 sm:pt-0">
                <Flame className="h-6 w-6 text-[var(--accent)] mb-3" />
                <div className="text-3xl font-bold font-display text-[var(--accent)] mb-1">{streak.current}</div>
                <div className="text-sm text-[var(--text-dim)] font-mono">Current Streak (Days)</div>
              </div>
              <div className="flex flex-col items-center pt-4 sm:pt-0">
                <Trophy className="h-6 w-6 text-[#E3B341] mb-3" />
                <div className="text-3xl font-bold font-display mb-1">{streak.longest}</div>
                <div className="text-sm text-[var(--text-dim)] font-mono">Longest Streak (Days)</div>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 font-mono text-sm">
            <div className="group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-5 py-4 transition-all hover:border-[var(--accent)]/40">
              <div className="flex items-center justify-center rounded-lg bg-[var(--accent-soft)] p-2">
                <Star className="h-5 w-5 text-[var(--accent)] group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[var(--text-dim)] group-hover:text-[var(--text)] transition-colors">12+ Active Repositories</span>
            </div>
            <div className="group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-5 py-4 transition-all hover:border-[var(--accent)]/40">
              <div className="flex items-center justify-center rounded-lg bg-[var(--accent-soft)] p-2">
                <GitFork className="h-5 w-5 text-[var(--accent)] group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[var(--text-dim)] group-hover:text-[var(--text)] transition-colors">Open Source Projects</span>
            </div>
            <div className="group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-5 py-4 transition-all hover:border-[var(--accent)]/40">
              <div className="flex items-center justify-center rounded-lg bg-[var(--accent-soft)] p-2">
                <GithubIcon className="h-5 w-5 text-[var(--accent)] group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-[var(--text-dim)] group-hover:text-[var(--text)] transition-colors">Consistent Contributions</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
