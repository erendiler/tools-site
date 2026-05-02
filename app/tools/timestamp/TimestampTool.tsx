"use client";
import { useState, useEffect } from "react";

export default function TimestampTool() {
  const [ts, setTs] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [now, setNow] = useState(Date.now());
  const [copied, setCopied] = useState("");

  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);

  const tsToDate = ts ? new Date(parseInt(ts) * (ts.length <= 10 ? 1000 : 1)) : null;
  const dateToTs = dateStr ? Math.floor(new Date(dateStr).getTime() / 1000) : null;

  async function copy(val: string, key: string) { await navigator.clipboard.writeText(val); setCopied(key); setTimeout(() => setCopied(""), 1500); }

  const formats = tsToDate && !isNaN(tsToDate.getTime()) ? [
    { label: "UTC", value: tsToDate.toUTCString() },
    { label: "ISO 8601", value: tsToDate.toISOString() },
    { label: "Local", value: tsToDate.toLocaleString() },
    { label: "Date only", value: tsToDate.toLocaleDateString() },
    { label: "Time only", value: tsToDate.toLocaleTimeString() },
    { label: "Relative", value: (() => { const diff = (Date.now() - tsToDate.getTime()) / 1000; const abs = Math.abs(diff); if (abs < 60) return `${Math.round(diff)} seconds ago`; if (abs < 3600) return `${Math.round(diff/60)} minutes ago`; if (abs < 86400) return `${Math.round(diff/3600)} hours ago`; return `${Math.round(diff/86400)} days ago`; })() },
  ] : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-indigo-500 font-medium">Current Unix Timestamp</p>
          <p className="text-2xl font-bold font-mono text-indigo-700">{Math.floor(now / 1000)}</p>
        </div>
        <button onClick={() => copy(String(Math.floor(now / 1000)), "now")}
          className="text-sm text-indigo-600 font-medium hover:text-indigo-800">{copied === "now" ? "Copied!" : "Copy"}</button>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Unix Timestamp → Date</label>
        <input type="number" value={ts} onChange={(e) => setTs(e.target.value)}
          placeholder="e.g. 1714608000"
          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        {formats.length > 0 && (
          <div className="mt-3 space-y-2">
            {formats.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
                <span className="text-xs text-slate-500 w-20 shrink-0">{label}</span>
                <span className="text-sm text-slate-700 flex-1 mx-2 truncate">{value}</span>
                <button onClick={() => copy(value, label)} className="text-xs text-indigo-600 shrink-0">{copied === label ? "✓" : "Copy"}</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Date → Unix Timestamp</label>
        <input type="datetime-local" value={dateStr} onChange={(e) => setDateStr(e.target.value)}
          className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        {dateToTs && !isNaN(dateToTs) && (
          <div className="mt-2 flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2 border border-slate-200">
            <span className="font-mono text-lg font-bold text-slate-800">{dateToTs}</span>
            <button onClick={() => copy(String(dateToTs), "ts")} className="text-sm text-indigo-600 font-medium">{copied === "ts" ? "Copied!" : "Copy"}</button>
          </div>
        )}
      </div>
    </div>
  );
}
