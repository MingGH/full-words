import React, { useState, useEffect, useRef } from 'react';
import { Maximize, Settings, Type, Palette, X, Monitor, Smartphone } from 'lucide-react';

const COLORS = [
  { name: 'Classic', bg: '#000000', text: '#ffffff' },
  { name: 'Paper', bg: '#ffffff', text: '#000000' },
  { name: 'Prompt', bg: '#000000', text: '#ffff00' },
  { name: 'Neon', bg: '#0f0f23', text: '#00ff9d' },
  { name: 'Warm', bg: '#2b1b17', text: '#ffdab9' },
  { name: 'Navy', bg: '#000080', text: '#ffffff' },
  { name: 'Love', bg: '#ffebf0', text: '#ff1493' },
  { name: 'Forest', bg: '#1a472a', text: '#e6f4ea' },
  { name: 'Alert', bg: '#ff4500', text: '#ffffff' },
  { name: 'Cyber', bg: '#2d00f7', text: '#f20089' },
  { name: 'Sunset', bg: '#fd2d00', text: '#ffe66d' },
  { name: 'Ocean', bg: '#0077b6', text: '#caf0f8' },
  { name: 'Mint', bg: '#ccffcc', text: '#003300' },
];

function App() {
  const [text, setText] = useState('Hello World');
  const [fontSize, setFontSize] = useState(120);
  const [bgColor, setBgColor] = useState(COLORS[0].bg);
  const [textColor, setTextColor] = useState(COLORS[0].text);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);
  
  // Update colors when selecting a preset
  const handleThemeSelect = (theme) => {
    setBgColor(theme.bg);
    setTextColor(theme.text);
  };

  // Check if current colors match a preset
  const activeThemeName = COLORS.find(
    c => c.bg.toLowerCase() === bgColor.toLowerCase() && c.text.toLowerCase() === textColor.toLowerCase()
  )?.name;

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Controls - Sidebar on Desktop, Top panel on Mobile */}
      <div className="w-full md:w-80 md:h-full p-4 md:p-6 bg-white border-b md:border-b-0 md:border-r border-gray-200 shadow-lg flex flex-col gap-4 md:gap-6 z-10 overflow-y-auto shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2 text-gray-800">
               Full Words
            </h1>
            <p className="text-xs text-gray-500 hidden md:block">Simple big screen text display</p>
          </div>
          <div className="flex gap-2 md:hidden">
            {/* Mobile quick actions could go here */}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-4 md:gap-6">
          {/* Text Input */}
          <div className="flex-1 md:flex-none">
            <label className="text-sm font-medium mb-1 md:mb-2 flex items-center gap-2 text-gray-700">
              <Type size={16} /> Text
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none h-24 md:h-32 resize-none text-base"
              placeholder="Enter text to display..."
            />
          </div>

          {/* Font Size */}
          <div>
            <label className="text-sm font-medium mb-1 md:mb-2 flex items-center gap-2 text-gray-700">
              <Settings size={16} /> Size ({fontSize}px)
            </label>
            <input
              type="range"
              min="20"
              max="500"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Small</span>
              <span>Huge</span>
            </div>
          </div>

          {/* Color Schemes */}
          <div>
            <label className="text-sm font-medium mb-1 md:mb-2 flex items-center gap-2 text-gray-700">
              <Palette size={16} /> Theme
            </label>
            <div className="grid grid-cols-5 md:grid-cols-3 gap-2 mb-3">
              {COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => handleThemeSelect(c)}
                  className={`aspect-square md:aspect-auto md:h-10 rounded-full md:rounded-md border-2 transition-all flex items-center justify-center overflow-hidden relative ${
                    activeThemeName === c.name ? 'border-blue-500 scale-110 shadow-md ring-2 ring-blue-200' : 'border-gray-100 hover:scale-105 hover:shadow-sm'
                  }`}
                  style={{ backgroundColor: c.bg, color: c.text }}
                  title={c.name}
                  aria-label={c.name}
                >
                  <span className="text-xs font-bold">Aa</span>
                </button>
              ))}
            </div>

            {/* Custom Color Pickers - Always visible to allow overriding */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Background</label>
                <div className="flex items-center gap-2">
                  <div className="relative w-8 h-8 rounded overflow-hidden shadow-sm border border-gray-200">
                     <input 
                      type="color" 
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer p-0 border-0"
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-600 uppercase">{bgColor}</span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Text Color</label>
                <div className="flex items-center gap-2">
                   <div className="relative w-8 h-8 rounded overflow-hidden shadow-sm border border-gray-200">
                    <input 
                      type="color" 
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer p-0 border-0"
                    />
                  </div>
                  <span className="text-xs font-mono text-gray-600 uppercase">{textColor}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={toggleFullScreen}
          className="mt-2 md:mt-auto w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
        >
          <Maximize size={20} className="group-hover:scale-110 transition-transform" /> 
          <span>Go Full Screen</span>
        </button>
      </div>

      {/* Preview Area */}
      <div 
        ref={containerRef}
        className={`flex-1 flex items-center justify-center p-4 overflow-hidden transition-colors duration-300 relative ${isFullscreen ? 'cursor-none' : ''}`}
        style={{ backgroundColor: bgColor, color: textColor }}
        onClick={() => isFullscreen && toggleFullScreen()} 
      >
        <div 
          className="text-center font-bold break-words whitespace-pre-wrap max-w-full leading-tight"
          style={{ 
            fontSize: isFullscreen ? `${fontSize}px` : `${Math.min(fontSize, window.innerWidth < 768 ? 40 : 80)}px`, 
          }}
        >
          {text || <span className="opacity-30">Enter text...</span>}
        </div>
        
        {/* Helper text in preview mode */}
        {!isFullscreen && (
          <div className="absolute bottom-4 right-4 text-xs opacity-50 pointer-events-none select-none">
            Preview Mode
          </div>
        )}

        {/* Floating close button for fullscreen */}
        {isFullscreen && (
          <div className="absolute top-6 right-6 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
             <button 
               onClick={(e) => { e.stopPropagation(); toggleFullScreen(); }}
               className="p-3 bg-white/10 hover:bg-white/30 rounded-full text-current backdrop-blur-md shadow-lg border border-white/20"
             >
               <X size={24} />
             </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
