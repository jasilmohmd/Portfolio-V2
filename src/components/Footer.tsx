"use client"

import { useState, useEffect } from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useMagneticHover } from './CursorContext';
import { quotes } from '../data/portfolio';

export function Footer() {
  const magneticHover = useMagneticHover();
  const [randomQuote, setRandomQuote] = useState<string>("");

  useEffect(() => {
    // Set random quote on client mount
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <footer className="py-8 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} Muhammed Jasil. All rights reserved.</p>
            <p className="text-sm text-gray-500 italic mt-1 min-h-[20px]">{randomQuote}</p>
          </div>

          <div className="flex gap-4">
            {[
              { icon: <Github />, url: "#", label: "GitHub" },
              { icon: <Linkedin />, url: "#", label: "LinkedIn" },
              { icon: <Twitter />, url: "#", label: "Twitter" }
            ].map((social, index) => (
              <a
                key={index}
                href={social.url}
                aria-label={social.label}
                className="text-gray-400 hover:text-purple-400 transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-full"
                {...magneticHover}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
