import type { Metadata } from "next";
import QRCodeTool from "./QRCodeTool";

export const metadata: Metadata = {
  title: "QR Code Generator — ErenTools",
  description: "Free QR code generator. Create QR codes for URLs, text, WiFi. Download as PNG.",
};

export default function QRCodePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <a href="/" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">QR Code Generator</h1>
        <p className="text-slate-500">Generate QR codes for any URL or text. Free, no signup required.</p>
      </div>
      <QRCodeTool />
    </div>
  );
}
