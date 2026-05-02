import type { Metadata } from "next";
import WordCounterTool from "./WordCounterTool";
export const metadata: Metadata = { title: "Word Counter — ToolPit", description: "Count words, characters, sentences and paragraphs online." };
export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8"><a href="/" className="text-sm text-slate-500 hover:text-indigo-600">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Word Counter</h1>
        <p className="text-slate-500">Count words, characters, sentences and reading time instantly.</p>
      </div>
      <WordCounterTool />
    </div>
  );
}
