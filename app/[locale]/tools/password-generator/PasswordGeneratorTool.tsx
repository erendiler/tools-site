"use client";

import { useState, useCallback } from "react";

const SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

function generate(length: number, opts: Record<string, boolean>): string {
  const pool = Object.entries(SETS)
    .filter(([key]) => opts[key])
    .map(([, chars]) => chars)
    .join("");
  if (!pool) return "";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  return Array.from(arr).map((n) => pool[n % pool.length]).join("");
}

function strength(pwd: string): { label: string; color: string; width: string } {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (pwd.length >= 16) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  if (score <= 2) return { label: "Weak", color: "bg-red-500", width: "w-1/4" };
  if (score <= 4) return { label: "Fair", color: "bg-yellow-500", width: "w-1/2" };
  if (score <= 5) return { label: "Good", color: "bg-blue-500", width: "w-3/4" };
  return { label: "Strong", color: "bg-green-500", width: "w-full" };
}

export default function PasswordGeneratorTool() {
  const [length, setLength] = useState(16);
  const [opts, setOpts] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: false });
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([generate(16, { uppercase: true, lowercase: true, numbers: true, symbols: false })]);
  const [copied, setCopied] = useState<string>("");

  const refresh = useCallback(() => {
    setPasswords(Array.from({ length: count }, () => generate(length, opts)));
  }, [length, opts, count]);

  function toggle(key: string) {
    const next = { ...opts, [key]: !opts[key as keyof typeof opts] };
    if (!Object.values(next).some(Boolean)) return;
    setOpts(next);
    setPasswords(Array.from({ length: count }, () => generate(length, next)));
  }

  function handleLength(val: number) {
    setLength(val);
    setPasswords(Array.from({ length: count }, () => generate(val, opts)));
  }

  async function copy(pwd: string) {
    await navigator.clipboard.writeText(pwd);
    setCopied(pwd);
    setTimeout(() => setCopied(""), 1500);
  }

  async function copyAll() {
    await navigator.clipboard.writeText(passwords.join("\n"));
    setCopied("all");
    setTimeout(() => setCopied(""), 1500);
  }

  const s = strength(passwords[0] || "");

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      {/* Length */}
      <div>
        <label className="flex justify-between text-sm font-medium text-slate-700 mb-1">
          <span>Length</span><span className="text-slate-400">{length} characters</span>
        </label>
        <input type="range" min={4} max={64} value={length}
          onChange={(e) => handleLength(Number(e.target.value))}
          className="w-full accent-indigo-600" />
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2">
        {Object.entries({ uppercase: "A–Z Uppercase", lowercase: "a–z Lowercase", numbers: "0–9 Numbers", symbols: "!@# Symbols" }).map(([key, label]) => (
          <button key={key} onClick={() => toggle(key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
              opts[key as keyof typeof opts]
                ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
            }`}>
            <span className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
              opts[key as keyof typeof opts] ? "bg-indigo-600 border-indigo-600" : "border-slate-300"
            }`}>
              {opts[key as keyof typeof opts] && <span className="text-white text-xs">✓</span>}
            </span>
            {label}
          </button>
        ))}
      </div>

      {/* Count */}
      <div>
        <label className="flex justify-between text-sm font-medium text-slate-700 mb-1">
          <span>How many?</span><span className="text-slate-400">{count}</span>
        </label>
        <input type="range" min={1} max={10} value={count}
          onChange={(e) => { setCount(Number(e.target.value)); refresh(); }}
          className="w-full accent-indigo-600" />
      </div>

      {/* Strength */}
      {passwords[0] && (
        <div>
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Strength</span><span className={s.label === "Strong" ? "text-green-600" : s.label === "Weak" ? "text-red-500" : "text-slate-600"}>{s.label}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${s.color} ${s.width}`} />
          </div>
        </div>
      )}

      {/* Password List */}
      <div className="space-y-2">
        {passwords.map((pwd, i) => (
          <div key={i} className="flex items-center gap-2 bg-slate-50 rounded-xl border border-slate-200 p-3">
            <span className="flex-1 font-mono text-sm text-slate-800 break-all">{pwd}</span>
            <button onClick={() => copy(pwd)}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-medium flex-shrink-0 transition-colors">
              {copied === pwd ? "Copied!" : "Copy"}
            </button>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <button onClick={refresh}
          className="flex-1 bg-slate-100 text-slate-700 rounded-lg py-2.5 text-sm font-medium hover:bg-slate-200 transition-colors">
          🔄 Regenerate
        </button>
        {passwords.length > 1 && (
          <button onClick={copyAll}
            className="flex-1 bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors">
            {copied === "all" ? "Copied!" : "Copy All"}
          </button>
        )}
      </div>
    </div>
  );
}
