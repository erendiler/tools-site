"use client";
import { useState } from "react";

const PRESETS = [
  { label: "Every minute", value: "* * * * *" },
  { label: "Every hour", value: "0 * * * *" },
  { label: "Every day at midnight", value: "0 0 * * *" },
  { label: "Every Monday 9am", value: "0 9 * * 1" },
  { label: "Every 1st of month", value: "0 0 1 * *" },
  { label: "Every weekday 9am", value: "0 9 * * 1-5" },
];

function explain(cron: string): string {
  const parts = cron.trim().split(/\s+/);
  if (parts.length !== 5) return "Invalid cron expression (needs 5 parts)";
  const [min, hour, dom, month, dow] = parts;
  const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  let desc = "Runs ";
  if (min === "*" && hour === "*") desc += "every minute";
  else if (min === "0" && hour === "*") desc += "at the start of every hour";
  else if (min !== "*" && hour !== "*") desc += `at ${hour.padStart(2,"0")}:${min.padStart(2,"0")}`;
  else if (min !== "*") desc += `at minute ${min} of every hour`;
  if (dom !== "*") desc += `, on day ${dom} of the month`;
  if (month !== "*") { const m = parseInt(month); desc += `, in ${isNaN(m) ? month : (months[m] ?? month)}`; }
  if (dow !== "*") {
    const d = parseInt(dow);
    if (dow.includes("-")) desc += `, ${dow.split("-").map(x => days[parseInt(x)] ?? x).join(" to ")}`;
    else desc += `, on ${isNaN(d) ? dow : (days[d] ?? dow)}`;
  }
  if (dom === "*" && month === "*" && dow === "*") desc += " every day";
  return desc;
}

export default function CronBuilderTool() {
  const [cron, setCron] = useState("0 9 * * 1-5");
  const [copied, setCopied] = useState(false);
  const parts = cron.trim().split(/\s+/);
  const labels = ["Minute", "Hour", "Day of Month", "Month", "Day of Week"];

  async function copy() { await navigator.clipboard.writeText(cron); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Cron Expression</label>
        <input value={cron} onChange={(e) => setCron(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-4 py-3 font-mono text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
      </div>
      {parts.length === 5 && (
        <div className="grid grid-cols-5 gap-2">
          {labels.map((label, i) => (
            <div key={label} className="text-center">
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl py-3 font-mono text-lg font-bold text-indigo-700">{parts[i] ?? "*"}</div>
              <p className="text-xs text-slate-500 mt-1">{label}</p>
            </div>
          ))}
        </div>
      )}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
        <p className="text-sm font-medium text-slate-700">📖 {explain(cron)}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">Presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.value} onClick={() => setCron(p.value)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${cron === p.value ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-300 hover:border-indigo-400"}`}>
              {p.label}
            </button>
          ))}
        </div>
      </div>
      <button onClick={copy} className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700">
        {copied ? "Copied!" : "Copy Expression"}
      </button>
    </div>
  );
}
