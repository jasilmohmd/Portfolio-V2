"use client"

// pages/index.tsx
import { useState, useEffect, useRef, JSX } from 'react';
import { motion, AnimatePresence, Variants, Transition } from 'framer-motion';
import {
  ArrowDown,
  Code,
  Terminal,
  FileCode,
  Server,
  Wrench,
  Mail,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"  // Changed to valid CSS easing function
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

const cursorVariants: Variants = {
  default: {
    scale: 1,
    backgroundColor: "#a855f7"
  },
  hover: {
    scale: 2,
    backgroundColor: "#9b59b6",
    transition: {
      type: "spring",
      stiffness: 500
    }
  }
};

// Types
type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
};

type TechItem = {
  name: string;
  icon: JSX.Element;
  category: string;
  proficiency: string;
};

// Data
const projects: Project[] = [
  {
    id: 1,
    title: "Hive Community Platform",
    description: "A scalable social platform for developers with real-time collaboration tools.",
    technologies: ["Angular", "Node.js", "WebSockets", "MongoDB"],
    link: "#"
  },
  {
    id: 2,
    title: "FinTrack Dashboard",
    description: "Financial analytics dashboard with interactive visualizations and reporting.",
    technologies: ["React", "D3.js", "Express", "PostgreSQL"],
    link: "#"
  },
  {
    id: 3,
    title: "EcoRoute Navigator",
    description: "Carbon footprint optimized routing system for transportation logistics.",
    technologies: ["TypeScript", "Mapbox", "NestJS", "Redis"],
    link: "#"
  }
];

const techStack: TechItem[] = [
  { name: "Angular", icon: <FileCode />, category: "Frontend", proficiency: "Expert" },
  { name: "React", icon: <FileCode />, category: "Frontend", proficiency: "Advanced" },
  { name: "TypeScript", icon: <FileCode />, category: "Frontend", proficiency: "Expert" },
  { name: "Node.js", icon: <Server />, category: "Backend", proficiency: "Expert" },
  { name: "Express", icon: <Server />, category: "Backend", proficiency: "Advanced" },
  { name: "NestJS", icon: <Server />, category: "Backend", proficiency: "Advanced" },
  { name: "MongoDB", icon: <Server />, category: "Backend", proficiency: "Advanced" },
  { name: "PostgreSQL", icon: <Server />, category: "Backend", proficiency: "Intermediate" },
  { name: "Docker", icon: <Wrench />, category: "Tools", proficiency: "Advanced" },
  { name: "Git", icon: <Wrench />, category: "Tools", proficiency: "Expert" },
  { name: "AWS", icon: <Wrench />, category: "Tools", proficiency: "Intermediate" },
  { name: "Framer Motion", icon: <Wrench />, category: "Tools", proficiency: "Advanced" }
];

