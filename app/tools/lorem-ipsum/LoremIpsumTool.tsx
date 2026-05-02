"use client";
import { useState } from "react";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure reprehenderit voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim est laborum".split(" ");

function word() { return WORDS[Math.floor(Math.random() * WORDS.length)]; }
function sentence(n = 8) {
  const len = n + Math.floor(Math.random() * 6);
  const s = Array.from({ length: len }, word).join(" ");
  return s.charAt(0).toUpperCase() + s.slice(1) + ".";
}
function paragraph(s = 4) { return Array.from({ length: s + Math.floor(Math.random() * 3) }, sentence).join(" "); }

export default function LoremIpsumTool() {
  const [type, setType] = useState<"paragraphs" | "sentences" | "words">("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  function generate() {
    let text = "";
    if (type === "paragraphs") text = Array.from({ length: count }, paragraph).join("\n\n");
    else if (type === "sentences") text = Array.from({ length: count }, sentence).join(" ");
    else text = Array.from({ length: count }, word).join(" ");
    setOutput(text);
  }

  async function copy() { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
      <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
        {(["paragraphs", "sentences", "words"] as const).map((t) => (
          <button key={t} onClick={() => setType(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${type === t ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"}`}>
            {t}
          </button>
        ))}
      </div>
      <div>
        <label className="flex justify-between text-sm font-medium text-slate-700 mb-1">
          <span>Count</span><span className="text-slate-400">{count} {type}</span>
        </label>
        <input type="range" min={1} max={type === "words" ? 200 : type === "sentences" ? 20 : 10} value={count}
          onChange={(e) => setCount(Number(e.target.value))} className="w-full accent-indigo-600" />
      </div>
      <button onClick={generate} className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700">Generate</button>
      {output && (
        <>
          <textarea value={output} readOnly rows={10} className="w-full border border-slate-200 rounded-xl p-3 text-sm bg-slate-50 resize-none" />
          <button onClick={copy} className="w-full bg-slate-100 text-slate-700 rounded-lg py-2.5 text-sm font-medium hover:bg-slate-200">
            {copied ? "Copied!" : "Copy Text"}
          </button>
        </>
      )}
    </div>
  );
}
