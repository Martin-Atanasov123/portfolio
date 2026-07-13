export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  github?: string
  live?: string
  status?: 'Live' | 'In development'
  featured?: boolean
}

export interface SkillCategory {
  label: string
  variant?: 'default' | 'exploring'
  skills: { name: string; icon: string }[]
}

export interface Fact {
  icon: string
  label: string
}

export const projects: Project[] = [
  {
    id: 'uniput',
    title: 'УниПът',
    description:
      'A live platform (uniput.eu) that guides Bulgarian prospective students through university admissions — calculating admission scores across universities and specialties from a database of programmes and grading formulas. Fast React front end on a Supabase backend.',
    tags: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Tailwind'],
    github: 'https://github.com/Martin-Atanasov123/Uni-put',
    live: 'https://uniput.eu/',
    status: 'Live',
    featured: true,
  },
  {
    id: 'focuslens',
    title: 'FocusLens',
    description:
      'A privacy-first screen-time tracker that keeps every byte on your own machine. A desktop agent logs activity to local SQLite, paired with a Chrome extension and a companion mobile app — no cloud, no accounts, no tracking.',
    tags: ['TypeScript', 'Chrome Extension', 'SQLite', 'Kotlin'],
    github: 'https://github.com/Martin-Atanasov123/FocusLens',
  },
  {
    id: 'voice-to-text',
    title: 'Voice to Text',
    description:
      'A speech-to-text converter that turns spoken audio into accurate transcripts using modern speech-recognition models — built in Python with a focus on clean, fast transcription.',
    tags: ['Python', 'Speech Recognition', 'AI Models'],
    github: 'https://github.com/Martin-Atanasov123/Voice-to-text',
    status: 'In development',
  },
  {
    id: 'belot',
    title: 'Belot',
    description:
      'A multiplayer implementation of Belote, the classic Bulgarian card game — real-time gameplay and shared game state built on a TypeScript stack with Supabase, containerised with Docker for easy deployment.',
    tags: ['TypeScript', 'Supabase', 'Realtime', 'Docker'],
    github: 'https://github.com/Martin-Atanasov123/belot',
  },
  {
    id: 'flow-local',
    title: 'fLow Local',
    description:
      'A local-first tool for protecting deep-focus flow, currently in active development — the next idea in a run of privacy-minded, on-device apps.',
    tags: ['Local-first', 'Productivity'],
    status: 'In development',
  },
]

export const skillCategories: SkillCategory[] = [
  {
    label: 'Core',
    skills: [
      { name: 'HTML5', icon: 'html' },
      { name: 'CSS3', icon: 'css' },
      { name: 'JavaScript', icon: 'js' },
      { name: 'TypeScript', icon: 'ts' },
      { name: 'Accessibility', icon: 'a11y' },
    ],
  },
  {
    label: 'Frameworks',
    skills: [
      { name: 'React', icon: 'react' },
      { name: 'Next.js', icon: 'next' },
      { name: 'Framer Motion', icon: 'framer' },
      { name: 'Vite', icon: 'vite' },
    ],
  },
  {
    label: 'Tooling & AI Workflow',
    skills: [
      { name: 'Figma', icon: 'figma' },
      { name: 'Git', icon: 'git' },
      { name: 'Vitest', icon: 'vitest' },
      { name: 'Node.js', icon: 'node' },
      { name: 'Claude Code', icon: 'claude' },
      { name: 'Vibe Coding', icon: 'vibe' },
    ],
  },
  {
    label: 'Exploring',
    variant: 'exploring',
    skills: [
      { name: 'Three.js', icon: 'three' },
      { name: 'WebGL', icon: 'webgl' },
      { name: 'Astro', icon: 'astro' },
      { name: 'Rust / WASM', icon: 'rust' },
    ],
  },
]

export const facts: Fact[] = [
  { icon: 'location', label: 'Sofia, Bulgaria' },
  { icon: 'work', label: 'Open to remote' },
  { icon: 'edu', label: 'SoftUni Graduate' },
]

export const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]
