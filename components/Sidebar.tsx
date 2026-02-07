'use client';

import React from 'react';
import { Type, Image as ImageIcon, Mail, Layers, MousePointer2, Settings, Smile, CaseSensitive } from 'lucide-react';
import { useStore } from '@/store/store';
import type { SidebarTab } from '@/store/store';

const TABS: { id: SidebarTab; icon: React.ReactNode; label: string }[] = [
  { id: 'TEXT', icon: <Type size={24} />, label: 'Text' },
  { id: 'FONTS', icon: <CaseSensitive size={24} />, label: 'Fonts' },
  { id: 'IMAGES', icon: <ImageIcon size={24} />, label: 'Images' },
  { id: 'ELEMENTS', icon: <Smile size={24} />, label: 'Elements' },
  { id: 'BACKGROUND', icon: <MousePointer2 size={24} />, label: 'Background' },
  { id: 'ENVELOPE', icon: <Mail size={24} />, label: 'Envelope' },
  { id: 'LAYERS', icon: <Layers size={24} />, label: 'Layers' },
  { id: 'LAYOUT', icon: <Settings size={24} />, label: 'Layout' },
];

export default function Sidebar() {
  const { activeTab, setActiveTab } = useStore();

  return (
    <div className="w-[88px] h-full border-r border-gray-100 bg-white flex flex-col items-center py-6 gap-2 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="mb-2">
        {/* Logo removed as requested */}
      </div>
      <div className="flex-1 w-full flex flex-col items-center gap-2 overflow-y-auto no-scrollbar scroll-smooth">
        {TABS.map((tab) => (
          <SidebarItem
            key={tab.id}
            icon={tab.icon}
            label={tab.label}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>
    </div>
  );
}

function SidebarItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col items-center justify-center w-[72px] h-[72px] rounded-2xl transition-all duration-300 premium-button ${active
        ? 'bg-blue-50 text-blue-600 shadow-sm'
        : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
        }`}
    >
      <div className={`mb-1.5 transition-transform duration-300 group-hover:scale-110 ${active ? 'scale-110' : ''}`}>
        {icon}
      </div>
      <span className={`text-[10px] font-bold tracking-tight uppercase transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-60'}`}>
        {label}
      </span>
      {active && (
        <div className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r-full" />
      )}
    </button>
  );
}
