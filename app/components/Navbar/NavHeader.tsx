"use client";

import Link from 'next/link'

import styles from './NavHeader.module.css'
import { useMenu } from '../LayoutShell/MenuContext'

export default function NavHeader({ titleHref }: { titleHref: string }) {
  const { menuOpen, setMenuOpen } = useMenu();

  return (
      <div className={styles.header}>
          <h1 className={styles.title}>
            <Link href={titleHref} className={styles.titleLink}>
              stuutzer.com
            </Link>
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
