import Image from "next/image";

export type ProjectImage = {
  src: string;
  alt: string;
};

type ProjectProps = {
  images: ProjectImage[];
  category: string;
  name: string;
  credits?: string;
  description: string;
};

export default function Project({
  images,
  category,
  name,
  credits,
  description,
}: ProjectProps) {
  return (
    <article>
      <div>
        {images.map((image, index) => (
          <div key={index}></div>
        ))}
      </div>
      <h3>{category}</h3>
      <h1>{name}</h1>
      {credits && <h4>{credits}</h4>}
      <p>{description}</p>
    </article>
  );
}
