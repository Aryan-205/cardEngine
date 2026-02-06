// 'use client';

// import React from 'react';
// import { useStore } from '@/store/store';
// import { Input } from '@/components/ui/input';

// const TEXTURES = [
//   { id: 'paper', label: 'Paper', path: '/textures/paper.jpg' },
//   { id: 'linen', label: 'Linen', path: '/textures/linen.jpg' },
//   { id: 'cream', label: 'Cream', path: '/textures/cream.jpg' },
// ];

// export default function EnvelopeControls() {
//   const { envelope, setEnvelope } = useStore();

//   return (
//     <div className="space-y-5">
//       <h3 className="font-semibold text-sm text-foreground">Envelope</h3>
//       <p className="text-xs text-muted-foreground">Simple envelope color to match your card.</p>

//       <div className="space-y-2">
//         <p className="text-xs text-muted-foreground">Color</p>
//         <div className="flex gap-2 items-center">
//           <Input
//             type="color"
//             value={envelope.color}
//             onChange={(e) => setEnvelope({ ...envelope, color: e.target.value })}
//             className="w-12 h-12 rounded-xl border border-border cursor-pointer p-1"
//           />
//           <Input
//             value={envelope.color}
//             onChange={(e) => setEnvelope({ ...envelope, color: e.target.value })}
//             placeholder="#F8F6EF"
//             className="flex-1 font-mono text-sm"
//           />
//         </div>
//       </div>
//       <div>
//         <p className="text-xs text-muted-foreground">Texture</p>
//         <div className="grid grid-cols-3 gap-2">
//           {TEXTURES.map((t) => (
//             <button key={t.id} type="button" onClick={() => setEnvelope({ ...envelope, texture: t.path })} className="aspect-square rounded-xl border-2 overflow-hidden bg-muted">
//               <img src={t.path} alt={t.label} className="w-full h-full object-cover" />
//             </button>
//           ))}
//         </div>
//         <p className="text-xs text-muted-foreground">
//           Add images to <code className="bg-muted px-1 rounded">public/textures/</code> (paper.jpg, linen.jpg, cream.jpg).
//         </p>  
//       </div>
//     </div>
//   );
// }


'use client';

import React from 'react';
import { useStore } from '@/store/store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const INNER_TEXTURES = [
  { id: 'daisy', label: 'Daisy', path: '/textures/daisy-pattern.jpg' },
  { id: 'linen', label: 'Linen', path: '/textures/linen.jpg' },
  { id: 'gold', label: 'Gold Leaf', path: '/textures/gold.jpg' },
];

export default function EnvelopeControls() {
  const { envelope, setEnvelope } = useStore();

  return (
    <div className="space-y-6 p-4">
      <header>
        <h3 className="font-semibold text-sm">Envelope Customization</h3>
        <p className="text-xs text-muted-foreground">Click the envelope in the preview to open/close it.</p>
      </header>

      {/* OUTER COLOR */}
      <div className="space-y-3">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Outside Color</Label>
        <div className="flex gap-2">
          <Input
            type="color"
            value={envelope.outerColor || '#F8F6EF'}
            onChange={(e) => setEnvelope({ ...envelope, outerColor: e.target.value })}
            className="w-10 h-10 p-1 cursor-pointer rounded-full border-2"
          />
          <Input
            value={envelope.outerColor || '#F8F6EF'}
            onChange={(e) => setEnvelope({ ...envelope, outerColor: e.target.value })}
            className="font-mono text-xs uppercase"
          />
        </div>
      </div>

      <hr className="border-border" />

      {/* INNER TEXTURE (LINING) */}
      <div className="space-y-3">
        <Label className="text-xs uppercase tracking-wider text-muted-foreground">Inside Lining Texture</Label>
        <div className="grid grid-cols-3 gap-3">
          {INNER_TEXTURES.map((t) => (
            <button
              key={t.id}
              onClick={() => setEnvelope({ ...envelope, innerTexture: t.path })}
              className={`group relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                envelope.innerTexture === t.path ? 'border-primary' : 'border-transparent hover:border-muted-foreground'
              }`}
            >
              <img src={t.path} alt={t.label} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[10px] text-white font-medium">{t.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}