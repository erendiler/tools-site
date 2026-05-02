"use client";
import { useState } from "react";

export default function JsonFormatterTool() {
  const [input, setInput] = useState('{"name":"Eren","age":25,"skills":["React","Next.js"]}');
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);
  const [copied, setCopied] = useState(false);

  function format() {
    try { setOutput(JSON.stringify(JSON.parse(input), null, indent)); setError(""); }
    catch (e) { setError((e as Error).message); setOutput(""); }
  }
  function minify() {
    try { setOutput(JSON.stringify(JSON.parse(input))); setError(""); }
    catch (e) { setError((e as Error).message); setOutput(""); }
  }
  async function copy() { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Input JSON</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={14}
            className="w-full border border-slate-300 rounded-xl p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Output</label>
          <textarea value={output} readOnly rows={14}
            className="w-full border border-slate-200 rounded-xl p-3 font-mono text-sm bg-slate-50 resize-none" />
        </div>
      </div>
      {error && <p className="text-red-500 text-sm bg-red-50 rounded-lg px-3 py-2">⚠️ {error}</p>}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600">Indent:</label>
          {[2, 4].map((n) => (
            <button key={n} onClick={() => setIndent(n)}
              className={`w-8 h-8 rounded-lg text-sm border ${indent === n ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-300 text-slate-600"}`}>{n}</button>
          ))}
        </div>
        <button onClick={format} className="flex-1 bg-indigo-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-indigo-700 transition-colors">Format</button>
        <button onClick={minify} className="flex-1 bg-slate-100 text-slate-700 rounded-lg py-2 text-sm font-medium hover:bg-slate-200 transition-colors">Minify</button>
        <button onClick={copy} disabled={!output} className="flex-1 bg-slate-100 text-slate-700 rounded-lg py-2 text-sm font-medium hover:bg-slate-200 transition-colors disabled:opacity-40">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
