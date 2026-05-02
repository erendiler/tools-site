"use client";
import { useState } from "react";

export default function EmailSignatureTool() {
  const [name, setName] = useState("Eren Diler");
  const [title, setTitle] = useState("Full Stack Developer");
  const [email, setEmail] = useState("eren@example.com");
  const [phone, setPhone] = useState("+1 (555) 000-0000");
  const [website, setWebsite] = useState("https://erendiler.com");
  const [company, setCompany] = useState("ToolPit");
  const [color, setColor] = useState("#6366f1");
  const [copied, setCopied] = useState(false);

  const html = `<table cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;font-size:14px;color:#333;">
  <tr>
    <td style="border-left:4px solid ${color};padding-left:12px;">
      <strong style="font-size:16px;color:#111;">${name}</strong><br>
      <span style="color:${color};font-size:13px;">${title}${company ? ` · ${company}` : ""}</span><br><br>
      ${email ? `<a href="mailto:${email}" style="color:#555;text-decoration:none;">📧 ${email}</a><br>` : ""}
      ${phone ? `<span style="color:#555;">📞 ${phone}</span><br>` : ""}
      ${website ? `<a href="${website}" style="color:${color};text-decoration:none;">🌐 ${website}</a>` : ""}
    </td>
  </tr>
</table>`;

  async function copy() { await navigator.clipboard.writeText(html); setCopied(true); setTimeout(() => setCopied(false), 1500); }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[["Full Name", name, setName], ["Job Title", title, setTitle], ["Email", email, setEmail],
          ["Phone", phone, setPhone], ["Website", website, setWebsite], ["Company", company, setCompany]
        ].map(([label, val, setter]) => (
          <div key={label as string}>
            <label className="block text-xs font-medium text-slate-600 mb-1">{label as string}</label>
            <input value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        ))}
      </div>
      <div><label className="block text-xs font-medium text-slate-600 mb-1">Accent Color</label>
        <input type="color" value={color} onChange={e => setColor(e.target.value)}
          className="h-10 w-full rounded-lg border border-slate-300 cursor-pointer" /></div>

      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">Preview</p>
        <div className="border border-slate-200 rounded-xl p-4 bg-white" dangerouslySetInnerHTML={{ __html: html }} />
      </div>

      <div>
        <p className="text-sm font-medium text-slate-700 mb-2">HTML Code</p>
        <textarea value={html} readOnly rows={6}
          className="w-full border border-slate-200 rounded-xl p-3 font-mono text-xs bg-slate-50 resize-none" />
      </div>
      <button onClick={copy} className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700">
        {copied ? "Copied!" : "Copy HTML"}
      </button>
    </div>
  );
}
