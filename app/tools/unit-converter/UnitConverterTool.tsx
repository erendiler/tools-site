"use client";
import { useState } from "react";

type Category = { name: string; units: { label: string; toBase: number }[] };

const categories: Category[] = [
  { name: "Length", units: [
    { label: "Millimeter (mm)", toBase: 0.001 }, { label: "Centimeter (cm)", toBase: 0.01 },
    { label: "Meter (m)", toBase: 1 }, { label: "Kilometer (km)", toBase: 1000 },
    { label: "Inch (in)", toBase: 0.0254 }, { label: "Foot (ft)", toBase: 0.3048 },
    { label: "Yard (yd)", toBase: 0.9144 }, { label: "Mile (mi)", toBase: 1609.344 },
  ]},
  { name: "Weight", units: [
    { label: "Milligram (mg)", toBase: 0.000001 }, { label: "Gram (g)", toBase: 0.001 },
    { label: "Kilogram (kg)", toBase: 1 }, { label: "Ton (t)", toBase: 1000 },
    { label: "Ounce (oz)", toBase: 0.028349 }, { label: "Pound (lb)", toBase: 0.453592 },
  ]},
  { name: "Temperature", units: [
    { label: "Celsius (°C)", toBase: 1 }, { label: "Fahrenheit (°F)", toBase: 1 },
    { label: "Kelvin (K)", toBase: 1 },
  ]},
  { name: "Area", units: [
    { label: "Square mm", toBase: 0.000001 }, { label: "Square cm", toBase: 0.0001 },
    { label: "Square m", toBase: 1 }, { label: "Hectare (ha)", toBase: 10000 },
    { label: "Square km", toBase: 1000000 }, { label: "Square ft", toBase: 0.092903 },
    { label: "Acre", toBase: 4046.86 },
  ]},
  { name: "Speed", units: [
    { label: "m/s", toBase: 1 }, { label: "km/h", toBase: 0.277778 },
    { label: "mph", toBase: 0.44704 }, { label: "knot", toBase: 0.514444 },
  ]},
  { name: "Data", units: [
    { label: "Byte (B)", toBase: 1 }, { label: "Kilobyte (KB)", toBase: 1024 },
    { label: "Megabyte (MB)", toBase: 1048576 }, { label: "Gigabyte (GB)", toBase: 1073741824 },
    { label: "Terabyte (TB)", toBase: 1099511627776 },
  ]},
];

function convert(value: number, from: string, to: string, cat: Category): number {
  const fromUnit = cat.units.find(u => u.label === from);
  const toUnit = cat.units.find(u => u.label === to);
  if (!fromUnit || !toUnit) return 0;
  if (cat.name === "Temperature") {
    let celsius = value;
    if (from.includes("°F")) celsius = (value - 32) * 5/9;
    else if (from.includes("K")) celsius = value - 273.15;
    if (to.includes("°F")) return celsius * 9/5 + 32;
    if (to.includes("K")) return celsius + 273.15;
    return celsius;
  }
  return (value * fromUnit.toBase) / toUnit.toBase;
}

export default function UnitConverterTool() {
  const [catIdx, setCatIdx] = useState(0);
  const cat = categories[catIdx];
  const [fromUnit, setFromUnit] = useState(cat.units[0].label);
  const [toUnit, setToUnit] = useState(cat.units[2]?.label ?? cat.units[1].label);
  const [value, setValue] = useState("1");

  function changeCategory(idx: number) {
    setCatIdx(idx);
    setFromUnit(categories[idx].units[0].label);
    setToUnit(categories[idx].units[2]?.label ?? categories[idx].units[1].label);
    setValue("1");
  }

  const result = convert(parseFloat(value) || 0, fromUnit, toUnit, cat);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
      <div className="flex flex-wrap gap-2">
        {categories.map((c, i) => (
          <button key={c.name} onClick={() => changeCategory(i)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${catIdx === i ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-600 border-slate-300 hover:border-indigo-400"}`}>
            {c.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">From</label>
          <input type="number" value={value} onChange={(e) => setValue(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {cat.units.map(u => <option key={u.label}>{u.label}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">To</label>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-2 text-lg font-bold text-indigo-700 mb-2 min-h-[38px]">
            {isNaN(result) ? "—" : result.toPrecision(8).replace(/\.?0+$/, "")}
          </div>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}
            className="w-full border border-slate-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {cat.units.map(u => <option key={u.label}>{u.label}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
