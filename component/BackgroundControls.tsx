'use client';
import { useImageStore } from '@/lib/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

export const BackgroundControls = () => {
  const { background, setBackground } = useImageStore();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackground(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="font-bold text-lg uppercase tracking-tight text-zinc-800">Background</h3>
      
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Card Background</label>
        
        {!background ? (
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center hover:border-green-500 transition-colors cursor-pointer relative">
            <Upload className="text-gray-400 mb-2" />
            <p className="text-xs text-gray-500 text-center">Upload JPG or PNG<br/>(Max 5MB)</p>
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer" 
              onChange={handleImageUpload}
              accept="image/*"
            />
          </div>
        ) : (
          <div className="relative rounded-xl overflow-hidden border">
            <img src={background} alt="bg" className="w-full h-40 object-cover" />
            <button 
              onClick={() => setBackground('')}
              className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:text-red-500"
            >
              <X size={16} />
            </button>
          </div>
        )}

        <div className="space-y-2">
            <p className="text-xs font-semibold uppercase text-gray-400">Solid Color</p>
            <div className="flex flex-wrap gap-2">
                {['#FFFFFF', '#F3F4F6', '#FEE2E2', '#FEF3C7', '#D1FAE5'].map((color) => (
                    <button 
                        key={color}
                        className="w-8 h-8 rounded-full border shadow-sm"
                        style={{ backgroundColor: color }}
                        onClick={() => setBackground(color)}
                    />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};