import type { Metadata } from "next";
import LoremIpsumTool from "./LoremIpsumTool";
export const metadata: Metadata = { title: "Lorem Ipsum Generator — ToolPit", description: "Generate Lorem Ipsum placeholder text online. Free." };
export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8"><a href="/" className="text-sm text-slate-500 hover:text-indigo-600">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Lorem Ipsum Generator</h1>
        <p className="text-slate-500">Generate placeholder text for your designs and mockups.</p>
      </div>
      <LoremIpsumTool />
    </div>
  );
}
