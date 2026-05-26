import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} Martin Atanasov
        </p>
        <p className={styles.built}>
          Built with React &amp; Framer Motion
        </p>
      </div>
    </footer>
  )
}
