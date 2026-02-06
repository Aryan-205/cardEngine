'use client';

import React from 'react';
import { useStore } from '@/store/store';
import { Input } from '@/components/ui/input';

// Predefined texture options (paths under public/)
const TEXTURES = [
  { id: 'paper', label: 'Paper', path: '/textures/paper.jpg' },
  { id: 'linen', label: 'Linen', path: '/textures/linen.jpg' },
  { id: 'cream', label: 'Cream', path: '/textures/cream.jpg' },
];

export default function BackgroundControls() {
  const { background, setBackground } = useStore();

  return (
    <div className="space-y-5">
      <h3 className="font-semibold text-sm text-foreground">Background</h3>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Type</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setBackground({ type: 'color', value: background.type === 'color' ? background.value : '#F8F6EF' })}
            className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${
              background.type === 'color'
                ? 'bg-[#FF5F00] text-white border-[#FF5F00]'
                : 'bg-white border-border hover:bg-muted'
            }`}
          >
            Color
          </button>
          <button
            type="button"
            onClick={() => setBackground({ type: 'texture', value: background.type === 'texture' ? background.value : TEXTURES[0].path })}
            className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-colors ${
              background.type === 'texture'
                ? 'bg-[#FF5F00] text-white border-[#FF5F00]'
                : 'bg-white border-border hover:bg-muted'
            }`}
          >
            Texture
          </button>
        </div>
      </div>

      {background.type === 'color' && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Color</p>
          <div className="flex gap-2 items-center">
            <Input
              type="color"
              value={background.value}
              onChange={(e) => setBackground({ type: 'color', value: e.target.value })}
              className="w-12 h-12 rounded-xl border border-border cursor-pointer p-1"
            />
            <Input
              value={background.value}
              onChange={(e) => setBackground({ type: 'color', value: e.target.value })}
              placeholder="#F8F6EF"
              className="flex-1 font-mono text-sm"
            />
          </div>
        </div>
      )}

      {background.type === 'texture' && (
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground">Texture</p>
          <div className="grid grid-cols-3 gap-2">
            {TEXTURES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setBackground({ type: 'texture', value: t.path })}
                className={`aspect-square rounded-xl border-2 overflow-hidden bg-muted ${
                  background.value === t.path ? 'border-[#FF5F00]' : 'border-border'
                }`}
              >
                <img
                  src={t.path}
                  alt={t.label}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Add images to <code className="bg-muted px-1 rounded">public/textures/</code> (paper.jpg, linen.jpg, cream.jpg).
          </p>
        </div>
      )}
    </div>
  );
}
