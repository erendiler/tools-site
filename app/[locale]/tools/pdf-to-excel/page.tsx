import type { Metadata } from "next";
import PdfToExcelTool from "./PdfToExcelTool";
import ToolContent from "@/components/ToolContent";

export const metadata: Metadata = {
  title: "PDF to Excel — ToolPit",
  description: "Extract tables and data from PDF files into Excel (.xlsx) online. Free.",
};

export default function PdfToExcelPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <a href="/" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">PDF to Excel</h1>
        <p className="text-slate-500">Extract tables and data from PDF into .xlsx file. Works in your browser.</p>
      </div>
      <PdfToExcelTool />
      <ToolContent slug="pdf-to-excel" />
    </div>
  );
}