const quotes = [
  "The best way to predict the future is to invent it. - Alan Kay",
  "First, solve the problem. Then, write the code. - John Johnson",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
  "Code is like humor. When you have to explain it, it's bad. - Cory House"
];

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [terminalText, setTerminalText] = useState<string>("> ");
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);
  const [randomQuote, setRandomQuote] = useState<string>("");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  const heroRef = useRef<HTMLDivElement>(null);
  const terminalIndex = useRef(0);
  const terminalMessages = [
    "loading jasil.dev",
    "booting community systems...",
    "role: Fullstack Engineer",
    "ready."
  ];

  // Initialize
  useEffect(() => {
    // Set random quote
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)]);

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

    // Custom cursor
    const mouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  // Handle scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans overflow-x-hidden">
      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 mix-blend-difference"
        variants={cursorVariants}
        animate={cursorVariant}
        style={{
          x: cursorPosition.x - 12,
          y: cursorPosition.y - 12,
          position: 'fixed',
          top: 0,
          left: 0
        }}
        custom={cursorPosition}
      />

      {/* Hero Section */}
      <section
        id="hero"
        ref={heroRef}
        className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden"
      >
        {/* Purple gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900 rounded-full filter blur-[100px] opacity-30" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-800 rounded-full filter blur-[100px] opacity-20" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl"
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
                      hover:from-purple-700 hover:to-purple-900 transition-all group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => scrollToSection('about')}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
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
        >
          <div className="w-12 h-12 rounded-full border-2 border-purple-500 flex items-center justify-center">
            <ArrowDown className="text-purple-400" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen py-20 px-4 md:px-8 relative"
      >
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
                  {terminalText}
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
                  <div className="absolute -left-11 top-1 w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center border-4 border-black">
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Computer Science Degree</h3>
                  <p className="text-purple-400 mb-2">2016 - 2020</p>
                  <p className="text-gray-400">Graduated with honors, focusing on software architecture and distributed systems.</p>
                </div>

                <div className="mb-10 relative">
                  <div className="absolute -left-11 top-1 w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center border-4 border-black">
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Brototype Academy</h3>
                  <p className="text-purple-400 mb-2">2020 - 2021</p>
                  <p className="text-gray-400">Advanced training in fullstack development with focus on MERN stack.</p>
                </div>

                <div className="relative">
                  <div className="absolute -left-11 top-1 w-8 h-8 rounded-full bg-purple-900 flex items-center justify-center border-4 border-black">
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

      {/* Projects Section */}
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
              <motion.div
                key={project.id}
                variants={fadeIn}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/30 transition-all group"
                whileHover={{ y: -10 }}
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                onClick={() => setActiveProject(project)}
              >
                <div className="p-6">
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

                <div className="h-1 bg-gradient-to-r from-purple-600 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
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
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
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

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={fadeIn}
          >
            <span className="text-white">Let's </span>
            <span className="bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent">
              Connect
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-center text-gray-300 mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            Have a project in mind? Let's build something awesome together.
          </motion.p>

          <motion.div
            className="bg-gray-900 rounded-xl p-8 border border-gray-800"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Get in touch</h3>
                <p className="text-gray-400 mb-6">
                  Feel free to reach out for collaborations or just a friendly hello.
                  I'm always open to discussing new projects and opportunities.
                </p>

                <div className="space-y-4">
                  <a
                    href="mailto:hello@jasil.dev"
                    className="flex items-center gap-3 text-purple-400 hover:text-purple-300 transition-colors"
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    <Mail size={20} />
                    <span>hello@jasil.dev</span>
                  </a>

                  <div className="flex gap-4 mt-6">
                    {[
                      { icon: <Github />, url: "#" },
                      { icon: <Linkedin />, url: "#" },
                      { icon: <Twitter />, url: "#" }
                    ].map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-900/30 transition-colors"
                        onMouseEnter={() => setCursorVariant("hover")}
                        onMouseLeave={() => setCursorVariant("default")}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="What would you like to discuss?"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400">&copy; {new Date().getFullYear()} Muhammed Jasil. All rights reserved.</p>
              <p className="text-sm text-gray-500 italic">{randomQuote}</p>
            </div>

            <div className="flex gap-4">
              {[
                { icon: <Github />, url: "#" },
                { icon: <Linkedin />, url: "#" },
                { icon: <Twitter />, url: "#" }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="text-gray-400 hover:text-purple-400 transition-colors"
                  onMouseEnter={() => setCursorVariant("hover")}
                  onMouseLeave={() => setCursorVariant("default")}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveProject(null)}
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
                  <h3 className="text-2xl font-bold text-white">{activeProject.title}</h3>
                  <button
                    className="text-gray-400 hover:text-white"
                    onClick={() => setActiveProject(null)}
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

                <div className="flex gap-4">
                  <a
                    href={activeProject.link}
                    className="px-6 py-2 bg-purple-900 text-white rounded-lg hover:bg-purple-800 transition-colors"
                    onMouseEnter={() => setCursorVariant("hover")}
                    onMouseLeave={() => setCursorVariant("default")}
                  >
                    View Project
                  </a>
                  <button
                    className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    onClick={() => setActiveProject(null)}
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
    </div>
  );
}