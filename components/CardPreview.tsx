'use client';

import React, { useRef } from 'react';
import { useStore } from '@/store/store';
import { fontFamilies } from '@/lib/constants/fonts';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export default function CardPreview({ onClose }: { onClose: () => void }) {
  const { elements, background, canvasConfig } = useStore();

  const getFontFamily = (family: string) => {
    return family; // Already stored as full family string or fallback
  };

  const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);

  const bgStyle = background.type === 'color'
    ? { backgroundColor: background.value }
    : { backgroundImage: `url(${background.value})`, backgroundSize: 'cover', backgroundPosition: 'center' };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-8"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
      >
        <X size={32} />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative bg-white shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden"
        style={{
          width: `${canvasConfig.width}px`,
          height: `${canvasConfig.height}px`,
          maxWidth: '90vw',
          maxHeight: '90vh',
          aspectRatio: `${canvasConfig.width} / ${canvasConfig.height}`,
          ...bgStyle
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {sortedElements.map((el) => {
          if (el.type === 'text') {
            return (
              <div
                key={el.id}
                className="absolute whitespace-pre-wrap"
                style={{
                  left: `${el.x}px`,
                  top: `${el.y}px`,
                  width: `${el.width}px`,
                  height: `${el.height}px`,
                  fontSize: `${el.fontSize}px`,
                  fontWeight: el.fontWeight,
                  fontFamily: el.fontFamily,
                  color: el.color,
                  opacity: el.opacity,
                  textAlign: el.textAlign,
                  transform: `rotate(${el.rotation}deg)`,
                  textShadow: el.textShadow.enabled
                    ? `${el.textShadow.offsetX}px ${el.textShadow.offsetY}px ${el.textShadow.blur}px ${el.textShadow.color}`
                    : undefined,
                }}
              >
                {el.text}
              </div>
            );
          } else {
            return (
              <div
                key={el.id}
                className="absolute"
                style={{
                  left: `${el.x}px`,
                  top: `${el.y}px`,
                  width: `${el.width}px`,
                  height: `${el.height}px`,
                  opacity: el.opacity,
                  transform: `rotate(${el.rotation}deg)`,
                }}
              >
                <img src={el.src} alt="" className="w-full h-full object-contain" />
              </div>
            );
          }
        })}
      </motion.div>
    </motion.div>
  );
}
