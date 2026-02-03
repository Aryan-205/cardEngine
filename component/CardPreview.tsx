import { motion } from 'framer-motion';
import { useImageStore } from '../lib/store';
import { TextOverlay } from '../types';

export const CardPreview = () => {
  const { textOverlays, background } = useImageStore() as { textOverlays: TextOverlay[]; background: string | null };

  return (
    <div 
      id="card-export-area" 
      className="relative aspect-3/4 w-full max-w-xl overflow-hidden rounded-sm shadow-xl bg-white transition-all"
      style={{ 
        // Check if background is a URL/DataURL or a hex color
        background: background?.startsWith('#') ? background : 'white' 
      }}
    >
      {background && !background.startsWith('#') && (
        <img src={background} className="absolute inset-0 w-full h-full object-cover" alt="" />
      )}
      
      {textOverlays.map((overlay: TextOverlay) => (
        overlay.isVisible && (
          <motion.div
            key={overlay.id}
            drag // Make it interactive!
            dragElastic={0.1}
            dragMomentum={false}
            style={{
              position: 'absolute',
              zIndex: 50,
              left: `${overlay.position.x}%`,
              top: `${overlay.position.y}%`,
              color: overlay.color,
              fontSize: `${overlay.fontSize}px`,
              fontFamily: overlay.fontFamily,
              fontWeight: overlay.fontWeight,
              opacity: overlay.opacity,
              writingMode: overlay.orientation === 'vertical' ? 'vertical-rl' : 'horizontal-tb',
              textShadow: overlay.textShadow.enabled 
                ? `${overlay.textShadow.offsetX}px ${overlay.textShadow.offsetY}px ${overlay.textShadow.blur}px ${overlay.textShadow.color}`
                : 'none'
            }}
            className="cursor-grab active:cursor-grabbing"
          >
            {overlay.text}
          </motion.div>
        )
      ))}
    </div>
  );
};