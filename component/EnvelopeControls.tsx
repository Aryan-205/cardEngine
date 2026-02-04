"use client";
import React from "react";
import { RotateCcw, Crown } from "lucide-react";
import { cn } from "@/types/utils";

// Mock data to match your screenshot
const COLORS = [
  "#80165B",
  "#C1E1D2",
  "#F5E6D3",
  "#8EB09B",
  "#DDA0DD",
  "#556B2F",
  "#4B3621",
  "#D3C5B1",
  "#C2B280",
  "#E2583E",
  "#CD7F32",
  "#FFFFFF",
];

const LINERS = [
  {
    id: "waves",
    url: "https://www.transparenttextures.com/patterns/waves.png",
  },
  {
    id: "gold-scale",
    url: "https://www.transparenttextures.com/patterns/gold-scale.png",
  },
  { id: "pizza", url: "https://www.transparenttextures.com/patterns/food.png" },
  {
    id: "diamonds",
    url: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
  },
  {
    id: "abstract",
    url: "https://www.transparenttextures.com/patterns/cubes.png",
  },
  {
    id: "velvet",
    url: "https://www.transparenttextures.com/patterns/กระดาษอาร์ต.png",
  },
];

export default function EnvelopeControls({ settings, updateSettings }: any) {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-4">
      {/* HEADER SECTION */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-widest uppercase text-gray-500">
          Envelope
        </h2>
        <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors">
          <RotateCcw size={14} /> RESET
        </button>
      </div>

      {/* COLOR GRID */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Envelope Colors
          </label>
        </div>
        <div className="grid grid-cols-6 gap-3">
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => updateSettings({ color })}
              className={cn(
                "w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 active:scale-95 shadow-sm",
                settings.color === color
                  ? "border-blue-500 scale-110"
                  : "border-transparent"
              )}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </section>

      {/* LINER GRID */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Liners
          </label>
          <span className="text-[10px] font-bold text-gray-400">Reset</span>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {LINERS.map((liner) => (
            <button
              key={liner.id}
              onClick={() => updateSettings({ liner: liner.url })}
              className={cn(
                "aspect-square rounded border-2 overflow-hidden bg-gray-50 transition-all hover:opacity-80",
                settings.liner === liner.url
                  ? "border-blue-500"
                  : "border-gray-100"
              )}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${liner.url})`,
                  backgroundSize: "cover",
                }}
              />
            </button>
          ))}
        </div>
      </section>

      {/* PREMIUM UPSELL (Mirroring the screenshot) */}
      <div className="mt-auto p-4 rounded-xl bg-green-50 border border-green-100 flex items-start gap-3">
        <div className="p-2 bg-white rounded-lg shadow-sm">
          <Crown size={18} className="text-amber-500" />
        </div>
        <div>
          <p className="text-xs font-bold text-gray-800">Premium Feature</p>
          <p className="text-[11px] text-gray-500 mt-0.5">
            Unlock exclusive liners and custom stamps.
          </p>
          <button className="text-[11px] font-bold text-green-700 mt-2 hover:underline">
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}
