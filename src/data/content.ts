export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  github: string
  live: string
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
    id: 'prismatic',
    title: 'Prismatic UI',
    description:
      'A zero-dependency component library built on CSS custom properties. Accessible primitives, full keyboard navigation, and a constraint-based theming API that compiles to 3 KB of runtime CSS.',
    tags: ['TypeScript', 'CSS Custom Properties', 'Rollup', 'Storybook'],
    github: 'https://github.com',
    live: 'https://example.com',
    featured: true,
  },
  {
    id: 'waveform',
    title: 'Waveform',
    description:
      'Real-time audio visualizer using the Web Audio API. Supports multiple visualization modes — oscilloscope, spectrum analyser, and spectrogram — with a timeline scrubber and export to PNG.',
    tags: ['React', 'Web Audio API', 'Canvas', 'TypeScript'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 'tableau',
    title: 'Tableau',
    description:
      'Collaborative infinite-canvas whiteboard with multiplayer cursors, shape tools, and freehand drawing. Built on CRDT-based state synchronisation for conflict-free real-time editing.',
    tags: ['React', 'WebSockets', 'Canvas API', 'Node.js'],
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 'nomad',
    title: 'Nomad',
    description:
      'Travel planning app with interactive Mapbox maps, AI-assisted itinerary building, and an offline-first architecture via IndexedDB — syncs when reconnected with zero data loss.',
    tags: ['React', 'Mapbox GL', 'IndexedDB', 'TypeScript'],
    github: 'https://github.com',
    live: 'https://example.com',
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
