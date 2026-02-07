export type FontId =
  | 'system'
  | 'serif'
  | 'sans'
  | 'mono'
  | 'playfair'
  | 'montserrat'
  | 'sacramento'
  | 'dancing'
  | 'roboto'
  | 'cinzel';

export const fontFamilies: { id: FontId; name: string; family: string }[] = [
  { id: 'system', name: 'System Default', family: 'system-ui, sans-serif' },
  { id: 'playfair', name: 'Playfair Display (Serif)', family: "'Playfair Display', serif" },
  { id: 'montserrat', name: 'Montserrat (Sans)', family: "'Montserrat', sans-serif" },
  { id: 'sacramento', name: 'Sacramento (Script)', family: "'Sacramento', cursive" },
  { id: 'dancing', name: 'Dancing Script', family: "'Dancing Script', cursive" },
  { id: 'roboto', name: 'Roboto', family: "'Roboto', sans-serif" },
  { id: 'cinzel', name: 'Cinzel (Decorative)', family: "'Cinzel', serif" },
  { id: 'mono', name: 'Monospace', family: 'ui-monospace, monospace' },
];

export function getAvailableFontWeights(fontId: FontId | string): string[] {
  return ['normal', 'bold', '100', '300', '500', '600', '700', '800', '900'];
}
