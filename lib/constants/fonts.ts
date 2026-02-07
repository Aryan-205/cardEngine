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
  | 'cinzel'
  | 'poppins'
  | 'lora'
  | 'pacifico'
  | 'oswald'
  | 'quicksand'
  | 'caveat'
  | 'abril'
  | 'lobster'
  | 'comfortaa'
  | 'righteous'
  | 'bangers'
  | 'permanent-marker'
  | 'satisfy'
  | 'kaushan'
  | 'monoton';

export const fontFamilies: { id: FontId; name: string; family: string }[] = [
  { id: 'system', name: 'System Default', family: 'system-ui, sans-serif' },
  { id: 'playfair', name: 'Playfair Display', family: "'Playfair Display', serif" },
  { id: 'montserrat', name: 'Montserrat', family: "'Montserrat', sans-serif" },
  { id: 'sacramento', name: 'Sacramento', family: "'Sacramento', cursive" },
  { id: 'dancing', name: 'Dancing Script', family: "'Dancing Script', cursive" },
  { id: 'roboto', name: 'Roboto', family: "'Roboto', sans-serif" },
  { id: 'cinzel', name: 'Cinzel', family: "'Cinzel', serif" },
  { id: 'poppins', name: 'Poppins', family: "'Poppins', sans-serif" },
  { id: 'lora', name: 'Lora', family: "'Lora', serif" },
  { id: 'pacifico', name: 'Pacifico', family: "'Pacifico', cursive" },
  { id: 'oswald', name: 'Oswald', family: "'Oswald', sans-serif" },
  { id: 'quicksand', name: 'Quicksand', family: "'Quicksand', sans-serif" },
  { id: 'caveat', name: 'Caveat', family: "'Caveat', cursive" },
  { id: 'abril', name: 'Abril Fatface', family: "'Abril Fatface', serif" },
  { id: 'lobster', name: 'Lobster', family: "'Lobster', cursive" },
  { id: 'comfortaa', name: 'Comfortaa', family: "'Comfortaa', cursive" },
  { id: 'righteous', name: 'Righteous', family: "'Righteous', cursive" },
  { id: 'bangers', name: 'Bangers', family: "'Bangers', cursive" },
  { id: 'permanent-marker', name: 'Permanent Marker', family: "'Permanent Marker', cursive" },
  { id: 'satisfy', name: 'Satisfy', family: "'Satisfy', cursive" },
  { id: 'kaushan', name: 'Kaushan Script', family: "'Kaushan Script', cursive" },
  { id: 'monoton', name: 'Monoton', family: "'Monoton', cursive" },
  { id: 'mono', name: 'Monospace', family: 'ui-monospace, monospace' },
];

export function getAvailableFontWeights(fontId: FontId | string): string[] {
  return ['normal', 'bold', '100', '300', '500', '600', '700', '800', '900'];
}
