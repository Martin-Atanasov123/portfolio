import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionReveal } from '@/components/ui/SectionReveal'
import styles from './Contact.module.css'

function IconEmail() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
}
function IconGithub() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
}
function IconLinkedin() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
}

const socialLinks = [
  { label: 'Email', href: 'mailto:matanasov573@gmail.com', icon: <IconEmail /> },
  { label: 'GitHub', href: 'https://github.com', icon: <IconGithub /> },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: <IconLinkedin /> },
]

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? ''

type Status = 'idle' | 'submitting' | 'success' | 'error'

export function Contact() {
  const [focused, setFocused] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    if (!WEB3FORMS_KEY) {
      setErrorMsg('Form is not configured yet — add your Web3Forms access key to .env')
      setStatus('error')
      return
    }

    const formData = new FormData(form)
    formData.append('access_key', WEB3FORMS_KEY)
    formData.append('subject', 'New message from your portfolio')
    formData.append('from_name', 'Portfolio contact form')

    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        form.reset()
      } else {
        setErrorMsg(data.message || 'Something went wrong. Please try again.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Network error — please check your connection and try again.')
      setStatus('error')
    }
  }

  const submitting = status === 'submitting'

  return (
    <section id="contact" className={`section ${styles.contact}`} aria-labelledby="contact-heading">
      <div className={`container ${styles.inner}`}>
        <SectionReveal className={styles.header}>
          <p className="section-label">Say hello</p>
          <h2 id="contact-heading" className="section-title">
            Let's <span className="accent-word">work together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind, a question, or just want to chat about frontend?
            My inbox is always open.
          </p>
        </SectionReveal>

        {/* Social links */}
        <SectionReveal delay={0.1}>
          <div className={styles.socials}>
            {socialLinks.map(({ label, href, icon }) => (
              <motion.a
                key={label}
                href={href}
                className={styles.socialLink}
                aria-label={label}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                {icon}
                <span className={styles.socialLabel}>{label}</span>
              </motion.a>
            ))}
          </div>
        </SectionReveal>

        {/* Contact form */}
        <SectionReveal delay={0.2} className={styles.formWrap}>
          {status === 'success' ? (
            <motion.div
              className={styles.successMsg}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.successIcon}>✓</span>
              <p>Message sent — I'll get back to you soon.</p>
            </motion.div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="contact-name" className={styles.label}>Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    className={`${styles.input} ${focused === 'name' ? styles.inputFocused : ''}`}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-email" className={styles.label}>Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className={`${styles.input} ${focused === 'email' ? styles.inputFocused : ''}`}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-message" className={styles.label}>Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about your project..."
                  required
                  className={`${styles.textarea} ${focused === 'message' ? styles.inputFocused : ''}`}
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                />
              </div>

              {status === 'error' && (
                <motion.p
                  className={styles.errorMsg}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  role="alert"
                >
                  {errorMsg}
                </motion.p>
              )}

              {/* Honeypot — bots fill this, humans never see it */}
              <input type="checkbox" name="botcheck" className={styles.honeypot} tabIndex={-1} autoComplete="off" />

              <button type="submit" className={styles.submitBtn} disabled={submitting}>
                {submitting ? 'Sending…' : 'Send message'}
                {!submitting && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                )}
              </button>
            </form>
          )}
        </SectionReveal>
      </div>
    </section>
  )
}
