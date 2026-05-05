"use client"

import { motion, Variants } from 'framer-motion';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';
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

export function Contact() {
  const magneticHover = useMagneticHover();

  return (
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
                  className="flex items-center gap-3 text-purple-400 hover:text-purple-300 transition-colors w-fit focus:outline-none focus:ring-2 focus:ring-purple-500 rounded p-1"
                  {...magneticHover}
                >
                  <Mail size={20} />
                  <span>hello@jasil.dev</span>
                </a>

                <div className="flex gap-4 mt-6">
                  {[
                    { icon: <Github />, url: "#", label: "GitHub Profile" },
                    { icon: <Linkedin />, url: "#", label: "LinkedIn Profile" },
                    { icon: <Twitter />, url: "#", label: "Twitter Profile" }
                  ].map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      aria-label={social.label}
                      className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-900/30 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                      {...magneticHover}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow resize-y"
                    placeholder="What would you like to discuss?"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg font-medium hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  {...magneticHover}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
