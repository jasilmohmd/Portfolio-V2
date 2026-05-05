"use client"

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useMagneticHover } from './CursorContext';
import dynamic from 'next/dynamic';

const Hero3DScene = dynamic(() => import('./Hero3DScene').then(mod => mod.Hero3DScene), { ssr: false });

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const magneticHover = useMagneticHover();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden"
    >
      <Hero3DScene />
      
      {/* Purple gradient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900 rounded-full filter blur-[100px] opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-800 rounded-full filter blur-[100px] opacity-20" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl pointer-events-none"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-white">Hey, I'm </span>
          <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
            Jasil
          </span>
          <span className="text-white"> — Fullstack Dev</span>
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          I build scalable web apps using Angular, Node.js & clean architecture.
        </motion.p>

        <motion.button
          className="flex items-center gap-2 mx-auto px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-purple-800 text-white 
                    hover:from-purple-700 hover:to-purple-900 transition-all group pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          onClick={() => scrollToSection('about')}
          {...magneticHover}
          aria-label="Scroll to About section"
        >
          <span>Explore my work</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowDown className="group-hover:translate-y-1 transition-transform" />
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        aria-hidden="true"
      >
        <div className="w-12 h-12 rounded-full border-2 border-purple-500 flex items-center justify-center">
          <ArrowDown className="text-purple-400" />
        </div>
      </motion.div>
    </section>
  );
}
