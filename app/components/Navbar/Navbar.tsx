import styles from "./Navbar.module.css"

import NavHeader from "./NavHeader";
import NavAboutBanner from "./NavAboutBanner";
import NavProjects from "./NavProjects";
import NavReferral from "./NavReferral";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <NavHeader/>
      <div className={styles.content}>
        <NavAboutBanner/>
        <NavProjects/>
        <NavReferral/>
      </div>
    </nav>
  );
}
