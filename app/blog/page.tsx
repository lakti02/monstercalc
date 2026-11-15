import type { Metadata } from "next";
import Link from "next/link";
import { POSTS } from "@/lib/content/blog";
import { JsonLdScript, breadcrumbLd } from "@/lib/seo";
import { MONO } from "@/components/ui/MonoToken";

export const metadata: Metadata = {
  title: "The MonsterCalc blog — formulas, field notes and shortcuts",
  description:
    "Worked examples and method notes behind the calculators: concrete yardage, weighted GPA, chronological age, binomial expansion and calculator choice.",
  alternates: { canonical: "/blog/" },
  openGraph: {
    type: "website",
    title: "The MonsterCalc blog — formulas, field notes and shortcuts",
    description: "Worked examples and method notes behind the calculators.",
    url: "/blog/",
  },
};

export default function BlogIndex() {
  const [featured, ...rest] = POSTS;

  return (
    <>
      <JsonLdScript
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <main id="main" style={{ maxWidth: 1240, margin: "0 auto", padding: "64px 24px 20px" }}>
        <div
          style={{
            fontSize: 11.5,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--accent)",
          }}
        >
          The MonsterCalc blog
        </div>
        <h1
          className="mc-hero-h1"
          style={{
            margin: "14px 0 0",
            fontSize: 44,
            lineHeight: 1.08,
            letterSpacing: "-0.04em",
            fontWeight: 700,
            maxWidth: 760,
            textWrap: "balance",
          }}
        >
          Formulas, field notes and shortcuts
        </h1>
        <p
          style={{
            margin: "16px 0 0",
            maxWidth: 640,
            fontSize: 16.5,
            lineHeight: 1.6,
            color: "var(--muted)",
            textWrap: "pretty",
          }}
        >
          The method behind each calculator, written out — worked examples, the mistakes
          that cost money, and the shortcuts worth knowing.
        </p>

        <Link
          href={`/blog/${featured.slug}`}
          className="mc-card-link"
          style={{
            display: "block",
            marginTop: 38,
            padding: "32px 34px",
            borderRadius: 22,
            border: "1px solid color-mix(in srgb, var(--accent) 34%, transparent)",
            background:
              "linear-gradient(150deg, color-mix(in srgb, var(--accent) 13%, transparent), transparent)",
            color: "var(--text)",
          }}
        >
          <div
            className="mc-two-col"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)",
              gap: 30,
              alignItems: "center",
            }}
          >
            <div>
              <Meta post={featured} />
              <h2
                style={{
                  margin: "12px 0 0",
                  fontSize: 30,
                  lineHeight: 1.16,
                  letterSpacing: "-0.035em",
                  fontWeight: 700,
                  textWrap: "balance",
                }}
              >
                {featured.title}
              </h2>
              <p
                style={{
                  margin: "12px 0 0",
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "var(--muted)",
                  maxWidth: 560,
                  textWrap: "pretty",
                }}
              >
                {featured.dek}
              </p>
            </div>
            <div
              style={{
                padding: "24px 26px",
                borderRadius: 18,
                border: "1px solid var(--border)",
                background: "var(--panel)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 44,
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: "var(--accent)",
                  lineHeight: 1,
                }}
              >
                {featured.stat}
              </div>
              <div
                style={{
                  marginTop: 10,
                  fontSize: 12,
                  color: "var(--muted)",
                  lineHeight: 1.5,
                }}
              >
                {featured.statLabel}
              </div>
            </div>
          </div>
        </Link>

        <div
          className="mc-blog-grid"
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0,1fr))",
            gap: 16,
          }}
        >
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="mc-card-link"
              style={{
                display: "block",
                padding: "24px 25px",
                borderRadius: 20,
                border: "1px solid var(--border)",
                background: "var(--panel)",
                color: "var(--text)",
              }}
            >
              <Meta post={post} />
              <h2
                style={{
                  margin: "11px 0 0",
                  fontSize: 19.5,
                  lineHeight: 1.24,
                  letterSpacing: "-0.03em",
                  fontWeight: 700,
                  textWrap: "balance",
                }}
              >
                {post.title}
              </h2>
              <p
                style={{
                  margin: "10px 0 0",
                  fontSize: 13.5,
                  lineHeight: 1.62,
                  color: "var(--muted)",
                  textWrap: "pretty",
                }}
              >
                {post.dek}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

function Meta({ post }: { post: { category: string; readTime: string; date: string; iso: string } }) {
  return (
    <div
      style={{
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
      <span>{post.readTime}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={post.iso}>{post.date}</time>
    </div>
  );
}
