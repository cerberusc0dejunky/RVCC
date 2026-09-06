import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Sparkles, 
  CheckCircle2, 
  Truck, 
  Maximize2,
  Calendar,
  ArrowRight
} from 'lucide-react';

import storageUnitImg from '../../assets/img/Storageunit_ba.jpg';
import garageBaImg from '../../assets/img/garage_ba.jpg';
import houseFlipBaImg from '../../assets/img/houseflip_ba.jpg';

export interface BeforeAfterSlide {
  id: string;
  title: string;
  tag: string;
  category: string;
  beforeAfterBadge: string;
  subtitle: string;
  description: string;
  keyHighlights: string[];
  imageUrl: string;
  fallbackUrl?: string;
  aspectRatioLabel: string;
}

export const SLIDES_DATA: BeforeAfterSlide[] = [
  {
    id: 'storage-unit',
    title: 'Abandoned Storage Locker Cleanout',
    tag: 'Commercial Storage Facility',
    category: 'Commercial & Property Management',
    beforeAfterBadge: 'Before / After Half & Half',
    subtitle: 'Full unit clearing & sweep-out after tenant abandonment',
    description: 'We partner with Fort Smith and River Valley storage facility operators to rapidly clean out defaulted or abandoned units. We empty furniture, boxed clutter, and unsorted debris, sweeping the unit down to bare concrete for same-day re-rental.',
    keyHighlights: [
      'Same-day emergency facility turnarounds',
      'All heavy furniture, bins & bulky scrap removed',
      'Complete broom-sweep finish included'
    ],
    imageUrl: storageUnitImg,
    fallbackUrl: '/assets/img/Storageunit_ba.jpg',
    aspectRatioLabel: 'Wide Pan 16:9'
  },
  {
    id: 'garage-cleanout',
    title: 'Suburban Garage & Attic Purge',
    tag: 'Residential Estate Cleanout',
    category: 'Home & Garage Restoration',
    beforeAfterBadge: 'Before Full Packed State',
    subtitle: 'Restoring vehicle parking from floor-to-ceiling clutter',
    description: 'Years of accumulation can render a home garage completely unusable. Our two-person crew systematically hauls away old appliances, scrap lumber, obsolete equipment, and hoarded boxes so homeowners can park inside again.',
    keyHighlights: [
      'Floor-to-ceiling sort, carry & load-out',
      'Appliances & metals triaged for recycling',
      'Zero dumpster sitting in your driveway'
    ],
    imageUrl: garageBaImg,
    fallbackUrl: '/assets/img/garage_ba.jpg',
    aspectRatioLabel: 'High-Res Wide'
  },
  {
    id: 'property-transformation',
    title: 'Whole-Room & Property Debris Clearing',
    tag: 'Property Transformation',
    category: 'Renovation & Move-Out Cleanup',
    beforeAfterBadge: 'Side-by-Side Comparison',
    subtitle: 'From chaotic hoarded room to clean, usable living space',
    description: 'Whether handling a rental eviction, remodel demolition debris, or an estate settlement, River Valley Cleanup Crew provides the muscle and disposal logistics to transform cluttered indoor and outdoor spaces cleanly and respectfully.',
    keyHighlights: [
      'Side-by-side clutter elimination',
      'Full compliance with Sebastian County landfill rules',
      'Fast loading without scuffing floors or doorways'
    ],
    imageUrl: houseFlipBaImg,
    fallbackUrl: '/assets/img/houseflip_ba.jpg',
    aspectRatioLabel: 'Split Comparison'
  }
];

interface WhatWeDoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartEstimate?: () => void;
}

