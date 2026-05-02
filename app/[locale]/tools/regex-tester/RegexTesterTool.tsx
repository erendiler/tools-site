"use client";
import { useState, useMemo } from "react";

export default function RegexTesterTool() {
  const [pattern, setPattern] = useState("\\b\\w+@\\w+\\.\\w+\\b");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("Contact us at hello@example.com or support@test.org for help.");
  const [replaceWith, setReplaceWith] = useState("");

  const result = useMemo(() => {
    if (!pattern) return { matches: [], highlighted: testStr, error: "", replaced: "" };
    try {
      const re = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      const matches: { match: string; index: number; groups: string[] }[] = [];
      let m;
      const re2 = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      while ((m = re2.exec(testStr)) !== null) {
        matches.push({ match: m[0], index: m.index, groups: m.slice(1) });
        if (!flags.includes("g")) break;
      }
      const replaced = replaceWith !== "" ? testStr.replace(re, replaceWith) : "";
      return { matches, highlighted: testStr, error: "", replaced };
    } catch (e) { return { matches: [], highlighted: testStr, error: (e as Error).message, replaced: "" }; }
  }, [pattern, flags, testStr, replaceWith]);

  const highlighted = useMemo(() => {
    if (!pattern || result.error) return testStr;
    try {
      return testStr.replace(new RegExp(pattern, flags.includes("g") ? flags : flags + "g"),
        (m) => `<mark class="bg-yellow-200 rounded px-0.5">${m}</mark>`);
    } catch { return testStr; }
  }, [pattern, flags, testStr, result.error]);

  const flagOptions = ["g", "i", "m"];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">Pattern</label>
          <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
            <span className="px-3 text-slate-400 font-mono">/</span>
            <input value={pattern} onChange={(e) => setPattern(e.target.value)}
              className="flex-1 py-2 font-mono text-sm focus:outline-none" />
            <span className="px-3 text-slate-400 font-mono">/</span>
            <input value={flags} onChange={(e) => setFlags(e.target.value)} maxLength={5}
              className="w-12 py-2 font-mono text-sm text-indigo-600 focus:outline-none text-center" />
          </div>
        </div>
        <div className="pt-6 flex gap-1">
          {flagOptions.map((f) => (
            <button key={f} onClick={() => setFlags((prev) => prev.includes(f) ? prev.replace(f, "") : prev + f)}
              className={`w-8 h-9 rounded-lg text-sm font-mono border ${flags.includes(f) ? "bg-indigo-600 text-white border-indigo-600" : "border-slate-300 text-slate-600"}`}>{f}</button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Test String</label>
        <textarea value={testStr} onChange={(e) => setTestStr(e.target.value)} rows={3}
          className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
      </div>
      {result.error ? (
        <p className="text-red-500 text-sm bg-red-50 rounded-lg px-3 py-2">⚠️ {result.error}</p>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-slate-700">Matches</label>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${result.matches.length > 0 ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"}`}>
              {result.matches.length} match{result.matches.length !== 1 ? "es" : ""}
            </span>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-sm font-mono break-all"
            dangerouslySetInnerHTML={{ __html: highlighted }} />
          {result.matches.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {result.matches.map((m, i) => (
                <span key={i} className="bg-yellow-100 text-yellow-800 text-xs font-mono px-2 py-1 rounded-lg border border-yellow-200">
                  {m.match} <span className="text-yellow-500">@{m.index}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Replace with (optional)</label>
        <input value={replaceWith} onChange={(e) => setReplaceWith(e.target.value)} placeholder="Replacement string..."
          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        {replaceWith && <p className="mt-2 bg-blue-50 border border-blue-200 rounded-xl p-3 text-sm font-mono">{result.replaced}</p>}
      </div>
    </div>
  );
}
