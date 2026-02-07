'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useStore } from '@/store/store';
import { GiphyFetch } from '@giphy/js-fetch-api';
import { Grid } from '@giphy/react-components';
import EmojiPicker, { Theme } from 'emoji-picker-react';
import {
    Smile,
    Zap,
    Search,
    X,
    Star,
    Heart,
    HandMetal,
    Coffee,
    Cloud,
    Camera,
    Bell,
    Anchor,
    Music,
    Sun,
    Moon,
    Flame,
    Shapes,
    Sticker
} from 'lucide-react';

// Import some popular icons from react-icons
import * as FaIcons from 'react-icons/fa';
import * as HiIcons from 'react-icons/hi';
import * as MdIcons from 'react-icons/md';
import * as BsIcons from 'react-icons/bs';

// Import MUI icons
import {
    DiamondOutlined,
    AutoAwesomeOutlined,
    FavoriteBorderOutlined,
    CelebrationOutlined,
    EmojiEventsOutlined,
    LocalActivityOutlined,
    PsychologyOutlined
} from '@mui/icons-material';

// Public Beta Key
// Public API Key
const gf = new GiphyFetch('sX9dUqHvOtPGarSdnfJJ4BwSOfS0O7Vb');

import { renderToStaticMarkup } from 'react-dom/server';

// Categorized Symbols for better UX
const SYMBOL_CATEGORIES = {
    'Shapes': [
        { name: 'Circle', icon: FaIcons.FaRegCircle },
        { name: 'Square', icon: FaIcons.FaRegSquare },
        { name: 'Triangle', icon: MdIcons.MdChangeHistory },
        { name: 'Star', icon: HiIcons.HiOutlineStar },
        { name: 'Heart', icon: HiIcons.HiOutlineHeart },
        { name: 'Diamond', icon: DiamondOutlined },
        { name: 'Hexagon', icon: BsIcons.BsHexagon },
    ],
    'Magic & Fun': [
        { name: 'Sparkles', icon: AutoAwesomeOutlined },
        { name: 'Celebration', icon: CelebrationOutlined },
        { name: 'Trophy', icon: EmojiEventsOutlined },
        { name: 'Ticket', icon: LocalActivityOutlined },
        { name: 'Idea', icon: PsychologyOutlined },
        { name: 'Gift', icon: MdIcons.MdOutlineCardGiftcard },
        { name: 'Magic', icon: BsIcons.BsMagic },
    ],
    'Brands': [
        { name: 'Instagram', icon: FaIcons.FaInstagram },
        { name: 'Facebook', icon: FaIcons.FaFacebook },
        { name: 'Twitter', icon: FaIcons.FaTwitter },
        { name: 'WhatsApp', icon: FaIcons.FaWhatsapp },
        { name: 'YouTube', icon: FaIcons.FaYoutube },
    ],
    'Business': [
        { name: 'Phone', icon: HiIcons.HiOutlinePhone },
        { name: 'Mail', icon: HiIcons.HiOutlineMail },
        { name: 'Location', icon: HiIcons.HiOutlineLocationMarker },
        { name: 'Global', icon: HiIcons.HiOutlineGlobeAlt },
        { name: 'Briefcase', icon: HiIcons.HiOutlineBriefcase },
    ],
    'Nature': [
        { name: 'Leaf', icon: FaIcons.FaLeaf },
        { name: 'Sun', icon: HiIcons.HiOutlineSun },
        { name: 'Moon', icon: HiIcons.HiOutlineMoon },
        { name: 'Cloud', icon: HiIcons.HiOutlineCloud },
        { name: 'Fire', icon: HiIcons.HiOutlineFire },
    ]
};

