import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCw, Check, X, Move, Sparkles } from 'lucide-react';

interface Props {
  imageSrc: string;
  isOpen: boolean;
  onClose: () => void;
  onCropComplete: (croppedDataUrl: string) => void;
}

export const PhotoCropModal: React.FC<Props> = ({
  imageSrc,
  isOpen,
  onClose,
  onCropComplete,
}) => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialDistance, setInitialDistance] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (isOpen) {
      setZoom(1);
      setRotation(0);
      setOffset({ x: 0, y: 0 });
    }
  }, [isOpen, imageSrc]);

  if (!isOpen) return null;

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile (1 finger pan, 2 fingers pinch-to-zoom)
  const getTouchDistance = (e: React.TouchEvent) => {
    if (e.touches.length < 2) return null;
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - offset.x,
        y: e.touches[0].clientY - offset.y,
      });
      setInitialDistance(null);
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dist = getTouchDistance(e);
      setInitialDistance(dist);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      setOffset({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    } else if (e.touches.length === 2 && initialDistance) {
      const currentDist = getTouchDistance(e);
      if (currentDist) {
        const factor = currentDist / initialDistance;
        setZoom((prev) => Math.min(4, Math.max(0.6, Number((prev * factor).toFixed(2)))));
        setInitialDistance(currentDist);
      }
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setInitialDistance(null);
  };

  // Generate cropped output
  const handleSaveCrop = () => {
    if (!imageRef.current || !containerRef.current) return;

    const canvas = document.createElement('canvas');
    const outputSize = 400; // Crisp avatar resolution
    canvas.width = outputSize;
    canvas.height = outputSize;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const img = imageRef.current;
    const maskDiameter = 240; // Diameter of crop circle in modal UI

    // Setup coordinate transform
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, outputSize, outputSize);

    // Save state
    ctx.save();
    // Center in canvas
    ctx.translate(outputSize / 2, outputSize / 2);
    ctx.rotate((rotation * Math.PI) / 180);

    // Scale calculation based on modal mask to canvas ratio
    const scaleFactor = outputSize / maskDiameter;
    const renderWidth = img.naturalWidth * zoom * scaleFactor * (maskDiameter / img.naturalWidth || 1);
    const renderHeight = img.naturalHeight * zoom * scaleFactor * (maskDiameter / img.naturalWidth || 1);

    ctx.drawImage(
      img,
      -renderWidth / 2 + offset.x * scaleFactor,
      -renderHeight / 2 + offset.y * scaleFactor,
      renderWidth,
      renderHeight
    );

    ctx.restore();

    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    onCropComplete(dataUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-slate-900">
              ছবি ক্রপ ও অ্যাডজাস্টমেন্ট
            </h3>
            <p className="text-[11px] text-slate-500">
              ড্রাগ করে মুভ করুন এবং ২ ফিংগার বা স্লাইডারে জুম করুন
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Viewport */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-80 bg-slate-950 overflow-hidden cursor-grab active:cursor-grabbing flex items-center justify-center select-none touch-none"
        >
          {/* Target Image */}
          <img
            ref={imageRef}
            src={imageSrc}
            alt="To crop"
            draggable={false}
            style={{
              transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
              maxHeight: '260px',
              maxWidth: '260px',
            }}
            className="pointer-events-none"
          />

          {/* Mask Overlay (Circular Cutout) */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            {/* Outer Dark Vignette */}
            <div className="w-60 h-60 rounded-full border-2 border-teal-400 shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] relative">
              {/* Corner crosshairs */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 text-white">
                <Move className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
          {/* Zoom Slider */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.6, Number((z - 0.15).toFixed(2))))}
              className="p-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <input
              type="range"
              min="0.6"
              max="3.5"
              step="0.05"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="flex-1 accent-teal-600 h-1.5 bg-slate-200 rounded cursor-pointer"
            />
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(3.5, Number((z + 0.15).toFixed(2))))}
              className="p-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="p-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 ml-1"
              title="Rotate 90°"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100"
            >
              বাতিল
            </button>
            <button
              type="button"
              onClick={handleSaveCrop}
              className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>ক্রপ সম্পন্ন করুন</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
