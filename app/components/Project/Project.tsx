import Image from "next/image";
import styles from "./Project.module.css"

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
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
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
      <header>
      <div className={styles.images}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image.src}
            alt={image.alt}
          />
        ))}
      </div>
        <p>{category}</p>
        <p>{formatDate(date)}</p>
        <div className={styles.title_wrapper}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        {client && <p>For {client}</p>}
        {collaborators.length > 0 && (
          <p>In Collaboration with {collaborators.join(", ")}</p>
        )}
      </header>
      <p>{description}</p>
    </article>
  );
}
