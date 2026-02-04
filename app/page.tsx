"use client";
import { useState } from "react";
import { TextOverlayControls } from "../component/text-overlay-controls";
import { BackgroundControls } from "../component/BackgroundControls";
import { CardPreview } from "../component/CardPreview";
import { Button } from "../components/ui/button";
import {
  Type,
  Image as ImageIcon,
  Mail,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/types/utils";
import { EnvelopePreview } from "@/component/Envelope";
import EnvelopeControls from "@/component/EnvelopeControls";

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState<"text" | "bg" | "envelope">(
    "text"
  );

  const saveToDatabase = () => {
    console.log("Saving to database");
  };

  const navItems = [
    { id: "text", label: "Text", icon: Type },
    { id: "bg", label: "Background & Effects", icon: ImageIcon },
    { id: "envelope", label: "Envelope", icon: Mail },
    { id: "reveals", label: "Reveals", icon: Sparkles },
  ];

  const [envelopeSettings, setEnvelopeSettings] = useState({
    color: "#D3C5B1",
    liner: "https://www.transparenttextures.com/patterns/gold-scale.png",
  });

  return (
    <div className="flex h-screen bg-[#E5E7EB] font-sans">
      {/* 1. LEFT FLOATING NAV */}
      <aside className="w-24 bg-white border-r flex flex-col items-center py-8 gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={cn(
              "flex flex-col items-center gap-1 group transition-colors",
              activeTab === item.id
                ? "text-green-600"
                : "text-gray-500 hover:text-gray-800"
            )}
          >
            <div
              className={cn(
                "p-2 rounded-lg border-2 transition-all",
                activeTab === item.id
                  ? "border-green-600 bg-green-50"
                  : "border-transparent"
              )}
            >
              <item.icon size={24} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter text-center px-1">
              {item.label}
            </span>
          </button>
        ))}
      </aside>
      <header className="absolute top-0 right-0 p-4 z-50">
        <Button 
          onClick={() => saveToDatabase()} 
          className="bg-green-600 hover:bg-green-700 text-white flex gap-2"
        >
          Finish & Preview <ChevronRight size={18} />
        </Button>
      </header>

      {/* 2. CENTER PREVIEW AREA */}
      <main className="flex-1 relative flex items-center justify-center p-12">
        {activeTab === "envelope" && (
          <EnvelopePreview
            envelopeColor={envelopeSettings.color}
            linerImage={envelopeSettings.liner}
          />
        )}
        {activeTab === "text" && <CardPreview />}
        {activeTab === "bg" && <CardPreview />}
      </main>

      {/* 3. RIGHT PROPERTY PANEL */}
      <aside className="w-[400px] bg-white border-l overflow-y-auto p-6 shadow-2xl">
        {activeTab === "text" && <TextOverlayControls />}
        {activeTab === "bg" && <BackgroundControls />}
        {activeTab === "envelope" && (
          <EnvelopeControls
            settings={envelopeSettings}
            updateSettings={(newSettings: any) =>
              setEnvelopeSettings((prev) => ({ ...prev, ...newSettings }))
            }
          />
        )}
        {activeTab !== "text" &&
          activeTab !== "bg" &&
          activeTab !== "envelope" && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p>Feature coming soon...</p>
            </div>
          )}
      </aside>
    </div>
  );
}
