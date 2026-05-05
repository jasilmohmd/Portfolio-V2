"use client"

import { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { Terminal } from 'lucide-react';

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export function About() {
  const [terminalText, setTerminalText] = useState<string>("> ");
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);
  const terminalIndex = useRef(0);
  const terminalMessages = [
    "loading jasil.dev",
    "booting community systems...",
    "role: Fullstack Engineer",
    "ready."
  ];

  useEffect(() => {
    // Terminal animation
    const interval = setInterval(() => {
      if (terminalIndex.current < terminalMessages.length) {
        setTerminalText(prev => prev + terminalMessages[terminalIndex.current] + "\n> ");
        terminalIndex.current++;
      }
    }, 800);

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section id="about" className="min-h-screen py-20 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
        >
          <span className="text-white">My </span>
          <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
            Journey
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="text-purple-400" size={24} />
                <h3 className="text-xl font-bold text-white">Terminal</h3>
              </div>
              <div className="font-mono text-sm bg-black p-4 rounded-lg h-48 overflow-auto">
                <pre className="whitespace-pre-wrap font-inherit inline">{terminalText}</pre>
                <span className={cursorVisible ? "opacity-100" : "opacity-0"}>█</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <div className="relative pl-8 border-l-2 border-purple-900">
              {/* Timeline items */}
              <div className="mb-10 relative">
                <div className="absolute -left-[45px] top-1 w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center border-4 border-black">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Computer Science Degree</h3>
                <p className="text-purple-400 mb-2">2016 - 2020</p>
                <p className="text-gray-400">Graduated with honors, focusing on software architecture and distributed systems.</p>
              </div>

              <div className="mb-10 relative">
                <div className="absolute -left-[45px] top-1 w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center border-4 border-black">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Brototype Academy</h3>
                <p className="text-purple-400 mb-2">2020 - 2021</p>
                <p className="text-gray-400">Advanced training in fullstack development with focus on MERN stack.</p>
              </div>

              <div className="relative">
                <div className="absolute -left-[45px] top-1 w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center border-4 border-black">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Hive Project Lead</h3>
                <p className="text-purple-400 mb-2">2021 - Present</p>
                <p className="text-gray-400">Leading development of community platform with 50k+ active users.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
