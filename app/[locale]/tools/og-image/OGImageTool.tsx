"use client";

import { useState, useRef, useEffect } from "react";

export default function OGImageTool() {
  const [title, setTitle] = useState("My Awesome Website");
  const [subtitle, setSubtitle] = useState("Build something great today.");
  const [bg1, setBg1] = useState("#6366f1");
  const [bg2, setBg2] = useState("#ec4899");
  const [angle, setAngle] = useState(135);
  const [textColor, setTextColor] = useState("#ffffff");
  const [emoji, setEmoji] = useState("⚡");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    draw();
  }, [title, subtitle, bg1, bg2, angle, textColor, emoji]);

  function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
    const words = text.split(" ");
    const lines: string[] = [];
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = 1200, H = 630;
    canvas.width = W;
    canvas.height = H;

    const rad = (angle * Math.PI) / 180;
    const gx2 = W / 2 + Math.cos(rad) * W;
    const gy2 = H / 2 + Math.sin(rad) * H;
    const grad = ctx.createLinearGradient(W / 2 - Math.cos(rad) * W, H / 2 - Math.sin(rad) * H, gx2, gy2);
    grad.addColorStop(0, bg1);
    grad.addColorStop(1, bg2);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = textColor;
    ctx.textAlign = "center";

    if (emoji) {
      ctx.font = "120px system-ui";
      ctx.fillText(emoji, W / 2, 200);
    }

    ctx.font = `bold 72px system-ui`;
    const titleLines = wrapText(ctx, title, W - 120);
    const startY = emoji ? 280 : 220;
    titleLines.forEach((line, i) => {
      ctx.fillText(line, W / 2, startY + i * 85);
    });

    if (subtitle) {
      ctx.font = "36px system-ui";
      ctx.fillStyle = textColor + "cc";
      ctx.fillText(subtitle, W / 2, startY + titleLines.length * 85 + 50);
    }
  }

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = "og-image.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      <div className="w-full overflow-hidden rounded-xl border border-slate-200">
        <canvas ref={canvasRef} className="w-full h-auto" style={{ aspectRatio: "1200/630" }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Subtitle</label>
          <input value={subtitle} onChange={(e) => setSubtitle(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Emoji / Icon</label>
          <input value={emoji} onChange={(e) => setEmoji(e.target.value)} maxLength={2}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Text Color</label>
          <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)}
            className="w-full h-10 rounded-lg border border-slate-300 cursor-pointer" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Background Start</label>
          <input type="color" value={bg1} onChange={(e) => setBg1(e.target.value)}
            className="w-full h-10 rounded-lg border border-slate-300 cursor-pointer" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Background End</label>
          <input type="color" value={bg2} onChange={(e) => setBg2(e.target.value)}
            className="w-full h-10 rounded-lg border border-slate-300 cursor-pointer" />
        </div>
      </div>

      <div>
        <label className="flex justify-between text-sm font-medium text-slate-700 mb-1">
          <span>Gradient Angle</span><span className="text-slate-400">{angle}°</span>
        </label>
        <input type="range" min={0} max={360} value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full accent-indigo-600" />
      </div>

      <button onClick={download}
        className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors">
        Download PNG (1200×630)
      </button>
    </div>
  );
}
