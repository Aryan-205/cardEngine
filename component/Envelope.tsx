'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface EnvelopeProps {
  envelopeColor?: string;
  linerImage?: string;
  isOpen?: boolean; // You've mentioned you'll handle animation, but this is a toggle
  initialIsOpen?: boolean;
}

export const EnvelopePreview = ({ 
  envelopeColor = '#E5D3B3', 
  linerImage = 'https://www.transparenttextures.com/patterns/gold-scale.png',
  initialIsOpen = false
}: EnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  return (
    <div className="relative w-full max-w-2xl aspect-[5/4] flex items-center justify-center perspective-1000">
      <div className="relative w-[90%] h-[80%] shadow-2xl">
        
        {/* 1. BACK PANEL & MAIN BODY */}
        <div 
          className="absolute inset-0 z-10"
          style={{ 
            backgroundColor: envelopeColor,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            filter: 'brightness(95%)' 
          }}
        />

        {/* 2. INNER LINER (Visible when flap opens) */}
        <div 
          className="absolute inset-2 z-20 overflow-hidden"
          style={{ 
            backgroundColor: '#fff',
            // clipPath: 'polygon(5% 10%, 95% 10%, 90% 45%, 10% 45%)' // Tapered liner shape
          }}
        >
          <div 
            className="w-full h-full" 
            style={{ 
              backgroundImage: `url(${linerImage})`,
              backgroundSize: 'cover',
              opacity: 0.8
            }} 
          />
        </div>

        {/* 3. THE UPPER FLAP (The part you will animate) */}
        <motion.div 
          className="absolute top-0 left-0 w-full h-1/2 z-40 origin-top cursor-pointer"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          style={{ 
            backgroundColor: envelopeColor,
            // Creates the classic pointed/trapezoid flap shape
            clipPath: 'polygon(0% 0%, 100% 0%, 60% 100%, 40% 100%)',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            rotateX: isOpen ? 180 : 0,
            transition: '0.3s ease-in-out',
            boxShadow: '0 1px 10px 0 rgba(0,0,0,1)',
          }}
          // Logic for your animation: rotateX(180deg) to open
          // initial={{ rotateX: 0 }}
          // whileHover={{ rotateX: 160 }} 
          // transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {/* Inner side of the flap (The "gold" part when open) */}
          {/* <div 
            className="absolute inset-0"
            style={{ 
              backgroundImage: `url(${linerImage})`,
              backfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)', // Shown when flipped
            }}
          /> */}
        </motion.div>

        {/* 4. FRONT POCKET (The lower triangle that covers the card) */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[80%] z-30 shadow-inner"
          style={{ 
            backgroundColor: envelopeColor,
            clipPath: 'polygon(0% 0%, 100% 0%, 60% 80%, 40% 80%)',
            filter: 'brightness(102%)',
            transform: 'rotateX(180deg)'
          }}
        />
        <div 
          className="absolute top-0 left-0 w-full h-full z-25"
          style={{ 
            backgroundColor: envelopeColor,
            clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 50% 50%)',
            filter: 'brightness(98%)'
          }}
        />
      </div>
    </div>
  );
};