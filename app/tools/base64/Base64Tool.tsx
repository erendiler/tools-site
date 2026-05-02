"use client";
import { useState } from "react";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function convert(text: string, m: "encode" | "decode") {
    setError("");
    try {
      if (m === "encode") setOutput(btoa(unescape(encodeURIComponent(text))));
      else setOutput(decodeURIComponent(escape(atob(text))));
    } catch { setError(m === "decode" ? "Invalid Base64 string." : "Encoding failed."); setOutput(""); }
  }

  function handleInput(val: string) { setInput(val); convert(val, mode); }
  function toggleMode() { const m = mode === "encode" ? "decode" : "encode"; setMode(m); convert(input, m); }
  async function copy() { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
      <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
        {(["encode", "decode"] as const).map((m) => (
          <button key={m} onClick={() => { setMode(m); convert(input, m); }}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${mode === m ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}>
            {m === "encode" ? "Text → Base64" : "Base64 → Text"}
          </button>
        ))}
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{mode === "encode" ? "Text" : "Base64"}</label>
        <textarea value={input} onChange={(e) => handleInput(e.target.value)} rows={5} placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
          className="w-full border border-slate-300 rounded-xl p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">{mode === "encode" ? "Base64" : "Text"}</label>
        <textarea value={output} readOnly rows={5} className="w-full border border-slate-200 rounded-xl p-3 font-mono text-sm bg-slate-50 resize-none" />
      </div>
      <div className="flex gap-2">
        <button onClick={toggleMode} className="flex-1 bg-slate-100 text-slate-700 rounded-lg py-2.5 text-sm font-medium hover:bg-slate-200">⇄ Swap</button>
        <button onClick={copy} disabled={!output} className="flex-1 bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 disabled:opacity-40">{copied ? "Copied!" : "Copy Output"}</button>
      </div>
    </div>
  );
}
