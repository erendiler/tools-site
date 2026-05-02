import type { Metadata } from "next";
import RegexTesterTool from "./RegexTesterTool";
export const metadata: Metadata = { title: "Regex Tester — ToolPit", description: "Test regular expressions online with live match highlighting." };
export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8"><a href="/" className="text-sm text-slate-500 hover:text-indigo-600">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Regex Tester</h1>
        <p className="text-slate-500">Test regular expressions with live match highlighting and group capture.</p>
      </div>
      <RegexTesterTool />
    </div>
  );
}
