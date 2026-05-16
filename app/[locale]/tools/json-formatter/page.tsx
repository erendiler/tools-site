import type { Metadata } from "next";
import JsonFormatterTool from "./JsonFormatterTool";
import ToolContent from "@/components/ToolContent";
export const metadata: Metadata = { title: "JSON Formatter — ToolPit", description: "Format, validate and minify JSON online. Free." };
export default function Page() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="mb-8"><a href="/" className="text-sm text-slate-500 hover:text-indigo-600">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">JSON Formatter</h1>
        <p className="text-slate-500">Format, validate and minify JSON instantly.</p>
      </div>
      <JsonFormatterTool />
      <ToolContent slug="json-formatter" />
    </div>
  );
}
