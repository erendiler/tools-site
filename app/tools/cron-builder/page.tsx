import type { Metadata } from "next";
import CronBuilderTool from "./CronBuilderTool";
export const metadata: Metadata = { title: "Cron Expression Builder — ErenTools", description: "Build and understand cron expressions visually." };
export default function Page() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8"><a href="/" className="text-sm text-slate-500 hover:text-indigo-600">← All Tools</a>
        <h1 className="text-3xl font-bold text-slate-900 mt-3 mb-1">Cron Expression Builder</h1>
        <p className="text-slate-500">Build cron expressions visually and understand what they mean.</p>
      </div>
      <CronBuilderTool />
    </div>
  );
}
