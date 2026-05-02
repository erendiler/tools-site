"use client";
import { useState } from "react";

const conversions = [
  { label: "UPPERCASE", fn: (s: string) => s.toUpperCase() },
  { label: "lowercase", fn: (s: string) => s.toLowerCase() },
  { label: "Title Case", fn: (s: string) => s.replace(/\w\S*/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase()) },
  { label: "Sentence case", fn: (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() },
  { label: "camelCase", fn: (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()) },
  { label: "PascalCase", fn: (s: string) => s.replace(/(?:^|\s|[^a-zA-Z0-9])(\w)/g, (_, c) => c.toUpperCase()).replace(/\s+/g, "") },
  { label: "snake_case", fn: (s: string) => s.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "") },
  { label: "kebab-case", fn: (s: string) => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") },
  { label: "CONSTANT_CASE", fn: (s: string) => s.toUpperCase().replace(/\s+/g, "_").replace(/[^A-Z0-9_]/g, "") },
  { label: "dot.case", fn: (s: string) => s.toLowerCase().replace(/\s+/g, ".").replace(/[^a-z0-9.]/g, "") },
];

export default function TextCaseTool() {
  const [input, setInput] = useState("Hello World from ErenTools");
  const [copied, setCopied] = useState("");

  async function copy(text: string, label: string) {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Input Text</label>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={3}
          className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
      </div>
      <div className="space-y-2">
        {conversions.map(({ label, fn }) => {
          const result = fn(input);
          return (
            <div key={label} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
              <span className="w-32 text-xs font-mono text-slate-500 shrink-0">{label}</span>
              <span className="flex-1 font-mono text-sm text-slate-800 truncate">{result}</span>
              <button onClick={() => copy(result, label)}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-medium shrink-0">
                {copied === label ? "Copied!" : "Copy"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
