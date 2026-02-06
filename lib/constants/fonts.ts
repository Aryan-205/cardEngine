export type FontId = 'system' | 'serif' | 'sans' | 'mono';

export const fontFamilies: { id: FontId; name: string; family: string }[] = [
  { id: 'system', name: 'System', family: 'system-ui, sans-serif' },
  { id: 'serif', name: 'Serif', family: 'Georgia, serif' },
  { id: 'sans', name: 'Sans', family: 'Arial, Helvetica, sans-serif' },
  { id: 'mono', name: 'Mono', family: 'ui-monospace, monospace' },
];

export function getAvailableFontWeights(fontId: FontId | string): string[] {
  return ['normal', 'bold', '100', '300', '500', '600', '700', '800', '900'];
}
