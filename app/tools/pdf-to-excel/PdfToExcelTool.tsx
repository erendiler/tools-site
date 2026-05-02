"use client";

import { useState, useRef } from "react";

type Status = "idle" | "reading" | "converting" | "done" | "error";
type Cell = { text: string; x: number; y: number; colIndex: number };
type SheetRow = string[];

function detectColumns(items: { x: number }[]): number[] {
  if (!items.length) return [];
  const xs = items.map((i) => i.x).sort((a, b) => a - b);
  const cols: number[] = [xs[0]];
  for (let i = 1; i < xs.length; i++) {
    if (xs[i] - xs[i - 1] > 15) cols.push(xs[i]);
  }
  return cols;
}

function snapToCol(x: number, cols: number[]): number {
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < cols.length; i++) {
    const d = Math.abs(x - cols[i]);
    if (d < bestDist) { bestDist = d; best = i; }
  }
  return best;
}

function buildSheet(items: { str: string; x: number; y: number; fontSize: number }[]): SheetRow[] {
  if (!items.length) return [];

  const sorted = [...items].sort((a, b) => a.y - b.y || a.x - b.x);
  const cols = detectColumns(items);

  // Group into rows by Y proximity
  const lineGroups: typeof sorted[] = [];
  let current: typeof sorted = [];
  let lastY = sorted[0].y;

  for (const item of sorted) {
    if (Math.abs(item.y - lastY) > item.fontSize * 0.8 && current.length) {
      lineGroups.push(current);
      current = [item];
      lastY = item.y;
    } else {
      current.push(item);
      lastY = (lastY + item.y) / 2;
    }
  }
  if (current.length) lineGroups.push(current);

  return lineGroups.map((line) => {
    const row: string[] = new Array(cols.length).fill("");
    for (const item of line) {
      const col = snapToCol(item.x, cols);
      row[col] = row[col] ? `${row[col]} ${item.str}` : item.str;
    }
    return row;
  });
}

export default function PdfToExcelTool() {
  const [status, setStatus] = useState<Status>("idle");
  const [sheets, setSheets] = useState<{ name: string; rows: SheetRow[] }[]>([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (file.type !== "application/pdf") { setError("Please upload a PDF file."); return; }
    setError("");
    setStatus("reading");
    setFileName(file.name.replace(/\.pdf$/i, ""));

    try {
      const pdfjsLib = await import("pdfjs-dist");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const result: { name: string; rows: SheetRow[] }[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const viewport = page.getViewport({ scale: 1 });

        const items = content.items
          .filter((item) => "str" in item && (item as { str: string }).str.trim())
          .map((item) => {
            const it = item as { str: string; transform: number[]; height: number };
            const [, , , scaleY, x, y] = it.transform;
            return {
              str: it.str.trim(),
              x: Math.round(x),
              y: Math.round(viewport.height - y),
              fontSize: Math.abs(scaleY) || Math.abs(it.height) || 10,
            };
          });

        result.push({ name: `Page ${i}`, rows: buildSheet(items) });
      }

      setSheets(result);
      setStatus("done");
    } catch (e) {
      console.error(e);
      setError("Could not read this PDF. It may be encrypted or image-based.");
      setStatus("error");
    }
  }

  async function download() {
    if (!sheets.length) return;
    setStatus("converting");
    try {
      const XLSX = await import("xlsx");
      const wb = XLSX.utils.book_new();
      for (const sheet of sheets) {
        const ws = XLSX.utils.aoa_to_sheet(sheet.rows.length ? sheet.rows : [["(no data)"]]);
        // Auto column width
        const colWidths = sheet.rows.reduce((acc, row) => {
          row.forEach((cell, i) => { acc[i] = Math.max(acc[i] ?? 8, String(cell).length + 2); });
          return acc;
        }, [] as number[]);
        ws["!cols"] = colWidths.map((w) => ({ wch: Math.min(w, 50) }));
        XLSX.utils.book_append_sheet(wb, ws, sheet.name.slice(0, 31));
      }
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    } catch (e) {
      console.error(e);
      setError("Could not generate Excel file.");
    } finally {
      setStatus("done");
    }
  }

  function reset() { setStatus("idle"); setSheets([]); setFileName(""); setError(""); }

  const totalRows = sheets.reduce((s, sh) => s + sh.rows.length, 0);
  const preview = sheets[0]?.rows.slice(0, 8) ?? [];
  const previewCols = Math.max(...preview.map((r) => r.length), 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
        ℹ️ Works best with text-based PDFs containing tables. Each page becomes a separate sheet.
      </div>

      {(status === "idle" || status === "error") && (
        <div
          className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
            dragOver ? "border-indigo-500 bg-indigo-50" : "border-slate-300 hover:border-indigo-400"
          }`}
          onClick={() => inputRef.current?.click()}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) handleFile(f); }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
        >
          <div className="text-5xl mb-3">📗</div>
          <p className="text-slate-600 font-medium">Drop PDF here or click to upload</p>
          <p className="text-xs text-slate-400 mt-1">PDF files only · Each page → separate Excel sheet</p>
          <input ref={inputRef} type="file" accept=".pdf,application/pdf" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
      )}

      {status === "reading" && (
        <div className="text-center py-10 space-y-3">
          <div className="text-4xl animate-pulse">📊</div>
          <p className="text-slate-500 text-sm">Extracting data from PDF...</p>
        </div>
      )}

      {status === "converting" && (
        <div className="text-center py-10 space-y-3">
          <div className="text-4xl animate-pulse">📈</div>
          <p className="text-slate-500 text-sm">Building Excel file...</p>
        </div>
      )}

      {status === "done" && sheets.length > 0 && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="text-sm font-medium text-green-800">{fileName}.pdf ready</p>
              <p className="text-xs text-green-600">
                {sheets.length} sheet{sheets.length > 1 ? "s" : ""} · {totalRows} rows detected
              </p>
            </div>
          </div>

          {preview.length > 0 && (
            <div>
              <p className="text-xs font-medium text-slate-500 mb-2">Preview — {sheets[0].name}</p>
              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="text-xs w-full">
                  <tbody>
                    {preview.map((row, ri) => (
                      <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                        {Array.from({ length: previewCols }).map((_, ci) => (
                          <td key={ci} className="px-3 py-1.5 border-r border-slate-200 last:border-0 whitespace-nowrap text-slate-700 max-w-[160px] truncate">
                            {row[ci] ?? ""}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <button onClick={reset}
              className="flex-1 bg-slate-100 text-slate-700 rounded-lg py-2.5 text-sm font-medium hover:bg-slate-200 transition-colors">
              Convert Another
            </button>
            <button onClick={download}
              className="flex-1 bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors">
              Download .xlsx
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
}
