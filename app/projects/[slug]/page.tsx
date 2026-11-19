import { notFound } from "next/navigation";
import type { Metadata } from "next";

import Project from "@/app/components/Project/Project";
import { getProjectBySlug, getProjectSummaries } from "@/lib/projects";
import styles from "./page.module.css";

type Params = { slug: string };

export const dynamicParams = false;

export async function generateStaticParams(): Promise<Params[]> {
  const projects = await getProjectSummaries();
  return projects.map(({ slug }) => ({ slug }));
}

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
