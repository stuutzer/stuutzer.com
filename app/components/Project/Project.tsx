import styles from "./Project.module.css"
import { capitalizeDescenders } from "@/lib/title";
import ProjectCarousel from "./ProjectCarousel";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number | null;
  height: number | null;
};

type ProjectProps = {
  title: string;
  client: string | null;
  collaborators: string[];
  category: string;
  date: Date;
  description: string;
  images: ProjectImage[];
};

function formatDate(date: Date): string {
  const month = date.toLocaleDateString("en-US", { month: "short" });
  const year = date.toLocaleDateString("en-US", { year: "2-digit" });
  return `${month}’${year}`;
}

export default function Project({
  title,
  client,
  collaborators,
  category,
  date,
  description,
  images,
}: ProjectProps) {
  return (
    <article>
      <header className={styles.header}>
        <ProjectCarousel images={images} />
        <div className={styles.eyebrow}>
          <p className={styles.category}>{category}</p>
          <p className={styles.date}>&#40;{formatDate(date)}&#41;</p>
        </div>
        <div className={styles.title_wrapper}>
          <h1 className={styles.title}>{capitalizeDescenders(title)}</h1>
        </div>
        <div className={styles.subtitle}>
          <p>{client ? `For ${client}` : "Personal Project"}</p>
          {collaborators.length > 0 && (
            <>
              <p>|</p>
              <p>In Collaboration with {collaborators.join(", ")}</p>
            </>
          )}
        </div>
      </header>
      <p className={styles.description}>{description}</p>
    </article>
  );
}
