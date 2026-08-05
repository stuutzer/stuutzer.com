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
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
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
            const isLoaded = loaded[index];
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
                  className={`${styles.image_wrapper} ${isLoaded ? styles.image_wrapper_loaded : ""}`}
                  style={{ aspectRatio }}
                  onClick={handleImageClick}
                >
                  <img
                    className={`${styles.image} ${isLoaded ? styles.image_loaded : ""}`}
                    src={image.src}
                    alt={image.alt}
                    draggable={false}
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
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
