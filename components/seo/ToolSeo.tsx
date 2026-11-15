import { Check } from "lucide-react";
import type { Tool } from "@/lib/tools";
import { RelatedChips } from "./RelatedChips";
import { FaqAccordion } from "./Faq";
import { MONO } from "@/components/ui/MonoToken";

/**
 * Server-rendered SEO surface for a calculator route: the education block,
 * the formulas that drive the tool, and the FAQ. All of it exists in the HTML
 * without JavaScript.
 */
export function ToolSeo({ tool }: { tool: Tool }) {
  return (
    <>
      <section style={{ maxWidth: 1240, margin: "0 auto", padding: "52px 24px 0" }}>
        <div
          className="mc-two-col"
          style={{
            border: "1px solid var(--border)",
            borderRadius: 20,
            background: "var(--panel)",
            padding: "30px 32px",
            display: "grid",
            gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
            gap: 34,
            alignItems: "start",
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 27,
                lineHeight: 1.16,
                letterSpacing: "-0.035em",
                fontWeight: 700,
                textWrap: "balance",
              }}
            >
              {tool.seoH2}
            </h2>
            <p
              style={{
                margin: "14px 0 0",
                fontSize: 14.5,
                lineHeight: 1.68,
                color: "var(--muted)",
                textWrap: "pretty",
              }}
            >
              {tool.seoIntro}
            </p>
            <div style={{ marginTop: 20, display: "flex", flexWrap: "wrap", gap: 8 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--muted)",
                  width: "100%",
                }}
              >
                People also search for
              </span>
              <RelatedChips chips={tool.seoRelated} />
            </div>
          </div>

          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {tool.seoBullets.map((bullet) => (
              <li key={bullet} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    background: "color-mix(in srgb, var(--accent) 20%, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <Check size={11} strokeWidth={3.2} style={{ color: "var(--accent)" }} />
                </span>
                <span
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    color: "var(--text)",
                    textWrap: "pretty",
                  }}
                >
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="mc-two-col"
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "44px 24px 20px",
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.1fr)",
          gap: 34,
          alignItems: "start",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            How it works
          </div>
          <h2
            style={{
              margin: "12px 0 0",
              fontSize: 30,
              lineHeight: 1.15,
              letterSpacing: "-0.035em",
              fontWeight: 700,
            }}
          >
            The formulas behind every result
          </h2>
          <p
            style={{
              margin: "12px 0 0",
              fontSize: 14.5,
              lineHeight: 1.6,
              color: "var(--muted)",
              textWrap: "pretty",
            }}
          >
            Every formula below powers the calculator you are using right now — it runs
            locally in your browser, updates on each keystroke, and never sends your
            numbers anywhere.
          </p>
          <div
            style={{ marginTop: 22, display: "flex", flexDirection: "column", gap: 11 }}
          >
            {tool.formulas.map((formula) => (
              <div
                key={formula.title}
                style={{
                  padding: "17px 18px",
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                  background: "var(--panel)",
                }}
              >
                <h3 style={{ margin: 0, fontSize: 13.5, fontWeight: 700 }}>
                  {formula.title}
                </h3>
                <div
                  style={{
                    marginTop: 9,
                    fontFamily: MONO,
                    fontSize: 12.5,
                    color: "var(--cyan)",
                    wordBreak: "break-word",
                  }}
                >
                  {formula.formula}
                </div>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: 12.5,
                    lineHeight: 1.55,
                    color: "var(--muted)",
                  }}
                >
                  {formula.note}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--cyan)",
            }}
          >
            FAQ
          </div>
          <h2
            style={{
              margin: "12px 0 22px",
              fontSize: 30,
              lineHeight: 1.15,
              letterSpacing: "-0.035em",
              fontWeight: 700,
            }}
          >
            Frequently asked questions
          </h2>
          <FaqAccordion items={tool.faqs} />
        </div>
      </section>
    </>
  );
}
