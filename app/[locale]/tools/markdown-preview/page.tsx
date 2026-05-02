import type { Metadata } from "next";
import MarkdownPreviewTool from "./MarkdownPreviewTool";
export const metadata: Metadata = { title: "Markdown Preview — ErenTools", description: "Write and preview Markdown with live HTML rendering." };
export default function Page() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8"><a href="/" className="text-sm text-slate-500 hover:text-indigo-600">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Markdown Preview</h1>
        <p className="text-slate-500">Write Markdown on the left, see live HTML preview on the right.</p>
      </div>
      <MarkdownPreviewTool />
    </div>
  );
}
