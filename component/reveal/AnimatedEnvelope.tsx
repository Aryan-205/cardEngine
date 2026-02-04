import { useState } from "react";
import { motion } from "framer-motion";
import { CardPreview } from "../CardPreview";

// components/reveal/AnimatedEnvelope.tsx
export const AnimatedEnvelope = ({ pages, settings }: { pages: any, settings: any }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="perspective-1000 relative w-96 h-64 cursor-pointer" onClick={() => setIsOpen(true)}>
      {/* 1. The Back/Body of Envelope */}
      <motion.div 
        animate={{ rotateY: isOpen ? 180 : 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 preserve-3d"
      >
        <div className="absolute inset-0 bg-stone-200 rounded-lg shadow-xl" /> {/* Front */}
        
        {/* 2. The Flap */}
        <motion.div 
          initial={false}
          animate={{ rotateX: isOpen ? -160 : 0 }}
          style={{ originY: 0 }}
          className="absolute top-0 w-full h-1/2 bg-stone-300 rounded-t-lg z-20"
        />

        {/* 3. The Cards (sliding out) */}
        {pages.map((page, i) => (
          <motion.div
            key={page.id}
            initial={{ y: 0, z: 0 }}
            animate={isOpen ? { y: -200 - (i * 20), z: 50, scale: 1.1 } : {}}
            className="absolute inset-4 bg-white shadow-2xl z-10"
          >
             <CardPreview pageData={page} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};