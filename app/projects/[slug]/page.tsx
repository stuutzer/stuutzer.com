import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Project from "@/app/components/Project/Project";
import { getProjectBySlug } from "@/lib/projects";
import styles from "./page.module.css";

export const dynamic = "force-dynamic";

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} — stuutzer`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main className={styles.main}>
      <Project
        title={project.title}
        client={project.client}
        collaborators={project.collaborators}
        category={project.category}
        date={project.date}
        description={project.description}
        images={project.images.map((img) => ({
          src: img.src,
          alt: img.alt,
          width: img.width,
          height: img.height,
        }))}
      />
    </main>
  );
}
