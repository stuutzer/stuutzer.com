import styles from "./not-found.module.css";

export default function NotFound() {
  return <main className={styles.main}>
    <img className={styles.mascot} src="/404.webp" alt="404 not found" />
    <p className={styles.alert_a}>404 NOT FOUND</p>
    <p className={styles.alert_a}>404 NOT FOUND</p>
    <p className={styles.alert_b}>404 NOT FOUND</p>
  </main>;
}
