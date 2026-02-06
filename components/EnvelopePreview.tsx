'use client';

import React from 'react';
import { useStore } from '@/store/store';

export default function EnvelopePreview() {
  const { envelope } = useStore();

  return (
    <div 
      className="absolute z-10 w-[85vh] h-[65vh] transition-all duration-500"
      style={{ 
        // Move it slightly to the left of the card
        transform: 'translateX(-20%)', 
        backgroundImage: `url(${envelope.texture})`,
      }}
    >
      <div
        className="w-full h-full rounded-lg shadow-lg flex items-center justify-center"
        style={{ backgroundColor: envelope.color }}
      >
        <span className="text-xs text-[#6A3E2D]/50 uppercase tracking-widest">Envelope</span>
      </div>
    </div>
  );
}
