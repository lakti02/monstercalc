import type { MetadataRoute } from "next";
import { SITE, TOOLS } from "@/lib/tools";
import { POSTS } from "@/lib/content/blog";
import { LEGAL_DOCS, LEGAL_CONFIG } from "@/lib/content/legal";

/** Evaluated at build time — the export has no server to generate it on request. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE.url}/blog/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...TOOLS.map((tool) => ({
      url: `${SITE.url}/${tool.slug}/`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...LEGAL_DOCS.map((doc) => ({
      url: `${SITE.url}/${doc.slug}/`,
      lastModified: new Date(LEGAL_CONFIG.updatedIso),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
    ...POSTS.map((post) => ({
      url: `${SITE.url}/blog/${post.slug}/`,
      lastModified: new Date(post.iso),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
