import { prisma } from "./prisma";

export type ProjectSummary = {
  id: string;
  slug: string;
  title: string;
  date: Date;
};

export function getProjects() {
  return prisma.project.findMany({
    orderBy: { date: "desc" },
    include: { images: { orderBy: { order: "asc" } } },
  });
}

export function getProjectSummaries(): Promise<ProjectSummary[]> {
  return prisma.project.findMany({
    orderBy: { date: "desc" },
    select: { id: true, slug: true, title: true, date: true },
  });
}

export function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({
    where: { slug },
    include: { images: { orderBy: { order: "asc" } } },
  });
}
