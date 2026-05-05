"use client"

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from './CursorContext';

export function CustomCursor() {
  const { cursorVariant, hoverBounds } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 300, mass: 0.5 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouchDevice || prefersReducedMotion) return;

    setIsVisible(true);

    const mouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      
      // Update global variable manually to avoid recreating event listener
      (window as any).__mouseX = e.clientX;
      (window as any).__mouseY = e.clientY;
      
      if (!(window as any).__isMagnetic) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    window.addEventListener('mousemove', mouseMove);
    return () => window.removeEventListener('mousemove', mouseMove);
  }, [dotX, dotY, mouseX, mouseY]);

  useEffect(() => {
    const isMagnetic = cursorVariant === 'magnetic' && hoverBounds;
    (window as any).__isMagnetic = isMagnetic;

    if (isMagnetic && hoverBounds) {
      mouseX.set(hoverBounds.left + hoverBounds.width / 2);
      mouseY.set(hoverBounds.top + hoverBounds.height / 2);
    } else {
      // Snap back to dot position immediately when leaving magnetic state
      const currentX = (window as any).__mouseX || dotX.get();
      const currentY = (window as any).__mouseY || dotY.get();
      mouseX.set(currentX);
      mouseY.set(currentY);
    }
  }, [cursorVariant, hoverBounds, mouseX, mouseY, dotX, dotY]);

  if (!isVisible) return null;

  const isMagnetic = cursorVariant === 'magnetic' && hoverBounds;
  
  return (
    <>
      {/* Outer Magnetic Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isMagnetic ? hoverBounds.width + 16 : 32,
          height: isMagnetic ? hoverBounds.height + 16 : 32,
          borderRadius: isMagnetic ? 12 : 16,
          backgroundColor: isMagnetic ? "rgba(168, 85, 247, 0.2)" : "transparent",
          border: isMagnetic ? "1px solid rgba(168, 85, 247, 0.8)" : "2px solid rgba(168, 85, 247, 0.5)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
      
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isMagnetic ? 0 : 1,
          scale: cursorVariant === 'hover' ? 0 : 1,
        }}
      />
    </>
  );
}
