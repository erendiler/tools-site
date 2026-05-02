"use client";

import { useState, useRef } from "react";
import { jsPDF } from "jspdf";

type ImageItem = { id: string; url: string; name: string; file: File };

export default function ImageToPdfTool() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [pageSize, setPageSize] = useState<"a4" | "letter" | "fit">("a4");
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(files: FileList | File[]) {
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    arr.forEach((file) => {
      const url = URL.createObjectURL(file);
      setImages((prev) => [...prev, { id: crypto.randomUUID(), url, name: file.name, file }]);
    });
  }

  function remove(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  function moveUp(i: number) {
    if (i === 0) return;
    setImages((prev) => { const a = [...prev]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; return a; });
  }

  function moveDown(i: number) {
    if (i === images.length - 1) return;
    setImages((prev) => { const a = [...prev]; [a[i], a[i + 1]] = [a[i + 1], a[i]]; return a; });
  }

  async function generate() {
    if (images.length === 0) return;
    setLoading(true);
    try {
      const pdf = new jsPDF({ unit: "mm", format: pageSize === "fit" ? "a4" : pageSize });
      let firstPage = true;

      for (const img of images) {
        const dataUrl = await toDataURL(img.url);
        const dims = await getImageDims(img.url);
        const pdfW = pdf.internal.pageSize.getWidth();
        const pdfH = pdf.internal.pageSize.getHeight();

        let x = 0, y = 0, w = pdfW, h = pdfH;
        if (pageSize === "fit") {
          const ratio = Math.min(pdfW / dims.w, pdfH / dims.h);
          w = dims.w * ratio;
          h = dims.h * ratio;
          x = (pdfW - w) / 2;
          y = (pdfH - h) / 2;
        } else {
          const ratio = Math.min(pdfW / dims.w, pdfH / dims.h);
          w = dims.w * ratio;
          h = dims.h * ratio;
          x = (pdfW - w) / 2;
          y = (pdfH - h) / 2;
        }

        if (!firstPage) pdf.addPage();
        pdf.addImage(dataUrl, "JPEG", x, y, w, h);
        firstPage = false;
      }

      pdf.save("images.pdf");
    } finally {
      setLoading(false);
    }
  }

  function toDataURL(url: string): Promise<string> {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        canvas.getContext("2d")!.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg", 0.92));
      };
      img.src = url;
    });
  }

  function getImageDims(url: string): Promise<{ w: number; h: number }> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
      img.src = url;
    });
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragOver ? "border-indigo-500 bg-indigo-50" : "border-slate-300 hover:border-indigo-400"
        }`}
        onClick={() => inputRef.current?.click()}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
      >
        <div className="text-4xl mb-2">📁</div>
        <p className="text-slate-600 font-medium">Drop images here or click to upload</p>
        <p className="text-xs text-slate-400 mt-1">PNG, JPG, WebP — multiple files supported</p>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
          onChange={(e) => { if (e.target.files) addFiles(e.target.files); }} />
      </div>

      {/* Image List */}
      {images.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">{images.length} image{images.length > 1 ? "s" : ""} — drag to reorder</p>
          {images.map((img, i) => (
            <div key={img.id} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
              <img src={img.url} alt={img.name} className="w-12 h-12 object-cover rounded-lg border border-slate-200 flex-shrink-0" />
              <span className="flex-1 text-sm text-slate-700 truncate">{img.name}</span>
              <div className="flex gap-1">
                <button onClick={() => moveUp(i)} disabled={i === 0}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 text-xs">↑</button>
                <button onClick={() => moveDown(i)} disabled={i === images.length - 1}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 disabled:opacity-30 text-xs">↓</button>
                <button onClick={() => remove(img.id)}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-red-400 hover:bg-red-50 text-xs">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Page Size */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Page Size</label>
        <div className="flex gap-2">
          {([["a4", "A4"], ["letter", "Letter"], ["fit", "Fit to Image"]] as const).map(([val, label]) => (
            <button key={val} onClick={() => setPageSize(val)}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                pageSize === val ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-300 hover:border-indigo-400"
              }`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <button onClick={generate} disabled={images.length === 0 || loading}
        className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
        {loading ? "Generating PDF..." : `Convert ${images.length > 0 ? images.length : ""} Image${images.length !== 1 ? "s" : ""} to PDF`}
      </button>
    </div>
  );
}
