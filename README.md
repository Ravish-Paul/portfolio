# 🎭 Premium Interactive 3D AI/LLM Portfolio & CMS

A high-performance, visually stunning developer portfolio showcasing AI and LLM engineering expertise. Features a realistic **physics-simulated 3D interactive lanyard badge**, a mouse-reactive **dot-grid shockwave background**, and a **Supabase-backed Admin CMS Panel** for live content management.

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-Link-black?style=for-the-badge&logo=vercel&logoColor=white&color=000000)](https://portfolio-one-phi-q7u05qm31o.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ravish-Paul/portfolio)

</div>

---

## ✨ Features

### 🌟 3D Physics Lanyard Badge
- Fully interactive 3D ID badge with realistic physics (drag, throw, rotate, swing) powered by **React Three Fiber** and **React Three Rapier**.
- **Dynamic 2D Canvas Texturing**: The face of the ID badge is rendered onto a dynamic 2D canvas in real-time, pulling in live profile info, email, GitHub handles, and phone details before mapping onto the 3D model.

### 🎨 Mouse-Reactive Dot Grid Background
- Performance-optimized HTML5 canvas grid where dots react to mouse movement and clicks (producing a shockwave push and elastic return using **GSAP**).

### 🛠️ Global Content Management System (CMS) & Admin Panel
- **Real-Time Database Sync**: Connected to **Supabase** backend to globally store, fetch, and update projects, skills, experience highlights, and contact information.
- **Admin Panel Control**: Accessible by appending `#admin` to the URL. Securely authenticate with a custom PIN.
- **Project Pinning**: Pin specific projects to keep them prioritized at the top of your portfolio layout.
- **Comma-Separated Slideshow Carousel**: Add multiple comma-separated image URLs to projects to display them in a dynamic slider.
- **Rich Media & Video Autoplay**: Supports direct MP4 video URLs as well as embeddable links (YouTube, Vimeo, Loom) for projects.
- **Database Tools**: Auto-seeding of original default data on first-load, with a manual "Reset Database" option in the admin panel.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | React 18, TypeScript |
| **3D Engine & Physics** | Three.js, React Three Fiber, React Three Rapier |
| **Animations** | GSAP (GreenSock) |
| **Database & Auth** | Supabase |
| **Styling** | Tailwind CSS |
| **Build Tools** | Vite, Rollup, PostCSS |

---

## 🚀 Getting Started

Follow these steps to run the portfolio locally on your machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or above recommended).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Ravish-Paul/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   *Note: In local development, if Supabase is not configured, the website will automatically fall back to static fallback data and localStorage cache.*

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 💾 Supabase CMS Configuration (SQL Schema)

To enable global updates via the Admin Panel, follow these steps to set up Supabase:

1. Create a project on the **[Supabase Dashboard](https://supabase.com/)**.
2. Go to the **SQL Editor** tab and run the following schema definition to create the required tables and Row Level Security (RLS) policies:

```sql
-- 1. Projects table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  tech text[] not null default '{}',
  github text not null default '',
  live text not null default '',
  images text[] not null default '{}',
  video text default '',
  pinned boolean not null default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.projects enable row level security;
create policy "Allow public read access" on public.projects for select using (true);
create policy "Allow authenticated all access" on public.projects for all using (true) with check (true);

-- 2. Skills table
create table public.skills (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.skills enable row level security;
create policy "Allow public read access" on public.skills for select using (true);
create policy "Allow authenticated all access" on public.skills for all using (true) with check (true);

-- 3. Highlights table
create table public.highlights (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.highlights enable row level security;
create policy "Allow public read access" on public.highlights for select using (true);
create policy "Allow authenticated all access" on public.highlights for all using (true) with check (true);

-- 4. Contact table
create table public.contact (
  id integer primary key default 1,
  email text not null default '',
  github text not null default '',
  linkedin text not null default '',
  twitter text not null default '',
  phone text not null default '',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint one_row check (id = 1)
);

alter table public.contact enable row level security;
create policy "Allow public read access" on public.contact for select using (true);
create policy "Allow authenticated all access" on public.contact for all using (true) with check (true);
```

### Environment Variables

Add the following environment variables to your deployment settings (e.g. on **Vercel Settings -> Environment Variables** or in a local `.env` file for testing):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

---

## 📁 Directory Structure

```text
├── src/
│   ├── assets/              # Static assets (images, 3D glb models)
│   ├── components/
│   │   ├── DotGrid/         # Mouse-interactive background grid component
│   │   ├── Lanyard/         # Three.js 3D physics-based lanyard card component
│   │   └── AdminPanel.tsx   # Admin dashboard for updating database content
│   ├── lib/
│   │   ├── supabaseClient.ts # Supabase initialization client with fallback safeguards
│   │   └── constants.ts      # Shared default constants and types
│   ├── App.tsx              # Main entry layout and fetch operations
│   ├── main.tsx             # React render root
│   ├── styles.css           # Global CSS overrides and styles
├── index.html
├── rollup.config.mjs        # Production rollup bundler configuration
├── package.json
└── tsconfig.json
```

---

## ✉️ Contact & Connect

- **GitHub**: [Ravish-Paul](https://github.com/Ravish-Paul)
- **LinkedIn**: [Ravish Paul](https://www.linkedin.com/in/ravish-paul/)
- **X / Twitter**: [@PaulkrScratch](https://x.com/PaulkrScratch)
