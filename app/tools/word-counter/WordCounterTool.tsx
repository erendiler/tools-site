"use client";
import { useState, useMemo } from "react";

export default function WordCounterTool() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    const freq: Record<string, number> = {};
    text.toLowerCase().match(/\b[a-z]{3,}\b/g)?.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
    const topWords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 8);
    return { words, chars, charsNoSpace, sentences, paragraphs, readingTime, topWords };
  }, [text]);

  const statCards = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.chars },
    { label: "No Spaces", value: stats.charsNoSpace },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Read time", value: `${stats.readingTime} min` },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={10}
        placeholder="Paste or type your text here..."
        className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
      <div className="grid grid-cols-3 gap-3">
        {statCards.map(({ label, value }) => (
          <div key={label} className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-center">
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
      {stats.topWords.length > 0 && (
        <div>
          <p className="text-sm font-medium text-slate-700 mb-2">Top Words</p>
          <div className="flex flex-wrap gap-2">
            {stats.topWords.map(([word, count]) => (
              <span key={word} className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full border border-indigo-200">
                {word} <span className="text-indigo-400">×{count}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
