import type { JSX } from 'react'
import { facts } from '@/data/content'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { ClipReveal } from '@/components/ui/ClipReveal'
import styles from './About.module.css'


function IconLocation() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
}
function IconWork() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
}
function IconEdu() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
}

const factIcons: Record<string, JSX.Element> = {
  location: <IconLocation />,
  work: <IconWork />,
  edu: <IconEdu />,
}

export function About() {
  return (
    <section id="about" className={`section-light ${styles.about}`} aria-labelledby="about-heading">
      <div className="container">
        <div className={styles.grid}>
          {/* Text column */}
          <SectionReveal direction="right" className={styles.textCol}>
            <p className="section-label-dark">Who I am</p>
            <h2 id="about-heading" className="section-title-dark">
              About <span className="accent-word">Martin</span>
            </h2>
            <div className={styles.bio}>
              <p>
                I'm Martin — a developer who builds complete, production-ready products end
                to end. From a Supabase-backed admissions platform serving real students, to
                privacy-first desktop tools and multiplayer games, I care about shipping things
                people actually use.
              </p>
              <p>
                My edge is speed without sacrificing craft. I work fluently with modern,
                AI-augmented development — treating today's AI tooling as a genuine force
                multiplier — which lets me take an idea from concept to a polished, deployed
                product remarkably fast, often solo.
              </p>
              <p>
                I studied at SoftUni, and I'm endlessly curious about the frontier — whether
                that's a smarter AI workflow, a WebGL experiment, or squeezing the last 12ms
                out of an animation curve.
              </p>
            </div>

            <div className={styles.facts}>
              {facts.map((fact) => (
                <div key={fact.label} className={styles.factChip}>
                  <span className={styles.factIcon}>{factIcons[fact.icon]}</span>
                  {fact.label}
                </div>
              ))}
            </div>
          </SectionReveal>

          {/* Photo column — signature circle-expand reveal (AGDS CIRCLE_REVEAL) */}
          <div className={styles.photoCol}>
            <div className={styles.photoFrame}>
              <ClipReveal variant="circle" className={styles.photoPlaceholder}>
                <img src="/martin_snimka.webp" alt="Martin Atanasov" className={styles.photoImg} />
              </ClipReveal>
              {/* Decorative ring */}
              <div className={styles.photoRing} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
