import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { IntroOverlay } from '@/components/ui/IntroOverlay'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'

export default function App() {
  return (
    <>
      <IntroOverlay />
      <ScrollProgress />
      <Navigation />
      <main id="main-content">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
