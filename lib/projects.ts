import { prisma } from "./prisma";

export type ProjectSummary = {
  id: string;
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
    select: { id: true, title: true, date: true },
  });
}

export function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: { images: { orderBy: { order: "asc" } } },
  });
}
