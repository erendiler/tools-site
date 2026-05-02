"use client";
import { useState } from "react";

const bases = [
  { label: "Binary", base: 2, prefix: "0b", placeholder: "1010" },
  { label: "Octal", base: 8, prefix: "0o", placeholder: "12" },
  { label: "Decimal", base: 10, prefix: "", placeholder: "10" },
  { label: "Hexadecimal", base: 16, prefix: "0x", placeholder: "A" },
];

export default function NumberBaseTool() {
  const [values, setValues] = useState({ 2: "1010", 8: "12", 10: "10", 16: "A" } as Record<number, string>);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(0);

  function handleChange(base: number, val: string) {
    setError("");
    const clean = val.trim().toUpperCase();
    try {
      const decimal = parseInt(clean, base);
      if (isNaN(decimal)) { setValues(prev => ({ ...prev, [base]: clean })); return; }
      const next: Record<number, string> = {};
      for (const b of bases) next[b.base] = decimal.toString(b.base).toUpperCase();
      setValues(next);
    } catch { setError("Invalid value for this base"); }
  }

  async function copy(base: number) { await navigator.clipboard.writeText(values[base] ?? ""); setCopied(base); setTimeout(() => setCopied(0), 1500); }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {bases.map(({ label, base, prefix, placeholder }) => (
        <div key={base}>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
            <span>{label}</span>
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">base {base}</span>
          </label>
          <div className="flex gap-2">
            <div className="flex items-center flex-1 border border-slate-300 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500">
              {prefix && <span className="px-3 text-slate-400 font-mono text-sm">{prefix}</span>}
              <input value={values[base] ?? ""} onChange={(e) => handleChange(base, e.target.value)}
                placeholder={placeholder}
                className="flex-1 px-3 py-2.5 font-mono text-sm focus:outline-none uppercase" />
            </div>
            <button onClick={() => copy(base)}
              className="px-4 py-2 text-sm font-medium rounded-xl border border-slate-300 text-indigo-600 hover:bg-indigo-50 transition-colors">
              {copied === base ? "✓" : "Copy"}
            </button>
          </div>
        </div>
      ))}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 grid grid-cols-2 gap-2 text-xs text-slate-600">
        {bases.map(({ label, base }) => (
          <div key={base}><span className="font-medium">{label}:</span> {values[base]}</div>
        ))}
      </div>
    </div>
  );
}
