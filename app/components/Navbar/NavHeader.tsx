"use client";

import styles from './NavHeader.module.css'
import { useMenu } from '../LayoutShell/MenuContext'

export default function NavHeader() {
  const { menuOpen, setMenuOpen } = useMenu();

  return (
      <div className={styles.header}>
          <h1 className={styles.title}>
            stuutzer.com
          </h1>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className={styles.toggle}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <span className={styles.toggle_x}>&#10005;</span>
            ) : (
              <>
                <span className={styles.toggle_bar} />
                <span className={styles.toggle_bar} />
                <span className={styles.toggle_bar} />
              </>
            )}
          </button>
      </div>
  );
}
