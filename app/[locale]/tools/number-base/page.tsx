import type { Metadata } from "next";
import NumberBaseTool from "./NumberBaseTool";
import ToolContent from "@/components/ToolContent";
export const metadata: Metadata = { title: "Number Base Converter — ToolPit", description: "Convert between binary, decimal, hexadecimal and octal." };
export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8"><a href="/" className="text-sm text-slate-500 hover:text-indigo-600">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Number Base Converter</h1>
        <p className="text-slate-500">Convert between Binary, Decimal, Hexadecimal and Octal.</p>
      </div>
      <NumberBaseTool />
      <ToolContent slug="number-base" />
    </div>
  );
}
