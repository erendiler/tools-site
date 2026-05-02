import type { Metadata } from "next";
import FaviconTool from "./FaviconTool";

export const metadata: Metadata = {
  title: "Favicon Generator — ToolPit",
  description: "Create favicon.ico and PNG icons from text or emoji for your website. Free.",
};

export default function FaviconPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <a href="/" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Favicon Generator</h1>
        <p className="text-slate-500">Create favicon icons from text or emoji. Download as PNG.</p>
      </div>
      <FaviconTool />
    </div>
  );
}
