"use client";

import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";

export default function QRCodeTool() {
  const [text, setText] = useState("https://erendiler.com");
  const [size, setSize] = useState(300);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [errorMsg, setErrorMsg] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!text.trim()) return;
    QRCode.toCanvas(canvasRef.current!, text, {
      width: size,
      color: { dark: fgColor, light: bgColor },
      margin: 2,
    }).catch(() => setErrorMsg("Could not generate QR code."));
  }, [text, size, fgColor, bgColor]);

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = "qrcode.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">URL or Text</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com"
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Size</label>
          <select
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value={200}>200px</option>
            <option value={300}>300px</option>
            <option value={400}>400px</option>
            <option value={500}>500px</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">QR Color</label>
          <input
            type="color"
            value={fgColor}
            onChange={(e) => setFgColor(e.target.value)}
            className="w-full h-[38px] border border-slate-300 rounded-lg cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Background</label>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            className="w-full h-[38px] border border-slate-300 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

      <div className="flex justify-center">
        <canvas ref={canvasRef} className="rounded-xl border border-slate-200" />
      </div>

      <button
        onClick={download}
        className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors"
      >
        Download PNG
      </button>
    </div>
  );
}
