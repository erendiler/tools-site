"use client";
import { useState, useMemo } from "react";
import { marked } from "marked";

const DEFAULT = `# Hello ErenTools 👋

## Features
- **Bold** and *italic* text
- \`inline code\` and code blocks
- [Links](https://erendiler.com)

## Code Block
\`\`\`javascript
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet("World"));
\`\`\`

> Blockquote example here.

| Name | Value |
|------|-------|
| Tool | ErenTools |
| Type | Free |
`;

export default function MarkdownPreviewTool() {
  const [md, setMd] = useState(DEFAULT);
  const [copied, setCopied] = useState(false);
  const html = useMemo(() => marked(md) as string, [md]);

  async function copyHtml() { await navigator.clipboard.writeText(html); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Markdown</label>
          <textarea value={md} onChange={(e) => setMd(e.target.value)} rows={20}
            className="w-full border border-slate-300 rounded-xl p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Preview</label>
          <div className="border border-slate-200 rounded-xl p-4 min-h-[460px] prose prose-slate prose-sm max-w-none overflow-auto"
            dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
      <button onClick={copyHtml} className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700">
        {copied ? "Copied!" : "Copy HTML"}
      </button>
    </div>
  );
}
