"use client";

import { useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./ProjectCarousel.module.css";
import type { ProjectImage } from "./Project";

type ProjectCarouselProps = {
  images: ProjectImage[];
};

const DRAG_THRESHOLD = 5;

export default function ProjectCarousel({ images }: ProjectCarouselProps) {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });
  const [settled, setSettled] = useState<Set<string>>(() => new Set());
  const allLoaded = images.every((image) => settled.has(image.src));
  const markSettled = (src: string) =>
    setSettled((prev) => (prev.has(src) ? prev : new Set(prev).add(src)));
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStart.current = { x: event.clientX, y: event.clientY };
    dragged.current = false;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerStart.current) return;
    const dx = Math.abs(event.clientX - pointerStart.current.x);
    const dy = Math.abs(event.clientY - pointerStart.current.y);
    if (dx > DRAG_THRESHOLD || dy > DRAG_THRESHOLD) {
      dragged.current = true;
    }
  };

  const handleImageClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (dragged.current) event.preventDefault();
  };

  return (
    <div className={styles.carousel}>
      <div
        className={styles.viewport}
        ref={emblaRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <div className={styles.container}>
          {images.map((image, index) => {
            const aspectRatio =
              image.width && image.height
                ? `${image.width} / ${image.height}`
                : undefined;
            return (
              <div key={index} className={styles.slide}>
                <p className={styles.caption}>
                  <span className={styles.figure_label}>Fig {index + 1}.</span>{" "}
                  {image.alt}
                </p>
                <a
                  href={image.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.image_wrapper} ${allLoaded ? styles.image_wrapper_loaded : ""}`}
                  style={{ aspectRatio }}
                  onClick={handleImageClick}
                >
                  <img
                    className={`${styles.image} ${allLoaded ? styles.image_loaded : ""}`}
                    src={image.src}
                    alt={image.alt}
                    draggable={false}
                    ref={(el) => {
                      if (el && el.complete && !settled.has(image.src)) {
                        markSettled(image.src);
                      }
                    }}
                    onLoad={() => markSettled(image.src)}
                    onError={() => markSettled(image.src)}
                  />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
