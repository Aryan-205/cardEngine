'use client';

import React from 'react';
import { useStore } from '@/store/store';
import { Type, ImageIcon, Layers, Eye, EyeOff, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';

export default function LayersTab() {
    const { elements, selectedIds, setSelection, removeElement, bringToFront, sendToBack, updateElement } = useStore();

    // Sort elements by zIndex descending to show top layers first
    const sortedElements = [...elements].sort((a, b) => b.zIndex - a.zIndex);

    return (
        <div className="flex flex-col h-full bg-white animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-6 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2 mb-2">
                    <Layers size={18} className="text-blue-600" />
                    <h2 className="text-xs font-black uppercase tracking-widest text-gray-900">Layers</h2>
                </div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Manage your canvas elements
                </p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
                {sortedElements.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-300">
                        <Layers size={48} className="mb-4 opacity-20" />
                        <p className="text-xs font-bold uppercase tracking-widest">No layers yet</p>
                    </div>
                ) : (
                    sortedElements.map((el) => (
                        <div
                            key={el.id}
                            onClick={() => setSelection([el.id])}
                            className={`group relative flex items-center gap-3 p-3 rounded-2xl border-2 transition-all cursor-pointer ${selectedIds.includes(el.id)
                                    ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                                    : 'border-gray-50 hover:border-gray-100 hover:bg-gray-50'
                                }`}
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${selectedIds.includes(el.id) ? 'bg-white border-blue-100' : 'bg-gray-100 border-gray-200'
                                }`}>
                                {el.type === 'text' ? (
                                    <Type size={18} className="text-gray-500" />
                                ) : (
                                    <img src={el.src} alt="" className="w-full h-full object-contain p-1 rounded-lg" />
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-black text-gray-900 truncate uppercase tracking-tight">
                                    {el.type === 'text' ? (el.text || 'Text Layer') : 'Image Layer'}
                                </p>
                                <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                                    Z-Index: {el.zIndex}
                                </p>
                            </div>

                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        updateElement(el.id, { isVisible: !el.isVisible });
                                    }}
                                    className="p-1.5 hover:bg-white rounded-lg text-gray-400 hover:text-blue-600 transition-colors"
                                    title={el.isVisible ? 'Hide' : 'Show'}
                                >
                                    {el.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeElement(el.id);
                                    }}
                                    className="p-1.5 hover:bg-white rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
