"use client";

import { useState } from "react";

type Stop = { color: string; position: number };

export default function GradientTool() {
  const [type, setType] = useState<"linear" | "radial">("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<Stop[]>([
    { color: "#6366f1", position: 0 },
    { color: "#ec4899", position: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const stopsCSS = stops
    .sort((a, b) => a.position - b.position)
    .map((s) => `${s.color} ${s.position}%`)
    .join(", ");

  const css =
    type === "linear"
      ? `linear-gradient(${angle}deg, ${stopsCSS})`
      : `radial-gradient(circle, ${stopsCSS})`;

  const fullCSS = `background: ${css};`;

  function updateStop(i: number, key: keyof Stop, value: string | number) {
    setStops((prev) => prev.map((s, idx) => idx === i ? { ...s, [key]: value } : s));
  }

  function addStop() {
    setStops((prev) => [...prev, { color: "#ffffff", position: 50 }]);
  }

  function removeStop(i: number) {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((_, idx) => idx !== i));
  }

  async function copy() {
    await navigator.clipboard.writeText(fullCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      <div className="h-40 rounded-xl border border-slate-200" style={{ background: css }} />

      <div className="flex gap-3">
        {(["linear", "radial"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
              type === t
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-slate-600 border-slate-300 hover:border-indigo-400"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {type === "linear" && (
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Angle: {angle}°</label>
          <input
            type="range"
            min={0}
            max={360}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Color Stops</span>
          <button onClick={addStop} className="text-xs text-indigo-600 hover:underline">+ Add Stop</button>
        </div>
        {stops.map((stop, i) => (
          <div key={i} className="flex items-center gap-3">
            <input
              type="color"
              value={stop.color}
              onChange={(e) => updateStop(i, "color", e.target.value)}
              className="w-10 h-10 rounded-lg border border-slate-300 cursor-pointer"
            />
            <input
              type="range"
              min={0}
              max={100}
              value={stop.position}
              onChange={(e) => updateStop(i, "position", Number(e.target.value))}
              className="flex-1 accent-indigo-600"
            />
            <span className="text-sm text-slate-500 w-10">{stop.position}%</span>
            <button
              onClick={() => removeStop(i)}
              className="text-slate-400 hover:text-red-500 text-lg leading-none"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700 break-all">
        {fullCSS}
      </div>

      <button
        onClick={copy}
        className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors"
      >
        {copied ? "Copied!" : "Copy CSS"}
      </button>
    </div>
  );
}
