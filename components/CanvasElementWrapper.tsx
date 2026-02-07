import React, { useRef, useEffect } from 'react';
import Moveable from 'react-moveable';
import { useStore, CanvasElement } from '@/store/store';

interface CanvasElementWrapperProps {
    element: CanvasElement;
    isSelected: boolean;
    onSelect: (id: string, shiftKey: boolean) => void;
}

export const CanvasElementWrapper: React.FC<CanvasElementWrapperProps> = ({
    element,
    isSelected,
    onSelect,
}) => {
    const { updateElement } = useStore();
    const targetRef = useRef<HTMLDivElement>(null);
    const moveableRef = useRef<Moveable>(null);

    useEffect(() => {
        if (isSelected && moveableRef.current) {
            moveableRef.current.updateRect();
        }
    }, [isSelected, element]);

    return (
        <>
            <div
                ref={targetRef}
                data-id={element.id}
                className={`absolute cursor-pointer border-2 ${isSelected ? 'border-blue-500' : 'border-transparent'} hover:border-blue-300 canvas-element`}
                style={{
                    left: `${element.x}px`,
                    top: `${element.y}px`,
                    width: `${element.width}px`,
                    height: `${element.height}px`,
                    transform: `rotate(${element.rotation}deg)`,
                    zIndex: element.zIndex,
                    opacity: element.opacity,
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(element.id, e.shiftKey);
                }}
            >
                {element.type === 'image' && (
                    <img
                        src={element.src}
                        alt="element"
                        className="w-full h-full object-contain pointer-events-none"
                    />
                )}
                {element.type === 'text' && (
                    <div
                        style={{
                            fontSize: `${element.fontSize}px`,
                            fontWeight: element.fontWeight,
                            fontFamily: element.fontFamily,
                            color: element.color,
                            textAlign: element.textAlign,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: element.textAlign === 'center' ? 'center' : element.textAlign === 'right' ? 'flex-end' : 'flex-start',
                            writingMode: element.orientation === 'vertical' ? 'vertical-rl' : 'horizontal-tb',
                            textShadow: element.textShadow.enabled
                                ? `${element.textShadow.offsetX}px ${element.textShadow.offsetY}px ${element.textShadow.blur}px ${element.textShadow.color}`
                                : undefined,
                        }}
                    >
                        {element.text}
                    </div>
                )}
            </div>

            {isSelected && (
                <Moveable
                    target={targetRef.current}
                    ref={moveableRef}
                    draggable={true}
                    resizable={true}
                    rotatable={true}
                    keepRatio={element.type === 'image'}
                    throttleDrag={1}
                    throttleRotate={0}
                    throttleResize={1}
                    renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
                    onDrag={({ target, transform, left, top }) => {
                        target.style.left = `${left}px`;
                        target.style.top = `${top}px`;
                    }}
                    onDragEnd={({ target }) => {
                        const x = parseFloat(target.style.left || '0');
                        const y = parseFloat(target.style.top || '0');
                        updateElement(element.id, { x, y });
                    }}
                    onResize={({ target, width, height, drag }) => {
                        target.style.width = `${width}px`;
                        target.style.height = `${height}px`;
                        target.style.transform = drag.transform;
                    }}
                    onResizeEnd={({ target }) => {
                        const width = parseFloat(target.style.width);
                        const height = parseFloat(target.style.height);
                        updateElement(element.id, { width, height });
                    }}
                    onRotate={({ target, transform }) => {
                        target.style.transform = transform;
                    }}
                    onRotateEnd={({ target }) => {
                        // For simple rotation, Moveable puts it in transform. 
                        // We need to parse it out or store the whole transform string?
                        // Let's store rotation angle if possible.
                        // Moveable's `frame` object has rotate. 
                        // Getting exact rotation from matrix string is annoying.
                        // Easier: use `beforeRotate` state if we want to sync perfectly. 
                        // For now, let's just stick to visual transform.
                        // Actually, better:
                        const match = target.style.transform.match(/rotate\(([-\d.]+)deg\)/);
                        if (match) {
                            updateElement(element.id, { rotation: parseFloat(match[1]) });
                        }
                    }}
                />
            )}
        </>
    );
};
