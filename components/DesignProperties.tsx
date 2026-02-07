'use client';

import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { useStore } from '@/store/store';
import { fontFamilies } from '@/lib/constants/fonts';
import {
    Type,
    Trash2,
    Copy,
    ArrowUp,
    ArrowDown,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Maximize,
    Download,
    PlusCircle,
    Palette,
    Layout as LayoutIcon,
    Image as ImageIcon,
    Smile,
    CaseSensitive
} from 'lucide-react';
import ElementsTab from './tabs/ElementsTab';
import FontsTab from './tabs/FontsTab';
import LayersTab from './tabs/LayersTab';

export default function DesignProperties() {
    const {
        selectedIds,
        elements,
        updateElement,
        removeElement,
        activeTab,
        background,
        setBackground,
        addElement
    } = useStore();

    const selectedElement = selectedIds.length === 1
        ? elements.find(el => el.id === selectedIds[0])
        : null;

    const renderHeader = (title: string, Icon: any) => (
        <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <Icon size={18} className="text-blue-600" />
            <h2 className="text-xs font-black uppercase tracking-widest text-gray-900">{title}</h2>
        </div>
    );

    const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="mb-8">
            <label className="text-[10px] font-black uppercase tracking-[0.1em] text-gray-400 block mb-4">
                {title}
            </label>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );

    // Render specific controls based on selection
    if (selectedElement) {
        return (
            <div className="flex flex-col h-full bg-white animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="p-6 overflow-y-auto no-scrollbar flex-1">
                    {renderHeader(`${selectedElement.type} Settings`, selectedElement.type === 'text' ? Type : ImageIcon)}

                    <Section title="Appearance">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-xs font-bold text-gray-700">Opacity</label>
                                <span className="text-[10px] text-gray-400 font-mono">{Math.round(selectedElement.opacity * 100)}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={selectedElement.opacity}
                                onChange={(e) => updateElement(selectedElement.id, { opacity: parseFloat(e.target.value) })}
                                className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 block mb-1">Position X</label>
                                <input
                                    type="number"
                                    value={Math.round(selectedElement.x)}
                                    onChange={(e) => updateElement(selectedElement.id, { x: parseInt(e.target.value) })}
                                    className="w-full border-none bg-gray-50 rounded-lg px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 block mb-1">Position Y</label>
                                <input
                                    type="number"
                                    value={Math.round(selectedElement.y)}
                                    onChange={(e) => updateElement(selectedElement.id, { y: parseInt(e.target.value) })}
                                    className="w-full border-none bg-gray-50 rounded-lg px-3 py-2 text-sm font-semibold focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </Section>

                    <Section title="Arrange">
                        <div className="grid grid-cols-2 gap-2">
                            <button
                                onClick={() => useStore.getState().bringToFront(selectedElement.id)}
                                className="flex items-center justify-center gap-2 text-[11px] font-bold p-2.5 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:shadow-sm transition-all premium-button"
                            >
                                <ArrowUp size={14} className="text-blue-500" /> Bring Front
                            </button>
                            <button
                                onClick={() => useStore.getState().sendToBack(selectedElement.id)}
                                className="flex items-center justify-center gap-2 text-[11px] font-bold p-2.5 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:shadow-sm transition-all premium-button"
                            >
                                <ArrowDown size={14} className="text-blue-500" /> Send Back
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                const { id, ...rest } = selectedElement;
                                addElement({ ...rest as any, x: selectedElement.x + 20, y: selectedElement.y + 20 });
                            }}
                            className="w-full flex items-center justify-center gap-2 text-[11px] font-bold p-2.5 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:shadow-sm transition-all premium-button"
                        >
                            <Copy size={14} className="text-blue-500" /> Duplicate Element
                        </button>
                    </Section>

                    {selectedElement.type === 'text' && (
                        <Section title="Typography">
                            <div>
                                <label className="text-[10px] font-bold text-gray-400 block mb-2">Text Content</label>
                                <textarea
                                    value={selectedElement.text}
                                    onChange={(e) => updateElement(selectedElement.id, { text: e.target.value })}
                                    className="w-full border-none bg-gray-50 rounded-xl p-3 text-sm font-medium focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-gray-400 block mb-2">Font Family</label>
                                <select
                                    value={selectedElement.fontFamily}
                                    onChange={(e) => updateElement(selectedElement.id, { fontFamily: e.target.value })}
                                    className="w-full border-none bg-gray-50 rounded-xl px-3 py-2.5 text-sm font-semibold appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-blue-100"
                                >
                                    {fontFamilies.map(f => (
                                        <option key={f.id} value={f.family} style={{ fontFamily: f.family }}>
                                            {f.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 block mb-1">Size</label>
                                    <input
                                        type="number"
                                        value={selectedElement.fontSize}
                                        onChange={(e) => updateElement(selectedElement.id, { fontSize: parseInt(e.target.value) })}
                                        className="w-full border-none bg-gray-50 rounded-lg px-3 py-2 text-sm font-semibold outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-400 block mb-1">Style</label>
                                    <button
                                        onClick={() => updateElement(selectedElement.id, { fontWeight: selectedElement.fontWeight === 'bold' ? 'normal' : 'bold' })}
                                        className={`w-full h-[38px] flex items-center justify-center border font-black text-xs rounded-lg transition-all ${selectedElement.fontWeight === 'bold' ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border-gray-100 text-gray-400'}`}
                                    >
                                        B
                                    </button>
                                </div>
                            </div>

                            <div className="flex bg-gray-50 p-1 rounded-xl">
                                {(['left', 'center', 'right'] as const).map(align => (
                                    <button
                                        key={align}
                                        onClick={() => updateElement(selectedElement.id, { textAlign: align })}
                                        className={`flex-1 flex items-center justify-center p-2 rounded-lg transition-all ${selectedElement.textAlign === align ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                                    >
                                        {align === 'left' && <AlignLeft size={16} />}
                                        {align === 'center' && <AlignCenter size={16} />}
                                        {align === 'right' && <AlignRight size={16} />}
                                    </button>
                                ))}
                            </div>

                            <div>
                                <label className="text-[10px] font-bold text-gray-400 block mb-2">Text Color</label>
                                <div className="p-3 border border-gray-100 rounded-2xl bg-white shadow-sm">
                                    <HexColorPicker
                                        color={selectedElement.color}
                                        onChange={(c) => updateElement(selectedElement.id, { color: c })}
                                        style={{ width: '100%', height: '140px' }}
                                    />
                                    <div className="mt-3 flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full border border-gray-100" style={{ backgroundColor: selectedElement.color }} />
                                        <span className="text-xs font-mono font-bold text-gray-500 uppercase">{selectedElement.color}</span>
                                    </div>
                                </div>
                            </div>
                        </Section>
                    )}
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                    <button
                        onClick={() => {
                            if (!selectedElement) return;
                            if (confirm('Are you sure you want to delete this element?')) {
                                removeElement(selectedElement.id);
                            }
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3.5 text-red-600 bg-white border border-red-100 rounded-2xl hover:bg-red-50 transition-all font-bold text-sm premium-button shadow-sm shadow-red-50"
                    >
                        <Trash2 size={16} /> Delete Element
                    </button>
                </div>
            </div>
        );
    }

    // Fallback logic
    const renderFallback = () => {
        if (activeTab === 'TEXT') {
            return (
                <div className="p-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    {renderHeader('Text Elements', PlusCircle)}
                    <div className="space-y-4">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Click a style to add text</p>

                        <button
                            onClick={() => addElement({
                                type: 'text',
                                text: 'ADD A HEADING',
                                x: 100, y: 100, width: 400, height: 80, rotation: 0, opacity: 1, isVisible: true,
                                fontSize: 64, fontWeight: '900', fontFamily: fontFamilies[2].family, color: '#000000',
                                orientation: 'horizontal', textAlign: 'center',
                                textShadow: { enabled: false, color: '#000000', blur: 0, offsetX: 0, offsetY: 0 }
                            })}
                            className="w-full group p-4 border-2 border-gray-50 rounded-2xl hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left"
                        >
                            <span className="block text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">Add a heading</span>
                        </button>

                        <button
                            onClick={() => addElement({
                                type: 'text',
                                text: 'Add a subheading',
                                x: 100, y: 200, width: 350, height: 60, rotation: 0, opacity: 1, isVisible: true,
                                fontSize: 32, fontWeight: '600', fontFamily: fontFamilies[2].family, color: '#374151',
                                orientation: 'horizontal', textAlign: 'center',
                                textShadow: { enabled: false, color: '#000000', blur: 0, offsetX: 0, offsetY: 0 }
                            })}
                            className="w-full group p-4 border-2 border-gray-50 rounded-2xl hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left"
                        >
                            <span className="block text-lg font-bold text-gray-700 group-hover:text-blue-600 transition-colors">Add a subheading</span>
                        </button>

                        <button
                            onClick={() => addElement({
                                type: 'text',
                                text: 'Add a little bit of body text',
                                x: 100, y: 300, width: 300, height: 100, rotation: 0, opacity: 1, isVisible: true,
                                fontSize: 16, fontWeight: 'normal', fontFamily: fontFamilies[5].family, color: '#4B5563',
                                orientation: 'horizontal', textAlign: 'left',
                                textShadow: { enabled: false, color: '#000000', blur: 0, offsetX: 0, offsetY: 0 }
                            })}
                            className="w-full group p-4 border-2 border-gray-50 rounded-2xl hover:border-blue-200 hover:bg-blue-50/30 transition-all text-left"
                        >
                            <span className="block text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors">Add body text</span>
                        </button>

                        <div className="pt-6">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Decorative Presets</p>
                            <div className="grid grid-cols-1 gap-4">
                                <button
                                    onClick={() => addElement({
                                        type: 'text',
                                        text: 'Elegant Invitation',
                                        x: 100, y: 400, width: 400, height: 120, rotation: 0, opacity: 1, isVisible: true,
                                        fontSize: 72, fontWeight: 'normal', fontFamily: fontFamilies[3].family, color: '#831843',
                                        orientation: 'horizontal', textAlign: 'center',
                                        textShadow: { enabled: false, color: '#000000', blur: 0, offsetX: 0, offsetY: 0 }
                                    })}
                                    className="w-full group p-6 border-2 border-pink-50 bg-pink-50/10 rounded-3xl hover:border-pink-200 hover:bg-pink-50/30 transition-all text-center"
                                >
                                    <span className="block text-3xl italic text-pink-900 group-hover:text-pink-600 transition-colors" style={{ fontFamily: fontFamilies[3].family }}>Calligraphy Style</span>
                                </button>

                                <button
                                    onClick={() => addElement({
                                        type: 'text',
                                        text: 'M0DERN VIB3S',
                                        x: 100, y: 500, width: 400, height: 100, rotation: 0, opacity: 1, isVisible: true,
                                        fontSize: 48, fontWeight: '900', fontFamily: 'monospace', color: '#111827',
                                        orientation: 'horizontal', textAlign: 'center',
                                        textShadow: { enabled: false, color: '#000000', blur: 0, offsetX: 0, offsetY: 0 }
                                    })}
                                    className="w-full group p-6 border-2 border-gray-900 bg-gray-900 rounded-3xl hover:bg-black transition-all text-center"
                                >
                                    <span className="block text-2xl font-black text-white transition-colors tracking-tighter uppercase italic">Cyber Modern</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (activeTab === 'BACKGROUND') {
            return (
                <div className="p-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    {renderHeader('Background Settings', Palette)}
                    <Section title="Quick Colors">
                        <div className="grid grid-cols-5 gap-3">
                            {['#FFFFFF', '#F8F6EF', '#FFF5F5', '#F0F9FF', '#F0FDF4', '#1F2937', '#312E81', '#4C1D95', '#7F1D1D', '#064E3B'].map(c => (
                                <button
                                    key={c}
                                    onClick={() => setBackground({ type: 'color', value: c })}
                                    className={`w-full aspect-square rounded-full border-2 transition-all hover:scale-110 ${background.value === c ? 'border-blue-500 scale-110 shadow-lg' : 'border-transparent'}`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                    </Section>

                    <Section title="Custom Color">
                        <div className="p-3 border border-gray-100 rounded-2xl bg-white shadow-sm">
                            <HexColorPicker
                                color={background.value.startsWith('#') ? background.value : '#ffffff'}
                                onChange={(c) => setBackground({ type: 'color', value: c })}
                                style={{ width: '100%', height: '180px' }}
                            />
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-gray-400">Current Hex</span>
                                <span className="text-xs font-mono font-bold text-gray-900 border-b-2 border-blue-100">{background.value}</span>
                            </div>
                        </div>
                    </Section>
                </div>
            );
        }

        if (activeTab === 'LAYOUT') {
            const { canvasConfig, setCanvasConfig } = useStore();
            const ASPECT_RATIOS = [
                { label: 'Self Define', value: 'custom' },
                { label: 'Square 1:1', value: 1 },
                { label: 'Standard 4:3', value: 3 / 4 },
                { label: 'Portrait 3:4', value: 4 / 3 },
                { label: 'Widescreen 16:9', value: 9 / 16 },
                { label: 'Story 9:16', value: 16 / 9 },
            ];

            const downloadImage = async () => {
                const { toPng } = await import('html-to-image');
                const node = document.getElementById('design-canvas');
                if (node) {
                    const dataUrl = await toPng(node, { quality: 1.0, pixelRatio: 2 });
                    const link = document.createElement('a');
                    link.download = 'card-design.png';
                    link.href = dataUrl;
                    link.click();
                }
            };

            return (
                <div className="p-6 h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex-1 overflow-y-auto no-scrollbar">
                        {renderHeader('Page Layout', LayoutIcon)}

                        <Section title="Aspect Ratio">
                            <div className="grid grid-cols-2 gap-2">
                                {ASPECT_RATIOS.map(r => (
                                    <button
                                        key={r.label}
                                        onClick={() => {
                                            if (r.value !== 'custom') {
                                                setCanvasConfig({ height: Math.round(canvasConfig.width * (r.value as number)) });
                                            }
                                        }}
                                        className="text-[10px] font-bold p-2.5 bg-gray-50 border border-gray-100 rounded-xl hover:bg-white hover:border-blue-100 hover:text-blue-600 transition-all uppercase tracking-wider"
                                    >
                                        {r.label}
                                    </button>
                                ))}
                            </div>
                        </Section>

                        <Section title="Dimensions">
                            <div className="flex items-center gap-3">
                                <div className="flex-1">
                                    <label className="text-[10px] font-bold text-gray-400 block mb-1">Width (px)</label>
                                    <input
                                        type="number"
                                        value={canvasConfig.width}
                                        onChange={(e) => setCanvasConfig({ width: parseInt(e.target.value) || 0 })}
                                        className="w-full border-none bg-gray-50 rounded-lg px-3 py-2 text-sm font-semibold outline-none"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="text-[10px] font-bold text-gray-400 block mb-1">Height (px)</label>
                                    <input
                                        type="number"
                                        value={canvasConfig.height}
                                        onChange={(e) => setCanvasConfig({ height: parseInt(e.target.value) || 0 })}
                                        className="w-full border-none bg-gray-50 rounded-lg px-3 py-2 text-sm font-semibold outline-none"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => setCanvasConfig({ width: canvasConfig.height, height: canvasConfig.width })}
                                className="w-full flex items-center justify-center gap-2 text-[10px] font-black p-2 bg-blue-50 text-blue-600 rounded-lg tracking-widest uppercase hover:bg-blue-100 transition-colors"
                            >
                                <Maximize size={12} /> Swap Orientation
                            </button>
                        </Section>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        <button
                            onClick={downloadImage}
                            className="w-full flex items-center justify-center gap-3 py-4 bg-gray-900 text-white rounded-3xl font-black text-sm premium-button shadow-xl shadow-gray-200"
                        >
                            <Download size={18} /> Export Artwork (PNG)
                        </button>
                    </div>
                </div>
            )
        }

        if (activeTab === 'ELEMENTS') {
            return <ElementsTab />;
        }

        if (activeTab === 'LAYERS') {
            return <LayersTab />;
        }

        if (activeTab === 'FONTS') {
            return <FontsTab />;
        }

        if (activeTab === 'IMAGES') {
            return (
                <div className="p-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    {renderHeader('Media Assets', ImageIcon)}
                    <Section title="Upload Source">
                        <label className="group w-full flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-100 rounded-[32px] cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                                <PlusCircle className="text-blue-600" size={32} />
                            </div>
                            <span className="text-sm font-black text-gray-900 mb-1">Add Image</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">JPG, PNG or WEBP</span>
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                        if (ev.target?.result) {
                                            addElement({
                                                type: 'image',
                                                src: ev.target.result as string,
                                                x: 50, y: 50, width: 250, height: 250, rotation: 0, opacity: 1, isVisible: true
                                            });
                                        }
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }} />
                        </label>
                    </Section>
                </div>
            )
        }

        return <div className="p-12 text-center flex flex-col items-center justify-center h-full">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                <LayoutIcon size={32} />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-gray-300">Nothing Selected</p>
        </div>;
    }

    return renderFallback();
}
