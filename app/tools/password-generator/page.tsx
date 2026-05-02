import type { Metadata } from "next";
import PasswordGeneratorTool from "./PasswordGeneratorTool";

export const metadata: Metadata = {
  title: "Password Generator — ErenTools",
  description: "Generate strong, secure passwords. Customizable length and character sets.",
};

export default function PasswordGeneratorPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <a href="/" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Password Generator</h1>
        <p className="text-slate-500">Generate strong, secure passwords instantly. Nothing is sent to any server.</p>
      </div>
      <PasswordGeneratorTool />
    </div>
  );
}
