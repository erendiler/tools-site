"use client";

import { useState, useRef, useEffect } from "react";

type Shape = "square" | "rounded" | "circle";
type Mode = "text" | "image";

export default function FaviconTool() {
  const [mode, setMode] = useState<Mode>("text");
  const [text, setText] = useState("⚡");
  const [bgColor, setBgColor] = useState("#6366f1");
  const [textColor, setTextColor] = useState("#ffffff");
  const [shape, setShape] = useState<Shape>("rounded");
  const [fontSize, setFontSize] = useState(56);
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [padding, setPadding] = useState(8);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    draw();
  }, [text, bgColor, textColor, shape, fontSize, uploadedImage, padding, mode]);

  function drawShape(ctx: CanvasRenderingContext2D, size: number) {
    ctx.beginPath();
    if (shape === "circle") {
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    } else if (shape === "rounded") {
      const r = size * 0.19;
      ctx.moveTo(r, 0);
      ctx.lineTo(size - r, 0);
      ctx.quadraticCurveTo(size, 0, size, r);
      ctx.lineTo(size, size - r);
      ctx.quadraticCurveTo(size, size, size - r, size);
      ctx.lineTo(r, size);
      ctx.quadraticCurveTo(0, size, 0, size - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
    } else {
      ctx.rect(0, 0, size, size);
    }
  }

  function draw() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const size = 256;
    canvas.width = size;
    canvas.height = size;
    ctx.clearRect(0, 0, size, size);

    if (mode === "image" && uploadedImage) {
      drawShape(ctx, size);
      ctx.fillStyle = bgColor;
      ctx.fill();
      ctx.save();
      drawShape(ctx, size);
      ctx.clip();

      const p = padding;
      const imgSize = size - p * 2;
      const aspect = uploadedImage.naturalWidth / uploadedImage.naturalHeight;
      let dw = imgSize, dh = imgSize;
      if (aspect > 1) dh = imgSize / aspect;
      else dw = imgSize * aspect;
      const dx = (size - dw) / 2;
      const dy = (size - dh) / 2;
      ctx.drawImage(uploadedImage, dx, dy, dw, dh);
      ctx.restore();
    } else {
      drawShape(ctx, size);
      ctx.fillStyle = bgColor;
      ctx.fill();
      ctx.fillStyle = textColor;
      ctx.font = `${fontSize * 2}px system-ui`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, size / 2, size / 2 + 4);
    }
  }

  function handleFile(file: File) {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setImagePreview(url);
    const img = new Image();
    img.onload = () => {
      setUploadedImage(img);
      setMode("image");
    };
    img.src = url;
  }

  function download(dlSize: number) {
    const canvas = document.createElement("canvas");
    canvas.width = dlSize;
    canvas.height = dlSize;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(canvasRef.current!, 0, 0, dlSize, dlSize);
    const a = document.createElement("a");
    a.download = `favicon-${dlSize}x${dlSize}.png`;
    a.href = canvas.toDataURL("image/png");
    a.click();
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      {/* Mode Tabs */}
      <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
        {(["text", "image"] as Mode[]).map((m) => (
          <button key={m} onClick={() => setMode(m)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              mode === m ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}>
            {m === "text" ? "✏️ Text / Emoji" : "🖼️ Upload Image"}
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="flex justify-center">
        <canvas ref={canvasRef} className="w-32 h-32 rounded-xl border border-slate-200" />
      </div>

      {mode === "image" ? (
        <>
          {/* Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
              imagePreview ? "border-indigo-300 bg-indigo-50" : "border-slate-300 hover:border-indigo-400"
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
            onDragOver={(e) => e.preventDefault()}
          >
            {imagePreview ? (
              <div className="flex items-center gap-3">
                <img src={imagePreview} alt="uploaded" className="w-12 h-12 rounded-lg object-cover border border-slate-200" />
                <div className="text-left">
                  <p className="text-sm font-medium text-slate-700">Image loaded</p>
                  <p className="text-xs text-slate-500">Click to change</p>
                </div>
              </div>
            ) : (
              <>
                <div className="text-3xl mb-2">📁</div>
                <p className="text-sm text-slate-500">Drop image here or click to upload</p>
                <p className="text-xs text-slate-400 mt-1">PNG, JPG, SVG, WebP</p>
              </>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
          </div>

          {/* Background Color */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Background Color</label>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10 rounded-lg border border-slate-300 cursor-pointer" />
          </div>

          {/* Padding */}
          <div>
            <label className="flex justify-between text-sm font-medium text-slate-700 mb-1">
              <span>Image Padding</span><span className="text-slate-400">{padding}px</span>
            </label>
            <input type="range" min={0} max={64} value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="w-full accent-indigo-600" />
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Text or Emoji</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} maxLength={3}
              placeholder="⚡ or AB"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Background</label>
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-300 cursor-pointer" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Text Color</label>
              <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-10 rounded-lg border border-slate-300 cursor-pointer" />
            </div>
          </div>

          <div>
            <label className="flex justify-between text-sm font-medium text-slate-700 mb-1">
              <span>Font Size</span><span className="text-slate-400">{fontSize}px</span>
            </label>
            <input type="range" min={20} max={90} value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-indigo-600" />
          </div>
        </>
      )}

      {/* Shape — shared */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Shape</label>
        <div className="flex gap-2">
          {(["square", "rounded", "circle"] as Shape[]).map((s) => (
            <button key={s} onClick={() => setShape(s)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors capitalize ${
                shape === s ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-300 hover:border-indigo-400"
              }`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Download Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {[16, 32, 64].map((s) => (
          <button key={s} onClick={() => download(s)}
            className="bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 rounded-lg py-2 text-sm font-medium transition-colors border border-slate-200">
            {s}×{s} PNG
          </button>
        ))}
      </div>
      <button onClick={() => download(512)}
        className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors">
        Download 512×512 PNG
      </button>
    </div>
  );
}
