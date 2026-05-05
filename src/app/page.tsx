import { Metadata } from 'next';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Projects } from '../components/Projects';
import { TechStack } from '../components/TechStack';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';
import { CursorProvider } from '../components/CursorContext';
import { CustomCursor } from '../components/CustomCursor';

export const metadata: Metadata = {
  title: 'Jasil | Fullstack Developer',
  description: 'Portfolio of Muhammed Jasil, a Fullstack Developer specializing in Angular, Node.js and scalable web applications.',
  openGraph: {
    title: 'Jasil | Fullstack Developer',
    description: 'Portfolio of Muhammed Jasil, a Fullstack Developer specializing in Angular, Node.js and scalable web applications.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Jasil.dev',
  },
};

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-black text-gray-200 font-sans overflow-x-hidden">
      <CursorProvider>
        <CustomCursor />
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Contact />
        <Footer />
      </CursorProvider>
    </div>
  );
}