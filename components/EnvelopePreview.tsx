// 'use client';

// import React from 'react';
// import { useStore } from '@/store/store';

// export default function EnvelopePreview() {
//   const { envelope, activeTab } = useStore();

//   return (
//     <div 
//       className="absolute z-10 w-[85vh] h-[65vh] transition-all duration-500"
//       style={{ 
//         // Move it slightly to the left of the card
//         transform: 'translateX(-20%)', 
//         backgroundImage: `url(${envelope.texture})`,
//         zIndex: activeTab === 'ENVELOPE' ? 50 : 20,
//       }}
//     >
//       <div
//         className="w-full h-full rounded-lg shadow-lg flex items-center justify-center"
//         style={{ backgroundColor: envelope.color }}
//       >
//         <span className="text-xs text-[#6A3E2D]/50 uppercase tracking-widest">Envelope</span>
//       </div>
//     </div>
//   );
// }


import { useStore } from '@/store/store';
import React from 'react';

const Envelope = () => {
  // Configurable colors based on your prompt
  const { envelope, activeTab } = useStore();

  return (
    <div className="relative flex items-center justify-center h-full w-full">
      {/* Container for the whole envelope */}
      <div 
        className="relative w-80 h-56 transition-transform hover:scale-105 group"
        style={{ zIndex: activeTab === 'ENVELOPE' ? 50 : 20 }}
      >
        
        {/* 1. THE REAR PANEL & LINER */}
        <div 
          className="absolute inset-0 rounded-b-lg shadow-xl overflow-hidden"
          // style={{ backgroundColor: envelope.innerColor }}
        >
          {/* Floral Pattern Overlay (Daisies) */}
          <div className="absolute inset-0 opacity-80" 
               style={{ 
                 backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 10l1 3h3l-2 2 1 3-3-2-3 2 1-3-2-2h3z' fill='%23ffffff' fill-opacity='0.6'/%3E%3C/svg%3E")`,
                 backgroundSize: '60px 60px' 
               }} 
          />
        </div>

        {/* 2. THE TOP FLAP (Open State) */}
        <div 
          className="absolute top-0 w-full h-40 -translate-y-[99%] origin-bottom"
          style={{ 
            backgroundColor: envelope.outerColor,
            clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
            borderBottom: '1px solid rgba(0,0,0,0.05)'
          }}
        >
          {/* Inner lining of the top flap */}
          <div 
            className="absolute inset-0 mt-2 mx-2 mb-0"
            style={{ 
              backgroundImage: `url(${envelope.innerTexture})`,
              clipPath: 'polygon(0% 100%, 50% 0%, 100% 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </div>

        {/* 4. THE FRONT FLAPS (Side and Bottom) */}
        {/* Left Side Flap */}
        <div 
          className="absolute inset-0 shadow-xl border-2 border-border rounded-lg"
          style={{ 
            backgroundColor: envelope.outerColor,
            clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)' 
          }}
        />
        {/* Right Side Flap */}
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundColor: envelope.outerColor,
            clipPath: 'polygon(100% 0%, 50% 50%, 100% 100%)' 
          }}
        />
        {/* Bottom Flap */}
        <div 
          className="absolute inset-0"
          style={{ 
            backgroundColor: envelope.outerColor,
            clipPath: 'polygon(0% 100%, 50% 45%, 100% 100%)',
            filter: 'drop-shadow(0 -2px 2px rgba(0,0,0,0.05))'
          }}
        />
      </div>
    </div>
  );
};

export default Envelope;