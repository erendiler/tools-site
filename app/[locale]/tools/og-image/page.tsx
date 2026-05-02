import type { Metadata } from "next";
import OGImageTool from "./OGImageTool";

export const metadata: Metadata = {
  title: "OG Image Generator — ToolPit",
  description: "Design Open Graph images (1200×630) for social media sharing. Free.",
};

export default function OGImagePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8">
        <a href="/" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">OG Image Generator</h1>
        <p className="text-slate-500">Design Open Graph images (1200×630) for social media sharing.</p>
      </div>
      <OGImageTool />
    </div>
  );
}
