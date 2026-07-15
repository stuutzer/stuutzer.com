import { redirect } from "next/navigation";

import { getProjectSummaries } from "@/lib/projects";

export default async function Home() {
  const [first] = await getProjectSummaries();
  if (!first) redirect("/projects");
  redirect(`/projects/${first.slug}`);
}
