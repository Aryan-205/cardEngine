// 'use client';
// import { TextOverlayControls } from '../component/text-overlay-controls';
// import { Button } from '../components/ui/button';
// import { CardPreview } from '../component/CardPreview';

// export default function EditorPage() {
//   return (
//     <div className="flex h-screen bg-zinc-950 text-white">
//       {/* Sidebar Controls */}
//       <aside className="w-96 border-r border-zinc-800 p-6 overflow-y-auto">
//         <h1 className="text-xl font-bold mb-6">Card Designer</h1>
//         <TextOverlayControls />
//         <Button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700" 
//                 onClick={() => {/* Trigger Save Logic */}}>
//           Save Template
//         </Button>
//       </aside>

//       {/* Main Preview Area */}
//       <main className="flex-1 flex items-center justify-center bg-zinc-900">
//         <CardPreview />
//       </main>
//     </div>
//   );
// }

'use client';
import { useState } from 'react';
import { TextOverlayControls } from '../component/text-overlay-controls';
import { BackgroundControls } from '../component/BackgroundControls';
import { CardPreview } from '../component/CardPreview';
import { Button } from '../components/ui/button';
import { Type, Image as ImageIcon, Mail, Sparkles, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function EditorPage() {
  const [activeTab, setActiveTab] = useState<'text' | 'bg'>('text');

  const navItems = [
    { id: 'text', label: 'Text', icon: Type },
    { id: 'bg', label: 'Background & Effects', icon: ImageIcon },
    { id: 'envelope', label: 'Envelope', icon: Mail },
    { id: 'reveals', label: 'Reveals', icon: Sparkles },
  ];

  return (
    <div className="flex h-screen bg-[#E5E7EB] font-sans">
      {/* 1. LEFT FLOATING NAV */}
      <aside className="w-24 bg-white border-r flex flex-col items-center py-8 gap-8">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className={cn(
              "flex flex-col items-center gap-1 group transition-colors",
              activeTab === item.id ? "text-green-600" : "text-gray-500 hover:text-gray-800"
            )}
          >
            <div className={cn(
              "p-2 rounded-lg border-2 transition-all",
              activeTab === item.id ? "border-green-600 bg-green-50" : "border-transparent"
            )}>
              <item.icon size={24} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter text-center px-1">
              {item.label}
            </span>
          </button>
        ))}
      </aside>

      {/* 2. CENTER PREVIEW AREA */}
      <main className="flex-1 relative flex items-center justify-center p-12">
         <div className="absolute top-6 left-6">
            <Button variant="outline" className="rounded-full shadow-sm bg-white border-gray-200">
               <ChevronRight className="rotate-180 mr-2 h-4 w-4" /> Back to browse
            </Button>
         </div>
         
         <CardPreview />

         <div className="absolute top-6 right-6 flex gap-4">
            <div className="flex bg-white rounded-full p-1 shadow-sm border">
               <Button variant="ghost" className="rounded-full text-sm font-bold">Design</Button>
               <Button variant="ghost" className="rounded-full text-sm text-gray-400">Details</Button>
               <Button variant="ghost" className="rounded-full text-sm text-gray-400">Review</Button>
            </div>
            <Button className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg px-8">
               Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
         </div>
      </main>

      {/* 3. RIGHT PROPERTY PANEL */}
      <aside className="w-[400px] bg-white border-l overflow-y-auto p-6 shadow-2xl">
        {activeTab === 'text' && <TextOverlayControls />}
        {activeTab === 'bg' && <BackgroundControls />}
        {activeTab !== 'text' && activeTab !== 'bg' && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <p>Feature coming soon...</p>
            </div>
        )}
      </aside>
    </div>
  );
}