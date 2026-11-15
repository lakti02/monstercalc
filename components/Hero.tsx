"use client";

import Link from "next/link";
import { TOOLS, matchesQuery, type ToolId } from "@/lib/tools";
import { useSearch } from "@/components/ui/Search";
import { MONO } from "@/components/ui/primitives";

export function Hero({
  activeTool,
  variant = "tool",
}: {
  activeTool?: ToolId;
  /** The homepage headline is the page h1; on a tool route the calculator
   *  name takes that role and this becomes a styled tagline. */
  variant?: "home" | "tool";
}) {
  const { query } = useSearch();
  const Headline = variant === "home" ? "h1" : "p";
  const visible = TOOLS.filter((tool) => matchesQuery(tool, query));

  return (
    <section
      style={{
        maxWidth: 1240,
        margin: "0 auto",
        padding: "64px 24px 34px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 13px",
          borderRadius: 999,
          border: "1px solid var(--border)",
          background: "var(--panel2)",
          fontSize: 12,
          fontWeight: 600,
          color: "var(--muted)",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--accent)",
            boxShadow: "0 0 10px var(--accent)",
          }}
        />
        No sign-up · No ads · Instant results
      </div>

      <Headline
        className="mc-hero-h1"
        style={{
          margin: "20px auto 0",
          maxWidth: 820,
          fontSize: 60,
          lineHeight: 1.02,
          letterSpacing: "-0.045em",
          fontWeight: 700,
          textWrap: "balance",
        }}
      >
        Instant, Accurate Calculations.{" "}
        <span
          style={{
            background: "linear-gradient(100deg, var(--accent), var(--cyan))",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Free Online.
        </span>
      </Headline>

      <p
        style={{
          margin: "18px auto 0",
          maxWidth: 600,
          fontSize: 17.5,
          lineHeight: 1.55,
          color: "var(--muted)",
          textWrap: "pretty",
        }}
      >
        The high-performance calculation engine for students, builders, and everyday math.
      </p>

      <div
        style={{
          marginTop: 28,
          display: "flex",
          flexWrap: "wrap",
          gap: 10,
          justifyContent: "center",
        }}
      >
        {visible.map((tool) => {
          const active = tool.id === activeTool;
          return (
            <Link
              key={tool.id}
              href={`/${tool.slug}`}
              className="mc-hover-line mc-tap"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "10px 16px",
                borderRadius: 999,
                border: `1px solid ${
                  active
                    ? "color-mix(in srgb, var(--accent) 45%, transparent)"
                    : "var(--border)"
                }`,
                background: active
                  ? "color-mix(in srgb, var(--accent) 16%, transparent)"
                  : "var(--panel2)",
                color: active ? "var(--text)" : "var(--muted)",
                fontSize: 13.5,
                fontWeight: 600,
              }}
            >
              {tool.pill}
              <span style={{ fontFamily: MONO, fontSize: 11, color: "var(--muted)" }}>
                {tool.pillHint}
              </span>
            </Link>
          );
        })}

        {visible.length === 0 && (
          <div
            style={{
              padding: "10px 16px",
              borderRadius: 999,
              border: "1px dashed var(--border2)",
              color: "var(--muted)",
              fontSize: 13.5,
            }}
          >
            No calculator matches “{query}”
          </div>
        )}
      </div>
    </section>
  );
}
