import data from "@/data/projects.json";

export type ProjectImage = {
  src: string;
  alt: string;
  width: number | null;
  height: number | null;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  client: string | null;
  collaborators: string[];
  category: string;
  date: Date;
  description: string;
  images: ProjectImage[];
};

export type ProjectSummary = Pick<Project, "id" | "slug" | "title" | "date">;

const projects: Project[] = data
  .map((p) => ({ ...p, date: new Date(p.date) }))
  .sort((a, b) => b.date.getTime() - a.date.getTime());

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProjectSummaries(): Promise<ProjectSummary[]> {
  return projects.map(({ id, slug, title, date }) => ({ id, slug, title, date }));
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return projects.find((p) => p.slug === slug) ?? null;
}
