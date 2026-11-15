import type { MetadataRoute } from "next";
import { SITE } from "@/lib/tools";

/** Evaluated at build time — the export has no server to generate it on request. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
