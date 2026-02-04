import { create } from 'zustand';
import { TextOverlay } from '@/types';

interface CardPage {
  id: string;
  textOverlays: TextOverlay[];
  background: string | null;
}

interface CardStore {
  // Page Management
  pages: CardPage[];
  currentPageIndex: number;
  
  // Envelope Logic
  envelope: {
    color: string;
    liner: string;
  };

  // Actions
  addPage: () => void;
  removePage: (index: number) => void;
  setCurrentPageIndex: (index: number) => void;
  saveToDatabase: () => void;
  // Updates (Target current page)
  addTextOverlay: (overlay: Omit<TextOverlay, 'id'>) => void;
  updateTextOverlay: (id: string, updates: Partial<TextOverlay>) => void;
  setBackground: (background: string) => void;
  updateEnvelope: (updates: Partial<{ color: string, liner: string }>) => void;
}

export const useCardStore = create<CardStore>((set) => ({
  pages: [{ id: crypto.randomUUID(), textOverlays: [], background: null }],
  currentPageIndex: 0,
  envelope: { color: '#D3C5B1', liner: 'https://www.transparenttextures.com/patterns/gold-scale.png' },

  addPage: () => set((state) => ({
    pages: [...state.pages, { id: crypto.randomUUID(), textOverlays: [], background: null }]
  })),

  setCurrentPageIndex: (index) => set({ currentPageIndex: index }),

  setBackground: (background) => set((state) => {
    const newPages = [...state.pages];
    newPages[state.currentPageIndex].background = background;
    return { pages: newPages };
  }),

  addTextOverlay: (overlay) => set((state) => {
    const newPages = [...state.pages];
    const currentPage = newPages[state.currentPageIndex];
    currentPage.textOverlays = [...currentPage.textOverlays, { ...overlay, id: crypto.randomUUID() }];
    return { pages: newPages };
  }),

  updateTextOverlay: (id, updates) => set((state) => {
    const newPages = [...state.pages];
    const currentPage = newPages[state.currentPageIndex];
    currentPage.textOverlays = currentPage.textOverlays.map((o) =>
      o.id === id ? { ...o, ...updates } : o
    );
    return { pages: newPages };
  }),

  updateEnvelope: (updates) => set((state) => ({
    envelope: { ...state.envelope, ...updates }
  })),

  removePage: (index) => set((state) => ({
    pages: state.pages.filter((_, i) => i !== index)
  })),

  saveToDatabase: () => set((state) => {
    console.log("Saving to database");
    const card = {
      id: crypto.randomUUID(),
      pages: state.pages,
      envelope: state.envelope,
    };
    console.log(card);
  }),
}));