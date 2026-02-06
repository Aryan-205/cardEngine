'use client';

import React, { useState } from 'react';
import { Save, Eye } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import CardPreview from '@/components/CardPreview';
import EnvelopePreview from '@/components/EnvelopePreview';
import BackgroundControls from '@/controls/backgroundControls';
import EnvelopeControls from '@/controls/envelopeControls';
import { TextOverlayControls } from '@/controls/textOverlayControls';
import { useStore, getDesignPayload } from '@/store/store';

export default function WeddingEditor() {
  const { activeTab, background } = useStore();
  const [sending, setSending] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);

  const handleSend = async () => {
    const payload = getDesignPayload();
    setSending(true);
    setLastResult(null);
    try {
      const res = await fetch('/api/design', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Failed to save');
      setLastResult('Saved successfully');
    } catch (e) {
      setLastResult(e instanceof Error ? e.message : 'Failed to send');
    } finally {
      setSending(false);
    }
  };

  const renderControls = () => {
    switch (activeTab) {
      case 'TEXT':
        return <TextOverlayControls />;
      case 'BACKGROUND':
        return <BackgroundControls />;
      case 'ENVELOPE':
        return <EnvelopeControls />;
      default:
        return null;
    }
  };

  return (
    <div 
      style={background.type === 'color' 
        ? { backgroundColor: background.value } 
        : { backgroundImage: `url(${background.value})`, 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
          }}
      className="flex h-screen w-full font-sans text-[#5C3D2E]"
    >
      <Sidebar />

      <main className="flex-1 relative flex items-center justify-center p-12">
        {/* Wrap them in a shared container to control the stack */}
        <div className="relative w-full h-full flex items-center justify-center">
          <EnvelopePreview />
          <CardPreview />
        </div>
      </main>

      <div className="w-[400px] h-full p-4 flex flex-col gap-4 overflow-hidden">
        <div className="flex-1 min-h-0 overflow-y-auto w-full bg-white shadow-[0_0_10px_0_rgba(0,0,0,0.1)] rounded-2xl p-4">
          <h2 className="text-xl font-bold mb-4 capitalize">{activeTab.toLowerCase()}</h2>
          {renderControls()}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between w-full gap-4">
            <button
              type="button"
              onClick={handleSend}
              disabled={sending}
              className="flex items-center justify-center gap-2 bg-[#FF5F00] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#e65600] transition-colors shadow-lg w-full cursor-pointer disabled:opacity-60"
            >
              <Save size={18} /> {sending ? 'Sending…' : 'Send'}
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-white border border-gray-200 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors shadow-sm w-full cursor-pointer"
            >
              <Eye size={18} /> Preview
            </button>
          </div>
          {lastResult && (
            <p className={`text-sm ${lastResult.startsWith('Saved') ? 'text-green-600' : 'text-red-600'}`}>
              {lastResult}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
