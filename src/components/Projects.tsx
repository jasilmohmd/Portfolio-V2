"use client"

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Code } from 'lucide-react';
import { projects, Project } from '../data/portfolio';
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

const staggerChildren: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const magneticHover = useMagneticHover();

  return (
    <>
      <section id="projects" className="py-20 px-4 md:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-16 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
          >
            <span className="text-white">Featured </span>
            <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {projects.map((project) => (
              <motion.button
                key={project.id}
                variants={fadeIn}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/30 transition-all group text-left w-full h-full flex flex-col focus:outline-none focus:ring-2 focus:ring-purple-500"
                whileHover={{ y: -10 }}
                {...magneticHover}
                onClick={() => setActiveProject(project)}
                aria-label={`View details for ${project.title}`}
              >
                <div className="p-6 flex-grow">
                  <div className="w-12 h-12 rounded-lg bg-purple-900/50 flex items-center justify-center mb-4 group-hover:bg-purple-900 transition-colors">
                    <Code className="text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs bg-purple-900/30 text-purple-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-1 w-full bg-gradient-to-r from-purple-600 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div
              className="bg-gray-900 rounded-xl max-w-2xl w-full border border-gray-800 overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h3 id="modal-title" className="text-2xl font-bold text-white">{activeProject.title}</h3>
                  <button
                    className="text-gray-400 hover:text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onClick={() => setActiveProject(null)}
                    aria-label="Close modal"
                    {...magneticHover}
                  >
                    ✕
                  </button>
                </div>

                <p className="text-gray-300 mb-6">{activeProject.description}</p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm bg-purple-900/30 text-purple-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <a
                    href={activeProject.link}
                    className="px-6 py-2 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 inline-block"
                    {...magneticHover}
                  >
                    View Project
                  </a>
                  <button
                    className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onClick={() => setActiveProject(null)}
                    {...magneticHover}
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="h-2 bg-gradient-to-r from-purple-600 to-purple-800"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
