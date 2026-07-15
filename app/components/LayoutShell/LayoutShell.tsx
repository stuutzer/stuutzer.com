"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./LayoutShell.module.css";

type LayoutShellProps = {
  navHeader: React.ReactNode;
  navBody: React.ReactNode;
  children: React.ReactNode;
};

export default function LayoutShell({
  navHeader,
  navBody,
  children,
}: LayoutShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className={styles.nav_column}>
        <div className={styles.nav_header_wrap}>{navHeader}</div>
        <div
          className={`${styles.nav_body} ${menuOpen ? styles.pane_visible : styles.pane_hidden}`}
        >
          {navBody}
        </div>
      </div>
      <div
        className={`${styles.main_pane} ${menuOpen ? styles.pane_hidden : styles.pane_visible}`}
      >
        {children}
      </div>
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
    </>
  );
}
