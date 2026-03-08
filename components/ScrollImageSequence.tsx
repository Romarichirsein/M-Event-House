'use client';

import { useEffect, useRef, useCallback } from 'react';

const TOTAL_FRAMES = 49;
const FRAME_DIR = '/motion';

// Pre-generate all frame paths
const FRAMES = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const n = String(i + 1).padStart(3, '0');
  return `${FRAME_DIR}/ezgif-frame-${n}.jpg`;
});

interface ScrollImageSequenceProps {
  /** 0 → 1 scroll progress coming from the parent scroll container */
  progress: number;
}

export function ScrollImageSequence({ progress }: ScrollImageSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null));
  const loadedCountRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Draw a specific frame onto the canvas
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Cover-fit the image inside the canvas
    const canvasW = canvas.width;
    const canvasH = canvas.height;
    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const scale = Math.max(canvasW / imgW, canvasH / imgH);
    const scaledW = imgW * scale;
    const scaledH = imgH * scale;
    const offsetX = (canvasW - scaledW) / 2;
    const offsetY = (canvasH - scaledH) / 2;

    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.drawImage(img, offsetX, offsetY, scaledW, scaledH);
  }, []);

  // Preload all frames
  useEffect(() => {
    FRAMES.forEach((src, idx) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        imagesRef.current[idx] = img;
        loadedCountRef.current += 1;
        // Draw first frame as soon as it loads
        if (idx === 0) drawFrame(0);
      };
    });
  }, [drawFrame]);

  // Keep canvas size in sync with window
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      const ctx = canvas.getContext('2d');
      ctx?.scale(window.devicePixelRatio, window.devicePixelRatio);
      drawFrame(currentFrameRef.current);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [drawFrame]);

  // React to scroll progress and render the correct frame via rAF
  useEffect(() => {
    const targetFrame = Math.min(
      Math.floor(progress * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    );

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      currentFrameRef.current = targetFrame;
      drawFrame(targetFrame);
    });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [progress, drawFrame]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain"
        style={{ display: 'block' }}
      />
    </div>
  );
}
