import styles from "./NavProjects.module.css";

import NavProjectItem from "./NavProjectItem";
import { getProjectSummaries } from "@/lib/projects";

function formatShortDate(date: Date): string {
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  return `${month} '${year}`;
}

export default async function NavProjects() {
  const projects = await getProjectSummaries();

  return (
    <>
      <h2 className={styles.title}>Check Out My Stuff</h2>
      <div className={styles.divider} />
      <ul className={styles.project_items}>
        {projects.map((project) => (
          <NavProjectItem
            key={project.id}
            href={`/projects/${project.id}`}
            itemName={project.title}
            date={formatShortDate(project.date)}
          />
        ))}
      </ul>
    </>
  );
}
