"use client";

import styles from "./LayoutShell.module.css";
import { MenuProvider, useMenu } from "./MenuContext";

type LayoutShellProps = {
  navHeader: React.ReactNode;
  navBody: React.ReactNode;
  children: React.ReactNode;
};

function LayoutShellInner({ navHeader, navBody, children }: LayoutShellProps) {
  const { menuOpen } = useMenu();

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
    </>
  );
}

export default function LayoutShell(props: LayoutShellProps) {
  return (
    <MenuProvider>
      <LayoutShellInner {...props} />
    </MenuProvider>
  );
}
