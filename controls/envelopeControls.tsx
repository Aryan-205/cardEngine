'use client';

import React from 'react';
import { useStore } from '@/store/store';
import { Input } from '@/components/ui/input';

export default function EnvelopeControls() {
  const { envelope, setEnvelope } = useStore();

  return (
    <div className="space-y-5">
      <h3 className="font-semibold text-sm text-foreground">Envelope</h3>
      <p className="text-xs text-muted-foreground">Simple envelope color to match your card.</p>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground">Color</p>
        <div className="flex gap-2 items-center">
          <Input
            type="color"
            value={envelope.color}
            onChange={(e) => setEnvelope({ ...envelope, color: e.target.value })}
            className="w-12 h-12 rounded-xl border border-border cursor-pointer p-1"
          />
          <Input
            value={envelope.color}
            onChange={(e) => setEnvelope({ ...envelope, color: e.target.value })}
            placeholder="#F8F6EF"
            className="flex-1 font-mono text-sm"
          />
        </div>
      </div>
    </div>
  );
}
