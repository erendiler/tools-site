import type { Metadata } from "next";
import ImageToPdfTool from "./ImageToPdfTool";

export const metadata: Metadata = {
  title: "Images to PDF — ErenTools",
  description: "Convert images to PDF online. Free, no signup, works in browser.",
};

export default function ImageToPdfPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <a href="/" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Images to PDF</h1>
        <p className="text-slate-500">Convert one or multiple images into a single PDF. Drag to reorder.</p>
      </div>
      <ImageToPdfTool />
    </div>
  );
}
