import type { Metadata } from "next";
import ColorPaletteTool from "./ColorPaletteTool";

export const metadata: Metadata = {
  title: "Color Palette Extractor — ErenTools",
  description: "Upload any image and instantly extract its dominant color palette with hex codes.",
};

export default function ColorPalettePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <a href="/" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Color Palette Extractor</h1>
        <p className="text-slate-500">Upload an image to extract its dominant colors.</p>
      </div>
      <ColorPaletteTool />
    </div>
  );
}
