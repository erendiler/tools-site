"use client";

import { useState, useRef } from "react";

type Status = "idle" | "reading" | "converting" | "done" | "error";

type TextItem = { str: string; x: number; y: number; width: number; height: number; bold: boolean; fontSize: number };
type PageData = { pageNum: number; items: TextItem[] };

function buildParagraphs(items: TextItem[]): { text: string; bold: boolean; fontSize: number }[] {
  if (items.length === 0) return [];

  // Sort top-to-bottom, left-to-right
  const sorted = [...items].sort((a, b) => b.y - a.y || a.x - b.x);

  const lines: TextItem[][] = [];
  let currentLine: TextItem[] = [];
  let lastY = sorted[0].y;
  const lineThreshold = sorted[0].fontSize * 0.6;

  for (const item of sorted) {
    if (Math.abs(item.y - lastY) > lineThreshold) {
      if (currentLine.length) lines.push(currentLine);
      currentLine = [item];
      lastY = item.y;
    } else {
      currentLine.push(item);
    }
  }
  if (currentLine.length) lines.push(currentLine);

  // Merge lines into paragraphs by gap size
  const paragraphs: { text: string; bold: boolean; fontSize: number }[] = [];
  let paraLines: string[] = [];
  let paraFontSize = lines[0]?.[0]?.fontSize ?? 12;
  let paraBold = false;
  let lastLineY = lines[0]?.[0]?.y ?? 0;

  for (const line of lines) {
    const lineY = line[0].y;
    const gap = Math.abs(lastLineY - lineY);
    const avgFontSize = line.reduce((s, i) => s + i.fontSize, 0) / line.length;
    const lineText = line.sort((a, b) => a.x - b.x).map((i) => i.str).join(" ").trim();

    if (!lineText) { lastLineY = lineY; continue; }

    if (gap > avgFontSize * 1.8 && paraLines.length) {
      paragraphs.push({ text: paraLines.join(" "), bold: paraBold, fontSize: paraFontSize });
      paraLines = [];
    }

    if (!paraLines.length) {
      paraFontSize = avgFontSize;
      paraBold = line.some((i) => i.bold);
    }

    paraLines.push(lineText);
    lastLineY = lineY;
  }

  if (paraLines.length) paragraphs.push({ text: paraLines.join(" "), bold: paraBold, fontSize: paraFontSize });

  return paragraphs;
}

export default function PdfToWordTool() {
  const [status, setStatus] = useState<Status>("idle");
  const [pages, setPages] = useState<PageData[]>([]);
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
      const extracted: PageData[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const viewport = page.getViewport({ scale: 1 });

        const items: TextItem[] = content.items
          .filter((item) => "str" in item && (item as { str: string }).str.trim())
          .map((item) => {
            const it = item as {
              str: string; transform: number[];
              width: number; height: number;
              fontName?: string;
            };
            const [, , , scaleY, x, y] = it.transform;
            return {
              str: it.str,
              x,
              y: viewport.height - y,
              width: it.width,
              height: Math.abs(scaleY),
              fontSize: Math.abs(scaleY),
              bold: (it.fontName ?? "").toLowerCase().includes("bold"),
            };
          });

        extracted.push({ pageNum: i, items });
      }

      setPages(extracted);
      setStatus("done");
    } catch (e) {
      console.error(e);
      setError("Could not read this PDF. It may be encrypted or image-based.");
      setStatus("error");
    }
  }

  async function download() {
    if (!pages.length) return;
    setStatus("converting");

    try {
      const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } = await import("docx");

      const docChildren = [];

      for (const page of pages) {
        if (page.pageNum > 1) {
          docChildren.push(new Paragraph({ text: "", pageBreakBefore: true }));
        }

        const paragraphs = buildParagraphs(page.items);
        const avgFontSize = paragraphs.reduce((s, p) => s + p.fontSize, 0) / (paragraphs.length || 1);

        for (const para of paragraphs) {
          const isHeading = para.fontSize > avgFontSize * 1.3 || para.bold;
          docChildren.push(
            new Paragraph({
              heading: isHeading ? HeadingLevel.HEADING_2 : undefined,
              alignment: AlignmentType.LEFT,
              spacing: { after: 120 },
              children: [
                new TextRun({
                  text: para.text,
                  bold: para.bold,
                  size: Math.round(Math.min(Math.max(para.fontSize, 8), 36) * 2),
                }),
              ],
            })
          );
        }
      }

      const doc = new Document({ sections: [{ children: docChildren }] });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${fileName}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      setError("Could not generate Word file.");
    } finally {
      setStatus("done");
    }
  }

  function reset() { setStatus("idle"); setPages([]); setFileName(""); setError(""); }

  const totalChars = pages.reduce((s, p) => s + p.items.reduce((ss, i) => ss + i.str.length, 0), 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-700">
        ℹ️ Best with text-based PDFs. Scanned/image PDFs won't extract correctly.
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
          <div className="text-5xl mb-3">📕</div>
          <p className="text-slate-600 font-medium">Drop PDF here or click to upload</p>
          <p className="text-xs text-slate-400 mt-1">PDF files only</p>
          <input ref={inputRef} type="file" accept=".pdf,application/pdf" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />
        </div>
      )}

      {status === "reading" && (
        <div className="text-center py-10 space-y-3">
          <div className="text-4xl animate-pulse">📖</div>
          <p className="text-slate-500 text-sm">Reading PDF...</p>
        </div>
      )}

      {status === "converting" && (
        <div className="text-center py-10 space-y-3">
          <div className="text-4xl animate-pulse">📝</div>
          <p className="text-slate-500 text-sm">Building Word document...</p>
        </div>
      )}

      {status === "done" && pages.length > 0 && (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="text-sm font-medium text-green-800">{fileName}.pdf ready</p>
              <p className="text-xs text-green-600">{pages.length} pages · ~{totalChars.toLocaleString()} characters</p>
            </div>
          </div>

          {/* Text preview */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 max-h-52 overflow-y-auto space-y-3 text-sm text-slate-700">
            {pages.slice(0, 2).map((p) => {
              const paras = buildParagraphs(p.items);
              return (
                <div key={p.pageNum}>
                  <p className="text-xs font-bold text-slate-400 mb-1">PAGE {p.pageNum}</p>
                  {paras.slice(0, 4).map((para, i) => (
                    <p key={i} className={`mb-1 ${para.bold ? "font-semibold" : ""}`}>{para.text}</p>
                  ))}
                  {paras.length > 4 && <p className="text-xs text-slate-400">...{paras.length - 4} more paragraphs</p>}
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            <button onClick={reset}
              className="flex-1 bg-slate-100 text-slate-700 rounded-lg py-2.5 text-sm font-medium hover:bg-slate-200 transition-colors">
              Convert Another
            </button>
            <button onClick={download}
              className="flex-1 bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors">
              Download .docx
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
}
