import type { Metadata } from "next";
import GradientTool from "./GradientTool";

export const metadata: Metadata = {
  title: "CSS Gradient Generator — ToolPit",
  description: "Build beautiful CSS gradients visually and copy the code instantly.",
};

export default function GradientPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <a href="/" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">CSS Gradient Generator</h1>
        <p className="text-slate-500">Build gradients visually and copy ready-to-use CSS code.</p>
      </div>
      <GradientTool />
    </div>
  );
}
