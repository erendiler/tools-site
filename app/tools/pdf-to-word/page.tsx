import type { Metadata } from "next";
import PdfToWordTool from "./PdfToWordTool";

export const metadata: Metadata = {
  title: "PDF to Word — ToolPit",
  description: "Convert PDF files to editable Word documents (.docx) online. Free, no signup.",
};

export default function PdfToWordPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <a href="/" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">PDF to Word</h1>
        <p className="text-slate-500">Convert PDF to editable .docx file. Works entirely in your browser.</p>
      </div>
      <PdfToWordTool />
    </div>
  );
}
