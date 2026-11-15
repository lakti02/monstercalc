import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { POSTS, POST_BY_SLUG, relatedPosts } from "@/lib/content/blog";
import { TOOL_BY_ID } from "@/lib/tools";
import { JsonLdScript, articleLd, breadcrumbLd } from "@/lib/seo";
import { MONO } from "@/components/ui/MonoToken";

/** Statically generate every article at build time. */
export function generateStaticParams() {
  return POSTS.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = POST_BY_SLUG[slug];
  if (!post) return {};

  return {
    title: post.title,
    description: post.dek,
    keywords: [post.keyword, ...TOOL_BY_ID[post.tool].keywords.slice(0, 4)],
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.dek,
      url: `/blog/${post.slug}/`,
      publishedTime: post.iso,
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.dek,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = POST_BY_SLUG[slug];
  if (!post) notFound();

  const tool = TOOL_BY_ID[post.tool];
  const related = relatedPosts(post.slug);

  return (
    <>
      <JsonLdScript
        data={[
          articleLd(post),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
        ]}
      />

      <main
        id="main"
        style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px 20px" }}
      >
        <Link
          href="/blog"
          className="mc-chip"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            fontSize: 13,
            fontWeight: 600,
            color: "var(--muted)",
          }}
        >
          <ArrowLeft size={14} strokeWidth={2.4} />
          All posts
        </Link>

        <article>
          <div
            style={{
              marginTop: 26,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 8,
              fontFamily: MONO,
              fontSize: 11.5,
              color: "var(--muted)",
            }}
          >
            <span style={{ color: "var(--cyan)" }}>{post.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.iso}>{post.date}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>

          <h1
            className="mc-hero-h1"
            style={{
              margin: "14px 0 0",
              fontSize: 42,
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              fontWeight: 700,
              textWrap: "balance",
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              margin: "16px 0 0",
              fontSize: 17.5,
              lineHeight: 1.55,
              color: "var(--muted)",
              textWrap: "pretty",
            }}
          >
            {post.dek}
          </p>

          <hr
            style={{
              margin: "30px 0 0",
              border: 0,
              borderTop: "1px solid var(--border)",
            }}
          />

          {post.sections.map((section) => (
            <section key={section.h2} style={{ marginTop: 34 }}>
              <h2
                style={{
                  margin: 0,
                  fontSize: 23,
                  lineHeight: 1.22,
                  letterSpacing: "-0.032em",
                  fontWeight: 700,
                  textWrap: "balance",
                }}
              >
                {section.h2}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 40)}
                  style={{
                    margin: "14px 0 0",
                    fontSize: 15.5,
                    lineHeight: 1.75,
                    color: "var(--muted)",
                    textWrap: "pretty",
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <Link
            href={`/${post.toolSlug}`}
            className="mc-card-link"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
              marginTop: 44,
              padding: "26px 28px",
              borderRadius: 20,
              border: "1px solid color-mix(in srgb, var(--accent) 36%, transparent)",
              background:
                "linear-gradient(150deg, color-mix(in srgb, var(--accent) 14%, transparent), transparent)",
              color: "var(--text)",
            }}
          >
            <span>
              <span style={{ display: "block", fontSize: 19, fontWeight: 700, letterSpacing: "-0.03em" }}>
                Run the numbers yourself
              </span>
              <span
                style={{
                  display: "block",
                  marginTop: 6,
                  fontSize: 13.5,
                  color: "var(--muted)",
                }}
              >
                {tool.name} — instant, ad-free, computed in your browser.
              </span>
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "11px 17px",
                borderRadius: 11,
                background: "linear-gradient(150deg, var(--accent), var(--cyan))",
                color: "var(--on-accent)",
                fontSize: 13.5,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              Open calculator
              <ArrowRight size={15} strokeWidth={2.5} />
            </span>
          </Link>
        </article>

        <section style={{ marginTop: 50 }}>
          <h2
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            Keep reading
          </h2>
          <div
            style={{
              marginTop: 16,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/blog/${item.slug}`}
                className="mc-card-link"
                style={{
                  display: "block",
                  padding: "18px 20px",
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                  background: "var(--panel)",
                  color: "var(--text)",
                }}
              >
                <span
                  style={{ fontFamily: MONO, fontSize: 11.5, color: "var(--cyan)" }}
                >
                  {item.category} · {item.readTime}
                </span>
                <span
                  style={{
                    display: "block",
                    marginTop: 7,
                    fontSize: 15.5,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
