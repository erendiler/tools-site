import type { Metadata } from "next";
import TimestampTool from "./TimestampTool";
export const metadata: Metadata = { title: "Timestamp Converter — ToolPit", description: "Convert Unix timestamps to human-readable dates and vice versa." };
export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8"><a href="/" className="text-sm text-slate-500 hover:text-indigo-600">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Timestamp Converter</h1>
        <p className="text-slate-500">Convert Unix timestamps to dates and back instantly.</p>
      </div>
      <TimestampTool />
    </div>
  );
}
