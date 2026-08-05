import styles from "./Navbar.module.css"

import { getProjectSummaries } from "@/lib/projects";

import NavHeader from "./NavHeader";
import NavAboutBanner from "./NavAboutBanner";
import NavProjects from "./NavProjects";
import NavReferral from "./NavReferral";

export async function NavHeaderPart() {
  const [latest] = await getProjectSummaries();
  const titleHref = latest ? `/projects/${latest.slug}` : "/projects";
  return <NavHeader titleHref={titleHref} />;
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
