import type { Metadata } from "next";
import TextCaseTool from "./TextCaseTool";
import ToolContent from "@/components/ToolContent";
export const metadata: Metadata = { title: "Text Case Converter — ToolPit", description: "Convert text between uppercase, lowercase, camelCase, snake_case and more." };
export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8"><a href="/" className="text-sm text-slate-500 hover:text-indigo-600">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Text Case Converter</h1>
        <p className="text-slate-500">Convert text between any case format instantly.</p>
      </div>
      <TextCaseTool />
      <ToolContent slug="text-case" />
    </div>
  );
}
