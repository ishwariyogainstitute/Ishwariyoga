import React, { useState } from 'react';
import { useYoga } from '../context/YogaContext';
import { Maximize2, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { PeepalLeaf } from './BotanicalAssets';

export const GalleryView: React.FC = () => {
  const { galleryItems } = useYoga();
  const [activeCategory, setActiveCategory] = useState<'All' | GalleryItemCategory>('All');
  
  // Lightbox state
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  type GalleryItemCategory = 'Retreats' | 'Teacher Training' | 'Workshops' | 'Classes' | 'Events' | 'Awards';
  const categories: ('All' | GalleryItemCategory)[] = [
    'All',
    'Retreats',
    'Teacher Training',
    'Workshops',
    'Classes',
    'Events',
    'Awards'
  ];

  const filteredItems = galleryItems.filter(item => {
    return activeCategory === 'All' || item.category === activeCategory;
  });

  const handleOpenLightbox = (itemIndex: number) => {
    setLightboxIdx(itemIndex);
  };

  const handleCloseLightbox = () => {
    setLightboxIdx(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx === null) return;
    setLightboxIdx(prev => {
      if (prev === null) return null;
      return prev === 0 ? filteredItems.length - 1 : prev - 1;
    });
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIdx === null) return;
    setLightboxIdx(prev => {
      if (prev === null) return null;
      return prev === filteredItems.length - 1 ? 0 : prev + 1;
    });
  };

  return (
    <div id="gallery-view" className="relative overflow-hidden animate-fadeIn pb-24 px-4 sm:px-6 lg:px-8">
      
      {/* Background decoration */}
      <div className="absolute top-24 left-4 pointer-events-none opacity-5 select-none">
        <PeepalLeaf size={160} />
      </div>

      {/* Editorial Header */}
      <section className="max-w-4xl mx-auto pt-16 pb-12 text-center space-y-6">
        <span className="font-mono text-[10px] tracking-[0.25em] text-biscuit font-bold uppercase">The Ashram Chronicles (Visuals)</span>
        <h1 className="font-cinzel text-4xl md:text-5xl font-semibold text-espresso tracking-tight">
          Media Gallery
        </h1>
        <p className="font-sans text-sm text-espresso/70 max-w-2xl mx-auto">
          Take a look at the simple, sacred study environments of our classes, workshops, outdoor retreats on the holy Narmada ghats, and governmental events.
        </p>
        <div className="w-16 h-0.5 bg-biscuit mx-auto" />
      </section>

      {/* Category Filter Bar */}
      <section className="max-w-5xl mx-auto mb-12">
        <div className="flex gap-2 flex-wrap justify-center items-center bg-primary-white border border-biscuit/20 p-3 rounded-full shadow-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-[11px] tracking-wider uppercase transition-all duration-300 rounded-full cursor-pointer focus:outline-none ${
                activeCategory === cat
                  ? 'bg-olive-green text-primary-white font-semibold'
                  : 'text-espresso/70 hover:text-espresso'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry-Style Grid of Media */}
      <section className="max-w-6xl mx-auto">
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => handleOpenLightbox(idx)}
                className="artistic-card p-2 rounded-xl group cursor-pointer relative overflow-hidden"
              >
                <div className="aspect-square rounded-lg overflow-hidden bg-warm-beige/10 relative">
                  <img
                    src={item.url}
                    alt={item.caption}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover filter sepia-[0.1] contrast-[0.98] transition-transform duration-700 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-espresso/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="text-primary-white" size={20} />
                  </div>
                </div>
                
                {/* Image Label & Category tag */}
                <div className="pt-3 px-1 space-y-1">
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-olive-green font-semibold">
                    {item.category}
                  </span>
                  <p className="font-sans text-[11px] text-espresso/80 font-medium truncate leading-normal">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-primary-white border border-dashed border-biscuit/30 rounded-xl max-w-sm mx-auto">
            <p className="font-serif italic text-espresso/60 text-sm">
              "No media logs found in this category."
            </p>
          </div>
        )}
      </section>

      {/* GORGEOUS LIGHTBOX MODAL */}
      {lightboxIdx !== null && (
        <div
          id="lightbox-backdrop"
          onClick={handleCloseLightbox}
          className="fixed inset-0 z-50 bg-espresso/95 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-6 animate-fadeIn"
        >
          {/* Top Bar inside lightbox */}
          <div className="flex justify-between items-center text-primary-white py-2 relative z-10">
            <span className="font-mono text-xs uppercase tracking-widest text-lotus-pink font-semibold">
              {filteredItems[lightboxIdx].category}
            </span>
            <button
              id="close-lightbox-btn"
              onClick={handleCloseLightbox}
              className="p-2 rounded-full hover:bg-primary-white/10 text-primary-white transition-all cursor-pointer focus:outline-none"
              aria-label="Close Lightbox"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Slide Stage */}
          <div className="flex-1 flex items-center justify-center relative my-4">
            {/* Prev Trigger */}
            <button
              id="prev-lightbox-btn"
              onClick={handlePrev}
              className="absolute left-2 p-3 rounded-full bg-primary-white/5 border border-primary-white/10 hover:bg-primary-white/20 text-primary-white transition-all cursor-pointer focus:outline-none z-10"
              aria-label="Previous Slide"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Lightbox Image Viewport */}
            <div className="max-w-[85vw] max-h-[70vh] rounded-lg overflow-hidden border border-primary-white/10 shadow-2xl relative select-none bg-espresso/40">
              <img
                src={filteredItems[lightboxIdx].url}
                alt={filteredItems[lightboxIdx].caption}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[70vh] object-contain mx-auto"
              />
            </div>

            {/* Next Trigger */}
            <button
              id="next-lightbox-btn"
              onClick={handleNext}
              className="absolute right-2 p-3 rounded-full bg-primary-white/5 border border-primary-white/10 hover:bg-primary-white/20 text-primary-white transition-all cursor-pointer focus:outline-none z-10"
              aria-label="Next Slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div className="text-center text-primary-white py-4 max-w-2xl mx-auto space-y-1 relative z-10">
            <p className="font-cinzel text-sm sm:text-base tracking-wider font-semibold">
              {filteredItems[lightboxIdx].caption}
            </p>
            <p className="font-sans text-[10px] text-primary-white/60">
              Image {lightboxIdx + 1} of {filteredItems.length}
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
