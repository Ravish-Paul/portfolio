import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const SITE_URL = "https://ravishpaul.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ravish Paul | AI Engineer & LLM Developer",
    template: "%s | Ravish Paul",
  },
  description:
    "Ravish Paul is an AI Engineer specializing in Machine Learning, Deep Learning, NLP, Retrieval-Augmented Generation (RAG), AI Agents, and Large Language Models. Building production-ready AI systems.",
  keywords: [
    "Ravish Paul",
    "AI Engineer",
    "Machine Learning Engineer",
    "LLM Engineer",
    "RAG",
    "AI Agents",
    "Generative AI Engineer",
    "Deep Learning",
    "NLP",
    "LangChain",
    "LangGraph",
  ],
  authors: [{ name: "Ravish Paul", url: "https://github.com/Ravish-Paul" }],
  creator: "Ravish Paul",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Ravish Paul | AI Engineer & LLM Developer",
    description:
      "Building production-ready AI systems using Machine Learning, Deep Learning, NLP, RAG, AI Agents, and Large Language Models.",
    siteName: "Ravish Paul Portfolio",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Ravish Paul - AI Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ravish Paul | AI Engineer & LLM Developer",
    description:
      "Building production-ready AI systems using ML, Deep Learning, NLP, RAG, AI Agents, and LLMs.",
    creator: "@PaulkrScratch",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ravish Paul",
  jobTitle: "AI Engineer",
  url: "https://ravishpaul.dev",
  sameAs: [
    "https://github.com/Ravish-Paul",
    "https://www.linkedin.com/in/ravish-paul/",
    "https://x.com/PaulkrScratch",
  ],
  knowsAbout: [
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "AI Agents",
    "Computer Vision",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300..800&family=Space+Grotesk:wght@400..700&family=JetBrains+Mono:wght@400..700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
