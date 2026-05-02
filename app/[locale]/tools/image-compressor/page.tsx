import type { Metadata } from "next";
import ImageCompressorTool from "./ImageCompressorTool";

export const metadata: Metadata = {
  title: "Image Compressor — ToolPit",
  description: "Compress images online. Reduce file size without losing quality. Free.",
};

export default function ImageCompressorPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <a href="/" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Image Compressor</h1>
        <p className="text-slate-500">Reduce image file size without losing quality. Works in your browser.</p>
      </div>
      <ImageCompressorTool />
    </div>
  );
}
