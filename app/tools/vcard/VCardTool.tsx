"use client";
import { useState, useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function VCardTool() {
  const [name, setName] = useState("Eren Diler");
  const [org, setOrg] = useState("ToolPit");
  const [title, setTitle] = useState("Full Stack Developer");
  const [email, setEmail] = useState("eren@example.com");
  const [phone, setPhone] = useState("+1 555 000 0000");
  const [website, setWebsite] = useState("https://erendiler.com");
  const [address, setAddress] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const vcard = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nORG:${org}\nTITLE:${title}\nEMAIL:${email}\nTEL:${phone}\nURL:${website}\n${address ? `ADR:;;${address};;;;\n` : ""}END:VCARD`;

  useEffect(() => {
    if (!canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, vcard, { width: 200, margin: 2 }).catch(() => {});
  }, [vcard]);

  function downloadVcf() {
    const blob = new Blob([vcard], { type: "text/vcard" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${name.replace(/\s+/g, "_")}.vcf`;
    a.click();
    setDownloaded(true); setTimeout(() => setDownloaded(false), 1500);
  }

  function downloadQR() {
    const a = document.createElement("a");
    a.href = canvasRef.current!.toDataURL("image/png");
    a.download = `${name.replace(/\s+/g, "_")}_qr.png`;
    a.click();
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {[["Full Name *", name, setName], ["Organization", org, setOrg], ["Job Title", title, setTitle],
          ["Email", email, setEmail], ["Phone", phone, setPhone], ["Website", website, setWebsite],
          ["Address", address, setAddress]
        ].map(([label, val, setter]) => (
          <div key={label as string} className={(label as string).includes("Address") ? "sm:col-span-2" : ""}>
            <label className="block text-xs font-medium text-slate-600 mb-1">{label as string}</label>
            <input value={val as string} onChange={e => (setter as (v: string) => void)(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3 py-4">
        <p className="text-sm font-medium text-slate-700">QR Code — Scan to save contact</p>
        <canvas ref={canvasRef} className="rounded-xl border border-slate-200" />
        <button onClick={downloadQR} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">Download QR PNG</button>
      </div>

      <button onClick={downloadVcf}
        className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 transition-colors">
        {downloaded ? "Downloaded!" : "Download .vcf File"}
      </button>
    </div>
  );
}
