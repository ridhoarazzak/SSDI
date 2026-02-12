import React, { useState, useEffect } from 'react';
import { LayerType } from '../types';

interface MapVizProps {
  activeLayer: LayerType;
  opacity: number;
  geeUrl?: string;
}

const MapViz: React.FC<MapVizProps> = ({ activeLayer, opacity, geeUrl }) => {
  const [key, setKey] = useState(0); // Used to force iframe reload
  const [iframeError, setIframeError] = useState(false);

  // Reset state when URL changes
  useEffect(() => {
    setKey(prev => prev + 1);
    setIframeError(false);
  }, [geeUrl]);

  // Helper to get overlay color based on layer (for simulation mode only)
  const getOverlayColor = () => {
    switch (activeLayer) {
      case LayerType.LAND_COVER:
      case LayerType.NDVI: return 'mix-blend-color-dodge bg-gradient-to-tr from-emerald-900/80 via-green-500/20 to-transparent';
      case LayerType.WATER: return 'mix-blend-overlay bg-blue-500/30';
      case LayerType.URBAN: return 'mix-blend-hard-light bg-red-500/20';
      default: return 'bg-transparent';
    }
  };

  // 1. External GEE Dashboard Mode
  if (geeUrl) {
    return (
      <div className="relative w-full h-full bg-slate-950 overflow-hidden flex flex-col">
        
        {/* Top Control Bar for Iframe Management */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 pointer-events-auto">
          <div className="bg-slate-900/90 backdrop-blur text-xs px-3 py-1.5 rounded-md border border-slate-700 text-slate-300 shadow-lg flex items-center gap-2">
            <span className="hidden sm:inline">Dashboard not loading?</span>
            
            <button 
              onClick={() => setKey(k => k + 1)}
              className="hover:text-white px-2 py-0.5 rounded hover:bg-slate-700 transition-colors"
              title="Reload Frame"
            >
              <i className="fas fa-sync-alt"></i>
            </button>
            
            <div className="w-px h-3 bg-slate-700 mx-1"></div>
            
            <a 
              href={geeUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 hover:underline"
            >
              Open in New Tab <i className="fas fa-external-link-alt text-[10px]"></i>
            </a>
          </div>
        </div>

        {/* The Iframe Container */}
        <div className="flex-1 relative w-full h-full bg-slate-900">
           {/* Background Loading State */}
           <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 z-0">
              <i className="fas fa-circle-notch fa-spin text-2xl mb-3 text-blue-500"></i>
              <p className="text-sm">Loading Google Earth Engine...</p>
              <p className="text-xs text-slate-600 mt-2 max-w-xs text-center">
                If the screen remains blank, please use the "Open in New Tab" button above.
              </p>
           </div>

           <iframe 
             key={key}
             src={geeUrl} 
             title="GEE Dashboard"
             className="absolute inset-0 w-full h-full border-0 z-10 bg-transparent"
             sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation allow-downloads"
             allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; clipboard-write"
             loading="eager"
             referrerPolicy="no-referrer-when-downgrade"
           />
        </div>
      </div>
    );
  }

  // 2. Simulation / Fallback Mode
  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden group">
      <img 
        src="https://picsum.photos/1200/800?grayscale" 
        alt="Satellite Base" 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Data Layer Overlay */}
      {activeLayer !== LayerType.SATELLITE && (
        <div 
          className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ${getOverlayColor()}`}
          style={{ opacity: opacity }}
        >
          <svg className="w-full h-full opacity-50" preserveAspectRatio="none">
             <defs>
               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-white/20"/>
               </pattern>
             </defs>
             <rect width="100%" height="100%" fill="url(#grid)" />
             {(activeLayer === LayerType.NDVI || activeLayer === LayerType.LAND_COVER) && (
                <circle cx="50%" cy="50%" r="20%" fill="url(#grid)" className="text-green-400 fill-green-500/20 stroke-green-400" strokeWidth="2" />
             )}
          </svg>
        </div>
      )}

      <div className="absolute bottom-6 left-6 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded border border-slate-700 text-xs text-slate-300 font-mono">
        <span>Scale: 1:50,000 (Simulation)</span>
      </div>
    </div>
  );
};

export default MapViz;
