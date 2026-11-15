import Link from "next/link";
import { TOOLS, SITE } from "@/lib/tools";
import { POSTS } from "@/lib/content/blog";
import { LEGAL_DOCS } from "@/lib/content/legal";
import { Logo } from "@/components/ui/Logo";

const COLUMNS = [
  {
    heading: "Tools",
    links: TOOLS.map((tool) => ({ label: tool.name, href: `/${tool.slug}/` })),
  },
  {
    heading: "Resources",
    links: [
      { label: "All articles", href: "/blog/" },
      ...POSTS.slice(0, 3).map((post) => ({
        label: post.title,
        href: `/blog/${post.slug}/`,
      })),
    ],
  },
  {
    heading: "Legal",
    links: LEGAL_DOCS.map((doc) => ({ label: doc.title, href: `/${doc.slug}/` })),
  },
];

export function Footer() {
  return (
    <footer
      style={{
        marginTop: 72,
        borderTop: "1px solid var(--border)",
        background: "color-mix(in srgb, var(--bg2) 60%, transparent)",
      }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "46px 24px 34px" }}>
        <div
          className="mc-stack-sm"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.3fr) repeat(3, minmax(0, 1fr))",
            gap: 34,
            alignItems: "start",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
              <Logo size={32} />
              <span style={{ fontSize: 15.5, fontWeight: 700, letterSpacing: "-0.02em" }}>
                MonsterCalc
              </span>
            </div>
            <p
              style={{
                margin: "14px 0 0",
                fontSize: 13,
                lineHeight: 1.65,
                color: "var(--muted)",
                maxWidth: 280,
              }}
            >
              Five calculators that run entirely in your browser. No sign-up and no ads —
              every result is computed on your device and never sent to us.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div key={column.heading}>
              <div
                style={{
                  fontSize: 11.5,
                  fontWeight: 600,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                }}
              >
                {column.heading}
              </div>
              <ul
                style={{
                  listStyle: "none",
                  margin: "14px 0 0",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="mc-chip mc-footer-link"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        fontSize: 13,
                        color: "var(--muted)",
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 38,
            paddingTop: 22,
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexWrap: "wrap",
            gap: 14,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 14,
              fontSize: 12.5,
              color: "var(--muted)",
            }}
          >
            <span>
              © {new Date().getFullYear()} {SITE.name}. All rights reserved.
            </span>
            {LEGAL_DOCS.map((doc) => (
              <Link
                key={doc.slug}
                href={`/${doc.slug}/`}
                className="mc-chip"
                style={{ fontSize: 12.5, color: "var(--muted)" }}
              >
                {doc.title}
              </Link>
            ))}
          </span>
          <span style={{ fontSize: 12, color: "var(--muted)", maxWidth: 640 }}>
            Results are estimates. Verify material quantities with your supplier and GPA
            calculations against your institution&rsquo;s published policy before relying on them.
          </span>
        </div>
      </div>
    </footer>
  );
}
