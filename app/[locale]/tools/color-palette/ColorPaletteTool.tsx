"use client";

import { useState, useRef } from "react";

function rgbToHex(r: number, g: number, b: number) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function quantize(pixels: Uint8ClampedArray, count: number): string[] {
  const colorMap: Record<string, number> = {};
  for (let i = 0; i < pixels.length; i += 16) {
    const r = Math.round(pixels[i] / 32) * 32;
    const g = Math.round(pixels[i + 1] / 32) * 32;
    const b = Math.round(pixels[i + 2] / 32) * 32;
    const key = `${r},${g},${b}`;
    colorMap[key] = (colorMap[key] || 0) + 1;
  }
  return Object.entries(colorMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([key]) => {
      const [r, g, b] = key.split(",").map(Number);
      return rgbToHex(r, g, b);
    });
}

export default function ColorPaletteTool() {
  const [colors, setColors] = useState<string[]>([]);
  const [preview, setPreview] = useState<string>("");
  const [copied, setCopied] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target?.result as string;
      setPreview(url);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const max = 200;
        const scale = Math.min(max / img.width, max / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        setColors(quantize(data, 10));
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  }

  async function copy(hex: string) {
    await navigator.clipboard.writeText(hex);
    setCopied(hex);
    setTimeout(() => setCopied(""), 1500);
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      <div
        className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors"
        onClick={() => inputRef.current?.click()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
        onDragOver={(e) => e.preventDefault()}
      >
        {preview ? (
          <img src={preview} alt="preview" className="max-h-48 mx-auto rounded-lg object-contain" />
        ) : (
          <>
            <div className="text-4xl mb-2">🖼️</div>
            <p className="text-slate-500 text-sm">Drop an image here or click to upload</p>
          </>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
      </div>

      {colors.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-3">Extracted Colors</h3>
          <div className="grid grid-cols-5 gap-2">
            {colors.map((hex) => (
              <button key={hex} onClick={() => copy(hex)}
                className="group flex flex-col items-center gap-1.5" title={`Copy ${hex}`}>
                <div className="w-full aspect-square rounded-lg border border-slate-200 group-hover:scale-105 transition-transform"
                  style={{ background: hex }} />
                <span className="text-xs text-slate-600 font-mono">
                  {copied === hex ? "Copied!" : hex}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4 h-12 rounded-lg overflow-hidden flex">
            {colors.map((hex) => (
              <div key={hex} className="flex-1" style={{ background: hex }} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
