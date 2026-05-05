import { FileCode, Server, Wrench } from 'lucide-react';
import { JSX } from 'react';

export type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
};

export type TechItem = {
  name: string;
  icon: JSX.Element;
  category: string;
  proficiency: string;
};

export const projects: Project[] = [
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

export const techStack: TechItem[] = [
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

export const quotes = [
  "The best way to predict the future is to invent it. - Alan Kay",
  "First, solve the problem. Then, write the code. - John Johnson",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler",
  "Code is like humor. When you have to explain it, it's bad. - Cory House"
];
