import SiteHeader from "../_components/site-header";
import SiteShell from "../_components/site-shell";
import { playfair } from "../_components/brand-fonts";
import { client } from "../../lib/sanity";
import SolutionsPageContent from "./_components/SolutionsPageContent";

async function getProjects() {
  return client.fetch(
    `*[_type == "project"] | order(year desc, title asc) {
      _id,
      title,
      year,
      location,
      "images": images[] {
        _key,
        caption,
        "url": asset->url
      }
    }`
  );
}

export default async function SolutionsPage() {
  const projects = await getProjects();

  return (
    <SiteShell>
      <SiteHeader />
      <SolutionsPageContent
        projects={projects}
        playfairClassName={playfair.className}
      />
    </SiteShell>
  );
}
