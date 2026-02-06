import { create } from 'zustand';

// --- Types for design JSON (backend) ---
export type BackgroundConfig = {
  type: 'color' | 'texture';
  value: string; // hex for color, path/id for texture
};

export type EnvelopeConfig = {
  color: string;
  texture?: string;
};

export type TextShadowConfig = {
  enabled: boolean;
  color: string;
  blur: number;
  offsetX: number;
  offsetY: number;
};

export type TextOverlay = {
  id: string;
  text: string;
  position: { x: number; y: number };
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  color: string;
  opacity: number;
  isVisible: boolean;
  orientation: 'horizontal' | 'vertical';
  textShadow: TextShadowConfig;
};

export type ImageOverlay = {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  isVisible: boolean;
};

export type DesignPayload = {
  background: BackgroundConfig;
  envelope: EnvelopeConfig;
  card: {
    textOverlays: TextOverlay[];
    imageOverlays: ImageOverlay[];
  };
};

// --- Sidebar tab ---
export type SidebarTab = 'TEXT' | 'BACKGROUND' | 'ENVELOPE';

type Store = {
  // Sidebar
  activeTab: SidebarTab;
  setActiveTab: (tab: SidebarTab) => void;
  // View: show card or envelope in center
  showEnvelope: boolean;
  setShowEnvelope: (v: boolean) => void;

  // Background
  background: BackgroundConfig;
  setBackground: (b: BackgroundConfig) => void;

  // Envelope
  envelope: EnvelopeConfig;
  setEnvelope: (e: EnvelopeConfig) => void;

  // Text overlays (compatible with useImageStore)
  textOverlays: TextOverlay[];
  addTextOverlay: (overlay: Omit<TextOverlay, 'id'>) => void;
  updateTextOverlay: (id: string, updates: Partial<TextOverlay>) => void;
  removeTextOverlay: (id: string) => void;
  clearTextOverlays: () => void;

  // Image overlays
  imageOverlays: ImageOverlay[];
  addImageOverlay: (overlay: Omit<ImageOverlay, 'id'>) => void;
  updateImageOverlay: (id: string, updates: Partial<ImageOverlay>) => void;
  removeImageOverlay: (id: string) => void;
  clearImageOverlays: () => void;
};

function generateId() {
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export const useStore = create<Store>((set) => ({
  activeTab: 'TEXT',
  setActiveTab: (tab) => set({ activeTab: tab }),
  showEnvelope: false,
  setShowEnvelope: (v) => set({ showEnvelope: v }),

  background: { type: 'color', value: '#F8F6EF' },
  setBackground: (b) => set({ background: b }),

  envelope: { color: '#F8F6EF' },
  setEnvelope: (e) => set({ envelope: e }),

  textOverlays: [],
  addTextOverlay: (overlay) =>
    set((s) => ({
      textOverlays: [
        ...s.textOverlays,
        { ...overlay, id: generateId() } as TextOverlay,
      ],
    })),
  updateTextOverlay: (id, updates) =>
    set((s) => ({
      textOverlays: s.textOverlays.map((o) =>
        o.id === id ? { ...o, ...updates } : o
      ),
    })),
  removeTextOverlay: (id) =>
    set((s) => ({ textOverlays: s.textOverlays.filter((o) => o.id !== id) })),
  clearTextOverlays: () => set({ textOverlays: [] }),

  imageOverlays: [],
  addImageOverlay: (overlay) =>
    set((s) => ({
      imageOverlays: [
        ...s.imageOverlays,
        { ...overlay, id: generateId() } as ImageOverlay,
      ],
    })),
  updateImageOverlay: (id, updates) =>
    set((s) => ({
      imageOverlays: s.imageOverlays.map((o) =>
        o.id === id ? { ...o, ...updates } : o
      ),
    })),
  removeImageOverlay: (id) =>
    set((s) => ({ imageOverlays: s.imageOverlays.filter((o) => o.id !== id) })),
  clearImageOverlays: () => set({ imageOverlays: [] }),
}));

/** Build full design JSON for backend (Send). */
export function getDesignPayload(): DesignPayload {
  const state = useStore.getState();
  return {
    background: state.background,
    envelope: state.envelope,
    card: {
      textOverlays: state.textOverlays,
      imageOverlays: state.imageOverlays,
    },
  };
}
