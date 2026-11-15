import { SITE, type Tool } from "@/lib/tools";
import type { Post } from "@/lib/content/blog";

type JsonLd = Record<string, unknown>;

export function breadcrumbLd(
  trail: { name: string; path: string }[]
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      // Normalised to the trailing-slash form the exported site actually serves.
      item: `${SITE.url}${crumb.path.endsWith("/") ? crumb.path : crumb.path + "/"}`,
    })),
  };
}

export function faqLd(tool: Tool): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

export function softwareAppLd(tool: Tool): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    url: `${SITE.url}/${tool.slug}/`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any browser",
    description: tool.description,
    isAccessibleForFree: true,
    // A free tool still needs an Offer node for the price to be machine-readable.
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function articleLd(post: Post): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.dek,
    datePublished: post.iso,
    dateModified: post.iso,
    articleSection: post.category,
    inLanguage: "en",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${post.slug}/`,
    },
    author: { "@type": "Organization", name: SITE.name, url: SITE.url },
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
}

/** Renders one or more JSON-LD graphs into the document. */
export function JsonLdScript({ data }: { data: JsonLd[] }) {
  return (
    <>
      {data.map((graph, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </>
  );
}
