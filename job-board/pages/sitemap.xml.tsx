import { DOMAIN } from "@/utils/constants";
import { GetServerSideProps } from "next";

function generateSiteMap(jobs: { id: number }[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${DOMAIN}</loc>
    </url>
    <url>
      <loc>${DOMAIN}/login</loc>
    </url>
    <url>
      <loc>${DOMAIN}/register</loc>
    </url>
    ${jobs
      .map((job) => {
        return `
      <url>
        <loc>${DOMAIN}/jobs/${job.id}</loc>
      </url>
    `;
      })
      .join("")}
  </urlset>
  `;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // fetch jobs from API
  const response = await fetch(`${DOMAIN}/api/jobs`);
  const jobs = await response.json();

  const sitemap = generateSiteMap(jobs.results || []);
  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return { props: {} };
};

export default function SiteMap() {
  return null;
}
