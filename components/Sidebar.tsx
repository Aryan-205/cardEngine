'use client';

import React from 'react';
import { Type, Image as ImageIcon, Mail } from 'lucide-react';
import { useStore } from '@/store/store';
import type { SidebarTab } from '@/store/store';

const TABS: { id: SidebarTab; icon: React.ReactNode; label: string }[] = [
  { id: 'TEXT', icon: <Type size={32} />, label: 'TEXT' },
  { id: 'BACKGROUND', icon: <ImageIcon size={32} />, label: 'BACKGROUND' },
  { id: 'ENVELOPE', icon: <Mail size={32} />, label: 'ENVELOPE' },
];

export default function Sidebar() {
  const { activeTab, setActiveTab } = useStore();

  return (
    <div className="w-40 h-full p-8">
      <div className="w-fit h-full flex flex-col gap-4 items-center bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-2xl p-4 pt-8">
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
      className={`flex flex-col items-center gap-1 group cursor-pointer rounded-xl p-2 transition-colors ${
        active ? 'bg-[#fef3e2] text-[#8B5E3C]' : ''
      }`}
    >
      <div className={`p-3 transition-colors ${active ? 'text-[#8B5E3C]' : 'text-[#C4A484] group-hover:text-[#8B5E3C]'}`}>
        {icon}
      </div>
      <span className={`text-[9px] font-bold ${active ? 'text-[#8B5E3C]' : 'text-[#C4A484] group-hover:text-[#8B5E3C]'}`}>
        {label}
      </span>
    </button>
  );
}
