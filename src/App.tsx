import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { ScrollToTop } from '@/components/ui/ScrollToTop'
import { IntroOverlay } from '@/components/ui/IntroOverlay'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
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
      <ScrollToTop />
    </>
  )
}
