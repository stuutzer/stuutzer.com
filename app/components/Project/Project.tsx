"use client";

import { useState } from "react";
import styles from "./Project.module.css"
import { capitalizeDescenders } from "@/lib/title";

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
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  return (
    <article>
      <header className={styles.header}>
      <div className={styles.images}>
        {images.map((image, index) => {
          const aspectRatio =
            image.width && image.height
              ? `${image.width} / ${image.height}`
              : undefined;
          const isLoaded = loaded[index];
          return (
            <div
              key={index}
              className={`${styles.image_wrapper} ${isLoaded ? styles.image_wrapper_loaded : ""}`}
              style={{ aspectRatio }}
            >
              <img
                className={`${styles.image} ${isLoaded ? styles.image_loaded : ""}`}
                src={image.src}
                alt={image.alt}
                ref={(el) => {
                  if (el && el.complete && el.naturalWidth > 0 && !isLoaded) {
                    setLoaded((prev) =>
                      prev[index] ? prev : { ...prev, [index]: true }
                    );
                  }
                }}
                onLoad={() =>
                  setLoaded((prev) =>
                    prev[index] ? prev : { ...prev, [index]: true }
                  )
                }
              />
            </div>
          );
        })}
      </div>
        <div className={styles.eyebrow}>
          <p className={styles.category}>{category}</p>
          <p className={styles.date}>&#40;{formatDate(date)}&#41;</p>
        </div>
        <div className={styles.title_wrapper}>
          <h1 className={styles.title}>{capitalizeDescenders(title)}</h1>
        </div>
        <div className={styles.subtitle}>
          {client && <p>For {client}</p>}
          <p>|</p>
          {collaborators.length > 0 && (
            <p>In Collaboration with {collaborators.join(", ")}</p>
          )}
        </div>
      </header>
      <p className={styles.description}>{description}</p>
    </article>
  );
}
