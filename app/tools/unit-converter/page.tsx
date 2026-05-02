import type { Metadata } from "next";
import UnitConverterTool from "./UnitConverterTool";
export const metadata: Metadata = { title: "Unit Converter — ErenTools", description: "Convert length, weight, temperature and more. Free online unit converter." };
export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8"><a href="/" className="text-sm text-slate-500 hover:text-indigo-600">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Unit Converter</h1>
        <p className="text-slate-500">Convert length, weight, temperature, area and more.</p>
      </div>
      <UnitConverterTool />
    </div>
  );
}
