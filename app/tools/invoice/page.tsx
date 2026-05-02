import type { Metadata } from "next";
import InvoiceTool from "./InvoiceTool";
export const metadata: Metadata = { title: "Invoice Generator — ErenTools", description: "Create professional invoices and download as PDF. Free." };
export default function Page() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8"><a href="/" className="text-sm text-slate-500 hover:text-indigo-600">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Invoice Generator</h1>
        <p className="text-slate-500">Create professional invoices and download as PDF. No signup.</p>
      </div>
      <InvoiceTool />
    </div>
  );
}