export default function ElementsTab() {
    const { addElement } = useStore();
    const [activeSubTab, setActiveSubTab] = useState<'GIFS' | 'STICKERS' | 'EMOJIS' | 'SYMBOLS'>('GIFS');
    const [searchQuery, setSearchQuery] = useState('');
    const [giphyError, setGiphyError] = useState<string | null>(null);

    const fetchGifs = useCallback(async (offset: number) => {
        try {
            setGiphyError(null);
            const type = activeSubTab === 'GIFS' ? 'gifs' : 'stickers';

            const result = searchQuery
                ? await gf.search(searchQuery, { offset, limit: 12, type })
                : await gf.trending({ offset, limit: 12, type });

            return result;
        } catch (error: any) {
            console.error('Giphy Fetch Error:', error);
            const errMsg = error.message?.toLowerCase() || '';
            if (errMsg.includes('403') || errMsg.includes('forbidden')) {
                setGiphyError('Giphy access is limited. Please try again in a few minutes.');
            } else if (errMsg.includes('429') || errMsg.includes('too many')) {
                setGiphyError('Too many requests. Please wait a moment.');
            } else {
                setGiphyError('Giphy is unavailable. Please check your internet connection.');
            }
            return { data: [], pagination: { total_count: 0, count: 0, offset: 0 }, meta: { status: 500, msg: 'Error', response_id: '' } };
        }
    }, [activeSubTab, searchQuery]);

    const handleEmojiClick = useCallback((emojiData: any) => {
        addElement({
            type: 'text',
            text: emojiData.emoji,
            x: 100,
            y: 100,
            width: 100,
            height: 100,
            rotation: 0,
            opacity: 1,
            isVisible: true,
            fontSize: 80,
            fontWeight: 'normal',
            fontFamily: 'serif',
            color: '#000000',
            orientation: 'horizontal',
            textAlign: 'center',
            textShadow: { enabled: false, color: '#000000', blur: 0, offsetX: 0, offsetY: 0 }
        });
    }, [addElement]);

    const handleGifClick = useCallback((gif: any, e: React.SyntheticEvent) => {
        e.preventDefault();
        addElement({
            type: 'image',
            src: gif.images.original.url,
            x: 50,
            y: 50,
            width: 250,
            height: 250,
            rotation: 0,
            opacity: 1,
            isVisible: true
        });
    }, [addElement]);

    const handleSymbolClick = useCallback((name: string, IconComponent: any) => {
        try {
            // Render the icon to static markup
            const iconHtml = renderToStaticMarkup(<IconComponent size={200} />);

            // Clean up the SVG string and ensure it has proper dimensions/namespaces
            let svgContent = iconHtml;

            // If the icon is from MUI or regular react-icons, it might already be an <svg>
            // We want to force it to use currentColor so it can be re-colored in the editor
            if (svgContent.includes('<svg')) {
                svgContent = svgContent.replace(/fill="[^"]*"/g, 'fill="currentColor"');
                svgContent = svgContent.replace(/stroke="[^"]*"/g, 'stroke="currentColor"');
                if (!svgContent.includes('xmlns=')) {
                    svgContent = svgContent.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
                }
            } else {
                // If it's just path data, wrap it
                svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="currentColor">${svgContent}</svg>`;
            }

            const dataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgContent)))}`;

            addElement({
                type: 'image',
                src: dataUrl,
                x: 100,
                y: 100,
                width: 150,
                height: 150,
                rotation: 0,
                opacity: 1,
                isVisible: true
            });
        } catch (error) {
            console.error('Error rendering symbol:', error);
        }
    }, [addElement]);

    const filteredSymbols = useMemo(() => {
        if (!searchQuery || activeSubTab !== 'SYMBOLS') return SYMBOL_CATEGORIES;

        const filtered: any = {};
        Object.entries(SYMBOL_CATEGORIES).forEach(([category, icons]) => {
            const matches = icons.filter(icon =>
                icon.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            if (matches.length > 0) {
                filtered[category] = matches;
            }
        });
        return filtered;
    }, [searchQuery, activeSubTab]);

    return (
        <div className="flex flex-col h-full bg-white animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="p-6 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-2 mb-4">
                    <Shapes size={18} className="text-blue-600" />
                    <h2 className="text-xs font-black uppercase tracking-widest text-gray-900">Elements</h2>
                </div>

                <div className="flex bg-gray-50 p-1 rounded-xl mb-4">
                    {(['GIFS', 'STICKERS', 'EMOJIS', 'SYMBOLS'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => {
                                setActiveSubTab(tab);
                                setSearchQuery('');
                            }}
                            className={`flex-1 py-2 rounded-lg text-[10px] font-bold transition-all ${activeSubTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            {tab === 'GIFS' ? 'GIFs' : tab === 'EMOJIS' ? 'Emojis' : tab}
                        </button>
                    ))}
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                        type="text"
                        placeholder={`Search ${activeSubTab.toLowerCase()}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-gray-50 border-none rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X size={14} />
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 no-scrollbar min-h-0 bg-gray-50/30">
                {(activeSubTab === 'GIFS' || activeSubTab === 'STICKERS') && (
                    <div className="w-full flex flex-col gap-2" key={`${activeSubTab}-${searchQuery}`}>
                        {giphyError ? (
                            <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-2xl border border-dashed border-gray-200">
                                <Sticker className="text-gray-300 mb-2" size={32} />
                                <p className="text-sm font-medium text-gray-500">{giphyError}</p>
                                <button
                                    onClick={() => setSearchQuery(searchQuery)}
                                    className="mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : (
                            <>
                                <Grid
                                    width={290}
                                    columns={2}
                                    fetchGifs={fetchGifs}
                                    onGifClick={handleGifClick}
                                    gutter={8}
                                    noResultsMessage={`No ${activeSubTab.toLowerCase()} found`}
                                />
                                <p className="text-[10px] text-gray-400 text-center py-2 px-4 italic leading-tight">
                                    Powered by GIPHY. Some content may take a moment to load.
                                </p>
                            </>
                        )}
                    </div>
                )}

                {activeSubTab === 'EMOJIS' && (
                    <div className="w-full h-full flex justify-center">
                        <EmojiPicker
                            onEmojiClick={handleEmojiClick}
                            width="100%"
                            height="100%"
                            theme={Theme.LIGHT}
                            searchDisabled={false}
                            skinTonesDisabled
                        />
                    </div>
                )}

                {activeSubTab === 'SYMBOLS' && (
                    <div className="flex flex-col gap-6">
                        {Object.entries(filteredSymbols).map(([category, icons]: [string, any]) => (
                            <div key={category}>
                                <h3 className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-3 px-1">{category}</h3>
                                <div className="grid grid-cols-4 gap-3">
                                    {icons.map((symbol: any, idx: number) => (
                                        <button
                                            key={`${category}-${idx}`}
                                            onClick={() => handleSymbolClick(symbol.name, symbol.icon)}
                                            className="aspect-square flex flex-col items-center justify-center p-3 border border-gray-100 bg-white rounded-2xl hover:bg-blue-50 hover:border-blue-100 transition-all group shadow-sm"
                                        >
                                            <symbol.icon size={22} className="text-gray-700 group-hover:text-blue-600 transition-colors" />
                                            <span className="text-[7px] font-bold text-gray-400 mt-1.5 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">{symbol.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

