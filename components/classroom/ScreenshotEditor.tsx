import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Eraser, Pen, RotateCcw, Trash2, ChevronDown, GripVertical } from 'lucide-react';

interface ScreenshotEditorProps {
  onSend: (dataUrl: string) => void;
  onCancel: () => void;
  backgroundContent: React.ReactNode;
}

type Tool = 'pen' | 'eraser';

export default function ScreenshotEditor({ onSend, onCancel, backgroundContent }: ScreenshotEditorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>('pen');
  const [color, setColor] = useState('#ef4444'); // Red
  const [lineWidth, setLineWidth] = useState(3);
  const [isMinimized, setIsMinimized] = useState(false);
  
  // History for undo
  const [history, setHistory] = useState<ImageData[]>([]);
  const [canUndo, setCanUndo] = useState(false);

  const colors = [
    { name: 'Red', value: '#ef4444' },
    { name: 'Yellow', value: '#eab308' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Green', value: '#22c55e' },
    { name: 'White', value: '#ffffff' },
  ];

  useEffect(() => {
    // Initialize canvas size to match container
    const initCanvas = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      
      // Only set size if it hasn't been set or if window resized
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
        }
      }
    };

    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save state for undo before starting a new stroke
    saveHistoryState();

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = tool === 'eraser' ? 'rgba(0,0,0,1)' : color;
    ctx.lineWidth = tool === 'eraser' ? 20 : lineWidth;
    
    if (tool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }
    
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
  };

  const saveHistoryState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => [...prev.slice(-10), imageData]); // Keep last 10 states
    setCanUndo(true);
  };

  const undo = () => {
    if (history.length === 0) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const previousState = history[history.length - 1];
    ctx.putImageData(previousState, 0, 0);
    
    setHistory(prev => prev.slice(0, -1));
    setCanUndo(history.length > 1);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    saveHistoryState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleSend = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onSend(dataUrl);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Canvas Area (Spans top to right above player controls) */}
      <div 
        ref={containerRef}
        className="absolute top-0 bottom-[60px] left-0 right-0 pointer-events-auto"
      >
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="absolute inset-0 z-10 w-full h-full touch-none cursor-crosshair bg-black/20"
          style={{ touchAction: 'none' }}
        />

        <AnimatePresence mode="wait">
          {!isMinimized ? (
            <motion.div 
              key="expanded"
              drag
              dragConstraints={containerRef}
              dragElastic={0}
              dragMomentum={false}
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 10, scale: 0.95, x: "-50%" }}
              className="absolute bottom-4 left-1/2 flex items-center p-1 sm:p-1.5 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl z-50 pointer-events-auto cursor-grab active:cursor-grabbing"
              style={{ touchAction: 'none' }}
            >
              {/* Drag Handle */}
              <div className="text-white/30 hover:text-white/50 px-1 sm:px-1.5 transition-colors">
                <GripVertical size={16} />
              </div>

              {/* Minimize */}
              <button onClick={() => setIsMinimized(true)} className="p-1 sm:p-1.5 text-white/50 hover:text-white hover:bg-white/5 rounded-full transition" title="Minimize">
                <ChevronDown size={14} />
              </button>

              <div className="h-5 w-px bg-white/10 mx-0.5 sm:mx-1" />

              {/* Cancel */}
              <button onClick={onCancel} className="p-1.5 sm:p-2 text-white/50 hover:text-red-400 hover:bg-white/5 rounded-full transition" title="Cancel">
                <X size={14} />
              </button>

              <div className="h-5 w-px bg-white/10 mx-1 sm:mx-1.5" />

              {/* Tools */}
              <div className="flex items-center gap-0.5 sm:gap-1">
                <button onClick={() => setTool('pen')} className={`p-1.5 sm:p-2 rounded-full transition ${tool === 'pen' ? 'bg-cyan-500/20 text-cyan-400' : 'text-white/60 hover:text-white'}`} title="Pen" onPointerDownCapture={(e) => e.stopPropagation()}>
                  <Pen size={14} />
                </button>
                <button onClick={() => setTool('eraser')} className={`p-1.5 sm:p-2 rounded-full transition ${tool === 'eraser' ? 'bg-cyan-500/20 text-cyan-400' : 'text-white/60 hover:text-white'}`} title="Eraser" onPointerDownCapture={(e) => e.stopPropagation()}>
                  <Eraser size={14} />
                </button>
              </div>

              {/* Colors */}
              {tool === 'pen' && (
                <>
                  <div className="h-5 w-px bg-white/10 mx-1 sm:mx-1.5" />
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    {colors.map(c => (
                      <button
                        key={c.value}
                        onClick={() => setColor(c.value)}
                        onPointerDownCapture={(e) => e.stopPropagation()}
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-all ${color === c.value ? 'border-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'border-transparent hover:scale-110'}`}
                        style={{ backgroundColor: c.value }}
                      />
                    ))}
                  </div>
                </>
              )}

              <div className="h-5 w-px bg-white/10 mx-1 sm:mx-1.5" />

              {/* Actions */}
              <div className="flex items-center gap-0.5 sm:gap-1">
                <button onClick={undo} disabled={!canUndo} className="p-1.5 sm:p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-full transition disabled:opacity-30" title="Undo" onPointerDownCapture={(e) => e.stopPropagation()}>
                  <RotateCcw size={14} />
                </button>
                <button onClick={clearCanvas} className="p-1.5 sm:p-2 text-white/60 hover:text-red-400 hover:bg-white/5 rounded-full transition" title="Clear All" onPointerDownCapture={(e) => e.stopPropagation()}>
                  <Trash2 size={14} />
                </button>
              </div>

              <div className="h-5 w-px bg-white/10 mx-1 sm:mx-1.5" />

              {/* Send */}
              <button onClick={handleSend} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-[10px] sm:text-xs font-bold rounded-full flex items-center gap-1.5 transition ml-0.5 shadow-[0_0_15px_rgba(6,182,212,0.3)]" onPointerDownCapture={(e) => e.stopPropagation()}>
                <span className="hidden sm:inline">Send</span>
                <Send size={12} />
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="minimized"
              drag
              dragConstraints={containerRef}
              dragElastic={0}
              dragMomentum={false}
              initial={{ opacity: 0, scale: 0.8, x: "-50%" }}
              animate={{ opacity: 1, scale: 1, x: "-50%" }}
              exit={{ opacity: 0, scale: 0.8, x: "-50%" }}
              className="absolute bottom-4 left-1/2 pointer-events-auto z-50 cursor-grab active:cursor-grabbing"
              style={{ touchAction: 'none' }}
            >
              <button 
                onClick={() => setIsMinimized(false)} 
                className="p-3 bg-slate-900/90 text-cyan-400 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-cyan-500/30 hover:bg-slate-800 transition-all hover:scale-110 flex items-center justify-center pointer-events-auto"
                title="Expand Tools"
              >
                <Pen size={18} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
