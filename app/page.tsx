import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { Hero } from "@/components/Hero";
import { ConcreteCalculator } from "@/components/tools/ConcreteCalculator";
import { JsonLdScript, breadcrumbLd } from "@/lib/seo";
import { SITE, TOOLS } from "@/lib/tools";
import { MONO } from "@/components/ui/MonoToken";

export const metadata: Metadata = {
  title: "MonsterCalc — Five Free Online Calculators, No Ads",
  description:
    "Concrete, GPA, age, binomial expansion and scientific calculators in one ad-free app. Every result is computed in your browser — no sign-up and no ads.",
  keywords: [
    "free online calculator",
    "concrete calculator",
    "gpa calculator",
    "chronological age calculator",
    "binomial expansion calculator",
    "online scientific calculator",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    title: "MonsterCalc — Five Free Online Calculators, No Ads",
    description:
      "Concrete, GPA, age, binomial expansion and scientific calculators in one ad-free app.",
    url: "/",
  },
};

const PROMISES = [
  "Every result recomputes on the same keystroke — there are no Calculate buttons anywhere.",
  "All arithmetic runs in your browser. Nothing you type is uploaded, logged or sold.",
  "No accounts and no advertising. The one third-party script is Google Analytics, which counts page visits — never what you type into a calculator.",
  "Each calculator documents the formula it uses, so you can check the working yourself.",
];

export default function HomePage() {
  return (
    <>
      <JsonLdScript
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE.name,
            url: SITE.url,
            description: SITE.tagline,
          },
          breadcrumbLd([{ name: "Home", path: "/" }]),
        ]}
      />
      <Hero variant="home" activeTool="concrete" />

      <main id="main" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 20px" }}>
        <ConcreteCalculator titleTag="h2" />

        <section style={{ padding: "52px 0 0" }}>
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
                Five calculators, one page, nothing between you and the answer
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
                MonsterCalc bundles the five calculations people look up most often —
                concrete volume, grade point average, chronological age, binomial
                expansion and general scientific arithmetic. Each one is a dedicated
                page with its own formulas and worked examples, and each one computes
                entirely on your device.
              </p>
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
              {PROMISES.map((promise) => (
                <li
                  key={promise}
                  style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                >
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
                  <span style={{ fontSize: 13.5, lineHeight: 1.6, textWrap: "pretty" }}>
                    {promise}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section style={{ padding: "44px 0 0" }}>
          <h2
            style={{
              margin: 0,
              fontSize: 30,
              lineHeight: 1.15,
              letterSpacing: "-0.035em",
              fontWeight: 700,
            }}
          >
            Open a calculator
          </h2>
          <div
            className="mc-blog-grid"
            style={{
              marginTop: 22,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 14,
            }}
          >
            {TOOLS.map((tool) => (
              <Link
                key={tool.id}
                href={`/${tool.slug}`}
                className="mc-card-link"
                style={{
                  display: "block",
                  padding: "20px 21px",
                  borderRadius: 18,
                  border: "1px solid var(--border)",
                  background: "var(--panel)",
                  color: "var(--text)",
                }}
              >
                <span
                  style={{ fontFamily: MONO, fontSize: 11.5, color: "var(--accent)" }}
                >
                  {tool.num}
                </span>
                <h3
                  style={{
                    margin: "9px 0 0",
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {tool.name}
                </h3>
                <p
                  style={{
                    margin: "8px 0 0",
                    fontSize: 13,
                    lineHeight: 1.6,
                    color: "var(--muted)",
                  }}
                >
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
