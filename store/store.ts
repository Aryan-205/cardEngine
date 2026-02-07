import { create } from 'zustand';

// --- Types for design JSON (backend) ---
export type BackgroundConfig = {
  type: 'color' | 'texture';
  value: string; // hex for color, path/id for texture
};

export type EnvelopeConfig = {
  color: string;
  outerColor: string;
  innerTexture: string;
};

export type TextShadowConfig = {
  enabled: boolean;
  color: string;
  blur: number;
  offsetX: number;
  offsetY: number;
};

export type CanvasElementId = string;

export type BaseElement = {
  id: CanvasElementId;
  type: 'text' | 'image';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  opacity: number;
  zIndex: number;
  isVisible: boolean;
};

export type TextElement = BaseElement & {
  type: 'text';
  text: string;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  color: string;
  orientation: 'horizontal' | 'vertical';
  textAlign: 'left' | 'center' | 'right';
  textShadow: TextShadowConfig;
};

export type ImageElement = BaseElement & {
  type: 'image';
  src: string;
  // potentially add filters, objectFit, etc.
};

export type CanvasElement = TextElement | ImageElement;

export type DesignPayload = {
  background: BackgroundConfig;
  envelope: EnvelopeConfig;
  canvasConfig: CanvasConfig;
  elements: CanvasElement[];
};

// --- Sidebar tab ---
export type SidebarTab = 'TEXT' | 'BACKGROUND' | 'ENVELOPE' | 'IMAGES' | 'LAYERS' | 'LAYOUT' | 'ELEMENTS' | 'FONTS';

// Helper for distributive omit to preserve union types
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

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

  // Canvas Layout
  canvasConfig: CanvasConfig;
  setCanvasConfig: (config: Partial<CanvasConfig>) => void;

  // Generic Elements
  elements: CanvasElement[];
  selectedIds: string[];

  // Actions
  addElement: (el: DistributiveOmit<CanvasElement, 'id' | 'zIndex'>) => void;
  updateElement: (id: string, updates: Partial<CanvasElement>) => void;
  removeElement: (id: string) => void;

  // Start Layering
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  setSelection: (ids: string[]) => void;
  clearSelection: () => void;

  // Data
  loadDesign: (data: DesignPayload) => void;

  // Legacy support (to avoid breaking current UI during transition)
  textOverlays: TextElement[]; // Computed via getter if possible, or just sync
  imageOverlays: ImageElement[];
};

export type CanvasConfig = {
  width: number;
  height: number;
};

function generateId() {
  return `el_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export const useStore = create<Store>((set, get) => ({
  activeTab: 'TEXT',
  setActiveTab: (tab) => set({ activeTab: tab }),
  showEnvelope: false,
  setShowEnvelope: (v) => set({ showEnvelope: v }),

  background: { type: 'color', value: '#F8F6EF' },
  setBackground: (b) => set({ background: b }),

  envelope: { color: '#F8F6EF', outerColor: '#F8F6EF', innerTexture: '/textures/paper.jpg' },
  setEnvelope: (e) => set({ envelope: e }),

  canvasConfig: { width: 600, height: 800 },
  setCanvasConfig: (config) => set((state) => ({
    canvasConfig: { ...state.canvasConfig, ...config }
  })),

  elements: [],
  selectedIds: [],

  addElement: (el) => set((state) => {
    const maxZ = state.elements.reduce((max, item) => Math.max(max, item.zIndex), 0);
    const newEl = { ...el, id: generateId(), zIndex: maxZ + 1 } as unknown as CanvasElement;
    return {
      elements: [...state.elements, newEl]
    };
  }),

  updateElement: (id, updates) => set((state) => ({
    elements: state.elements.map((el) => el.id === id ? { ...el, ...updates } : el)
  })),

  removeElement: (id) => set((state) => ({
    elements: state.elements.filter((el) => el.id !== id),
    selectedIds: state.selectedIds.filter((sid) => sid !== id)
  })),

  setSelection: (ids) => set({ selectedIds: ids }),
  clearSelection: () => set({ selectedIds: [] }),

  bringToFront: (id) => set((state) => {
    const maxZ = state.elements.reduce((max, item) => Math.max(max, item.zIndex), 0);
    return {
      elements: state.elements.map(el => el.id === id ? { ...el, zIndex: maxZ + 1 } : el)
    };
  }),

  sendToBack: (id) => set((state) => {
    const minZ = state.elements.reduce((min, item) => Math.min(min, item.zIndex), 0);
    return {
      elements: state.elements.map(el => el.id === id ? { ...el, zIndex: minZ - 1 } : el)
    };
  }),

  loadDesign: (data) => set({
    background: data.background,
    envelope: data.envelope,
    elements: data.elements,
    canvasConfig: data.canvasConfig || { width: 600, height: 800 }
  }),

  // Legacy mappings for backward compat (temporarily)
  textOverlays: [],
  imageOverlays: []
}));

/** Build full design JSON for backend (Send). */
export function getDesignPayload(): DesignPayload {
  const state = useStore.getState();
  return {
    background: state.background,
    envelope: state.envelope,
    canvasConfig: state.canvasConfig,
    elements: state.elements,
  };
}
