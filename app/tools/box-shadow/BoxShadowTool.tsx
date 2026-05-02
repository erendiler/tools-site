"use client";

import { useState } from "react";

type Shadow = {
  x: number; y: number; blur: number; spread: number; color: string; inset: boolean;
};

const defaultShadow: Shadow = { x: 0, y: 8, blur: 24, spread: 0, color: "#00000033", inset: false };

export default function BoxShadowTool() {
  const [shadows, setShadows] = useState<Shadow[]>([{ ...defaultShadow }]);
  const [bgColor, setBgColor] = useState("#f1f5f9");
  const [boxColor, setBoxColor] = useState("#ffffff");
  const [copied, setCopied] = useState(false);

  const toCSS = (s: Shadow) =>
    `${s.inset ? "inset " : ""}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`;

  const shadowCSS = shadows.map(toCSS).join(", ");
  const fullCSS = `box-shadow: ${shadowCSS};`;

  function update(i: number, key: keyof Shadow, value: unknown) {
    setShadows((prev) => prev.map((s, idx) => idx === i ? { ...s, [key]: value } : s));
  }

  async function copy() {
    await navigator.clipboard.writeText(fullCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const active = shadows[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      <div
        className="h-48 rounded-xl flex items-center justify-center transition-all"
        style={{ background: bgColor }}
      >
        <div
          className="w-32 h-32 rounded-xl transition-all"
          style={{ background: boxColor, boxShadow: shadowCSS }}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Background</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
            className="w-full h-9 rounded-lg border border-slate-300 cursor-pointer" />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Box Color</label>
          <input type="color" value={boxColor} onChange={(e) => setBoxColor(e.target.value)}
            className="w-full h-9 rounded-lg border border-slate-300 cursor-pointer" />
        </div>
      </div>

      {[
        { key: "x", label: "X Offset", min: -100, max: 100 },
        { key: "y", label: "Y Offset", min: -100, max: 100 },
        { key: "blur", label: "Blur", min: 0, max: 100 },
        { key: "spread", label: "Spread", min: -50, max: 50 },
      ].map(({ key, label, min, max }) => (
        <div key={key}>
          <label className="flex justify-between text-sm font-medium text-slate-700 mb-1">
            <span>{label}</span>
            <span className="text-slate-400">{active[key as keyof Shadow]}px</span>
          </label>
          <input
            type="range" min={min} max={max}
            value={active[key as keyof Shadow] as number}
            onChange={(e) => update(0, key as keyof Shadow, Number(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>
      ))}

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-slate-700 mb-1">Shadow Color</label>
          <input type="color" value={active.color.slice(0, 7)}
            onChange={(e) => update(0, "color", e.target.value + "55")}
            className="w-full h-9 rounded-lg border border-slate-300 cursor-pointer" />
        </div>
        <div className="flex items-center gap-2 pt-5">
          <input type="checkbox" id="inset" checked={active.inset}
            onChange={(e) => update(0, "inset", e.target.checked)}
            className="w-4 h-4 accent-indigo-600" />
          <label htmlFor="inset" className="text-sm font-medium text-slate-700">Inset</label>
        </div>
      </div>

      <div className="bg-slate-50 rounded-lg p-3 font-mono text-sm text-slate-700 break-all">
        {fullCSS}
      </div>

      <button onClick={copy}
        className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors">
        {copied ? "Copied!" : "Copy CSS"}
      </button>
    </div>
  );
}
