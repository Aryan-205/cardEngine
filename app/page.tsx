'use client';

import React, { useState, useEffect } from 'react';
import { Save, Eye, Download } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import DesignBoard from '@/components/DesignBoard';
import DesignProperties from '@/components/DesignProperties';
import CardPreview from '@/components/CardPreview';
import { useStore, getDesignPayload } from '@/store/store';
import { AnimatePresence } from 'motion/react';

export default function WeddingEditor() {
  const { activeTab, loadDesign } = useStore();
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastResult, setLastResult] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Initial load
  useEffect(() => {
    async function init() {
      try {
        const res = await fetch('/api/design');
        if (res.ok) {
          const data = await res.json();
          loadDesign(data);
        }
      } catch (e) {
        console.warn('Failed to load initial design', e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [loadDesign]);

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

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 flex-col gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-500 font-medium">Loading Designer...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full font-sans text-gray-800 bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 h-full">
        {/* Top Header */}
        <header className="h-[72px] bg-white border-b border-gray-100 px-8 flex items-center justify-between z-30 shadow-[0_2px_24px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-black italic tracking-tighter text-gray-900 border-r border-gray-100 pr-6 mr-2">Card<span className="text-blue-600">Designer</span></h1>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 leading-none mb-1">Project Name</span>
              <input
                defaultValue="Untitled Wedding Invitation"
                className="text-sm font-bold text-gray-700 bg-transparent outline-none border-none p-0 focus:text-blue-600 transition-colors"
                placeholder="Name your masterpiece..."
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 mr-4 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Autosaved</span>
            </div>

            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="flex items-center justify-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-2xl font-bold hover:bg-gray-50 transition-all text-gray-700 text-xs premium-button shadow-sm"
            >
              <Eye size={16} className="text-blue-500" /> Preview
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={sending}
              className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-3xl font-black transition-all hover:bg-blue-700 shadow-xl shadow-blue-200 disabled:opacity-60 text-xs premium-button"
            >
              <Save size={16} /> {sending ? 'Saving…' : 'Save Design'}
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 relative bg-gray-100">
            <DesignBoard />
            {lastResult && (
              <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 rounded-2xl glass font-bold text-sm z-50 animate-in fade-in slide-in-from-bottom-4 duration-500 ${lastResult.startsWith('Saved') ? 'text-green-600' : 'text-red-600'}`}>
                {lastResult}
              </div>
            )}
          </main>

          {/* Right Properties Panel */}
          <aside className="w-[340px] bg-white border-l border-gray-100 flex flex-col h-full z-20 shadow-[-4px_0_24px_rgba(0,0,0,0.02)]">
            <DesignProperties />
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {showPreview && <CardPreview onClose={() => setShowPreview(false)} />}
      </AnimatePresence>
    </div>
  );
}
