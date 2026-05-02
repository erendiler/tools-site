import type { Metadata } from "next";
import JwtDecoderTool from "./JwtDecoderTool";
export const metadata: Metadata = { title: "JWT Decoder — ErenTools", description: "Decode and inspect JWT tokens online. Free." };
export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8"><a href="/" className="text-sm text-slate-500 hover:text-indigo-600">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">JWT Decoder</h1>
        <p className="text-slate-500">Decode and inspect JWT token header, payload and signature.</p>
      </div>
      <JwtDecoderTool />
    </div>
  );
}
