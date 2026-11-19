import { getProjectSummaries } from "@/lib/projects";

// Static export can't issue a server redirect, so send visitors on with a meta refresh.
export default async function Home() {
  const [first] = await getProjectSummaries();
  const href = first ? `/projects/${first.slug}` : "/404";
  return (
    <>
      <meta httpEquiv="refresh" content={`0;url=${href}`} />
      <a href={href}>Continue</a>
    </>
  );
}
