"use client"
import React, { createContext, useState, useContext } from 'react';

type CursorContextType = {
  cursorVariant: string;
  setCursorVariant: (variant: string) => void;
  hoverBounds: DOMRect | null;
  setHoverBounds: (bounds: DOMRect | null) => void;
};

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [hoverBounds, setHoverBounds] = useState<DOMRect | null>(null);
  
  return (
    <CursorContext.Provider value={{ cursorVariant, setCursorVariant, hoverBounds, setHoverBounds }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
}

export function useMagneticHover() {
  const { setCursorVariant, setHoverBounds } = useCursor();
  
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    setHoverBounds(bounds);
    setCursorVariant('magnetic');
  };
  
  const handleMouseLeave = () => {
    setHoverBounds(null);
    setCursorVariant('default');
  };

  return { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave };
}
