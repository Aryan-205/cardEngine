'use client';

import React, { useRef, useState } from 'react';
import Selecto from 'react-selecto';
import { useStore } from '@/store/store';
import { CanvasElementWrapper } from './CanvasElementWrapper';

export default function DesignBoard() {
    const {
        background,
        elements,
        selectedIds,
        setSelection,
        updateElement,
        canvasConfig
    } = useStore();

    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Background style
    const bgStyle = background.type === 'color'
        ? { backgroundColor: background.value }
        : { backgroundImage: `url(${background.value})`, backgroundSize: 'cover', backgroundPosition: 'center' };

    return (
        <div
            className="relative w-full h-full overflow-hidden bg-[#F1F3F5] flex items-center justify-center p-12 transition-all duration-500"
            style={{
                backgroundImage: `radial-gradient(#DEE2E6 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
            }}
            ref={scrollContainerRef}
        >
            <div
                id="design-canvas"
                ref={containerRef}
                className="relative shadow-2xl overflow-hidden bg-white"
                style={{
                    width: `${canvasConfig.width}px`,
                    height: `${canvasConfig.height}px`,
                    ...bgStyle
                }}
                onMouseDown={(e) => {
                    // Clear selection if clicking directly on background
                    if (e.target === containerRef.current) {
                        setSelection([]);
                    }
                }}
            >
                {elements.map((el) => (
                    <CanvasElementWrapper
                        key={el.id}
                        element={el}
                        isSelected={selectedIds.includes(el.id)}
                        onSelect={(id, shift) => {
                            if (shift) {
                                if (selectedIds.includes(id)) {
                                    setSelection(selectedIds.filter(sid => sid !== id));
                                } else {
                                    setSelection([...selectedIds, id]);
                                }
                            } else {
                                setSelection([id]);
                            }
                        }}
                    />
                ))}

                <Selecto
                    dragContainer={containerRef.current}
                    selectableTargets={['.canvas-element']}
                    hitRate={0}
                    selectByClick={true}
                    selectFromInside={false}
                    toggleContinueSelect={['shift']}
                    onSelect={(e) => {
                        const selected = e.selected.map(el => el.getAttribute('data-id')).filter(Boolean) as string[];
                        // merging with existing selection if shift is held is handled by toggleContinueSelect? 
                        // Selecto is complex. For now, let's just use it for box selection.
                        // Actually, simplified: just use click for now, box selection needs strict class naming.
                    }}
                    onSelectEnd={(e) => {
                        // implementation details for box selection can be added here
                        // For now, relies on CanvasElementWrapper's onClick
                    }}
                />
            </div>
        </div>
    );
}
