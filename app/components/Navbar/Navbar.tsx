import styles from "./Navbar.module.css"

import NavHeader from "./NavHeader";
import NavAboutBanner from "./NavAboutBanner";
import NavProjects from "./NavProjects";
import NavReferral from "./NavReferral";

export function NavHeaderPart() {
  return <NavHeader />;
}

export function NavBodyPart() {
  return (
    <div className={styles.content}>
      <NavAboutBanner />
      <NavProjects />
      <NavReferral />
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <NavHeaderPart />
      <NavBodyPart />
    </nav>
  );
}
