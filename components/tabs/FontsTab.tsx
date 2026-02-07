'use client';

import React from 'react';
import { useStore } from '@/store/store';
import { fontFamilies } from '@/lib/constants/fonts';
import { Type, Check } from 'lucide-react';

export default function FontsTab() {
    const { elements, selectedIds, updateElement } = useStore();

    const selectedElement = selectedIds.length === 1
        ? elements.find(el => el.id === selectedIds[0])
        : null;

    const handleFontSelect = (family: string) => {
        if (selectedElement && selectedElement.type === 'text') {
            updateElement(selectedElement.id, { fontFamily: family });
        }
    };

    return (
        <div className="flex flex-col h-full bg-white animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-6 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2 mb-2">
                    <Type size={18} className="text-blue-600" />
                    <h2 className="text-xs font-black uppercase tracking-widest text-gray-900">Premium Fonts</h2>
                </div>
                {!selectedElement || selectedElement.type !== 'text' ? (
                    <p className="text-[10px] font-bold text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
                        Select a text element to change its font
                    </p>
                ) : (
                    <p className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                        Changing font for selected text
                    </p>
                )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
                {fontFamilies.map((font) => (
                    <button
                        key={font.id}
                        onClick={() => handleFontSelect(font.family)}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all group ${selectedElement?.type === 'text' && selectedElement.fontFamily === font.family
                                ? 'border-blue-600 bg-blue-50/30'
                                : 'border-gray-50 hover:border-blue-200 hover:bg-gray-50'
                            }`}
                        style={{ fontFamily: font.family }}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-lg text-gray-900">{font.name}</span>
                            {selectedElement?.type === 'text' && selectedElement.fontFamily === font.family && (
                                <Check size={16} className="text-blue-600" />
                            )}
                        </div>
                        <span className="block text-[10px] font-sans text-gray-400 mt-1 uppercase tracking-widest group-hover:text-gray-500">
                            The quick brown fox jumps over the lazy dog
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
