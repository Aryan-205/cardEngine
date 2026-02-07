'use client';

import React, { useRef, useState, useMemo } from 'react';
import Selecto from 'react-selecto';
import { useStore, CanvasElement } from '@/store/store';
import { CanvasElementWrapper } from './CanvasElementWrapper';

export default function DesignBoard() {
    const {
        background,
        elements,
        selectedIds,
        setSelection,
        canvasConfig
    } = useStore();

    const containerRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Background style
    const backgroundStyle: React.CSSProperties = background.type === 'color'
        ? { backgroundColor: background.value }
        : { backgroundImage: `url(${background.value})`, backgroundSize: 'cover' };

    // Memoize sorted elements to prevent unnecessary re-sorting and re-rendering
    const sortedElements = useMemo(() => {
        return [...elements].sort((a, b) => a.zIndex - b.zIndex);
    }, [elements]);

    return (
        <div
            className="flex-1 h-full overflow-auto bg-[#F8F9FA] flex flex-col items-center no-scrollbar relative"
            onMouseDown={(e) => {
                // Clear selection if clicking directly on the scroll area (outside canvas)
                if (e.target === scrollContainerRef.current) {
                    setSelection([]);
                }
            }}
            ref={scrollContainerRef}
        >
            <div className="min-h-full min-w-full flex items-center justify-center p-[100px] pointer-events-none">
                <div
                    id="design-canvas"
                    ref={containerRef}
                    className="relative bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] pointer-events-auto"
                    style={{
                        width: `${canvasConfig.width}px`,
                        height: `${canvasConfig.height}px`,
                        ...backgroundStyle,
                    }}
                    onMouseDown={(e) => {
                        // Clear selection if clicking directly on canvas background
                        if (e.target === containerRef.current) {
                            setSelection([]);
                        }
                    }}
                >
                    {sortedElements.map((el: CanvasElement) => (
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
                </div>
            </div>

            <Selecto
                container={containerRef.current}
                dragContainer={scrollContainerRef.current}
                selectableTargets={['.canvas-element']}
                hitRate={0}
                selectByClick={true}
                selectFromInside={false}
                toggleContinueSelect={['shift']}
                onSelect={(e: any) => {
                    const ids = e.selected.map((el: HTMLElement) => el.getAttribute('data-id')!).filter(Boolean);
                    // Only update if selection actually changed to avoid re-renders
                    if (JSON.stringify(ids) !== JSON.stringify(selectedIds)) {
                        setSelection(ids);
                    }
                }}
            />
        </div>
    );
}
