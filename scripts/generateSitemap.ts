import fs from "fs";
import path from "path";

// Define the base URL for your site
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

// Define static pages
const STATIC_PAGES = ["", "/tours", "/about", "/contact", "/blog"];

// Generate sitemap XML
function generateSitemap() {
  const date = new Date().toISOString().split("T")[0];

  const staticUrls = STATIC_PAGES.map(
    (page) => `
  <url>
    <loc>${BASE_URL}${page}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page === "" ? "1.0" : "0.8"}</priority>
  </url>`
  ).join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
</urlset>`;

  // Write sitemap to public directory
  const publicDir = path.join(process.cwd(), "public");
  const sitemapPath = path.join(publicDir, "sitemap.xml");

  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`Sitemap generated at: ${sitemapPath}`);
}

// Run the function
generateSitemap();
