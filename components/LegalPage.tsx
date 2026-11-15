import Link from "next/link";
import { LEGAL_CONFIG, LEGAL_DOCS, type LegalDoc } from "@/lib/content/legal";
import { JsonLdScript, breadcrumbLd } from "@/lib/seo";
import { MONO } from "@/components/ui/MonoToken";

/**
 * Shared reading layout for the three legal documents. Fully server-rendered —
 * nothing here hydrates.
 */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const others = LEGAL_DOCS.filter((d) => d.slug !== doc.slug);

  return (
    <>
      <JsonLdScript
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: doc.title, path: `/${doc.slug}/` },
          ]),
        ]}
      />

      <main
        id="main"
        style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px 20px" }}
      >
        <div
          style={{
            fontFamily: MONO,
            fontSize: 11.5,
            color: "var(--muted)",
          }}
        >
          Last updated{" "}
          <time dateTime={LEGAL_CONFIG.updatedIso}>{LEGAL_CONFIG.updated}</time>
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
          {doc.title}
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
          {doc.dek}
        </p>

        <nav
          aria-label="On this page"
          style={{
            marginTop: 28,
            padding: "20px 22px",
            borderRadius: 18,
            border: "1px solid var(--border)",
            background: "var(--panel)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            On this page
          </div>
          <ol
            style={{
              listStyle: "none",
              margin: "12px 0 0",
              padding: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "2px 20px",
              counterReset: "toc",
            }}
          >
            {doc.sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="mc-chip mc-footer-link"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13.5,
                    color: "var(--muted)",
                  }}
                >
                  <span style={{ fontFamily: MONO, fontSize: 11, opacity: 0.7 }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.h2}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <hr
          style={{ margin: "30px 0 0", border: 0, borderTop: "1px solid var(--border)" }}
        />

        {doc.sections.map((section) => (
          <section key={section.id} id={section.id} style={{ marginTop: 34, scrollMarginTop: 90 }}>
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

            {section.blocks.map((block, index) =>
              block.type === "p" ? (
                <p
                  key={index}
                  style={{
                    margin: "14px 0 0",
                    fontSize: 15.5,
                    lineHeight: 1.75,
                    color: "var(--muted)",
                    textWrap: "pretty",
                  }}
                >
                  {block.text}
                </p>
              ) : (
                <ul
                  key={index}
                  style={{
                    margin: "14px 0 0",
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {block.items.map((item) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                        fontSize: 15.5,
                        lineHeight: 1.7,
                        color: "var(--muted)",
                        textWrap: "pretty",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          marginTop: 10,
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "var(--accent)",
                          flexShrink: 0,
                        }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )
            )}
          </section>
        ))}

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
            Related
          </h2>
          <div
            style={{
              marginTop: 16,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {others.map((other) => (
              <Link
                key={other.slug}
                href={`/${other.slug}/`}
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
                  style={{
                    display: "block",
                    fontSize: 15.5,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {other.title}
                </span>
                <span
                  style={{
                    display: "block",
                    marginTop: 6,
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: "var(--muted)",
                  }}
                >
                  {other.description}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
