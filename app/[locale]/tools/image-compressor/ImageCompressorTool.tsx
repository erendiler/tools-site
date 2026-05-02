"use client";

import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";

type Result = {
  originalName: string;
  originalSize: number;
  compressedSize: number;
  compressedUrl: string;
  compressedName: string;
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export default function ImageCompressorTool() {
  const [results, setResults] = useState<Result[]>([]);
  const [quality, setQuality] = useState(80);
  const [maxWidth, setMaxWidth] = useState(1920);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function compress(files: File[]) {
    setLoading(true);
    setResults([]);
    const newResults: Result[] = [];

    for (const file of files) {
      try {
        const compressed = await imageCompression(file, {
          maxSizeMB: 10,
          maxWidthOrHeight: maxWidth,
          useWebWorker: true,
          initialQuality: quality / 100,
          fileType: file.type as "image/jpeg" | "image/png" | "image/webp",
        });

        const url = URL.createObjectURL(compressed);
        const ext = file.name.split(".").pop();
        newResults.push({
          originalName: file.name,
          originalSize: file.size,
          compressedSize: compressed.size,
          compressedUrl: url,
          compressedName: file.name.replace(`.${ext}`, `_compressed.${ext}`),
        });
      } catch {
        // skip failed files
      }
    }

    setResults(newResults);
    setLoading(false);
  }

  function handleFiles(fileList: FileList | File[]) {
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (files.length > 0) compress(files);
  }

  function downloadAll() {
    results.forEach((r) => {
      const a = document.createElement("a");
      a.href = r.compressedUrl;
      a.download = r.compressedName;
      a.click();
    });
  }

  const totalSaved = results.reduce((acc, r) => acc + (r.originalSize - r.compressedSize), 0);
  const avgReduction = results.length
    ? Math.round(results.reduce((acc, r) => acc + ((r.originalSize - r.compressedSize) / r.originalSize) * 100, 0) / results.length)
    : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      {/* Settings */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="flex justify-between text-sm font-medium text-slate-700 mb-1">
            <span>Quality</span><span className="text-slate-400">{quality}%</span>
          </label>
          <input type="range" min={10} max={100} value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-full accent-indigo-600" />
        </div>
        <div>
          <label className="flex justify-between text-sm font-medium text-slate-700 mb-1">
            <span>Max Width</span><span className="text-slate-400">{maxWidth}px</span>
          </label>
          <input type="range" min={320} max={4096} step={32} value={maxWidth}
            onChange={(e) => setMaxWidth(Number(e.target.value))}
            className="w-full accent-indigo-600" />
        </div>
      </div>

      {/* Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          dragOver ? "border-indigo-500 bg-indigo-50" : "border-slate-300 hover:border-indigo-400"
        }`}
        onClick={() => inputRef.current?.click()}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
      >
        {loading ? (
          <div className="space-y-2">
            <div className="text-3xl animate-pulse">⚙️</div>
            <p className="text-slate-500 text-sm">Compressing...</p>
          </div>
        ) : (
          <>
            <div className="text-4xl mb-2">🗜️</div>
            <p className="text-slate-600 font-medium">Drop images here or click to upload</p>
            <p className="text-xs text-slate-400 mt-1">PNG, JPG, WebP — multiple files supported</p>
          </>
        )}
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden"
          onChange={(e) => { if (e.target.files) handleFiles(e.target.files); }} />
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 rounded-xl p-3 border border-green-100 text-center">
              <p className="text-2xl font-bold text-green-700">{avgReduction}%</p>
              <p className="text-xs text-green-600 mt-0.5">Average reduction</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 text-center">
              <p className="text-2xl font-bold text-blue-700">{formatSize(totalSaved)}</p>
              <p className="text-xs text-blue-600 mt-0.5">Total saved</p>
            </div>
          </div>

          {/* File List */}
          <div className="space-y-2">
            {results.map((r, i) => {
              const reduction = Math.round(((r.originalSize - r.compressedSize) / r.originalSize) * 100);
              return (
                <div key={i} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-700 truncate">{r.originalName}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {formatSize(r.originalSize)} → {formatSize(r.compressedSize)}
                      <span className="ml-2 text-green-600 font-medium">−{reduction}%</span>
                    </p>
                  </div>
                  <a href={r.compressedUrl} download={r.compressedName}
                    className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors flex-shrink-0">
                    Download
                  </a>
                </div>
              );
            })}
          </div>

          {results.length > 1 && (
            <button onClick={downloadAll}
              className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors">
              Download All ({results.length} files)
            </button>
          )}
        </div>
      )}
    </div>
  );
}
