'use client';

import React, { useRef } from 'react';
import { useStore } from '@/store/store';
import { fontFamilies } from '@/lib/constants/fonts';
import { motion, AnimatePresence } from 'motion/react';

export default function CardPreview({ texture }: { texture: string }) {
  const { textOverlays, imageOverlays } = useStore();

  const getFontFamily = (fontId: string) => {
    const f = fontFamilies.find((x) => x.id === fontId);
    return f?.family ?? 'system-ui, sans-serif';
  };

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={containerRef}
      className="relative z-40 w-[60vh] min-h-[80vh] rounded-xl overflow-hidden shadow-lg bg-white"
      style={{
        backgroundImage: `url(${texture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Image overlays */}
      {imageOverlays
        .filter((o) => o.isVisible)
        .map((img) => (
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            dragMomentum={false}
            dragTransition={{
              bounceStiffness: 100,
              bounceDamping: 10,
            }}
            // dragListener={false}
            key={img.id}
            className="absolute overflow-hidden cursor-grab"
            style={{
              left: `${img.x}%`,
              top: `${img.y}%`,
              width: `${img.width}%`,
              height: `${img.height}%`,
              opacity: img.opacity,
            }}
          >
            <img src={img.src} alt="" className="w-full h-full object-contain" />
          </motion.div>
        ))}

      {/* Text overlays */}
      {textOverlays
        .filter((o) => o.isVisible)
        .map((o) => (
          <motion.div
            drag
            dragConstraints={containerRef}
            dragElastic={0.1}
            dragMomentum={false}
            dragTransition={{
              bounceStiffness: 100,
              bounceDamping: 10,
            }}
            // dragListener={false}
            key={o.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 whitespace-pre-wrap text-center cursor-grab"
            style={{
              left: `${o.position.x}%`,
              top: `${o.position.y}%`,
              fontSize: `${o.fontSize}px`,
              fontWeight: o.fontWeight,
              fontFamily: getFontFamily(o.fontFamily),
              color: o.color,
              opacity: o.opacity,
              writingMode: o.orientation === 'vertical' ? 'vertical-rl' : 'horizontal-tb',
              textShadow: o.textShadow.enabled
                ? `${o.textShadow.offsetX}px ${o.textShadow.offsetY}px ${o.textShadow.blur}px ${o.textShadow.color}`
                : undefined,
            }}
          >
            {o.text}
          </motion.div>
        ))}
    </motion.div>
  );
}
