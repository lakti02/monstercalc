"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Search, Share2, Sun } from "lucide-react";
import { useEffect, useRef } from "react";
import { TOOLS } from "@/lib/tools";
import { useSearch } from "@/components/ui/Search";
import { useTheme } from "@/components/ui/Theme";
import { copyText, useToast } from "@/components/ui/Toast";
import { Logo } from "@/components/ui/Logo";
import { MONO } from "@/components/ui/primitives";

export function Header() {
  const pathname = usePathname();
  const { query, setQuery } = useSearch();
  const { theme, toggle } = useTheme();
  const { toast } = useToast();
  const searchRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K focuses the instant search, matching the hint chip.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onBlog = pathname.startsWith("/blog");

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        backdropFilter: "blur(18px)",
        background: "color-mix(in srgb, var(--bg) 82%, transparent)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          gap: 22,
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            flexShrink: 0,
            minHeight: 44,
            color: "var(--text)",
          }}
        >
          <Logo />
          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
            <span style={{ fontSize: 16.5, fontWeight: 700, letterSpacing: "-0.02em" }}>
              MonsterCalc
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: "var(--muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              4-in-1 engine
            </span>
          </span>
        </Link>

        <nav
          aria-label="Calculators"
          className="mc-nav-scroll mc-scroll"
          style={{
            display: "flex",
            gap: 4,
            padding: 4,
            border: "1px solid var(--border)",
            borderRadius: 12,
            background: "var(--panel2)",
          }}
        >
          {TOOLS.map((tool) => {
            const active = pathname === `/${tool.slug}`;
            return (
              <Link
                key={tool.id}
                href={`/${tool.slug}`}
                aria-current={active ? "page" : undefined}
                className="mc-hover-line mc-tap"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "7px 12px",
                  borderRadius: 9,
                  border: `1px solid ${
                    active
                      ? "color-mix(in srgb, var(--accent) 45%, transparent)"
                      : "transparent"
                  }`,
                  background: active
                    ? "color-mix(in srgb, var(--accent) 16%, transparent)"
                    : "transparent",
                  color: active ? "var(--text)" : "var(--muted)",
                  fontSize: 13,
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ fontFamily: MONO, fontSize: 11, opacity: 0.75 }}>
                  {tool.num}
                </span>
                {tool.short}
              </Link>
            );
          })}
        </nav>

        <div
          className="mc-search"
          style={{
            flex: 1,
            minWidth: 120,
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "8px 13px",
            minHeight: 44,
            border: "1px solid var(--border)",
            borderRadius: 11,
            background: "var(--panel2)",
          }}
        >
          <Search size={15} strokeWidth={2.2} style={{ color: "var(--muted)", flexShrink: 0 }} />
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search calculators…"
            aria-label="Search calculators"
            style={{
              flex: 1,
              minWidth: 0,
              border: 0,
              background: "transparent",
              outline: "none",
              fontSize: 13.5,
              height: 26,
            }}
          />
          <span
            aria-hidden="true"
            style={{
              fontFamily: MONO,
              fontSize: 10.5,
              color: "var(--muted)",
              border: "1px solid var(--border)",
              borderRadius: 5,
              padding: "2px 5px",
            }}
          >
            ⌘K
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <Link
            href="/blog"
            className="mc-hover-line mc-tap"
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 13px",
              borderRadius: 10,
              border: "1px solid var(--border)",
              background: onBlog
                ? "color-mix(in srgb, var(--accent) 16%, transparent)"
                : "transparent",
              color: onBlog ? "var(--text)" : "var(--muted)",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            Blog
          </Link>

          <button
            type="button"
            onClick={toggle}
            title="Toggle theme"
            aria-label="Toggle colour theme"
            className="mc-hover-line mc-tap"
            style={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 10,
              border: "1px solid var(--border)",
              background: "var(--panel2)",
              cursor: "pointer",
              color: "var(--muted)",
            }}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            type="button"
            className="mc-grad-btn mc-tap mc-share"
            onClick={async () => {
              const ok = await copyText(window.location.href);
              toast(ok ? "Link copied to clipboard" : "Copy failed — copy the URL manually");
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
              padding: "9px 15px",
              borderRadius: 10,
              border: "1px solid transparent",
              background: "linear-gradient(150deg, var(--accent), var(--cyan))",
              color: "var(--on-accent)",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            <Share2 size={15} strokeWidth={2.3} />
            Share App
          </button>
        </div>
      </div>
    </header>
  );
}
