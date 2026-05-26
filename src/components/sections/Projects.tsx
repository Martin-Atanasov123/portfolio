import { projects } from '@/data/content'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionReveal } from '@/components/ui/SectionReveal'
import { Slider } from '@/components/ui/Slider'
import styles from './Projects.module.css'

export function Projects() {
  return (
    <section id="projects" className={`section-light ${styles.projects}`} aria-labelledby="projects-heading">
      <div className="container">
        <SectionReveal variant="heading">
          <p className="section-label-dark">Selected work</p>
          <h2 id="projects-heading" className="section-title-dark">
            Projects <span className="accent-word">&amp; Case Studies</span>
          </h2>
          <p className="section-subtitle-dark">
            A selection of things I've built — each one a different problem, the same obsession
            with craft.
          </p>
        </SectionReveal>

        <SectionReveal variant="card" delay={0.1}>
          <Slider ariaLabel="Projects carousel">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Slider>
        </SectionReveal>
      </div>
    </section>
  )
}
