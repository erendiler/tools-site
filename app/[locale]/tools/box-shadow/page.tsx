import type { Metadata } from "next";
import BoxShadowTool from "./BoxShadowTool";
import ToolContent from "@/components/ToolContent";

export const metadata: Metadata = {
  title: "Box Shadow Generator — ToolPit",
  description: "Create CSS box-shadow effects visually. Multiple shadows supported.",
};

export default function BoxShadowPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <a href="/" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Box Shadow Generator</h1>
        <p className="text-slate-500">Create CSS box shadows visually and copy the code.</p>
      </div>
      <BoxShadowTool />
      <ToolContent slug="box-shadow" />
    </div>
  );
}
