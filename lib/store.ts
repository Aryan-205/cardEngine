
import { create } from 'zustand';
import { TextOverlay } from '@/types';

interface ImageStore {
  textOverlays: TextOverlay[];
  background: string | null;
  addTextOverlay: (overlay: Omit<TextOverlay, 'id'>) => void;
  updateTextOverlay: (id: string, updates: Partial<TextOverlay>) => void;
  removeTextOverlay: (id: string) => void;
  clearTextOverlays: () => void;
  setBackground: (background: string) => void;
}

export const useImageStore = create<ImageStore>((set, get) => ({
  textOverlays: [],
  background: null,
  
  addTextOverlay: (overlay) => set((state) => ({ 
    textOverlays: [...state.textOverlays, { ...overlay, id: crypto.randomUUID() }] 
  })),

  updateTextOverlay: (id, updates) => set((state) => ({
    textOverlays: state.textOverlays.map((o) => 
      o.id === id ? { ...o, ...updates } : o
    )
  })),

  removeTextOverlay: (id) => set((state) => ({
    textOverlays: state.textOverlays.filter((o) => o.id !== id)
  })),

  clearTextOverlays: () => set({ textOverlays: [] }),
  setBackground: (background) => set({ background }),
}));