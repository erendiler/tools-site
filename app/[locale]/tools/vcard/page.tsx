import type { Metadata } from "next";
import VCardTool from "./VCardTool";
import ToolContent from "@/components/ToolContent";
export const metadata: Metadata = { title: "vCard Generator — ToolPit", description: "Create digital business cards with QR code. Download .vcf file." };
export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8"><a href="/" className="text-sm text-slate-500 hover:text-indigo-600">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">vCard Generator</h1>
        <p className="text-slate-500">Create a digital business card with QR code. Download .vcf file.</p>
      </div>
      <VCardTool />
      <ToolContent slug="vcard" />
    </div>
  );
}
