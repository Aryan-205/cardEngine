import React, { useRef, useEffect, memo } from 'react';
import Moveable from 'react-moveable';
import { useStore, CanvasElement } from '@/store/store';

interface CanvasElementWrapperProps {
    element: CanvasElement;
    isSelected: boolean;
    onSelect: (id: string, shiftKey: boolean) => void;
}

export const CanvasElementWrapper = memo(({
    element,
    isSelected,
    onSelect,
}: CanvasElementWrapperProps) => {
    const { updateElement } = useStore();
    const targetRef = useRef<HTMLDivElement>(null);
    const moveableRef = useRef<Moveable>(null);

    useEffect(() => {
        if (isSelected && moveableRef.current) {
            moveableRef.current.updateRect();
        }
    }, [isSelected, element.width, element.height, element.x, element.y, element.rotation]);

    const [isEditing, setIsEditing] = React.useState(false);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (isEditing && textareaRef.current) {
            textareaRef.current.focus({ preventScroll: true });
            textareaRef.current.select();
        }
    }, [isEditing]);

    const handleDoubleClick = (e: React.MouseEvent) => {
        if (element.type === 'text') {
            e.stopPropagation();
            setIsEditing(true);
        }
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateElement(element.id, { text: e.target.value });
    };

    if (!element.isVisible && !isSelected) return null;

    return (
        <>
            <div
                ref={targetRef}
                data-id={element.id}
                className={`absolute cursor-pointer border-2 transition-colors ${isSelected ? 'border-blue-500' : 'border-transparent'} hover:border-blue-300 canvas-element ${isEditing ? 'pointer-events-auto' : ''}`}
                style={{
                    left: `${element.x}px`,
                    top: `${element.y}px`,
                    width: `${element.width}px`,
                    height: `${element.height}px`,
                    transform: `rotate(${element.rotation}deg)`,
                    zIndex: element.zIndex,
                    opacity: element.opacity,
                    display: element.isVisible === false ? 'none' : 'block',
                }}
                onClick={(e) => {
                    if (isEditing) return;
                    e.stopPropagation();
                    onSelect(element.id, e.shiftKey);
                }}
                onDoubleClick={handleDoubleClick}
            >
                {element.type === 'image' && (
                    <img
                        src={element.src}
                        alt="element"
                        className="w-full h-full object-contain pointer-events-none"
                        style={{ display: 'block' }}
                    />
                )}
                {element.type === 'text' && (
                    <div
                        className="w-full h-full"
                        style={{
                            fontSize: `${element.fontSize}px`,
                            fontWeight: element.fontWeight,
                            fontFamily: element.fontFamily,
                            color: element.color,
                            textAlign: element.textAlign,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: element.textAlign === 'center' ? 'center' : element.textAlign === 'right' ? 'flex-end' : 'flex-start',
                            writingMode: element.orientation === 'vertical' ? 'vertical-rl' : 'horizontal-tb',
                            textShadow: element.textShadow.enabled
                                ? `${element.textShadow.offsetX}px ${element.textShadow.offsetY}px ${element.textShadow.blur}px ${element.textShadow.color}`
                                : undefined,
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            lineHeight: 1.2,
                        }}
                    >
                        {isEditing ? (
                            <textarea
                                ref={textareaRef}
                                value={element.text}
                                onChange={handleTextChange}
                                onBlur={handleBlur}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        setIsEditing(false);
                                    }
                                    if (e.key === 'Escape') {
                                        setIsEditing(false);
                                    }
                                }}
                                className="w-full h-full bg-transparent border-none outline-none resize-none p-0 overflow-hidden leading-tight"
                                style={{
                                    fontFamily: 'inherit',
                                    fontSize: 'inherit',
                                    fontWeight: 'inherit',
                                    color: 'inherit',
                                    textAlign: 'inherit',
                                }}
                            />
                        ) : (
                            element.text
                        )}
                    </div>
                )}
            </div>

            {isSelected && !isEditing && (
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
                        const match = target.style.transform.match(/rotate\(([-\d.]+)deg\)/);
                        if (match) {
                            updateElement(element.id, { rotation: parseFloat(match[1]) });
                        }
                    }}
                />
            )}
        </>
    );
});

CanvasElementWrapper.displayName = 'CanvasElementWrapper';