export const WhatWeDoModal: React.FC<WhatWeDoModalProps> = ({
  isOpen,
  onClose,
  onStartEstimate
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  const currentSlide = SLIDES_DATA[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES_DATA.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES_DATA.length) % SLIDES_DATA.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext, handlePrev, onClose]);

  // Slideshow auto-play interval
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, handleNext]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsPlaying(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentImageSrc = imgErrorMap[currentSlide.id] && currentSlide.fallbackUrl 
    ? currentSlide.fallbackUrl 
    : currentSlide.imageUrl;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="bg-[#1e1e1e] text-white w-full max-w-5xl max-h-[92vh] rounded-xl border-2 border-[#ff6600] shadow-[0_0_40px_rgba(255,102,0,0.35)] flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#141414] border-b border-[#333]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-[#ff6600] text-black flex items-center justify-center font-black">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="modal-title" className="text-base sm:text-lg font-black uppercase tracking-tight text-white font-display">
                  What Do We Do?
                </h2>
                <span className="hidden sm:inline-block text-[10px] font-mono font-bold bg-[#ff6600]/20 text-[#ff6600] px-2 py-0.5 rounded border border-[#ff6600]/40">
                  Before &amp; After Showcase
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">
                Real cleanouts, storage purges, and heavy hauling by River Valley Cleanup Crew in Fort Smith, AR
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* Auto Play Toggle */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-2.5 py-1 rounded text-xs font-mono font-bold flex items-center space-x-1.5 transition-colors border cursor-pointer ${
                isPlaying 
                  ? 'bg-[#ff6600] text-black border-[#ff6600]' 
                  : 'bg-[#2a2a2a] text-slate-300 border-slate-700 hover:bg-[#333]'
              }`}
              title={isPlaying ? 'Pause slideshow' : 'Auto-play slideshow'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden md:inline">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span className="hidden md:inline">Auto-Play</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Slide Content Area */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          {/* Main Visual Display */}
          <div className="relative bg-black w-full min-h-[260px] sm:min-h-[380px] md:min-h-[440px] flex items-center justify-center overflow-hidden group">
            {/* The Image */}
            <img 
              src={currentImageSrc} 
              alt={currentSlide.title}
              onError={() => {
                if (!imgErrorMap[currentSlide.id]) {
                  setImgErrorMap((prev) => ({ ...prev, [currentSlide.id]: true }));
                }
              }}
              className="w-full h-full max-h-[500px] object-contain select-none transition-opacity duration-300"
              referrerPolicy="no-referrer"
            />

            {/* Badges Overlay on Image */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2 pointer-events-none">
              <span className="bg-[#ff6600] text-black text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded shadow-md font-mono">
                {currentSlide.beforeAfterBadge}
              </span>
              <span className="bg-black/75 text-slate-200 text-xs font-bold px-2 py-1 rounded border border-white/20 backdrop-blur-xs font-mono">
                {currentSlide.tag}
              </span>
            </div>

            {/* Slide Index Badge */}
            <div className="absolute top-3 right-3 bg-black/80 text-slate-300 text-xs font-mono font-bold px-2.5 py-1 rounded border border-white/20 backdrop-blur-xs">
              {currentIndex + 1} / {SLIDES_DATA.length}
            </div>

            {/* Left Nav Arrow */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-[#ff6600] text-white hover:text-black border border-white/30 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Nav Arrow */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-[#ff6600] text-white hover:text-black border border-white/30 flex items-center justify-center transition-all cursor-pointer shadow-lg active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Auto-play progress bar */}
            {isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
                <div 
                  key={currentIndex}
                  className="h-full bg-[#ff6600] animate-[shimmer_4.5s_linear]"
                  style={{
                    animation: 'progress 4.5s linear'
                  }}
                />
              </div>
            )}
          </div>

          {/* Slide Details Panel */}
          <div className="p-4 sm:p-6 bg-[#222] border-t border-[#333] space-y-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono uppercase text-[#ff6600] font-bold tracking-wider">
                    {currentSlide.category}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-black uppercase text-white font-display">
                  {currentSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  {currentSlide.description}
                </p>
              </div>

              {/* Action: Book similar service button */}
              <div className="shrink-0 flex flex-col gap-2">
                {onStartEstimate && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onStartEstimate();
                    }}
                    className="bg-[#ff6600] hover:bg-[#e65c00] text-black font-black uppercase text-xs px-4 py-2.5 rounded border border-white/30 flex items-center justify-center space-x-2 cursor-pointer transition-all shadow-[2px_2px_0px_0px_#ffffff]"
                  >
                    <span>Estimate This Job</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <span className="text-[10px] text-slate-400 font-mono text-center">
                  Press ← or → on keyboard
                </span>
              </div>
            </div>

            {/* Key Service Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-700/60">
              {currentSlide.keyHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start space-x-2 bg-[#1a1a1a] p-2.5 rounded border border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-[#ff6600] shrink-0 mt-0.5" />
                  <span className="text-xs font-semibold text-slate-300">{highlight}</span>
                </div>
              ))}
            </div>

            {/* Interactive Thumbnail Carousel Strip */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                  Featured Gallery Slides:
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Click any card to inspect
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SLIDES_DATA.map((slide, idx) => {
                  const isSelected = idx === currentIndex;
                  const thumbSrc = imgErrorMap[slide.id] && slide.fallbackUrl 
                    ? slide.fallbackUrl 
                    : slide.imageUrl;

                  return (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentIndex(idx)}
                      className={`group text-left p-1.5 rounded-lg border-2 transition-all cursor-pointer flex flex-col gap-1.5 ${
                        isSelected 
                          ? 'border-[#ff6600] bg-[#2a2a2a] shadow-[0_0_12px_rgba(255,102,0,0.3)]' 
                          : 'border-slate-700/80 bg-[#181818] hover:border-slate-500'
                      }`}
                    >
                      <div className="relative aspect-video w-full rounded overflow-hidden bg-black">
                        <img 
                          src={thumbSrc} 
                          alt={slide.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          referrerPolicy="no-referrer"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#ff6600]/20 border border-[#ff6600]" />
                        )}
                        <span className="absolute bottom-1 right-1 bg-black/80 text-[8px] font-mono px-1 rounded text-white">
                          #{idx + 1}
                        </span>
                      </div>
                      <div className="px-1 truncate">
                        <span className={`block text-[11px] font-black uppercase truncate ${isSelected ? 'text-[#ff6600]' : 'text-slate-200'}`}>
                          {slide.title}
                        </span>
                        <span className="block text-[9px] text-slate-400 truncate">
                          {slide.tag}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="px-4 sm:px-6 py-3 bg-[#141414] border-t border-[#333] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2 text-slate-400 text-[11px] font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#ff6600]" />
            <span>River Valley Cleanup Crew • Fort Smith &amp; River Valley, AR • Licensed &amp; Insured</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-white font-mono text-[11px] font-bold underline cursor-pointer"
            >
              Back to Estimator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
