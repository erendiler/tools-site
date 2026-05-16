import type { Metadata } from "next";
import Base64Tool from "./Base64Tool";
import ToolContent from "@/components/ToolContent";
export const metadata: Metadata = { title: "Base64 Encoder/Decoder — ToolPit", description: "Encode and decode Base64 strings online. Free." };
export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8"><a href="/" className="text-sm text-slate-500 hover:text-indigo-600">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Base64 Encoder / Decoder</h1>
        <p className="text-slate-500">Encode text to Base64 or decode Base64 to text instantly.</p>
      </div>
      <Base64Tool />
      <ToolContent slug="base64" />
    </div>
  );
}
