import type { Metadata } from "next";
import EmailSignatureTool from "./EmailSignatureTool";
import ToolContent from "@/components/ToolContent";
export const metadata: Metadata = { title: "Email Signature Generator — ToolPit", description: "Create professional HTML email signatures. Copy and paste into Gmail, Outlook." };
export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8"><a href="/" className="text-sm text-slate-500 hover:text-indigo-600">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Email Signature Generator</h1>
        <p className="text-slate-500">Create a professional email signature. Copy HTML and paste into Gmail or Outlook.</p>
      </div>
      <EmailSignatureTool />
      <ToolContent slug="email-signature" />
    </div>
  );
}
