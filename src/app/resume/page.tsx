import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Resume | Ravish Paul",
  description: "View Ravish Paul's AI Engineer Resume",
};

export default function ResumePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-28 pb-12 flex flex-col items-center w-full">
        <div className="w-full max-w-6xl h-[80vh] px-4 sm:px-6 flex flex-col gap-4">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl font-display font-semibold">Resume</h1>
            <a 
              href="/Ravish_Kumar_AI_ML_Resume.pdf" 
              download
              className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg font-mono text-sm hover:opacity-90 transition-opacity"
            >
              Download PDF
            </a>
          </div>
          <iframe
            src="/Ravish_Kumar_AI_ML_Resume.pdf#view=FitH"
            className="w-full h-full rounded-xl border border-[var(--border)] shadow-xl bg-white"
            title="Ravish Paul Resume"
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
