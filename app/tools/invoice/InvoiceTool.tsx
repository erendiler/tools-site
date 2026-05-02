"use client";
import { useState } from "react";

type Item = { desc: string; qty: number; price: number };

export default function InvoiceTool() {
  const [from, setFrom] = useState({ name: "Your Company", email: "you@email.com", address: "123 Main St" });
  const [to, setTo] = useState({ name: "Client Name", email: "client@email.com", address: "456 Client Ave" });
  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [due, setDue] = useState("");
  const [items, setItems] = useState<Item[]>([{ desc: "Web Development", qty: 1, price: 500 }]);
  const [tax, setTax] = useState(0);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const taxAmount = subtotal * tax / 100;
  const total = subtotal + taxAmount;

  function addItem() { setItems(prev => [...prev, { desc: "", qty: 1, price: 0 }]); }
  function removeItem(i: number) { setItems(prev => prev.filter((_, idx) => idx !== i)); }
  function updateItem(i: number, key: keyof Item, val: string | number) {
    setItems(prev => prev.map((item, idx) => idx === i ? { ...item, [key]: val } : item));
  }

  async function download() {
    setLoading(true);
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const W = 210, margin = 20;

    doc.setFillColor(99, 102, 241);
    doc.rect(0, 0, W, 40, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24); doc.setFont("helvetica", "bold");
    doc.text("INVOICE", margin, 25);
    doc.setFontSize(11); doc.setFont("helvetica", "normal");
    doc.text(invoiceNo, W - margin, 25, { align: "right" });

    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    let y = 55;
    doc.setFont("helvetica", "bold"); doc.text("FROM", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(from.name, margin, y + 6); doc.text(from.email, margin, y + 12); doc.text(from.address, margin, y + 18);

    doc.setFont("helvetica", "bold"); doc.text("TO", 110, y);
    doc.setFont("helvetica", "normal");
    doc.text(to.name, 110, y + 6); doc.text(to.email, 110, y + 12); doc.text(to.address, 110, y + 18);

    y += 32;
    doc.text(`Date: ${date}`, margin, y);
    if (due) doc.text(`Due: ${due}`, 110, y);

    y += 14;
    doc.setFillColor(240, 240, 255);
    doc.rect(margin, y, W - margin * 2, 8, "F");
    doc.setFont("helvetica", "bold");
    doc.text("Description", margin + 2, y + 5.5);
    doc.text("Qty", 130, y + 5.5);
    doc.text("Price", 152, y + 5.5);
    doc.text("Total", 175, y + 5.5);

    y += 10;
    doc.setFont("helvetica", "normal");
    for (const item of items) {
      doc.text(item.desc || "-", margin + 2, y + 5);
      doc.text(String(item.qty), 130, y + 5);
      doc.text(`$${item.price.toFixed(2)}`, 152, y + 5);
      doc.text(`$${(item.qty * item.price).toFixed(2)}`, 175, y + 5);
      doc.setDrawColor(220, 220, 220);
      doc.line(margin, y + 7, W - margin, y + 7);
      y += 10;
    }

    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, W - margin, y, { align: "right" });
    if (tax > 0) { y += 7; doc.text(`Tax (${tax}%): $${taxAmount.toFixed(2)}`, W - margin, y, { align: "right" }); }
    y += 8;
    doc.setFont("helvetica", "bold"); doc.setFontSize(13);
    doc.text(`TOTAL: $${total.toFixed(2)}`, W - margin, y, { align: "right" });

    if (notes) {
      y += 16;
      doc.setFont("helvetica", "normal"); doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      doc.text("Notes:", margin, y); y += 5;
      doc.text(notes, margin, y);
    }

    doc.save(`${invoiceNo}.pdf`);
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-700">From</p>
          {["name", "email", "address"].map(k => (
            <input key={k} value={from[k as keyof typeof from]} onChange={e => setFrom(p => ({ ...p, [k]: e.target.value }))}
              placeholder={k.charAt(0).toUpperCase() + k.slice(1)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-700">To</p>
          {["name", "email", "address"].map(k => (
            <input key={k} value={to[k as keyof typeof to]} onChange={e => setTo(p => ({ ...p, [k]: e.target.value }))}
              placeholder={k.charAt(0).toUpperCase() + k.slice(1)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className="block text-xs text-slate-500 mb-1">Invoice #</label>
          <input value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
        <div><label className="block text-xs text-slate-500 mb-1">Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
        <div><label className="block text-xs text-slate-500 mb-1">Due Date</label>
          <input type="date" value={due} onChange={e => setDue(e.target.value)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
      </div>

      <div>
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-slate-500 mb-2 px-1">
          <span className="col-span-6">Description</span><span className="col-span-2">Qty</span><span className="col-span-3">Price ($)</span><span className="col-span-1"></span>
        </div>
        {items.map((item, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 mb-2">
            <input value={item.desc} onChange={e => updateItem(i, "desc", e.target.value)} placeholder="Item description"
              className="col-span-6 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="number" value={item.qty} onChange={e => updateItem(i, "qty", Number(e.target.value))} min={1}
              className="col-span-2 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <input type="number" value={item.price} onChange={e => updateItem(i, "price", Number(e.target.value))} min={0} step="0.01"
              className="col-span-3 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button onClick={() => removeItem(i)} className="col-span-1 text-red-400 hover:text-red-600 text-lg">×</button>
          </div>
        ))}
        <button onClick={addItem} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">+ Add Item</button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div><label className="block text-xs text-slate-500 mb-1">Tax (%)</label>
          <input type="number" value={tax} onChange={e => setTax(Number(e.target.value))} min={0} max={100}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" /></div>
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-right">
          <p className="text-xs text-slate-500">Subtotal: ${subtotal.toFixed(2)}</p>
          {tax > 0 && <p className="text-xs text-slate-500">Tax: ${taxAmount.toFixed(2)}</p>}
          <p className="text-lg font-bold text-indigo-700">Total: ${total.toFixed(2)}</p>
        </div>
      </div>
      <div><label className="block text-xs text-slate-500 mb-1">Notes</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2} placeholder="Payment terms, thank you note..."
          className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none" /></div>
      <button onClick={download} disabled={loading}
        className="w-full bg-indigo-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors">
        {loading ? "Generating PDF..." : "Download Invoice PDF"}
      </button>
    </div>
  );
}
