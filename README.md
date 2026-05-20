# 🎭 Interactive 3D AI/LLM Portfolio

A premium, interactive developer portfolio showcasing AI and LLM engineering expertise. It features a physics-simulated **3D interactive lanyard badge** and a mouse-reactive **dot-grid shockwave background**.

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live_Demo-Link-black?style=for-the-badge&logo=vercel&logoColor=white&color=000000)](https://portfolio-one-phi-q7u05qm31o.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Ravish-Paul/portfolio)

</div>

---

## ✨ Features

- **Interactive 3D Lanyard**: A fully interactive 3D ID badge with realistic physics (drag, throw, rotate) powered by **React Three Fiber** and **React Three Rapier**.
- **Dynamic 2D Canvas Texturing**: The face of the ID badge is rendered onto a dynamic 2D canvas in real-time, pulling in live profile info, email, GitHub handles, and phone details before mapping onto the 3D model.
- **Interactive Dot Grid Background**: A performance-optimized HTML5 canvas grid where dots react to mouse movement and clicks (producing a shockwave push and elastic return using **GSAP**).
- **Responsive Layout**: Designed with a clean, minimal typography system that scales beautifully across mobile, tablet, and desktop screens.
- **Snappy Native Scroll**: Instant smooth scroll transitions when clicking call-to-action buttons.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **3D Graphics**: [Three.js](https://threejs.org/) via [@react-three/fiber](https://github.com/pmndrs/react-three-fiber) & [@react-three/drei](https://github.com/pmndrs/drei)
- **Physics Engine**: [@react-three/rapier](https://github.com/pmndrs/react-three-rapier)
- **Animations**: [GSAP (GreenSock)](https://greensock.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

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

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📁 Directory Structure

```text
├── src/
│   ├── assets/              # Static assets (images, 3D glb models)
│   ├── components/
│   │   ├── DotGrid/         # Mouse-interactive background grid component
│   │   └── Lanyard/         # Three.js 3D physics-based lanyard card component
│   ├── App.tsx              # Main entry layout
│   ├── main.tsx             # React render root
│   ├── styles.css           # Global Tailwind and custom CSS overrides
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

---

## ✉️ Contact & Connect

- **GitHub**: [Ravish-Paul](https://github.com/Ravish-Paul)
- **LinkedIn**: [Ravish Paul](https://www.linkedin.com/in/ravish-paul/)
- **X / Twitter**: [@PaulkrScratch](https://x.com/PaulkrScratch)
