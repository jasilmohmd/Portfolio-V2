"use client"

import { motion, Variants } from 'framer-motion';
import { techStack } from '../data/portfolio';
import { useMagneticHover } from './CursorContext';

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

export function TechStack() {
  const magneticHover = useMagneticHover();

  return (
    <section id="tech" className="py-20 px-4 md:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
        >
          <span className="text-white">Tech </span>
          <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
            Stack
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Frontend', 'Backend', 'Tools'].map((category) => (
            <motion.div
              key={category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="bg-gray-900 rounded-xl p-6 border border-gray-800"
            >
              <h3 className="text-xl font-bold text-white mb-6">{category}</h3>

              <div className="space-y-4">
                {techStack
                  .filter(item => item.category === category)
                  .map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                      whileHover={{ x: 5 }}
                      {...magneticHover}
                      tabIndex={0}
                      role="button"
                      aria-label={`${item.name} - ${item.proficiency}`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-purple-900/50 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{item.name}</h4>
                        <p className="text-sm text-purple-400">{item.proficiency}</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
