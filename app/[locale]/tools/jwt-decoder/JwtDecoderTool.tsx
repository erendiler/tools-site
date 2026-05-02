"use client";
import { useState } from "react";

function decodeJWT(token: string) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT format (must have 3 parts)");
  const decode = (str: string) => {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, "=");
    return JSON.parse(decodeURIComponent(escape(atob(padded))));
  };
  return { header: decode(parts[0]), payload: decode(parts[1]), signature: parts[2] };
}

export default function JwtDecoderTool() {
  const [token, setToken] = useState("");
  const [result, setResult] = useState<{ header: object; payload: object; signature: string } | null>(null);
  const [error, setError] = useState("");

  function decode() {
    try { setResult(decodeJWT(token.trim())); setError(""); }
    catch (e) { setError((e as Error).message); setResult(null); }
  }

  function isExpired(payload: Record<string, unknown>) {
    if (!payload.exp) return null;
    return (payload.exp as number) < Date.now() / 1000;
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">JWT Token</label>
        <textarea value={token} onChange={(e) => setToken(e.target.value)} rows={4} placeholder="Paste your JWT token here..."
          className="w-full border border-slate-300 rounded-xl p-3 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={decode} className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700">Decode</button>
      {result && (
        <div className="space-y-3">
          {(result.payload as Record<string, unknown>).exp !== undefined && (
            <div className={`rounded-xl px-4 py-2 text-sm font-medium ${isExpired(result.payload as Record<string, unknown>) ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"}`}>
              {isExpired(result.payload as Record<string, unknown>) ? "⚠️ Token is EXPIRED" : "✅ Token is valid (not expired)"}
              {" — "}{new Date((result.payload as Record<string, unknown>).exp as number * 1000).toLocaleString()}
            </div>
          )}
          {[{ label: "Header", data: result.header, color: "text-pink-600" }, { label: "Payload", data: result.payload, color: "text-indigo-600" }].map(({ label, data, color }) => (
            <div key={label}>
              <p className={`text-xs font-bold uppercase mb-1 ${color}`}>{label}</p>
              <pre className="bg-slate-50 rounded-xl p-3 text-xs overflow-x-auto border border-slate-200">{JSON.stringify(data, null, 2)}</pre>
            </div>
          ))}
          <div>
            <p className="text-xs font-bold uppercase mb-1 text-slate-400">Signature</p>
            <p className="bg-slate-50 rounded-xl p-3 text-xs font-mono break-all border border-slate-200">{result.signature}</p>
          </div>
        </div>
      )}
    </div>
  );
}
